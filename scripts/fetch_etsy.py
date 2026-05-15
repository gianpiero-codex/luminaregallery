#!/usr/bin/env python3
"""
Fetch active Etsy shop listings with images and save to assets/data/products.json.
Images are fetched per-listing in parallel (ThreadPoolExecutor).
Works locally (reads .env) and in GitHub Actions (reads env secrets).
"""

import json
import os
import sys
import tempfile
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path

import requests

# ── Load .env ────────────────────────────────────────────────────────────────
_env_file = Path(__file__).resolve().parent.parent / ".env"
_env_data = {}
if _env_file.exists():
    for _line in _env_file.read_text(encoding="utf-8").splitlines():
        _line = _line.strip()
        if _line and not _line.startswith("#") and "=" in _line:
            _key, _, _val = _line.partition("=")
            _key, _val = _key.strip(), _val.strip()
            os.environ.setdefault(_key, _val)
            _env_data[_key] = _val

# ── Config ───────────────────────────────────────────────────────────────────
API_KEY       = os.environ.get("ETSY_API_KEY", "")
SHARED_SECRET = os.environ.get("ETSY_SHARED_SECRET", "")
SHOP_ID       = os.environ.get("ETSY_SHOP_ID", "")
ACCESS_TOKEN  = os.environ.get("ETSY_ACCESS_TOKEN", "")
REFRESH_TOKEN = os.environ.get("ETSY_REFRESH_TOKEN", "")
EXPIRES_AT    = float(os.environ.get("ETSY_TOKEN_EXPIRES_AT", "0"))

BASE_URL  = "https://openapi.etsy.com/v3/application"
TOKEN_URL = "https://api.etsy.com/v3/public/oauth/token"
OUT_FILE     = Path(__file__).resolve().parent.parent / "assets" / "data" / "products.json"
REVIEWS_FILE = Path(__file__).resolve().parent.parent / "assets" / "data" / "reviews.json"

if not API_KEY or not SHOP_ID or not SHARED_SECRET:
    print("ERROR: ETSY_API_KEY, ETSY_SHARED_SECRET and ETSY_SHOP_ID must be set.", file=sys.stderr)
    sys.exit(1)

ETSY_KEY_HEADER = f"{API_KEY}:{SHARED_SECRET}"


# ── Token refresh ────────────────────────────────────────────────────────────
def is_token_expired(expires_at, margin=300):
    return time.time() >= (expires_at - margin)


def refresh_access_token(api_key, refresh_tok):
    print("Access token expired, refreshing...")
    resp = requests.post(TOKEN_URL, data={
        "grant_type": "refresh_token",
        "client_id": api_key,
        "refresh_token": refresh_tok,
    }, timeout=15)
    resp.raise_for_status()
    data = resp.json()
    new_expires = time.time() + data.get("expires_in", 3600)
    print(f"  Token valid for {data.get('expires_in','?')}s")
    return data["access_token"], data.get("refresh_token", refresh_tok), new_expires


def save_tokens_to_env(access, refresh, expires):
    if not _env_file.exists():
        return
    text = _env_file.read_text(encoding="utf-8")
    for key, val in [("ETSY_ACCESS_TOKEN", access), ("ETSY_REFRESH_TOKEN", refresh), ("ETSY_TOKEN_EXPIRES_AT", str(expires))]:
        lines = text.splitlines()
        for i, line in enumerate(lines):
            if line.startswith(key + "="):
                lines[i] = f"{key}={val}"
                break
        text = "\n".join(lines)
    _env_file.write_text(text + "\n", encoding="utf-8")
    print("  .env updated")


def save_tokens_for_actions(access, refresh, expires):
    """Write refreshed tokens for the Actions step to pick up."""
    token_file = Path(tempfile.gettempdir()) / "new_etsy_tokens.env"
    token_file.write_text(
        f"ETSY_ACCESS_TOKEN={access}\nETSY_REFRESH_TOKEN={refresh}\nETSY_TOKEN_EXPIRES_AT={expires}\n",
        encoding="utf-8",
    )
    print("  New tokens written to /tmp/new_etsy_tokens.env")


_access_token = ACCESS_TOKEN
if is_token_expired(EXPIRES_AT):
    if not REFRESH_TOKEN:
        print("ERROR: token expired, no refresh token.", file=sys.stderr)
        sys.exit(1)
    _access_token, new_ref, new_exp = refresh_access_token(API_KEY, REFRESH_TOKEN)
    save_tokens_to_env(_access_token, new_ref, new_exp)
    save_tokens_for_actions(_access_token, new_ref, new_exp)

AUTH_HEADERS = {
    "x-api-key": ETSY_KEY_HEADER,
    "Authorization": f"Bearer {_access_token}",
}

