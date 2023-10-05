import UserModel from '../models/userModel.js';
import { handleHashPwd, comparePwd } from '../utils/passwordHelper.js';
export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).send({ message: 'Each field is required.' });
    }
    // console.log(name, email, password, 111);
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: 'User has existed' });
    }

    const hashedPwd = await handleHashPwd(password);
    const user = await new UserModel({
      name,
      email,
      password: hashedPwd,
    }).save();

    return res.status(201).send({
      success: true,
      message: 'User Register Successfully.',
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: 'Error in registration',
      error,
    });
  }
};
