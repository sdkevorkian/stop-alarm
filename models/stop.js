var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StopSchema = new Schema({
    stop_id: { type: Number },
    stop_name: { type: String },
    stop_lat: { type: Number },
<<<<<<< HEAD
    stop_lon: { type: Number },
    routes: [{ type: Number, ref: "Route" }]
=======
    stop_lon: { type: Number }
>>>>>>> 0761a09d5b26c49f929e788357acdb2d0d9be9e7
});

module.exports = mongoose.model('Stop', StopSchema);
