const express = require('express');
const router = express.Router();

const queries = require('./queries')

router.post('/initial', queries.initial);
// router.get('', queries.getSchemas);

module.exports = router;