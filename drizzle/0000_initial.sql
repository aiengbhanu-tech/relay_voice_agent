CREATE TABLE calls (id TEXT PRIMARY KEY, owner TEXT NOT NULL, data TEXT NOT NULL, created_at TEXT NOT NULL);
CREATE INDEX calls_owner ON calls(owner, created_at);
CREATE TABLE actions (id TEXT PRIMARY KEY, owner TEXT NOT NULL, kind TEXT NOT NULL, data TEXT NOT NULL);
CREATE TABLE bookings (slot TEXT PRIMARY KEY, owner TEXT NOT NULL, call_id TEXT NOT NULL, name TEXT NOT NULL);
