const { default: UserModel } = require('../../models/userSchema.js')

const bcrypt = require("bcrypt");
const Joi = require("joi");

exports.getUsers = async (req, res) => {
    try {
        const result = await UserModel.find()
        res.send({
            status: "Sucess!",
            msg: "Users successfully loaded",
            result,
        })

    } catch (error) {
        res.send({
            status: "FAILED",
            msg: "failed for execution getUsers",
            error,
        })
    }
}

exports.regUser = async ( req, res ) => {
    try {
        const { fullname, email, password } = req.body
        const schema = Joi.object({
            fullname: Joi.string().min(3).required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(4).required(),
            verifiedStatus: false
        })

        const { error } = schema.validate(req.body);
  
        if (error)
            return res.status(400).send({
                message: error.details[0].message,
            });
    
        const checkData = await UserModel.findOne({ email }, "email").exec();
    
        if (checkData) {
            return res.status(400).send({
                status: "Failed",
                message: `Email ${email} already exsited`,
            });
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const user = await UserModel.create({
            fullname,
            email,
            verifiedStatus: false,
            password: hashedPassword,
        });            
        
        const result = await UserModel(user).save()

        res.send({
            status: "Sucess!",
            msg: "Users successfully registered",
            result,
        })

    } catch (error) {
        res.send({
            status: "FAILED",
            msg: "failed for execution regUser",
            error,
        })
    }
}

exports.updateUser = async ( req, res ) => {
    try {

        
    } catch (error) {
        res.send({
            status: "FAILED",
            msg: "failed for execution udpateUser",
            error,
        })        
    }
}