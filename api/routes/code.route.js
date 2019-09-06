const express = require('express');
const app = express();
const codeRoutes = express.Router();

// Require Code model in our routes module
let Code = require('../models/code');

// Defined store route
codeRoutes.route('/add').post(function (req, res) {
  let code = new Code(req.body);
  code.save()
    .then(code => {
      res.status(200).json({'code': 'code in added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
codeRoutes.route('/').post(function (req, res) {
    Code.find(({userid: req.body.userid}), function (err, code){
    if(err){
      console.log(err);
    }
    else {
      res.json(code);
    }
  });
});

// Defined edit route
codeRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Code.findById(id, function (err, code){
      res.json(code);
  });
});

//  Defined update route
codeRoutes.route('/update/:id').post(function (req, res) {
    Code.findById(req.params.id, function(err, code) {
    if (!code)
      return new Error('Could not load Document');
    else {
      code.code_id = req.body.code_id;
      code.code_name = req.body.code_name;
      code.code_desc = req.body.code_desc;

      code.save().then(code => {
        res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
codeRoutes.route('/delete/:id').get(function (req, res) {
    Code.findByIdAndRemove({_id: req.params.id}, function(err, code){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = codeRoutes;
