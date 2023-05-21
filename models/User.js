import mongoose from "mongoose";

// Validation Package
import validator from "validator";

// bcrypt => password hash
import bcrypt from "bcrypt";

// JWT
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: "String",
      required: [true, "Please provide all the values"],
      minlength: 3,
      maxlength: 20,
      trim: true,
    },
    email: {
      type: "String",
      required: [true, "Please provide a email"],
      validate: {
        validator: validator.isEmail,
        message: "Please provide valid email",
      },
      unique: true,
    },
    password: {
      type: "String",
      required: [true, "Please enter a password"],
      minlength: 6,
      select: false,
    },
    profilePicture: {
      type: "String",
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  { timestamps: true }
);

// middleware, It will be called before saving any record and hash passwords
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// jwt token

userSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

// compare pasword
userSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};
export default mongoose.model("User", userSchema);
