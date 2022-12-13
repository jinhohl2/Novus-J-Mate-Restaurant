var User = require('../models/user.js');
var Place = require('../models/place.js');
var Review = require('../models/review.js');
const { useResolvedPath } = require('react-router-dom');

module.exports = function (router) {

    var usersRoute = router.route('/users');

    usersRoute.get((req, res) =>{
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
        
        User.find()
        .where(w)
        .sort(so)
        .select(se)
        .skip(sk)
        .limit(li)
        .then((value)=> {
            //console.log(filters)
            if(req.query.count) {
                return res.status(200).send({
                    message: 'Number of Users',
                    data: value.length
                });
            } else {
                return res.status(200).send({
                    message: 'Users Retrieved',
                    data: value
                });
            }
        })
        .catch((err)=>{
            return res.status(500).send({
                message: 'Server Error',
                data: {}
            });
        });
        
    });

    usersRoute.post((req, res) => {
        const user = new User();
        if(!("Fname" in req.body) || req.body.Fname == undefined) {
            return res.status(400).send({
                message: 'First name is Required to Create a New User',
                data: []
            });
        }
        if(!("Lname" in req.body) || req.body.Lname == undefined) {
            return res.status(400).send({
                message: 'Last is Required to Create a New User',
                data: []
            });
        }
        if(!("email" in req.body )|| req.body.email== undefined) {
            return res.status(400).send({
                message: 'Email is Required to Create a New User',
                data: []
            });
        }
        if(!("address" in req.body )|| req.body.address== undefined) {
            return res.status(400).send({
                message: 'address is Required to Create a New User',
                data: []
            });
        }
        else if(req.body.address.length != 2) {
            return res.status(400).send({
                message: 'adress must be tuple of length two in a format [latitude, longitute]',
                data: []
            });
        }
        
        User.findOne({"email":req.body.email})
        .then((value)=>{
            if(value) {
                return res.status(403).send({
                    message: 'Email Already Exists',
                    data: []
                });
            } 
            else {
                user.Fname = req.body.Fname;
                user.Lname = req.body.Lname;
                user.email = req.body.email;
                user.address = req.body.address;
                if("uniqueVisits" in req.body && req.body.uniqueVisits != undefined) {
                    user.uniqueVisits = req.body.uniqueVisits;
                }
                else {
                    user.uniqueVisits = new Array(12).fill(0);
                }
                if(("lastClick" in req.body) && (req.body.lastClick != undefined)) user.lastClick = req.body.lastClick
                console.log(user);
                if("placesVisited" in req.body && req.body.placesVisited!= undefined) {
                    user.placesVisited = req.body.placesVisited;

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
                                user.save()
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
                                                        message: 'New User Created',
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
                            user.save()
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
                                            message: 'New User Created',
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
                            user.save()
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
                            message: 'Users can not Have Reviews if One has not Visited Any Restaurants',
                            data: []
                        });
                    }
                    else{
                        user.save()
                        .then((data)=>{
                            return res.status(201).send({
                                message: 'New User Created',
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
            }
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
