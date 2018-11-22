const express = require('express');
const router = express.Router();

const queries = require('./queries')

router.get('/initial', queries.initial);
router.post('/update', queries.update);
router.post('/saveWorkspace', queries.saveWorkspace);
router.get('/getWsCount/:user', queries.getWsCount);
router.get('/getTables', queries.getTables);
router.get('/getTableSize/:tableName',queries.getTableSize);
router.get('/getUsers',queries.getUsers);
router.post('/postPermissionsTables',queries.postPermissionsTables);
// router.get('', queries.getSchemas);


// search
router.get('/searchByName/:name', queries.searchByName);
router.get('/searchByDate/:date', queries.searchByDate);
router.get('/searchByDescription/:description', queries.searchByDescription);
module.exports = router;