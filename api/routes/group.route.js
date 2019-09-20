const express = require('express');
const app = express();
const groupRoutes = express.Router();

// Require Code model in our routes module
let Group = require('../models/group');

// Defined store route
groupRoutes.route('/add').post(function (req, res) {
  let group = new Group(req.body);
  group.save()
    .then(group => {
      res.status(200).json({'code': 'group in added successfully'});
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
groupRoutes.route('/').post(function (req, res) {
  // Group.find(({userid: req.body.userid}), function (err, group){
  //   if(err){
  //     console.log(err);
  //   }
  //   else {
  //     res.json(group);
  //   }
  // });

  Group.find({userid: req.body.userid}).populate({path:'code_list', select: ['code_id', 'code_name']}).exec((err, data) => {
    res.json(data);
  });
});

// Defined edit route
groupRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Group.findById(id).populate({path:'code_list', select: ['code_id', 'code_name', '_id']}).exec( (err, group) => {
    res.json(group);
  });
});

//  Defined update route
groupRoutes.route('/update/:id').post(function (req, res) {
  Group.findById(req.params.id, function(err, group) {
    if (!group)
      return new Error('Could not load Document');
    else {
      group.group_id = req.body.group_id;
      group.group_name = req.body.group_name;
      group.code_list = req.body.code_list;

      group.save().then(group => {
        res.json('Update complete');
      })
        .catch(err => {
          res.status(400).send("unable to update the database");
        });
    }
  });
});

// Defined delete | remove | destroy route
groupRoutes.route('/delete/:id').get(function (req, res) {
  Group.findByIdAndRemove({_id: req.params.id}, function(err, group){
    if(err) res.json(err);
    else res.json('Successfully removed');
  });
});

module.exports = groupRoutes;
