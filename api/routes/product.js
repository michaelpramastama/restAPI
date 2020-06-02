const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const ProductControllers = require('../controllers/product');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        const now = new Date().toISOString();
        const date = now.replace(/:/g, '-');
        cb(null, date + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    //reject file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});


//=========================== GET ALL VALUE FROM DB ====================
router.get('/', checkAuth, ProductControllers.product_get_all_product);
//========================================================================

//=========================== POST DATA TO DB ============================
router.post('/', checkAuth, upload.single('productImage'), ProductControllers.product_create_product);
//========================================================================

//=========================== GET SPESIFIC VALUE FROM DB==================
router.get('/:productId', checkAuth, ProductControllers.product_get_spesific_product);
//========================================================================


//=========================== UPDATE VALUE FROM DB========================
router.patch('/:productId', checkAuth, ProductControllers.product_update_spesific_product);
//========================================================================


//========================== DELETE VALUE FROM DB ========================
router.delete('/:productId', checkAuth, ProductControllers.product_delete_product);
//========================================================================

module.exports = router;