# ── Section / Tag mapping ─────────────────────────────────────────────────────
SECTION_MAP = {
    # English section names
    "kitchen & food":         "Kitchen Wall Art",
    "bathroom":               "Bathroom Prints",
    "japanese wall art":      "Japanese Inspired Art",
    "religious / sacred art": "Faith & Inspirational Art",
    "animals":                "Animal Wall Art",
    "legendary archetypes":   "Character Art",
    "luminescent realms":     "Abstract Art",
    "compression studies":    "Abstract Art",
    "city corner":            "City Art",
    "measured stillness":     "Abstract Art",
    # Italian section names (as they appear on Etsy)
    "angolo della citt\u00e0": "City Art",
    "cucina e cibo":          "Kitchen Wall Art",
    "bagno":                  "Bathroom Prints",
    "arte murale giapponese": "Japanese Inspired Art",
    "arte religiosa/sacra":   "Faith & Inspirational Art",
    "animali":                "Animal Wall Art",
    "archetipi leggendari":   "Character Art",
    "regni luminescenti":     "Abstract Art",
    "studi di compressione":  "Abstract Art",
    "misurata immobilit\u00e0": "Abstract Art",
    "download digitale":      "Digital Download",
    "digital download":       "Digital Download",
}

GENERIC_SECTIONS = {"digital download", ""}

TAG_MAP = {
    "kitchen": "Kitchen Wall Art", "coffee": "Kitchen Wall Art", "dining": "Kitchen Wall Art",
    "farmhouse": "Kitchen Wall Art", "bathroom": "Bathroom Prints", "bath": "Bathroom Prints",
    "duck": "Bathroom Prints", "dog": "Animal Wall Art", "cat": "Animal Wall Art",
    "animal": "Animal Wall Art", "pet": "Animal Wall Art", "bird": "Animal Wall Art",
    "faith": "Faith & Inspirational Art", "christian": "Faith & Inspirational Art",
    "jesus": "Faith & Inspirational Art", "bible": "Faith & Inspirational Art",
    "prayer": "Faith & Inspirational Art", "spiritual": "Faith & Inspirational Art",
    "japanese": "Japanese Inspired Art", "japan": "Japanese Inspired Art",
    "samurai": "Japanese Inspired Art", "ronin": "Japanese Inspired Art",
    "anime": "Japanese Inspired Art", "city": "City Art", "urban": "City Art",
    "abstract": "Abstract Art", "mineral": "Abstract Art", "stone": "Abstract Art",
    "geological": "Abstract Art",
}


def resolve_section(etsy_section_name, tags):
    name_lower = (etsy_section_name or "").lower().strip()
    if name_lower and name_lower not in GENERIC_SECTIONS:
        if name_lower in SECTION_MAP:
            return SECTION_MAP[name_lower]
        return etsy_section_name  # keep original Etsy section if not mapped
    for tag in [t.lower() for t in tags]:
        for keyword, category in TAG_MAP.items():
            if keyword in tag:
                return category
    return "Wall Art"


# ── API helpers ───────────────────────────────────────────────────────────────
def fetch_sections():
    resp = requests.get(f"{BASE_URL}/shops/{SHOP_ID}/sections", headers=AUTH_HEADERS, timeout=15)
    if not resp.ok:
        print(f"  Warning: sections {resp.status_code}")
        return {}
    return {s["shop_section_id"]: s["title"] for s in resp.json().get("results", [])}


def _pick_image(item, fallback_map):
    """Return best image URL: embedded Images association first, then fallback_map."""
    images = item.get("images") or []
    if images:
        img = images[0]
        return img.get("url_570xN") or img.get("url_fullxfull") or ""
    return fallback_map.get(item["listing_id"], "")


def fetch_listing_image(listing_id, retries=3):
    """Returns the first image URL for a listing (570px), or empty string.
    Retries with backoff on rate-limit or network errors."""
    import time
    for attempt in range(retries + 1):
        try:
            resp = requests.get(
                f"{BASE_URL}/listings/{listing_id}/images",
                headers=AUTH_HEADERS, timeout=15
            )
            if resp.status_code == 429:
                time.sleep(2 ** attempt)   # 1s, 2s, 4s
                continue
            if not resp.ok:
                return listing_id, ""
            results = resp.json().get("results", [])
            if results:
                return listing_id, results[0].get("url_570xN") or results[0].get("url_fullxfull") or ""
            return listing_id, ""
        except Exception:
            if attempt < retries:
                import time as _t; _t.sleep(1)
            else:
                return listing_id, ""
    return listing_id, ""


def fetch_all_listings(sections):
    offset, limit, all_items = 0, 100, []
    while True:
        resp = requests.get(
            f"{BASE_URL}/shops/{SHOP_ID}/listings/active",
            headers=AUTH_HEADERS,
            # includes[]=Images returns image objects alongside each listing
            # so we don't need a separate per-listing image request
            params=[
                ("limit", limit),
                ("offset", offset),
                ("sort_on", "created"),
                ("sort_order", "desc"),
                ("includes[]", "Images"),
            ],
            timeout=15,
        )
        resp.raise_for_status()
        results = resp.json().get("results", [])
        if not results:
            break
        all_items.extend(results)
        if len(results) < limit:
            break
        offset += limit
    return all_items


