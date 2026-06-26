import { pool } from "./db";

const MIGRATION_SQL = `
-- ── Gallery images ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS gallery_images (
  id           SERIAL        PRIMARY KEY,
  title        VARCHAR(255),
  caption      TEXT,
  image_url    TEXT          NOT NULL,
  category     VARCHAR(100)  NOT NULL DEFAULT 'general',
  sort_order   INTEGER       NOT NULL DEFAULT 0,
  is_published BOOLEAN       NOT NULL DEFAULT TRUE,
  created_at   TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

-- ── Opportunities ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS opportunities (
  id           SERIAL        PRIMARY KEY,
  title        VARCHAR(255)  NOT NULL,
  type         VARCHAR(50)   NOT NULL,
  description  TEXT,
  requirements TEXT,
  location     VARCHAR(255),
  deadline     DATE,
  status       VARCHAR(50)   NOT NULL DEFAULT 'open',
  created_at   TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

-- ── Site content (key-value) ──────────────────────────────────
CREATE TABLE IF NOT EXISTS site_content (
  id         SERIAL        PRIMARY KEY,
  key        VARCHAR(255)  UNIQUE NOT NULL,
  value      TEXT          NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

-- ── Contact messages ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS contact_messages (
  id         SERIAL        PRIMARY KEY,
  name       VARCHAR(255)  NOT NULL,
  email      VARCHAR(255)  NOT NULL,
  phone      VARCHAR(100),
  subject    VARCHAR(255),
  message    TEXT          NOT NULL,
  status     VARCHAR(50)   NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

-- ── Leadership ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS leadership (
  id           SERIAL        PRIMARY KEY,
  name         VARCHAR(255)  NOT NULL,
  role         VARCHAR(255)  NOT NULL,
  bio          TEXT,
  photo_url    TEXT,
  sort_order   INTEGER       NOT NULL DEFAULT 0,
  is_published BOOLEAN       NOT NULL DEFAULT TRUE,
  created_at   TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

-- ── CHECK constraints (idempotent) ────────────────────────────
DO $$ BEGIN
  ALTER TABLE opportunities ADD CONSTRAINT opportunities_type_check
    CHECK (type IN ('job', 'volunteer', 'internship'));
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE opportunities ADD CONSTRAINT opportunities_status_check
    CHECK (status IN ('open', 'closed', 'draft'));
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE contact_messages ADD CONSTRAINT contact_messages_status_check
    CHECK (status IN ('new', 'read', 'resolved'));
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- ── updated_at trigger function ───────────────────────────────
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS gallery_images_updated_at     ON gallery_images;
CREATE TRIGGER gallery_images_updated_at
  BEFORE UPDATE ON gallery_images
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS opportunities_updated_at      ON opportunities;
CREATE TRIGGER opportunities_updated_at
  BEFORE UPDATE ON opportunities
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS site_content_updated_at       ON site_content;
CREATE TRIGGER site_content_updated_at
  BEFORE UPDATE ON site_content
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS contact_messages_updated_at   ON contact_messages;
CREATE TRIGGER contact_messages_updated_at
  BEFORE UPDATE ON contact_messages
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS leadership_updated_at         ON leadership;
CREATE TRIGGER leadership_updated_at
  BEFORE UPDATE ON leadership
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();
`;

export async function runMigrations(): Promise<void> {
  const client = await pool.connect();
  try {
    await client.query(MIGRATION_SQL);
    console.log("[migrate] All migrations applied successfully.");
  } catch (err) {
    console.error("[migrate] Migration failed:", err);
    throw err;
  } finally {
    client.release();
  }
}
