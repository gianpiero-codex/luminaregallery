const ALLOWED_DOMAINS = new Set(["luminaregallery.com"]);
const ALLOWED_ORIGINS = new Set([
  "https://luminaregallery.com",
  "https://www.luminaregallery.com",
]);

function jsonResponse(request, payload, init = {}) {
  const headers = new Headers(init.headers || {});
  headers.set("Content-Type", "application/json; charset=utf-8");
  applyCors(request, headers);
  return new Response(JSON.stringify(payload), { ...init, headers });
}

function applyCors(request, headers) {
  const origin = request.headers.get("Origin") || "";
  headers.set(
    "Access-Control-Allow-Origin",
    ALLOWED_ORIGINS.has(origin) ? origin : "*",
  );
  headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type, Accept");
  headers.set("Access-Control-Max-Age", "86400");
}

function optionsResponse(request) {
  const headers = new Headers();
  applyCors(request, headers);
  return new Response(null, { status: 204, headers });
}

function normalizeDomain(value) {
  const raw = String(value || "").trim().toLowerCase();
  const domain = raw.replace(/^https?:\/\//, "").replace(/^www\./, "").split("/")[0];
  if (!ALLOWED_DOMAINS.has(domain)) return null;
  return domain;
}

function normalizePath(value) {
  const raw = String(value || "/").trim();
  if (!raw || raw[0] !== "/") return "/";
  return raw.slice(0, 240);
}

function normalizeText(value, maxLength) {
  return String(value || "").replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function visitDateFor(timezone) {
  const safeTimezone = normalizeText(timezone, 80) || "UTC";
  try {
    return new Intl.DateTimeFormat("en-CA", {
      timeZone: safeTimezone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date());
  } catch (error) {
    return new Intl.DateTimeFormat("en-CA", {
      timeZone: "UTC",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date());
  }
}

async function recordVisit(request, env) {
  let body = {};
  try {
    body = await request.json();
  } catch (error) {
    return jsonResponse(request, { ok: false, error: "invalid_json" }, { status: 400 });
  }

  const domain = normalizeDomain(body.domain);
  if (!domain) {
    return jsonResponse(request, { ok: false, error: "unsupported_domain" }, { status: 400 });
  }

  const timezone = normalizeText(body.timezone, 80) || "UTC";
  const now = new Date().toISOString();
  const visitDate = visitDateFor(timezone);
  const pagePath = normalizePath(body.page_path);
  const pageTitle = normalizeText(body.page_title, 180);
  const country = normalizeText(request.cf && request.cf.country, 8);
  const userAgent = normalizeText(request.headers.get("User-Agent"), 240);

  await env.DB.prepare(
    `INSERT INTO visits
      (domain, page_path, page_title, timezone, visit_date, created_at, country, user_agent)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
  )
    .bind(domain, pagePath, pageTitle, timezone, visitDate, now, country, userAgent)
    .run();

  const stats = await loadStats(domain, env);
  return jsonResponse(request, { ok: true, ...stats }, { status: 201 });
}

async function loadStats(domain, env) {
  const today = visitDateFor("Europe/Rome");
  const totals = await env.DB.prepare(
    `SELECT
       COUNT(*) AS total,
       SUM(CASE WHEN visit_date = ? THEN 1 ELSE 0 END) AS today
     FROM visits
     WHERE domain = ?`,
  )
    .bind(today, domain)
    .first();

  const pagesResult = await env.DB.prepare(
    `SELECT page_path, COUNT(*) AS visits
     FROM visits
     WHERE domain = ?
     GROUP BY page_path
     ORDER BY visits DESC
     LIMIT 10`,
  )
    .bind(domain)
    .all();

  return {
    domain,
    total: Number(totals && totals.total) || 0,
    today: Number(totals && totals.today) || 0,
    pages: (pagesResult.results || []).map((row) => ({
      page_path: row.page_path || "/",
      visits: Number(row.visits) || 0,
    })),
    updated_at: new Date().toISOString(),
  };
}

async function statsResponse(request, env, url) {
  const domain = normalizeDomain(url.searchParams.get("domain") || "luminaregallery.com");
  if (!domain) {
    return jsonResponse(request, { error: "unsupported_domain" }, { status: 400 });
  }
  return jsonResponse(request, await loadStats(domain, env));
}

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") return optionsResponse(request);

    const url = new URL(request.url);
    const pathname = url.pathname.replace(/\/+$/, "") || "/";

    try {
      if (request.method === "GET" && pathname === "/health") {
        return jsonResponse(request, { ok: true, service: "luminare-visitor-counter" });
      }

      if (request.method === "POST" && pathname === "/visit") {
        return recordVisit(request, env);
      }

      if (
        request.method === "GET" &&
        (pathname === "/stats" || pathname === "/visits" || pathname === "/summary")
      ) {
        return statsResponse(request, env, url);
      }

      return jsonResponse(request, { error: "not_found" }, { status: 404 });
    } catch (error) {
      return jsonResponse(
        request,
        { error: "server_error", message: error && error.message ? error.message : "Unknown error" },
        { status: 500 },
      );
    }
  },
};

