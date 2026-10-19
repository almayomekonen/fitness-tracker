const express = require("express");
const { googleAuth, register, me, login } = require("../controllers/users");
const { guard } = require("../middleware/guard");

const router = express.Router();

router.post("/google", googleAuth);
router.post("/register", register);
router.post("/login", login);
router.get("/me", guard, me);

module.exports = router;
