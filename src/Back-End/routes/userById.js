var User = require('../models/user.js');
var Place = require('../models/place.js');
var Review = require('../models/review.js');
const { useResolvedPath } = require('react-router-dom');

module.exports = function (router) {

    var userRoute = router.route('/users/:id');

    userRoute.get((req, res)=>{
        User.findById(req.params.id)
        .then((value)=>{
            if(value) {
                return res.status(200).send({
                    message: 'User Information Retreived',
                    data: value
                });
            }
            else {
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
    

    userRoute.put((req, res)=>{
        if(!("Fname" in req.body) || req.body.Fname == undefined) {
            return res.status(400).send({
                message: 'First name is Required',
                data: []
            });
        }
        if(!("Lname" in req.body) || req.body.Lname == undefined) {
            return res.status(400).send({
                message: 'Last is Required',
                data: []
            });
        }
        if(!("email" in req.body )|| req.body.email== undefined) {
            return res.status(400).send({
                message: 'Email is Required',
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
                message: 'adress must be a tuple of length two in a format [latitude, longitute]',
                data: []
            });
        }
        User.findById(req.params.id)
        .then((tbUpdated)=>{
            if(tbUpdated) {
                User.findOne({"email":req.body.email})
                .then((matchValue)=>{
                    if(matchValue && matchValue.id != tbUpdated.id) {
                        return res.status(403).send({
                            message: 'Email Already Exists',
                            data: []
                        });
                    } 
                    else {
                        const user = {};
                        user.Fname = req.body.Fname;
                        user.Lname = req.body.Lname;
                        user.email = req.body.email;
                        user.address = req.body.address;
                        if("uniqueVisits" in req.body && req.body.uniqueVisits != undefined) {
                            user.uniqueVisits = req.body.uniqueVisits;
                        }
                        else {
                            user.uniqueVisits = new Array(12).fill(0)
                        }
                        if(("lastClick" in req.body) && (req.body.lastClick != undefined)) user.lastClick = req.body.lastClick
                        var placeTbUpdated = [];
                        var reviewTbUpdated = [];
                        tbUpdated.placesVisited.forEach((tb)=>{
                            placeTbUpdated.push(Place.findById(tb).exec());
                        })
                        tbUpdated.reviews.forEach((r)=>{
                            reviewTbUpdated.push(Review.findById(r).exec());
                        })

                        Promise.all(placeTbUpdated)
                        .then((prevPlaces)=>{
                            prevPlaces.forEach((prevPlace)=>{
                                if(prevPlace){
                                    //var temp = prevPlace.usersVisited;
                                    //temp = temp.filter(item => item != tbUpdated.id);
                                    //prevPlace.usersVisited = temp;
                                    //prevPlace.save();
                                }
                            })
                            Promise.all(reviewTbUpdated)
                            .then((prevReview)=>{
                                prevReview.forEach((prevReview)=>{
                                    if(prevReview){
                                        prevReview.author = "N/A";
                                        prevReview.save();
                                    }
                                })
                            })
                            
                            if("placesVisited" in req.body && req.body.placesVisited!= undefined) {
                                if (typeof(req.body.placesVisited) == "string") {
                                    user.placesVisited = [];
                                    user.placesVisited.push(req.body.placesVisited);
                                } else {
                                    user.placesVisited = req.body.placesVisited;
                                }
                                var check = []
                                user.placesVisited.forEach((t)=> {
                                    check.push(Place.findById(t).exec());
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
                                            message: 'Place Does not Exist',
                                            data: []
                                        });
                                    }
                                    if("reviews" in req.body && req.body.reviews!= undefined) {
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
                                            User.findByIdAndUpdate(tbUpdated.id, user, {new: true})
                                            .then((data)=>{
                                                var places = [];
                                                data.placesVisited.forEach((id)=>{
                                                    places.push(Place.findById(id).exec());
                                                })
                
                                                var promiseArr = [];
                                                Promise.all(places)
                                                .then((promises)=>{
                                                    promises.forEach((place)=>{
                                                        if(place){
                                                            place.usersVisited.push(data.id)
                                                            place.save();
                                                            promiseArr.push(place);
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
                                                                    review.author = data.id;
                                                                    review.save();
                                                                }
                                                            })
                                                            Promise.all(promiseArr1)
                                                            .then(()=>{
                                                                return res.status(201).send({
                                                                    message: 'User Updated',
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
                                        user.reviews = [];
                                        User.findByIdAndUpdate(tbUpdated.id, user, {new: true})
                                        .then((data)=>{
                                            var places = [];
                                            data.placesVisited.forEach((id)=>{
                                                places.push(Place.findById(id).exec());
                                            })
            
                                            var promiseArr = [];
                                            Promise.all(places)
                                            .then((promises)=>{
                                                promises.forEach((place)=>{
                                                    if(place){
                                                        place.usersVisited.push(data.id)
                                                        place.save();
                                                        promiseArr.push(place);
                                                    }
                                                })
                                                Promise.all(promiseArr)
                                                .then(()=>{
                                                    return res.status(201).send({
                                                        message: 'User Updated',
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
                                        message: 'Users Can not Have Reviews if One Has not Visited Any Restaurants',
                                        data: []
                                    });
                                }
                                else{
                                    user.reviews = [];
                                    user.placesVisited = [];
                                    User.findByIdAndUpdate(tbUpdated.id, user, {new: true})
                                    .then((data)=>{
                                        return res.status(201).send({
                                            message: 'User Updated',
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

    userRoute.delete((req, res)=>{
        User.findById(req.params.id)
        .then((foundUser)=>{
            if(foundUser) {
                var places = [];
                var reviews = [];
                foundUser.placesVisited.forEach((placeDelete)=>{
                    places.push(Place.findById(placeDelete).exec());
                })
                foundUser.reviews.forEach((reviewDelete)=>{
                    reviews.push(Review.findById(reviewDelete).exec());
                })
                Promise.all(places)
                .then((placePromises)=>{
                    placePromises.forEach((placePromise)=>{
                        if(placePromise){
                            var temp = placePromise.usersVisited;
                            temp = temp.filter(item => item != foundUser.id);
                            placePromise.usersVisited = temp;
                            placePromise.save();
                        }
                    })
                    Promise.all(reviews)
                    .then((reviewPromises)=>{
                        reviewPromises.forEach((reviewPromise)=>{
                            if(reviewPromise){
                                reviewPromise.author = "N/A";
                                reviewPromise.save();
                            }
                        })
                        User.findByIdAndDelete(foundUser.id)
                        .then((deleted)=>{
                            return res.status(200).send({
                                message: 'User Deleted',
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

    return router;
}