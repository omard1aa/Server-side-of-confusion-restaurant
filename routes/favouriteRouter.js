const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const favourites = require('../models/favourite');
const dishes = require('../models/dishes');
const favRouter = express.Router();
favRouter.use(bodyParser.json());

favRouter.route('/')

.get((req, res, next) =>{
    console.log('get operation')
    favourites.find({})
    .populate('uname')
    .then((favs) =>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(favs);
    }).catch((err)=>(next)=>(err));
})
.post((req, res, next) =>{
    favourites.create(req.body)
    .then((fav)=>{
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(fav);
    })
})
.delete((req, res, next) => {
    favourites.remove({})
    .then((resp)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp)
    }, (err) => next(err)).catch((err) => next(err))
});
/******************************************************************************************/
favRouter.route('/:favId')
.get((req,res,next) => {
    favourites.findById(req.params.favId)
        .populate('uname')
        .then((favs) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(favs);
        }, (err) => next(err))
        .catch((err) => next(err));
})
.post((req, res, next)=>{
    dishes.findById(req.params.favId)
    .then((favDish) => {
        if(favDish!=null) {
            favourites.push(favDish);
            favourites.save()
            .then((dish) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);
            },(err) => nexxt(err))
        }
        else {
            err = new Error('Dish not found !');
            res.statusCode = 404;
            return next(err);
        }
    },(err) => nexxt(err)).catch((err) => nexxt(err))
})
.delete((req, res, next) => {
    favourites.findByIdAndRemove(req.params.favId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err)).catch((err) => next(err));
})
module.exports = favRouter;
