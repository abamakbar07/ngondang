const express = require("express")
// const { loginAuth, checkAuth } = require("../controllers/authControllers")
// const { test } = require("../controllers/testControllers")
const router = express.Router()

// const { addUser, loginUser } = require("../controllers/clientControllers")

const { getUsers, regUser } = require("../controllers/userController")

// router.post("/add-user", addUser)
// router.post("/login-user", loginUser)
// router.get("/check-auth", loginAuth, checkAuth)

router.get("/get-all-users", getUsers)
router.post("/register-user", regUser)


// router.post("/test", test)

router.get("/user", (req, res) => {
    res.send({
        "status": "success!",
        "message": "GET users"
    })
})

module.exports = router 