const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema; // Import Schema from Mongoose
const config = require('../configs/constants');

const urlSchema = new Schema({
  originalUrl: {type: String, required: true},
  urlCode: {type: String, required: true},
  shortUrl: {type: String, required: true},
  redirects: {type: Number, required: true, default:0},
  createdAt: { type: Date, required: true, default: Date.now},
  updatedAt: { type: Date, required: true, default: Date.now}
});
// modelName, schemaName, collectionName
module.exports = mongoose.model("URL", urlSchema, config.urlCollection);
