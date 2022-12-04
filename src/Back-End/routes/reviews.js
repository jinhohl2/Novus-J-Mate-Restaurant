var User = require('../models/user.js');
var Place = require('../models/place.js');
var Review = require('../models/review.js');
const { useResolvedPath } = require('react-router-dom');

module.exports = function (router) {

    var reviewsRoute = router.route('/reviews');

    reviewsRoute.get((req, res) => {
        var w = "";
        var so = ""
        var se = ""
        var sk = ""
        var li = ""
        if("where" in req.query && req.query.where != undefined) w = JSON.parse(req.query.where);
        if("sort" in req.query && req.query.sort != undefined) so = JSON.parse(req.query.sort);
        if("select" in req.query && req.query.select != undefined) se = JSON.parse(req.query.select);
        if("skip" in req.query && req.query.skip != undefined) sk = parseInt(req.query.skip);
        if("limit" in req.query && req.query.limit != undefined) li = parseInt(req.query.limit);
        
        Review.find()
        .where(w)
        .sort(so)
        .select(se)
        .skip(sk)
        .limit(li)
        .then((value)=> {
            if(req.query.count) {
                return res.status(200).send({
                    message: 'Number of Reviews',
                    data: value.length
                });
            } else {
                return res.status(200).send({
                    message: 'Reviews Retrieved',
                    data: value
                });
            }
        })
        .catch((err)=>{
            return res.status(500).send({
                message: 'Server Error',
                data: []
            });
        });
    });

    reviewsRoute.post((req,res) => {
        const review = new Review();
        if(!("rating" in req.body) || req.body.rating == undefined) {
            return res.status(400).send({
                message: 'Rating is Required to Create a New Review',
                data: []
            });
        }
        else if(req.body.rating < 0 || req.body.rating > 5) {
            return res.status(400).send({
                message: 'Rating must be a Number from 0 to 5',
                data: []
            });
        }
        if(!("author" in req.body) || req.body.author == undefined) {
            return res.status(400).send({
                message: 'Author is Required to Create a New Review',
                data: []
            });
        }
        if(!("restaurant" in req.body) || req.body.restaurant == undefined) {
            return res.status(400).send({
                message: 'Restaurant is Required to Create a New Review',
                data: []
            });
        }
        if(!("restaurantName" in req.body) || req.body.restaurantName == undefined) {
            return res.status(400).send({
                message: 'Restaurant Name is Required to Create a New Review',
                data: []
            });
        }
        if("description" in req.body && req.body.description != undefined) {
            review.description = req.body.description;
        }
        else{
            review.description = "";
        }

        review.rating = req.body.rating;
        User.findById(req.body.author)
        .then((foundUser)=>{
            if(!foundUser) {
                return res.status(404).send({
                    message: 'Author is not an Existing User',
                    data: []
                });
            }
            Place.findById(req.body.restaurant)
            .then((foundPlace)=>{
                if(!foundPlace) {
                    return res.status(404).send({
                        message: 'Restaurant Does not Exist',
                        data: []
                    });
                }
                
                if(req.body.restaurantName != foundPlace.name) {
                    return res.status(400).send({
                        message: 'restaurantName Does not Match the name of restaurant',
                        data: []
                    });
                }
                if(foundUser.placesVisited.indexOf(foundPlace.id) === -1) foundUser.placesVisited.push(foundPlace.id);
                if(foundPlace.usersVisited.indexOf(foundUser.id) === -1) foundPlace.usersVisited.push(foundUser.id);
                review.author = req.body.author;
                review.restaurant = req.body.restaurant;            
                review.restaurantName = req.body.restaurantName;
                review.save()
                .then((data)=> {
                    foundPlace.reviews.push(data.id);
                    foundUser.reviews.push(data.id)
                    foundUser.save()
                    .then(()=>{
                        foundPlace.save()
                        .then(()=>{
                            return res.status(201).send({
                                message: 'New Review Created',
                                data: data
                            }); 
                        })
                        .catch((err)=>{
                            return res.status(500).send({
                                message: 'Server Error',
                                data: []
                            });
                        })  
                    })
                    .catch((err)=>{
                        return res.status(500).send({
                            message: 'Server Error',
                            data: []
                        });
                    })
                    
                })
                .catch((err)=>{
                    return res.status(500).send({
                        message: 'Server Error',
                        data: []
                    });
                })
            })
            .catch((err)=>{
                return res.status(500).send({
                    message: 'Server Error',
                    data: []
                });
            })
        })
        .catch((err)=>{
            return res.status(500).send({
                message: 'Server Error',
                data: []
            });
        })
        
    });

    return router;
}