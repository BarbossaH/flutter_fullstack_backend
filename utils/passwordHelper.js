import bcrypt from 'bcrypt';

export const handleHashPwd = async (pwd) => {
  try {
    const hashedPwd = await bcrypt.hash(pwd, 10);
    return hashedPwd;
  } catch (error) {
    console.log(error);
  }
};

export const comparePwd = async (pwd, hashedPwd) => {
  return bcrypt.compare(pwd, hashedPwd);
};
