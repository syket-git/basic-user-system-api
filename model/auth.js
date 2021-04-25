const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      maxLength: 30,
      minLength: 3,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('user', userSchema);
