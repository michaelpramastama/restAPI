const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');
const checkAuth = require('../middleware/check-auth');

//=========================== POST DATA TO DB ============================
router.post('/signup', UserController.user_signup);
//========================================================================

//=========================== GET SPESIFIC VALUE FROM DB==================
router.post('/login', UserController.user_login);
//========================================================================

//========================== DELETE VALUE FROM DB ========================
router.delete('/:userId', checkAuth, UserController.user_delete);
//========================================================================
module.exports = router;