const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Code = new Schema({
  code_id: {
    type: String
  },
  code_name: {
    type: String
  },
  code_desc: {
    type: String
  }
},{
    collection: 'code'
});

module.exports = mongoose.model('Code', Code);