//Model
const UserSchema = require('../model/auth');
//Validation
const { signupValidation, signinValidation } = require('../validations/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//Create new user
exports.createUser = async (req, res) => {
  try {
    // Date Validation
    const result = signupValidation(req.body);
    if (result.error)
      return res.status(404).json(result?.error?.details[0]?.message);

    //Check Email
    const oldUser = await UserSchema.findOne({ email: req.body.email });
    if (oldUser)
      return res
        .status(400)
        .send({ success: false, message: 'You already signed up!' });

    // password hashing
    const salt = bcrypt.genSaltSync(10);
    const password = await bcrypt.hashSync(req.body.password, salt);

    //Create a user object for save database
    const userObject = {
      name: req.body.name,
      email: req.body.email,
      password,
    };

    //Save user in the database
    const user = UserSchema(userObject);
    const savedUser = await user.save();
    if (savedUser) {
      res.status(201).json({
        success: true,
        message: 'Signed up successfully.',
      });
    } else {
      res.status(409).json({
        success: false,
        message: 'Signup error !',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error Occurred.',
    });
  }
};

// Signin user
exports.signinUser = async (req, res) => {
  try {
    const result = signinValidation(req.body);
    if (result.error)
      return res.status(404).send(result?.error?.details[0]?.message);

    const { email, password } = req.body;
    const hasUser = await UserSchema.findOne({ email });
    if (!hasUser)
      return res
        .status(404)
        .json({ success: false, message: 'Something went wrong' });

    const matchPassword = await bcrypt.compareSync(password, hasUser.password);
    if (!matchPassword)
      return res
        .status(404)
        .json({ success: false, message: 'Something went wrong' });

    const token = jwt.sign({ id: hasUser._id }, process.env.SECRET_CODE);

    const userObject = {
      name: hasUser.name,
      email: hasUser.email,
      token,
    };

    res.status(200).json({ success: true, user: userObject });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: 'Internal Server Error Occurred' });
  }
};
