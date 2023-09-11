const { sign } = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Joi = require("joi");

const { default: Client } = require("../../models/clientSchema");
// "fullname"  : String,
// "nickname"  : String,
// "email"     : String,
// "password"  : String,
// "phone"     : Number

exports.addUser = async (req, res) => {
    try {
      const { fullname, email, password } = req.body;
      const schema = Joi.object({
        fullname: Joi.string().min(3).required(),
        email: Joi.string().email().min(6).required(),
        password: Joi.string().min(4).required(),
        verifiedStatus: false,
      });
      const { error } = schema.validate(req.body);
  
      if (error)
        return res.status(400).send({
          message: error.details[0].message,
        });
  
      const checkData = await Client.findOne({ email }, "email").exec();
  
      if (checkData) {
        return res.status(400).send({
          status: "Failed",
          message: `Email already exsited`,
        });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const user = await Client.create({
        fullname,
        email,
        verifiedStatus: false,
        verifiedToken: fullname + 1,
        password: hashedPassword,
      });
  
      const result = await Client(user).save();
  
      res.send({
        status: "Success!",
        message: "User successfully registered!",
        result: result,
      });

    } catch (error) {
      res.send({
        status: "Failed",
        error: error,
      });
    }
  };
