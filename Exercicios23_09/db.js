const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    db.run(
        `CREATE TABLE salasdeaula(
        salasdeaulaid INTEGER PRIMARY KEY AUTOINCREMENT,
        descricao TEXT,
        localizacao TEXT,
        capacidade INTEGER,
        removido INTEGER DEFAULT 0)`
    );
});

module.exports= db;