def build_products(raw_listings, sections, image_map):
    products = []
    for item in raw_listings:
        price_raw = item.get("price") or {}
        try:
            amount = price_raw["amount"] / price_raw["divisor"]
            currency = price_raw["currency_code"]
        except (KeyError, TypeError, ZeroDivisionError):
            amount, currency = 0.0, "USD"

        sec_id           = item.get("shop_section_id")
        etsy_section_raw = sections.get(sec_id, "")

        # Detect digital: by section name or title keyword
        # (is_digital field not returned by this endpoint)
        _sec_lower = etsy_section_raw.lower().strip()
        _title_lower = (item.get("title") or "").lower()
        is_digital = (
            _sec_lower in ("digital download", "download digitale")
            or "digital download" in _title_lower
            or "instant download" in _title_lower
        )
        if is_digital:
            section      = "Digital Download"
            product_type = "digital"
        else:
            section      = resolve_section(etsy_section_raw, item.get("tags", []))
            product_type = "print"

        products.append({
            "listing_id":  item["listing_id"],
            "title":       item["title"],
            "description": (item.get("description") or "")[:220].strip(),
            "price":       f"{amount:.2f}",
            "currency":    currency,
            "url":         item["url"],
            # Prefer embedded Images association; fall back to separate fetch
            "image_url":   _pick_image(item, image_map),
            "section":     section,
            "is_digital":  is_digital,
            "type":        product_type,
            "tags":        item.get("tags", [])[:8],
            "quantity":    item.get("quantity", 1),
        })
    return products


def fetch_reviews(limit=100):
    """Fetch shop reviews from Etsy API."""
    reviews, offset = [], 0
    while True:
        resp = requests.get(
            f"{BASE_URL}/shops/{SHOP_ID}/reviews",
            headers=AUTH_HEADERS,
            params={"limit": limit, "offset": offset},
            timeout=15,
        )
        if not resp.ok:
            print(f"  Warning: reviews {resp.status_code}: {resp.text[:200]}")
            break
        data = resp.json()
        results = data.get("results", [])
        reviews.extend(results)
        if len(results) < limit:
            break
        offset += limit
    return reviews


def main():
    print(f"Fetching sections (shop {SHOP_ID})...")
    sections = fetch_sections()
    print(f"  {len(sections)} sections: {list(sections.values())}")

    print("Fetching active listings...")
    raw = fetch_all_listings(sections)
    print(f"  {len(raw)} listings found")

    # Build fallback image_map for listings where includes[]=Images returned nothing
    needs_fallback = [item for item in raw if not (item.get("images") or [])]
    image_map = {}
    if needs_fallback:
        print(f"Fetching images separately for {len(needs_fallback)} listings (fallback)...")
        with ThreadPoolExecutor(max_workers=10) as executor:
            futures = {executor.submit(fetch_listing_image, item["listing_id"]): item["listing_id"] for item in needs_fallback}
            done = 0
            for future in as_completed(futures):
                lid, url = future.result()
                image_map[lid] = url
                done += 1
                if done % 10 == 0:
                    print(f"  {done}/{len(needs_fallback)} images fetched...")

    with_img = sum(1 for item in raw if _pick_image(item, image_map))
    print(f"  Images found: {with_img}/{len(raw)}")

    products = build_products(raw, sections, image_map)

    breakdown = Counter(p["section"] for p in products)
    for sec, count in sorted(breakdown.items(), key=lambda x: -x[1]):
        print(f"  {count:3d}  {sec}")

    OUT_FILE.parent.mkdir(parents=True, exist_ok=True)
    output = {
        "last_updated": datetime.now(timezone.utc).isoformat(),
        "shop_id": SHOP_ID,
        "total": len(products),
        "products": products,
    }
    with open(OUT_FILE, "w", encoding="utf-8") as fh:
        json.dump(output, fh, ensure_ascii=False, indent=2)
    print(f"Saved to {OUT_FILE}")

    # ── Reviews ──────────────────────────────────────────────────────────────────
    print("Fetching shop reviews...")
    raw_reviews = fetch_reviews()
    print(f"  {len(raw_reviews)} reviews found")

    total_rating = sum(r.get("rating", 0) for r in raw_reviews)
    avg_rating   = round(total_rating / len(raw_reviews), 1) if raw_reviews else 0.0
    reviews_list = [
        {
            "listing_id":    r.get("listing_id"),
            "listing_title": r.get("listing_title", "") or "",
            "rating":        r.get("rating", 5),
            "review":        (r.get("review") or "").strip(),
            "language":      r.get("language", "en"),
            "image_url":     r.get("image_url_fullxfull") or "",
            "create_timestamp": r.get("create_timestamp", 0),
        }
        for r in raw_reviews
    ]

    reviews_output = {
        "last_updated":  datetime.now(timezone.utc).isoformat(),
        "shop_id":       SHOP_ID,
        "total_reviews": len(reviews_list),
        "average_rating": avg_rating,
        "reviews":       reviews_list,
    }
    with open(REVIEWS_FILE, "w", encoding="utf-8") as fh:
        json.dump(reviews_output, fh, ensure_ascii=False, indent=2)
    print(f"Saved reviews to {REVIEWS_FILE}")


if __name__ == "__main__":
    main()
