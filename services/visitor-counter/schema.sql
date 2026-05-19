CREATE TABLE IF NOT EXISTS visits (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  domain TEXT NOT NULL,
  page_path TEXT NOT NULL DEFAULT '/',
  page_title TEXT NOT NULL DEFAULT '',
  timezone TEXT NOT NULL DEFAULT 'UTC',
  visit_date TEXT NOT NULL,
  created_at TEXT NOT NULL,
  country TEXT NOT NULL DEFAULT '',
  user_agent TEXT NOT NULL DEFAULT ''
);

CREATE INDEX IF NOT EXISTS idx_visits_domain_created_at
  ON visits (domain, created_at);

CREATE INDEX IF NOT EXISTS idx_visits_domain_visit_date
  ON visits (domain, visit_date);

CREATE INDEX IF NOT EXISTS idx_visits_domain_page_path
  ON visits (domain, page_path);

