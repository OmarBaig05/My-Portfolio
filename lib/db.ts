import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'portfolio.db');

let db: Database.Database;

function getDb(): Database.Database {
    if (!db) {
        db = new Database(dbPath);
        db.pragma('journal_mode = WAL');
        db.pragma('foreign_keys = ON');
        initTables(db);
    }
    return db;
}

function initTables(db: Database.Database) {
    db.exec(`
    CREATE TABLE IF NOT EXISTS about (
      id INTEGER PRIMARY KEY DEFAULT 1,
      name TEXT DEFAULT '',
      roles TEXT DEFAULT '[]',
      bio TEXT DEFAULT '',
      experience_summary TEXT DEFAULT '',
      skills TEXT DEFAULT '[]',
      education_summary TEXT DEFAULT '',
      languages TEXT DEFAULT '[]',
      linkedin TEXT DEFAULT '',
      profile_image TEXT DEFAULT ''
    );

    CREATE TABLE IF NOT EXISTS experience (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date_range TEXT NOT NULL,
      role TEXT NOT NULL,
      company TEXT NOT NULL,
      description TEXT DEFAULT '',
      sort_order INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS education (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      dates TEXT NOT NULL,
      degree TEXT NOT NULL,
      institution TEXT NOT NULL,
      description TEXT DEFAULT '',
      sort_order INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT DEFAULT '',
      image TEXT DEFAULT '',
      tech_stack TEXT DEFAULT '[]',
      github_link TEXT DEFAULT '',
      live_link TEXT DEFAULT '',
      sort_order INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS publications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT DEFAULT '',
      date TEXT DEFAULT '',
      link TEXT DEFAULT '',
      sort_order INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS certifications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      issuer TEXT DEFAULT '',
      date TEXT DEFAULT '',
      link TEXT DEFAULT '',
      file_path TEXT DEFAULT '',
      file_type TEXT DEFAULT '',
      sort_order INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS questions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now')),
      is_read INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT DEFAULT ''
    );

    INSERT OR IGNORE INTO about (id) VALUES (1);
    INSERT OR IGNORE INTO settings (key, value) VALUES ('resume_path', '');
    INSERT OR IGNORE INTO settings (key, value) VALUES ('contact_address', '');
    INSERT OR IGNORE INTO settings (key, value) VALUES ('contact_email', '');
    INSERT OR IGNORE INTO settings (key, value) VALUES ('contact_github', '');
  `);
}

export default getDb;
