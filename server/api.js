const express = require('express');
const router = express.Router();

const queries = require('./queries')

router.post('/initial', queries.initial);
router.get('/getTables', queries.getTables);
router.get('/getTableSize/:tableName',queries.getTableSize);
router.get('/getUsers',queries.getUsers);
router.post('/postPermissionsTables',queries.postPermissionsTables);
// router.get('', queries.getSchemas);

module.exports = router;