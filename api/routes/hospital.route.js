const express = require('express');
const app = express();
const hospitalRoutes = express.Router();

// Require Hospital model in our routes module
let Hospital = require('../models/hospital');

// Defined store route
hospitalRoutes.route('/add').post(function (req, res) {
  let hospital = new Hospital(req.body);
  hospital.save()
    .then(hospital => {
      res.status(200).json({'hospital': 'hospital in added successfully'});
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
hospitalRoutes.route('/').post(function (req, res) {
  Hospital.find(({userid: req.body.userid}), function (err, hospital){
    if(err){
      console.log(err);
    }
    else {
      res.json(hospital);
    }
  });
});

// Defined edit route
hospitalRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Hospital.findById(id, function (err, hospital){
    res.json(hospital);
  });
});

//  Defined update route
hospitalRoutes.route('/update/:id').post(function (req, res) {
  Hospital.findById(req.params.id, function(err, hospital) {
    if (!hospital)
      return new Error('Could not load Document');
    else {
      hospital.hospital_id = req.body.hospital_id;
      hospital.hospital_name = req.body.hospital_name;
      hospital.hospital_addr = req.body.hospital_addr;
      hospital.hospital_desc = req.body.hospital_desc;

      hospital.save().then(hospital => {
        res.json('Update complete');
      })
        .catch(err => {
          res.status(400).send("unable to update the database");
        });
    }
  });
});

// Defined delete | remove | destroy route
hospitalRoutes.route('/delete/:id').get(function (req, res) {
  Hospital.findByIdAndRemove({_id: req.params.id}, function(err, hospital){
    if(err) res.json(err);
    else res.json('Successfully removed');
  });
});

module.exports = hospitalRoutes;
