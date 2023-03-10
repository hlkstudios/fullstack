const { User, Category, Event, Settings } = require('../models');
const sequelize = require('sequelize');
const router = require('express').Router();

// Assume session includes all User ID and relevant settings info.

// primary route
// get Event Data, find all by session user ID foreign key
//  - associate category table with each event
//  - use helper to calculate T1, T2, T3 in to API

router.get('/', async (req, res) => {
    if (!req.session.loggedIn) {
        return res.render('homepage');
    }
    try {
        const eventData = await Event.findAll({
            attributes:['id', 'name', 'description', 'due_date'],
            where: {
                id: req.session.userId
            },
            include: [{
                model: Category,
                attributes: ['name', 'type', 'T1', 'T2', 'T3']
            }]
        });
        const events = eventData.map((event) => event.get({ plain: true }));
        res.render('homepage', { events, loggedIn: req.session.loggedIn, userId: req.session.userId, firstName: req.session.firstName });  
    } catch (err) {
        res.render('homepage');
    }
});

router.get('/login', async (req, res) => {
    return res.render('login');
});

module.exports = router;

