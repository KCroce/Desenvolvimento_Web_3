const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  db.all('SELECT * FROM salasdeaula WHERE removido = 0', [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM salasdeaula WHERE salasdeaulaid = ? AND removido = 0', [id], (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: row
    });
  });
});

router.post('/', (req, res) => {
  const { descricao, localizacao, capacidade } = req.body;
  db.run(
    'INSERT INTO salasdeaula (descricao, localizacao, capacidade) VALUES (?, ?, ?)',
    [descricao, localizacao, capacidade],
    function (err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: { salasdeaulaid: this.lastID },
      });
    }
  );
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { descricao, localizacao, capacidade } = req.body;
  db.run(
    'UPDATE salasdeaula SET descricao = ?, localizacao = ?, capacidade = ? WHERE salasdeaulaid = ?',
    [descricao, localizacao, capacidade, id],
    function (err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        changes: this.changes,
      });
    }
  );
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.run(
    'UPDATE salasdeaula SET removido = 1 WHERE salasdeaulaid = ?',
    [id],
    function (err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        changes: this.changes,
      });
    }
  );
});

module.exports = router;
