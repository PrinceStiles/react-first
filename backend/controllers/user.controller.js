import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;

    // Check for missing required fields and send specific error messages
    if (!fullname) {
      return res.status(400).json({
        message: "Full name is required.",
        success: false,
      });
    }
    if (!email) {
      return res.status(400).json({
        message: "Email is required.",
        success: false,
      });
    }
    if (!phoneNumber) {
      return res.status(400).json({
        message: "Phone number is required.",
        success: false,
      });
    }
    if (!password) {
      return res.status(400).json({
        message: "Password is required.",
        success: false,
      });
    }
    if (!role) {
      return res.status(400).json({
        message: "Role is required.",
        success: false,
      });
    }
    if (!req.file) {
      return res.status(400).json({
        message: "Profile photo is required.",
        success: false,
      });
    }

    // Process the uploaded file
    const file = req.file;
    const fileUri = getDataUri(file);

    // Cloudinary upload and failure check
    let cloudResponse;
    try {
      cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    } catch (cloudError) {
      return res.status(500).json({
        message: "Failed to upload profile photo to Cloudinary.",
        success: false,
        error: cloudError.message, // Include cloudinary error details
      });
    }

    // Check if the user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exists with this email.",
        success: false,
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: {
        profilePhoto: cloudResponse.secure_url,
      },
    });

    // Success response
    return res.status(201).json({
      message: "Account created successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "An error occurred during registration.",
      success: false,
      error: error.message, // Include the error message in the response
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required.",
        success: false,
      });
    }
    if (!password) {
      return res.status(400).json({
        message: "Password is required.",
        success: false,
      });
    }
    if (!role) {
      return res.status(400).json({
        message: "Role is required.",
        success: false,
      });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }
    // check role is correct or not
    if (role !== user.role) {
      return res.status(400).json({
        message: "Account doesn't exist with current role.",
        success: false,
      });
    }

    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        user,
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};
export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;

    const file = req.file;
    // const fileName = req.file?.filename;
    const fileUri = getDataUri(file);
    // Cloudinary upload and failure check
    let cloudResponse;
    try {
      cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    } catch (cloudError) {
      return res.status(500).json({
        message: "Failed to upload profile photo to Cloudinary.",
        success: false,
        error: cloudError.message, // Include cloudinary error details
      });
    }

    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",");
    }
    const userId = req.id; // middleware authentication
    let user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "User not found.",
        success: false,
      });
    }
    // updating data
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;

    // resume comes later here...
    if (cloudResponse) {
      user.profile.resume = cloudResponse.secure_url;
      user.profile.resumeOriginalName = file.originalname; // Save the original file name
    }

    await user.save();

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "Profile updated successfully.",
      user,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
