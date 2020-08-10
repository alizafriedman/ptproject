const express = require("express");
const { asyncHandler } = require("../utils");
const router = express.Router();
const db = require("../db/models");

const { Pin, Board } = db;

router.get(
    "/",
    asyncHandler(async (req, res) => {
        const pins = await Pin.findAll({
            model: Pin,
            order: [["createdAt", "DESC"]],
            limit: 25,
            where: { boardId: null }
        });
        // console.log(pins)
        res.json({ pins });
    })
);


module.exports = router;