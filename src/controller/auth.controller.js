const userModel = require("../model/user.model");
const JWTService = require("../CommonLib/JWTtoken");
const encryptDecrypt = require("../CommonLib/encryption-decryption");
const tokenModel = require("../model/token");
const constantObj = require("../CommonLib/constant");

async function signIn(req, res, next) {
  //Validate email and password
  const userDetail = await userModel.findOne({ email: req.body.email });
  const isValidPassword = encryptDecrypt.decryptPassword(
    req.body.password,
    userDetail.password
  );

  if (isValidPassword) {
    let userData = {
      email: req.body.email,
      name: userDetail.name,
    };

    //Generate JWT token and send back to frontend
    let JWTtoken = JWTService.generateToken(userData);
    //Insert token in DB
    await tokenModel.insertMany([{ userId: userDetail._id, token: JWTtoken }]);

    res.json({
      status: "success",
      token: JWTtoken,
      userDetail,
    });
  } else {
    res.json({ message: "password is not valid" });
  }
}

async function signUp(req, res, next) {
  let userDetail = req.body;
  const encryptPassword = encryptDecrypt.encryptPassword(userDetail.password);
  userDetail.password = encryptPassword;

  const response = await userModel.insertMany([userDetail]);

  //Generate JWT token and send back to frontend
  let JWTtoken = JWTService.generateToken(userDetail);
  //Insert token in DB
  await tokenModel.insertMany([{ userId: response[0]._id, token: JWTtoken }]);

  res.json({
    status: "success",
    token: JWTtoken,
    userDetail: response[0],
  });
}

async function signOut(req, res, next) {
  //remove token from DB
  const token = req.body.token;
  await tokenModel.deleteOne({ token });
  res
    .status(200)
    .json({ status: "Success", message: "Token deleted successfully" });
}

module.exports = {
  signIn,
  signOut,
  signUp,
};
