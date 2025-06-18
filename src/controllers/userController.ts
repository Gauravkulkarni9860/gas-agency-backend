import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User, CylinderCategoryData, CylinderTypeData } from "../models";
import { cylinderCategoryList, cylinderTypeList } from "../constants";

// @desc Register user
// @route POST /api/users/register
// @access public
const registerUser = asyncHandler(async (req, res) => {
  const { full_name, email, password, user_type } = req.body;

  if (!full_name || !email || !password || !user_type) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const userAvailable = await User.findOne({ email });

  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered!");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const body = {
    full_name,
    email,
    password: hashedPassword,
    user_type,
  };
  const user = await User.create(body);

  if (user) {
    const categoryList = cylinderCategoryList.map((item) => {
      return {
        ...item,
        user_id: user._id,
      };
    });

    const insertedCategoryList = await CylinderCategoryData.insertMany(
      categoryList
    );

    const typesList = cylinderTypeList.map((item) => {
      const category = insertedCategoryList.find(
        (ele) => ele.name === item.category
      );
      return {
        ...item,
        category_id: category?._id ?? "",
      };
    });

    await CylinderTypeData.insertMany(typesList);

    res.status(201).json({
      user_id: user.id,
      email: user.email,
      user_type: user.user_type,
      message: "Account created successfully!",
    });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
});

// @desc Login user
// @route POST /api/users/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }

  const user = await User.findOne({ email });
  if (!user || !bcrypt.compareSync(password, user.password)) {
    res.status(401);
    throw new Error("Invalid credentials");
  }

  const data = {
    id: user.id,
    full_name: user.full_name,
    email: user.email,
    user_type: user.user_type,
  };

  const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECERT ?? "", {
    expiresIn: "15m",
  });

  res.status(200).json({
    message: "Logged in successfully!",
    user: {
      user_id: user.id,
      full_name: user.full_name,
      email: user.email,
      user_type: user.user_type,
    },
    accessToken,
  });
});

// @desc Get user
// @route GET /api/users/user/:id
// @access private
const getUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  if (!userId) {
    res.status(400);
    throw new Error("User id not found in request.");
  }

  const user = await User.findOne({ _id: userId });
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const data = {
    user_id: user.id,
    full_name: user.full_name,
    email: user.email,
    user_type: user.user_type,
  };
  res.status(200).json({ user: data });
});

export { registerUser, loginUser, getUser };
