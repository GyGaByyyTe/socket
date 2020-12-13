var express = require('express');
const db = require('../queriesSchedule');
var router = express.Router();

router.get('/all', function (req, res) {
  db.getSchedules(req, res);
})
router.get('/:id', function (req, res) {
  db.getScheduleById(req, res);
})
router.post('/', function (req, res) {
  console.log(req.body);
  db.createSchedule(req, res);
})
router.put('/:id', function (req, res) {
  db.updateSchedule(req, res);
})
router.delete('/:id', function (req, res) {
  db.deleteSchedule(req, res);
})

module.exports = router;
