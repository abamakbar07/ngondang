const express = require("express")
// const { loginAuth } = require("../controllers/authControllers")
// const { test } = require("../controllers/testControllers")
const router = express.Router()

const { addUser, loginUser } = require("../controllers/clientControllers")

router.post("/add-user", addUser)
router.post("/login-user", loginUser)
// router.get("/check-auth", loginAuth, checkAuth)

// router.post("/test", test)

router.get("/user", (req, res) => {
    res.send({
        "status": "success!",
        "message": "GET users"
    })
})

module.exports = router 