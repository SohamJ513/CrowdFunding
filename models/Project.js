const mongoose = require('mongoose');
const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  goalAmount: { type: Number, required: true },
  raisedAmount: { type: Number, default: 0 },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});
module.exports = mongoose.model('Project', ProjectSchema);

