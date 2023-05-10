const express = require("express");
const router = express.Router();
const DataPoint = require("../models/datapoint");

// Get Datapoints
router.get("/:type", async (req, res) => {
  /**
   * It users the requset parameters sent by user to find relevant data points from db.
   */
  res.send(await DataPoint.find({ type: req.params.type }));
});

// Store datapoints
router.post("/", async (req, res) => {
  /**
   * It receives the new data point to be inserted in request body
   * 1: It is checked that if it already exists, then don't insert it
   * 2: If it does not exist already in db, then insert it
   */
  const datapoint = {
    lat: req.body.lat,
    long: req.body.long,
    type: req.body.type,
  };

  const filter = {
    lat: req.body.lat,
    long: req.body.long,
    type: req.body.type,
  };

  const resultUpdate = await DataPoint.findOneAndUpdate(filter, datapoint, {
    new: true,
    useFindAndModify: false,
  });
  console.log(resultUpdate);
  if (!resultUpdate) {
    // if data does not exist, create a new one
    const tempDataPoint = new DataPoint(datapoint);
    res.send(await tempDataPoint.save());
  } else {
    res.send(resultUpdate);
  }
});

module.exports = router;
