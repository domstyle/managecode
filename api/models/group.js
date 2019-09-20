const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Group = new Schema({
  userid: {
    type: String
  },
  group_id: {
    type: String
  },
  group_name: {
    type: String
  },
  code_list: [{ type: Schema.Types.ObjectId, ref: 'Code' }]
},{
  collection: 'group'
});

module.exports = mongoose.model('Group', Group);
