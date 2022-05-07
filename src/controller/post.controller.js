const postModel = require("../model/post");
const JWTService = require("../CommonLib/JWTtoken");
const encryptDecrypt = require("../CommonLib/encryption-decryption");

const constantObj = require("../CommonLib/constant");

async function create(req, res, next) {
  try {
    const postData = await postModel.create(req.body);
    res.status(200).json({
      status: "success",
      postData,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error,
    });
  }
}

async function updatepost(req, res, next) {
  try {
    const postId = req.params.id;

    const postData = await postModel.findByIdAndUpdate(postId, req.body);
    res.status(200).json({
      status: "success",
      postData,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error,
    });
  }
}

async function deletepost(req, res, next) {
  try {
    const postId = req.params.id;
    await postModel.findByIdAndDelete(postId);
    res.status(200).json({
      status: "delete success",
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error,
    });
  }
}

module.exports = {
  create,
  updatepost,
  deletepost,
};
