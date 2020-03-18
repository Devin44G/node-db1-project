const express = require("express");
const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ message: "Welcome to the server" });
});

/******** ACCOUNTS ENDPOINTS ********/

server.get('/api/accounts', (req, res) => {
  db.select('*')
    .from('accounts')
    .then(rows => {
      res.status(200).json({ data: rows });
    })
    .catch(err => {
      res.status(500).json({ err: "error retrieving the data" });
    });
});

server.get('/api/accounts/:id', (req, res) => {
  db.select('*')
    .from('accounts')
    .where({ id: req.params.id })
    .first()
    .then(account => {
      res.status(200).json({ data: account });
    })
    .catch(err => {
      res.status(500).json({ err: "error retrieving the data" });
    });
});

server.post('/api/accounts', (req, res) => {
  if(!req.body) {
    res.status(404).json({ err: "body not found" });
  } else {
    db('accounts')
      .insert(req.body, 'id')
      .then(ids => {
        res.status(201).json({ results: ids });
      })
      .catch(error => {
        res.status(500).json({ err: "could not post account" });
      });
  }
});

server.put('/api/accounts/:id', (req, res) => {
  const changes = req.body;

  db('accounts')
    .where({ id: req.params.id })
    .update(changes)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: "account updated successfully" });
      } else {
        res.status(404).json({ message: "account not found" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "error retrieving the data" });
    });
});

server.delete('/api/accounts/:id', (req, res) => {
  db('accounts')
    .where({ id: req.params.id })
    .del()
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: "record deleted successfully" });
      } else {
        res.status(404).json({ message: "account not found" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "error retrieving the data" });
    });
});

module.exports = server;
