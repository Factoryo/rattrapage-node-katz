const express = require('express');
const router = express.Router();
const { lireDb, ecrireDb } = require('../base/db');

router.get('/obtUser/:username', (req, res) => {
    const users = lireDb();
    const user = users.find(u => u.name === req.params.username);
    if (user) {
       res.json(user);
    } else {
       res.status(404).send('Utilisateur introuvable');
    }
 });

 router.post('/posterMessage', (req, res) => {
   if (!req.body || !req.body.message) {
      return res.status(400).send('Message vide');
   }
   const message = req.body.message;
   res.send('Message posté');
});


 router.post('/ajoutUser', (req, res) => {
    const users = lireDb();
    const newUser = {
       name: req.body.name,
       email: req.body.email,
       password: req.body.password 
    };
    users.push(newUser);
    ecrireDb(users);
    res.send('Utilisateur ajouté');
 });

 router.get('/obtTous/:username', (req, res) => {
   const users = lireDb();
   const mdp = req.query.password;
   const correspoUsers = users.filter(u => u.name === req.params.username && u.password === mdp).map(u => {
      return {
         name: u.name,
         email: u.email
      };
   });
   res.json(correspoUsers);
});


 router.put('/miseajUser', (req, res) => {
    const users = lireDb();
    const indexUser = users.findIndex(u => u.name === req.body.name);
    if (indexUser > -1) {
       users[indexUser].email = req.body.email;
       ecrireDb(users);
       res.send('Utilisateur mis a jour');
    } else {
       res.status(404).send('Utilisateur introuvable');
    }
 });

 router.delete('/suppUser/:username', (req, res) => {
    const users = lireDb();
    const nouvUsers = users.filter(u => u.name !== req.params.username);
    ecrireDb(nouvUsers);
    res.send('User supprimé');
 });

 module.exports = router;
 
 