const router = require('express').Router()
const problemController = require('../controller/problemController')

router.get('/title', problemController.getProblemTitle);
router.get('/ques', problemController.getProblemWithGivenTitle)

module.exports = router