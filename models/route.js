var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RouteSchema = new mongoose.Schema({
    route_id: { type: Number },
    route_short_name: { type: String },
    route_desc: { type: String },
    // not sure if this is how to link to stop??
    stops: [{ type: Number, ref: 'Stop' }]
});

module.exports = mongoose.model('Route', RouteSchema);
