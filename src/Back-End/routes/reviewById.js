var User = require('../models/user.js');
var Place = require('../models/place.js');
var Review = require('../models/review.js');
const { useResolvedPath } = require('react-router-dom');
const user = require('../models/user.js');
const place = require('../models/place.js');

module.exports = function (router) {

    var reviewRoute = router.route('/reviews/:id');

    reviewRoute.get((req, res)=>{
        Review.findById(req.params.id)
        .then((value)=>{
            if(value) {
                return res.status(200).send({
                    message: 'Review Information Retreived',
                    data: value
                });
            }
            else {
                return res.status(404).send({
                    message: 'Review Not Found',
                    data: []
                });
            }
        })
        .catch((err)=>{
            return res.status(500).send({
                message: 'Server Error',
                data: []
            });
        })
    })

    
    reviewRoute.put((req, res)=>{
        if(!("rating" in req.body) || req.body.rating == undefined) {
            return res.status(400).send({
                message: 'Rating is Required',
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
                message: 'Author is Required',
                data: []
            });
        }
        if(!("restaurant" in req.body) || req.body.restaurant == undefined) {
            return res.status(400).send({
                message: 'Restaurant is Required',
                data: []
            });
        }
        if(!("restaurantName" in req.body) || req.body.restaurantName == undefined) {
            return res.status(400).send({
                message: 'Restaurant Name is Required',
                data: []
            });
        }
        
        Review.findById(req.params.id)
        .then((tbUpdated)=>{
            if(tbUpdated) {
                User.findById(tbUpdated.author)
                .then((foundUser)=>{
                    Place.findById(tbUpdated.restaurant)
                    .then((foundPlace)=>{
                        var temp1 = foundUser.reviews;
                        temp1 = temp1.filter(item => item != tbUpdated.id);
                        foundUser.reviews = temp1;

                        var temp2 = foundPlace.reviews;
                        temp2 = temp2.filter(item => item != tbUpdated.id);
                        foundPlace.reviews = temp2;

                        var temp3 = foundUser.placesVisited;
                        temp3 = temp3.filter(item => item != foundPlace.id);
                        foundUser.placesVisited = temp3;

                        var temp4 = foundPlace.usersVisited;
                        temp4 = temp4.filter(item => item != foundUser.id);
                        foundPlace.usersVisited = temp4;

                        foundPlace.save();
                        foundUser.save();

                        const review = {};
                        review.author = req.body.author;
                        review.restaurant = req.body.restaurant;
                        review.restaurantName = req.body.restaurantName;
                        review.rating = req.body.rating;

                        if("description" in req.body && req.body.description != undefined) {
                            review.description = req.body.description;
                        }
                        else{
                            review.description = "";
                        }

                        user.findById(review.author)
                        .then((newUser)=>{
                            if(!newUser) {
                                return res.status(404).send({
                                    message: 'Author is not an Existing User',
                                    data: []
                                });
                            }
                            place.findById(review.restaurant)
                            .then((newPlace)=>{
                                if(!newPlace) {
                                    return res.status(404).send({
                                        message: 'Restaurant Does not Exist',
                                        data: []
                                    });
                                }
                                if(review.restaurantName != newPlace.name) {
                                    return res.status(400).send({
                                        message: 'restaurantName Does not Match the name of restaurant',
                                        data: []
                                    });
                                }
                                console.log(review);
                                Review.findByIdAndUpdate(tbUpdated.id, review, {new:true})
                                .then((data)=> {
                                    console.log(data);
                                    newPlace.reviews.push(data.id);
                                    newUser.reviews.push(data.id)
                                    newUser.save()
                                    .then(()=>{
                                        newPlace.save()
                                        .then(()=>{
                                            return res.status(201).send({
                                                message: 'Review Updated',
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
                                        console.log("here1");
                                        return res.status(500).send({
                                            message: 'Server Error',
                                            data: []
                                        });
                                    })
                                    //console.log(data.assignedUser)
                                })
                                .catch((err)=>{
                                    return res.status(500).send({
                                        message: 'Server Error',
                                        data: []
                                    });
                                })
                            })
                            .catch((err)=>{
                                console.log("here2");
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
            }
            else {
                return res.status(404).send({
                    message: 'Review Not Found',
                    data: []
                });
            }
        })
        .catch((err)=>{
            return res.status(500).send({
                message: 'Server Error',
                data: []
            });
        })
        
    })

    reviewRoute.delete((req, res)=>{
        Review.findById(req.params.id)
        .then((foundReview)=>{
            if(foundReview) {

                User.findById(foundReview.author)
                .then((foundUser)=>{
                    Place.findById(foundReview.restaurant)
                    .then((foundPlace)=>{
                        var temp1 = foundUser.reviews;
                        temp1 = temp1.filter(item => item != foundReview.id);
                        foundUser.reviews = temp1;

                        var temp2 = foundPlace.reviews;
                        temp2 = temp2.filter(item => item != foundReview.id);
                        foundPlace.reviews = temp2;

                        var temp3 = foundUser.placesVisited;
                        temp3 = temp3.filter(item => item != foundPlace.id);
                        foundUser.placesVisited = temp3;

                        var temp4 = foundPlace.usersVisited;
                        temp4 = temp4.filter(item => item != foundUser.id);
                        foundPlace.usersVisited = temp4;

                        foundPlace.save();
                        foundUser.save();

                        Review.findByIdAndDelete(foundReview.id)
                        .then((deleted)=>{
                            return res.status(200).send({
                                message: 'Review Deleted',
                                data: deleted
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
            }
            else {
                return res.status(404).send({
                    message: 'Review Not Found',
                    data: []
                });
            }
        })
        .catch((err)=>{
            return res.status(500).send({
                message: 'Server Error',
                data: []
            });
        })
    })

    return router;
}