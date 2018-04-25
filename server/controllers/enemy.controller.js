const Enemy = require('../models/enemy.model');

module.exports = {
    getAllEnemy: function (req, res) {
        Enemy.find({})
        .then((enemy) => {
            res.status(200).json({
                message: 'success get all enemy',
                enemy: enemy
            })
        })
        .catch((err) => {
            res.status(500).json({
                message: 'server error'
            })
        })
    },

    seedAllEnemy: function (req, res) {
        let enemy_data = [{
            'name': 'Orc',
            'hp': 150,
            'atk': 25,
            'difficulty': 'Easy'
        },
        {
            'name': 'Golem',
            'hp': 45,
            'atk': 300,
            'difficulty': 'Medium'
        },
        {
            'name': 'Dark King',
            'hp': 75,
            'atk': 500,
            'difficulty': 'Hard'
        }]
        Enemy.remove({})
        .then(()=>{
            Enemy.insertMany(enemy_data)
            .then((enemy) => {
                res.status(200).json({
                    message: 'success get all enemy',
                    enemy: enemy
                })
            })
        })        
        .catch((err) => {
            res.status(500).json({
                message: 'server error'
            })
        })
    },
}
