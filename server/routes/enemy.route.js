var express = require('express');
var router = express.Router();

const EnemyController = require('../controllers/enemy.controller')

router.get('/get', EnemyController.getAllEnemy);
router.get('/seed', EnemyController.seedAllEnemy);

module.exports = router;