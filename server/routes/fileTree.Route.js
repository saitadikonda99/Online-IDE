const express = require('express');
const router = express.Router();

const fileTreeController = require('../controllers/FileTree.Controller');

router.get('/', fileTreeController);

module.exports = router;