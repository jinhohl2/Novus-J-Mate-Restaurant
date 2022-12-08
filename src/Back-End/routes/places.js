var User = require('../models/user.js');
var Place = require('../models/place.js');
var Review = require('../models/review.js');
const { useResolvedPath } = require('react-router-dom');

module.exports = function (router) {

    var placesRoute = router.route('/places');

    placesRoute.get((req, res) => {
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
        
        Place.find()
        .where(w)
        .sort(so)
        .select(se)
        .skip(sk)
        .limit(li)
        .then((value)=> {
            if(req.query.count) {
                return res.status(200).send({
                    message: 'Number of Places',
                    data: value.length
                });
            } else {
                return res.status(200).send({
                    message: 'Places Retrieved',
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

    placesRoute.post((req,res) => {
        const place = new Place();
        if(!("name" in req.body) || req.body.name == undefined) {
            return res.status(400).send({
                message: 'Name is Required to Create a New Place',
                data: []
            });
        }
        if(!("address" in req.body )|| req.body.address== undefined) {
            return res.status(400).send({
                message: 'address is Required to Create a New Place',
                data: []
            });
        }
        else if(req.body.address.length != 2) {
            return res.status(400).send({
                message: 'adress must be tuple of length to in a format [latitude, longitute]',
                data: []
            });
        }

        place.name = req.body.name;
        place.address = req.body.address;
        if("dishes" in req.body && req.body.dishes != undefined) place.dishes = req.body.dishes;
        if("cuisine" in req.body && req.body.cuisine != undefined) {
            place.cuisine = req.body.cuisine;
        }
        else{
            place.cuisine = "N/A";
        }

        Place.findOne({"name":req.body.name})
        .then((value)=>{
            if(value) {
                return res.status(403).send({
                    message: 'Name Already Exists',
                    data: []
                });
            } 
            else {
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
                        if("reviews" in req.body && req.body.reviews!= undefined) {
                            place.reviews = req.body.reviews;

                            var reviewcheck = []
                                place.reviews.forEach((r)=> {
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
                                place.save()
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
                                                        review.author = data.id;
                                                        review.save();
                                                    }
                                                })
                                                Promise.all(promiseArr1)
                                                .then(()=>{
                                                    return res.status(201).send({
                                                        message: 'New Place Created',
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
                            place.save()
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
                                            message: 'New Place Created',
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
                        return res.status(404).send({
                            message: 'Restaurant Can not Have Reviews If It has not Been Visited by Any Users',
                            data: []
                        });
                    }
                    else{
                        place.save()
                        .then((data)=>{
                            return res.status(201).send({
                                message: 'New Place Created',
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