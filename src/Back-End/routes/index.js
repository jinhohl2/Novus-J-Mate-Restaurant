/*
 * Connect all of your endpoints together here.
 */
module.exports = function (app, router) {
    app.use('/api', require('./home.js')(router));
    app.use('api/users', require('./users.js')(router));
    app.use('api/places', require('./places.js')(router));
    app.use('api/reviews', require('./reviews.js')(router));
    app.use('api/users:id', require('./userById.js')(router));
    app.use('api/places:id', require('./placeById.js')(router));
    app.use('api/reviews:id', require('./reviewById.js')(router));
};
