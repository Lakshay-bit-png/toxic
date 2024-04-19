const UserServices = require("../service/user.service");
const UserModel = require("../models/user.model");
require("dotenv").config();

exports.register = async (req, res, next) => {
  try {
    const { name, username, imgUrl } = req.body;
    
    const duplicate = username!=null ? await UserServices.checkUsername(username): ""
    console.log(duplicate);
    if (duplicate!=null) {
      // throw new Error(`UserName ${email}, Already Registered`)
      return res.status(400).json({
        status: false,
        message: `UserName ${username}, Already Registered`
      });
    }

    const successRes = await UserServices.registerUser(
      name,
      username,
      imgUrl,
     
    );

    let tokenData;
    tokenData = { _id: successRes._id, username: successRes.username };

    const token = await UserServices.generateAccessToken(
      tokenData,
      process.env.SECRET,
      process.env.EXP
    );
    return res
      .cookie("token", token, { sameSite: "none", secure: true })
      .status(200).json({
        status: true,
        data: successRes,
        message: "user registered",
        token: token,
      });
  } catch (error) {
    //console.log(error);
    return res.status(400).json({ status: false, data: [], message: "error: " + error });
  }
};
