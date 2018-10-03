const express = require('express');
const bodyParser = require('body-parser');
const Promotions = require('../models/promotions')
const promoRouter = express.Router();
module.exports = promoRouter;

promoRouter.use(bodyParser.json());

promoRouter.route('/')
.get((req,res,next) => {
    Promotions.find({}).then((promotions) =>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotions)
    }, (err) => next(err)).catch((err) => next(err));
})
.post((req, res, next) => {
    Promotions.create(req.body).then((promotions) => {
        console.log('Promotion ' + req.body.name)
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotions);
    }, (err)=> next(err)).catch((err)=>next(err));
    // res.end('Will add the Promotion: ' + req.body.name + ' with details: ' + req.body.description);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
})
.delete((req, res, next) => {
    Promotions.remove({}).then((resp) => {
        console.log('All promotions deleted!');
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp)
    }, (err) => next(err)).catch((err) => next(err));
});

//**************************************************************************************************************
promoRouter.route('/:promoId')
.get((req, res, next) => {
    Promotions.findById(req.params.promoId).then((promotions) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotions)
    }, (err)=> next(err)).catch((err)=>next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /promotions/'+ req.params.promoId);
})
.put((req, res, next) => {
    Promotions.findByIdAndUpdate(req.params.promoId, {$set: req.body}, {new: true})
        .then((dish) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    }, (err) => next(err)).catch((err) => next(err));
})
.delete((req, res, next) => {
    Promotions.findByIdAndRemove(req.params.promoId).then((resp)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err)=> next(err)).catch((err)=>next(err));
});

