const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/product');
const orderRoutes = require('./api/routes/order');
const userRoutes = require('./api/routes/user');

mongoose.connect("mongodb+srv://node-shop:" + 
    process.env.MONGO_ATLAS_PW + 
    "@node-rest-shop-hf0wo.mongodb.net/test?retryWrites=true&w=majority",
    {   
        useNewUrlParser: true, // new method for mongo 5.0 or newer
        useUnifiedTopology: true
        // useMongoClient: true // old method 
    }
);

mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) =>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Header", 
    "Origin, X-Requested-With, Conten-Type, Accept, Authorization"
    );
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Method','PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }  
    next();   
});

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/user', userRoutes);


//handle error link/router
app.use((req, res, next) =>{
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

//handle error function/ method in api
app.use((error, req, res, next) =>{
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    });
});

module.exports  = app;