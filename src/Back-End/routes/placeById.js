var User = require('../models/user.js');
var Place = require('../models/place.js');
var Review = require('../models/review.js');
const { useResolvedPath } = require('react-router-dom');

module.exports = function (router) {

    var placeRoute = router.route('/places/:id');

    placeRoute.get((req, res)=>{
        Place.findById(req.params.id)
        .then((value)=>{
            if(value) {
                return res.status(200).send({
                    message: 'Place Information Retreived',
                    data: value
                });
            }
            else {
                return res.status(404).send({
                    message: 'Place Not Found',
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

    placeRoute.put((req, res)=>{
        if(!("name" in req.body) || req.body.name == undefined) {
            return res.status(400).send({
                message: 'Name is Required',
                data: []
            });
        }
        if(!("address" in req.body )|| req.body.address== undefined) {
            return res.status(400).send({
                message: 'address is Required',
                data: []
            });
        }
        else if(req.body.address.length != 2) {
            return res.status(400).send({
                message: 'adress must be a tuple of length to in a format [latitude, longitute]',
                data: []
            });
        }

        Place.findById(req.params.id)
        .then((tbUpdated)=>{
            if(tbUpdated) {
                User.findOne({"name":req.body.name})
                .then((matchValue)=>{
                    if(matchValue && matchValue.id != tbUpdated.id) {
                        return res.status(403).send({
                            message: 'Name Already Exists',
                            data: []
                        });
                    } 
                    else {
                        const place = {};
                        place.name = req.body.name;
                        place.address = req.body.address;
                        if("dishes" in req.body && req.body.dishes != undefined) place.dishes = req.body.dishes;
                        if("cuisine" in req.body && req.body.cuisine != undefined) {
                            place.cuisine = req.body.cuisine;
                        }
                        else{
                            place.cuisine = "N/A";
                        }
                        var userTbUpdated = [];
                        var reviewTbUpdated = [];
                        tbUpdated.usersVisited.forEach((tb)=>{
                            userTbUpdated.push(User.findById(tb).exec());
                        })
                        tbUpdated.reviews.forEach((r)=>{
                            reviewTbUpdated.push(Review.findById(r).exec());
                        })

                        Promise.all(userTbUpdated)
                        .then((prevUsers)=>{
                            prevUsers.forEach((prevUser)=>{
                                if(prevUser){
                                    var temp = prevUser.placesVisited;
                                    temp = temp.filter(item => item != tbUpdated.id);
                                    prevUser.placesVisited = temp;
                                    prevUser.save();
                                }
                            })
                            Promise.all(reviewTbUpdated)
                            .then((prevReviews)=>{
                                prevReviews.forEach((prevReview)=>{
                                    if(prevReview){
                                        prevReview.author = "N/A";
                                        prevReview.restaurant = "N/A";
                                        prevReview.restaurantName = "N/A";
                                        prevReview.save();
                                    }
                                })
                            })
                            
                            if("usersVisited" in req.body && req.body.usersVisited!= undefined) {
                                place.usersVisited = req.body.usersVisited;
            
                                var check = []
                                place.usersVisited.forEach((t)=> {
                                    check.push(User.findById(t).exec());
                                })
                                Promise.all(check)
                                .then((c)=>{
                                    var exitFlag = false;
                                    c.forEach((t)=>{
                                        if(t == null) {
                                            exitFlag = true;
                                        }
                                    })
                                    if(exitFlag) {
                                        return res.status(404).send({
                                            message: 'User Does not Exist',
                                            data: []
                                        });
                                    }
                                    if("reviews" in req.body && req.body.reviews != undefined) {
                                        place.reviews = req.body.reviews;
            
                                        var reviewCheck = []
                                        place.reviews.forEach((r)=> {
                                            reviewCheck.push(Review.findById(r).exec());
                                        })
                                        Promise.all(reviewCheck)
                                        .then((c)=>{
                                            var exitFlag = false;
                                            c.forEach((t)=>{
                                                if(t == null) {
                                                    exitFlag = true;
                                                }
                                            })
                                            if(exitFlag) {
                                                return res.status(404).send({
                                                    message: 'Review Does not Exist',
                                                    data: []
                                                });
                                            }
                                            
                                            Place.findByIdAndUpdate(tbUpdated.id, place, {new: true})
                                            .then((data)=>{
                                                var users = [];
                                                data.usersVisited.forEach((id)=>{
                                                    users.push(User.findById(id).exec());
                                                })
                                                var promiseArr = [];
                                                Promise.all(users)
                                                .then((promises)=>{
                                                    promises.forEach((user)=>{
                                                        if(user){
                                                            user.placesVisited.push(data.id)
                                                            user.save();
                                                            promiseArr.push(user);
                                                        }
                                                    })
                                                    Promise.all(promiseArr)
                                                    .then(()=>{
                                                        var reviews = [];
                                                        data.reviews.forEach((id)=>{
                                                            reviews.push(Review.findById(id).exec());
                                                        })
                    
                                                        var promiseArr1 = [];
                                                        Promise.all(reviews)
                                                        .then((promises)=>{
                                                            promises.forEach((review)=>{
                                                                if(review){
                                                                    review.restaurant = data.id;
                                                                    review.restaurantName = data.name;
                                                                    review.save();
                                                                }
                                                            })
                                                            Promise.all(promiseArr1)
                                                            .then(()=>{
                                                                return res.status(201).send({
                                                                    message: 'Place Updated',
                                                                    data: data
                                                                });
                                                            })
                                                        })
                                                    })
                                                })
                                            })
                                            .catch((err)=>{
                                                return res.status(500).send({
                                                    message: 'Server Error',
                                                    data: []
                                                });
                                            })
                                        })
            
                                    }
                                    else {
                                        place.reviews = [];
                                        Place.findByIdAndUpdate(tbUpdated.id, user, {new: true})
                                        .then((data)=>{
                                            var users = [];
                                            data.usersVisited.forEach((id)=>{
                                                users.push(User.findById(id).exec());
                                            })
            
                                            var promiseArr = [];
                                            Promise.all(users)
                                            .then((promises)=>{
                                                promises.forEach((user)=>{
                                                    if(user){
                                                        user.placesVisited.push(data.id)
                                                        user.save();
                                                        promiseArr.push(user);
                                                    }
                                                })
                                                Promise.all(promiseArr)
                                                .then(()=>{
                                                    return res.status(201).send({
                                                        message: 'Place Updated',
                                                        data: data
                                                    });
                                                })
                                            })
                                        })
                                        .catch((err)=>{
                                            return res.status(500).send({
                                                message: 'Server Error',
                                                data: []
                                            });
                                        })
                                    }
                                })
                            }
                            else{
                                if("reviews" in req.body && req.body.reviews!= undefined) {
                                    /*
                                    user.reviews = req.body.reviews;
                                    var reviewcheck = []
                                        user.reviews.forEach((r)=> {
                                        check.push(Review.findById(r).exec());
                                    })
                                    Promise.all(reviewcheck)
                                    .then(()=>{
                                        var exitFlag = false;
                                        c.forEach((t)=>{
                                            if(t == null) {
                                                exitFlag = true;
                                            }
                                        })
                                        if(exitFlag) {
                                            return res.status(404).send({
                                                message: 'Review Does not Exist',
                                                data: []
                                            });
                                        }
                                        user.placesVisited = [];
                                        User.findByIdAndUpdate(tbUpdated.id, user, {new: true})
                                        .then((data)=>{
                                            var reviews = [];
                                            data.reviews.forEach((id)=>{
                                                reviews.push(Review.findById(id).exec());
                                            })
            
                                            var promiseArr = [];
                                            Promise.all(reviews)
                                            .then((promises)=>{
                                                promises.forEach((review)=>{
                                                    if(review){
                                                        review.author = data.id;
                                                        review.save();
                                                    }
                                                })
                                                Promise.all(promiseArr)
                                                .then(()=>{
                                                    return res.status(201).send({
                                                        message: 'New User Created',
                                                        data: data
                                                    });
                                                })
                                            })
                                        })
                                    })*/
                                    return res.status(404).send({
                                        message: ' Restaurant Can not Have Reviews If It has not Been Visited by Any Users',
                                        data: []
                                    });
                                }
                                else{
                                    place.reviews = [];
                                    place.usersVisited = [];
                                    Place.findByIdAndUpdate(tbUpdated.id, place, {new: true})
                                    .then((data)=>{
                                        return res.status(201).send({
                                            message: 'Place Updated',
                                            data: data
                                        });
                                    })
                                    .catch((err)=>{
                                        return res.status(500).send({
                                            message: 'Server Error',
                                            data: []
                                        });
                                    })
                                }
                            }
                        })
                    }
                })
                .catch((err)=>{
                    return res.status(500).send({
                        message: 'Server Error',
                        data: []
                    });
                })
            }
            else{
                return res.status(404).send({
                    message: 'User Not Found',
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

    placeRoute.delete((req, res)=>{
        Place.findById(req.params.id)
        .then((foundPlace)=>{
            if(foundPlace) {
                var users = [];
                var reviews = [];
                foundPlace.usersVisited.forEach((userDelete)=>{
                    users.push(User.findById(userDelete).exec());
                })
                foundPlace.reviews.forEach((reviewDelete)=>{
                    reviews.push(Review.findById(reviewDelete).exec());
                })
                Promise.all(users)
                .then((userPromises)=>{
                    userPromises.forEach((userPromise)=>{
                        if(userPromise){
                            var temp = userPromise.placesVisited;
                            temp = temp.filter(item => item != foundPlace.id);
                            userPromise.placesVisited = temp;
                            userPromise.save();
                        }
                    })
                    Promise.all(reviews)
                    .then((reviewPromises)=>{
                        reviewPromises.forEach((reviewPromise)=>{
                            if(reviewPromise){
                                reviewPromise.author = "N/A";
                                reviewPromise.restaurant = "N/A";
                                reviewPromise.restaurantName = "N/A";
                                reviewPromise.save();
                            }
                        })
                        Place.findByIdAndDelete(foundPlace.id)
                        .then((deleted)=>{
                            return res.status(200).send({
                                message: 'Place Deleted',
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
                })
            }
            else {
                return res.status(404).send({
                    message: 'Place Not Found',
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