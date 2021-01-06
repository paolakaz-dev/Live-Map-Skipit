const express = require("express");

const router = express.Router();


// Load User model
const LogEntry = require('../../models/LogEntry');
const User = require('../../models/User');

router.get('/', async (req, res, next) => {
    try {
        const entries = await LogEntry.find();
        res.json(entries);

    } catch (error) {
        next(error);
    }
});

// router.get('/number', async (req, res, next) => {
//     try {
//         const categories = await Category.find();
//         res.json(categories);
//     } catch (error) {
//         next(error);
//     }
  
// });

// Upload Image

router.post('/', async (req, res, next)=> {

    const logEntry = new LogEntry(req.body);

    logEntry.save((err, logEntry) => {
    console.log(err);
    if (err) return res.json({ success: false, err });
    // get all the info about the writer=user
    LogEntry.find({ '_id': logEntry._id })
      .populate('author')
      .exec((err, result) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({ success: true, result });
      });
  });
    // try {
    //     const logEntry = new LogEntry(req.body);

    //     const createdEntry = await logEntry.save();
    //     res.json(createdEntry);
    // } catch (error) {
    //     if(error.name === 'ValidationError'){
    //         res.status(422);
    //     }
    //     next(error);
    // }
});

module.exports = router;
