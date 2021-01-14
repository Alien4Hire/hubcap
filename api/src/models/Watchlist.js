/** @format */

//survey model can be deleted, reference for table creation
const mongoose = require('mongoose');
const { Schema } = mongoose;


const watchlistSchema = new Schema({
  title: Schema.Types.Mixed,
  body: [String],
  types: [String],
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('watchlist', watchlistSchema);
