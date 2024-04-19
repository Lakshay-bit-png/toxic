const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
require("dotenv").config()


class UserService{
    static async registerUser(name, username, imgUrl){
        try {             
            const createUser = new UserModel({name, username,imgUrl});
            
            await createUser.save();

            return createUser;

        } catch (error) {
            return error
        }
    }

    
    static async checkUser(phone){
        try {
           // console.log(phone)
            return await UserModel.findOne({phone});
        } catch (error) {
            throw error;
        }
    }
    static async checkUsername(username){
        try {
          
            return await UserModel.findOne({username});
        } catch (error) {
            throw error;
        }
    }

    static async generateAccessToken(tokenData,JWTSecret_Key,JWT_EXPIRE){
        JWTSecret_Key = process.env.SECRET || JWTSecret_Key;
        return jwt.sign(tokenData, JWTSecret_Key, { expiresIn: JWT_EXPIRE });
    }
}


module.exports = UserService;