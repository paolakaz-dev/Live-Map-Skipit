const express = require("express");

const router = express.Router();

// Load User model
const Category = require('../../models/Categories');

router.get('/', async (req, res, next) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        next(error);
    }
  
});

router.post('/', async (req, res, next)=> {
    try {
        const category = new Category(req.body);
        const createdEntry = await category.save();
        res.json(createdEntry);
    } catch (error) {
        if(error.name === 'ValidationError'){
            res.status(422);
        }
        next(error);
    }
});

module.exports = router;