const jwt = require("jsonwebtoken");
const { default: ClientModel } = require("../../models/clientSchema");

exports.loginAuth = (req, res, next) => {
    let header, token;

    if (
        !(header = req.header("Authorization")) ||
        !(token = header.replace("Bearer ", ""))
      )

    return res.send({
      status: "failed",
      message: "Access Denied",
    });

    try {
        const secretKey = process.env.SECRETKEY;
        const verified = jwt.verify(token, secretKey);

        (req.jwt = verified),
        console.log("hasil req verified in auth", verified.email);

        next();

    } catch (error) {
        res.status(400).send({
            message: "Invalid Token",
        });
    }
};

exports.checkAuth = async (req, res) => {
    try {
      const email = req.jwt.email;
      console.log(email);
  
      const result = await ClientModel.findOne({ email }, "-_id -password").exec();
  
      res.send({
        status: "Success!",
        message: "User authenticated!",
        user: result,
      });
    } catch (error) {
      res.status(500).send({
        status: "Failed!",
        error,
      });
    }
  };