// server.js
const express = require('express');
const mysql = require('mysql2');

const bodyParser = require('body-parser');

const app = express();
const PORT = 4000;
const cors = require('cors');

app.use(cors());

// Middleware pour parser le corps des requêtes en JSON
app.use(bodyParser.json());

// Configuration de la connexion à la base de données MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',        // Remplacez par votre utilisateur MySQL
    password: '',        // Remplacez par votre mot de passe MySQL
    database: 'todolist'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connecté à la base de données MySQL!');
});

// Routes CRUD pour les catégories
app.post('/categories', (req, res) => {
    const { categorie } = req.body;
    const sql = 'INSERT INTO categories (categorie) VALUES (?)';
    db.query(sql, [categorie], (err, result) => {
        if (err) throw err;
        res.status(201).json({ id_categorie: result.insertId, categorie });
    });
});

app.get('/categories', (req, res) => {
    const sql = 'SELECT * FROM categories';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.put('/categories/:id', (req, res) => {
    const { id } = req.params;
    const { categorie } = req.body;
    const sql = 'UPDATE categories SET categorie = ? WHERE id_categorie = ?';
    db.query(sql, [categorie, id], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Catégorie mise à jour' });
    });
});

app.delete('/categories/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM categories WHERE id_categorie = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Catégorie supprimée' });
    });
});



// Routes CRUD pour les tâches
app.post('/taches', (req, res) => {
    const { tache, id_categorie, date } = req.body;
    const sql = 'INSERT INTO taches (tache, id_categorie, date) VALUES (?, ?, ?)';
    db.query(sql, [tache, id_categorie, date], (err, result) => {
        if (err) throw err;
        res.status(201).json({ id_tache: result.insertId, tache, id_categorie, date });
    });
});

app.get('/taches', (req, res) => {
    const sql = 'SELECT * FROM taches';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.put('/taches/:id', (req, res) => {
    const { id } = req.params;
    const { tache, id_categorie, date } = req.body;
    const sql = 'UPDATE taches SET tache = ?, id_categorie = ?, date = ? WHERE id_tache = ?';
    db.query(sql, [tache, id_categorie, date, id], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Tâche mise à jour' });
    });
});

app.delete('/taches/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM taches WHERE id_tache = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Tâche supprimée' });
    });
});

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
