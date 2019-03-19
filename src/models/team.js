const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// team schema definition
const TeamSchema = new Schema(
  {
    name: { type: String, required: true },
    country: { type: String, required: true },
    foundationDate: { type: Date, default: Date.now },
    venueStadium: { type: String },
    venueCapacity: { type: Number }
  },
  {
    versionKey: false
  }
);

// Sets the foundationDate parameter equal to the current time
TeamSchema.pre('save', next => {
  now = new Date();
  if (!this.foundationDate) {
    this.foundationDate = now;
  }
  next();
});

// Exports the TeamSchema for use elsewhere
module.exports = mongoose.model('team', TeamSchema);
