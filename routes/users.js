var express = require('express');
const db = require('../queries');
var router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
router.get('/', function (req, res) {
  db.getUsers(req, res);
})
router.get('/:id', function (req, res) {
  db.getUserById(req, res);
})
router.post('/', function (req, res) {
  db.createUser(req, res);
})
router.put('/:id', function (req, res) {
  db.updateUser(req, res);
})
router.delete('/:id', function (req, res) {
  db.deleteUser(req, res);
})

module.exports = router;
