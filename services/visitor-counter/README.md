# Luminare Visitor Counter

Small Cloudflare Worker API for counting public site visits.

## Endpoints

- `POST /visit`
  Records one visit.
- `GET /stats?domain=luminaregallery.com`
  Returns totals for the domain.
- `GET /visits?domain=luminaregallery.com`
  Alias of `/stats`.
- `GET /summary?domain=luminaregallery.com`
  Alias of `/stats`.
- `GET /health`
  Health check.

## Expected stats response

```json
{
  "domain": "luminaregallery.com",
  "total": 1234,
  "today": 12,
  "pages": [
    { "page_path": "/", "visits": 100 }
  ],
  "updated_at": "2026-05-19T20:00:00.000Z"
}
```

## Deploy

1. Install Wrangler:

```powershell
npm install
```

2. Login to Cloudflare:

```powershell
npx wrangler login
```

3. Create the D1 database:

```powershell
npx wrangler d1 create luminare_visitor_counter
```

4. Copy the returned `database_id` into `wrangler.toml`.

5. Create the table:

```powershell
npx wrangler d1 execute luminare_visitor_counter --file=./schema.sql --remote
```

6. Deploy:

```powershell
npx wrangler deploy
```

7. In Cloudflare DNS/routes, point:

```txt
visitor.luminaregallery.com/*
```

to this Worker.

After deploy, these URLs should work:

```txt
https://visitor.luminaregallery.com/health
https://visitor.luminaregallery.com/stats?domain=luminaregallery.com
```

