import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
const register = async (req, res) => {
  const { name, email, password, profilePicture } = req.body;

  if (!name || !email || !password) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide all the values" });
  }
  const UserAlreadyExists = await User.findOne({ email });

  if (UserAlreadyExists) {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: "Email already in use" });
  }

  const user = await User.create({ name, email, password, profilePicture });
  res.status(StatusCodes.CREATED).json({
    user: {
      name: user.name,
      email: user.name,
      profilePicture: user.profilePicture,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide all values" });
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Invalid Credentials" });
  }
  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Invalid Credentials" });
  }

  const token = user.createJWT();
  user.password = undefined;
  res.status(StatusCodes.OK).json({ user, token });
};

const allUsers = async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const matchedUsers = await User.find(keyword).find({
    _id: { $ne: req.user._id },
  });
  res.status(StatusCodes.OK).json({ users: matchedUsers });
};
export { register, login, allUsers };
