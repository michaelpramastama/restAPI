const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
// const Order = require('../models/order');

const OrdersControllers =require('../controllers/order');
//=========================== GET ALL VALUE FROM DB ====================
router.get('/', checkAuth, OrdersControllers.orders_get_all);
//========================================================================

//=========================== POST DATA TO DB ============================
router.post('/', checkAuth, OrdersControllers.orders_create_order);
//========================================================================

//=========================== GET SPESIFIC VALUE FROM DB==================
router.get('/:orderId', checkAuth, OrdersControllers.orders_get_spesific_order);
//========================================================================

//========================== DELETE VALUE FROM DB ========================
router.delete('/:orderId', checkAuth, OrdersControllers.orders_delete_order);
//========================================================================
module.exports = router;