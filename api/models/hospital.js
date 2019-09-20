const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Hospital = new Schema({
  userid: {
    type: String
  },
  hospital_id: {
    type: String
  },
  hospital_name: {
    type: String
  },
  hospital_addr: {
    type: String
  },
  hospital_desc: {
    type: String
  }
},{
  collection: 'hospital'
});

module.exports = mongoose.model('Hospital', Hospital);
