const mongoose = require("mongoose");

/**
 * This is model for datapoint documents in mongodb
 */

const dataPointSchema = new mongoose.Schema({
  lat: {
    type: Number,
    required: true,
  },
  long: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

const DataPoint = mongoose.model("DataPoint", dataPointSchema);

module.exports = DataPoint;
