const Database = require("better-sqlite3");
const path = require("path");
const DB_PATH = path.join(__dirname, "data.db");
let db;
function getDb() {
  if (!db) { db = new Database(DB_PATH); db.pragma("journal_mode = WAL"); db.pragma("foreign_keys = ON"); initSchema(); }
  return db;
}
function initSchema() {
  db.exec(`CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT NOT NULL,email TEXT NOT NULL UNIQUE,phone TEXT DEFAULT '',created_at TEXT DEFAULT (datetime('now','localtime')),updated_at TEXT DEFAULT (datetime('now','localtime')))`);
  const { cnt } = db.prepare("SELECT COUNT(*) cnt FROM users").get();
  if (cnt === 0) {
    const ins = db.prepare("INSERT INTO users (name,email,phone) VALUES (@n,@e,@p)");
    db.transaction(() => { ins.run({n:"张三",e:"zhangsan@example.com",p:"13800138001"}); ins.run({n:"李四",e:"lisi@example.com",p:"13800138002"}); ins.run({n:"王五",e:"wangwu@example.com",p:"13800138003"}); })();
  }
}
module.exports = { getDb };
