-- Minimal schema for demo and initial migration to D1
CREATE TABLE IF NOT EXISTS Records (
	id INTEGER PRIMARY KEY,
	name TEXT NOT NULL,
	note TEXT,
	created_at TEXT DEFAULT (datetime('now'))
);

