import JWT from 'jsonwebtoken';

import UserModel from '../models/userModel.js';
import { handleHashPwd, comparePwd } from '../utils/passwordHelper.js';
import userModel from '../models/userModel.js';
export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Each field is required.' });
    }
    // console.log(name, email, password, 111);
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User has existed' });
    }

    const hashedPwd = await handleHashPwd(password);
    const user = await new UserModel({
      name,
      email,
      password: hashedPwd,
    }).save();

    return res.status(201).json({
      message: 'User Register Successfully.',
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error.message,
    });
  }
};

export const signInController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Each field is required' });
    }

    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: 'User not found' });
    }
    const isMatch = await comparePwd(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect password ' });
    }

    const token = JWT.sign({ id: existingUser._id }, process.env.JWT_TOKEN);
    // console.log(existingUser._id);
    return res.status(200).json({
      token,
      ...existingUser._doc,
      // user: { name: existingUser.name, email: existingUser.email },
    });
    // return res.status(200).json({ token, ...existingUser._doc });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const tokenCheckController = async (req, res) => {
  try {
    const token = req.header('x-auth-token');
    // console.log(req.header('x-auth-token'), 345);
    if (!token) return res.json(false);
    const isVerified = JWT.verify(token, process.env.JWT_TOKEN);
    if (!isVerified) {
      return res.json(false);
    }
    // console.log(isVerified, 99999);
    const user = await UserModel.findById(isVerified.id);
    if (!user) return res.json(false);
    return res.json(true);
  } catch (error) {
    // console.log(error.message, 2323);

    return res.status(500).json({ error: error.message });
  }
};

export const getUserDataController = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId);
    console.log('123321');
    return res.json({ ...user._doc, token: req.token });
  } catch (error) {
    console.log(error.message, 333);

    return res.status(500).json({ error: error.message });
  }
};
