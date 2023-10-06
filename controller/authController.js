import JWT from 'jsonwebtoken';

import UserModel from '../models/userModel.js';
import { handleHashPwd, comparePwd } from '../utils/passwordHelper.js';
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
    console.log(existingUser._id);
    return res.status(200).json({
      token,
      user: { name: existingUser.name, email: existingUser.email },
    });
    // return res.status(200).json({ token, ...existingUser._doc });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
