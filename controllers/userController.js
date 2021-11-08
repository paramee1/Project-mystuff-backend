const { User } = require("../models");
const { hash, compare } = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
  try {
    const { username, email, password, confirmPassword, firstName, lastName, role } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "password and confirm password did not match" });
      // throw new  CustomError('password and confirm password did not match', 400)
    }

    const hashedPassword = await hash(password, 12);
    const result = await User.create({
      username,
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role,
    });
    res.status(200).json({ message: "user has created" });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(400).json({ message: "invalid username or password" });
    }

    // secretKey = "sdlfns89";
    const token = await jwt.sign(
      { id: user.id, email: user.email, username: user.username, role: user.role },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "30d",
      }
    );
    (await compare(password, user.password))
      ? res.json({ message: "login success", token })
      : res.status(400).json({ message: "invalid username or password" });
  } catch (err) {
    next(err);
  }
};
