const express = require('express');
const Shoe = require('../models/shoe');
const router = express.Router();

// GET all shoes or filter by category (e.g., /shoes?category=sneakers)
router.get('/shoes', function (req, res, next) {
    const categoryFilter = req.query.category ? { category: req.query.category } : {};

    Shoe.find(categoryFilter)
        .then(function (shoes) {
            res.send(shoes);
        })
        .catch(next);
});

// GET a single shoe by ID
router.get('/shoes/:id', function (req, res, next) {
    Shoe.findById(req.params.id)
        .then(function (shoe) {
            if (!shoe) {
                return res.status(404).send({ error: 'Shoe not found' });
            }
            res.send(shoe);
        })
        .catch(next);
});

// Add a new shoe
router.post('/shoes', function (req, res, next) {
    Shoe.create(req.body)
        .then(function (shoe) {
            res.status(201).send(shoe);
        })
        .catch(next);
});

// Update a shoe by ID
router.put('/shoes/:id', function (req, res, next) {
    Shoe.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(function (shoe) {
            if (!shoe) {
                return res.status(404).send({ error: 'Shoe not found' });
            }
            res.send(shoe);
        })
        .catch(next);
});

// DELETE: Remove a shoe by ID
router.delete('/shoes/:id', function (req, res, next) {
    Shoe.findByIdAndDelete(req.params.id)
        .then(function (shoe) {
            if (!shoe) {
                return res.status(404).send({ error: 'Shoe not found' });
            }
            res.send(shoe);
        })
        .catch(next);
});

module.exports = router;
