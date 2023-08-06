const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const tempUser = {
      name,
      email,
      password: hashedPassword,
    };

    const user = await User.create({ ...tempUser });
    res.status(StatusCodes.CREATED).json({ user });
  } catch (error) {
    console.error("Error in register:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "An error occurred during registration.", error });
  }
};

const login = async (req, res) => {
  res.send("login user");
};

module.exports = {
  register,
  login,
};
