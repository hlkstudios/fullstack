const { User, Category, Event } = require('../../models');
const sequelize = require('sequelize');
const router = require('express').Router();

router.get('/', async (req, res) => {
    try {
        const categoryData = await Category.findAll({
            attributes:['name', 'type', 't1', 't2', 't3'],
            // where: {
            //     id: user_id
            // },
            include: [{
                model: Event,
            }]
        });
        res.status(200).json(categoryData);
    } catch (err) {
        res.render('login');
    }
});

router.get('/:id', async (req, res) => {
    try {    
        const eventData = await Event.findByPk(req.params.id, {
                attributes: ['id', 'name', 'description', 'due_date'],
                include: [{
                    model: Category,
                    attributes: ['name', 'type', 't1', 't2', 't3']
                }]
            });
            res.status(200).json(eventData)
        } catch {
            res.status(404).json("Not found") 
// Thomas: Please use a general 500 error server error instead 
        }
    }
);

module.exports = router;
