const express = require("express");
const { check } = require("express-validator");
const { handleValidationErrors, asyncHandler } = require("../utils");
const { requireAuth } = require("../auth");
const router = express.Router();
const db = require("../db/models");

const {  Pin, Board } = db;

//gets all pins - what to do w this

router.get(
  "/all",
    // requireAuth,
  asyncHandler(async (req, res) => {
    const pins = await Pin.findAll({
      model: Pin,
      order: [["createdAt", "DESC"]],
      limit: 20,
      where: {boardId: null}
    });
    res.json({ pins });
  })
);

const pinNotFoundError = (id) => {
    const err = Error("Pin not found");
    err.errors = [`Pin with id of ${id} could not be found.`];
    err.title = "Pin not found.";
    err.status = 404;
    return err;
};


//gets a pin by a specific id number
router.get(
  "/:id",
  // requireAuth,
  asyncHandler(async (req, res, next) => {
    const pin = await Pin.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (pin) {
      res.json({ pin });
    }
    else {
      next(pinNotFoundError(req.params.id));
    }
  })
);

//creates a new pin
router.post(
  "/new",
  // requireAuth,
  asyncHandler(async (req, res) => {
    const { category, imgUrl, pinName, description, boardId } = req.body;
    const pin = await Pin.create({ category, imgUrl, pinName, description, boardId: req.board.id });
    res.status(201).json({ pin });
  })
);

//updates a pin
router.post(
  "/:id",
  // requireAuth,
  asyncHandler(async (req, res, next) => {
    const pin = await Pin.findOne({
      where: {
        id: req.params.id,
      },
    });
    // if (req.user.id !== pin.userId) {
    //     const err = new Error("Unauthorized");
    //     err.status = 401;
    //     err.message = "You are not authorized to edit this pin.";
    //     err.title = "Unauthorized";
    //     throw err;
    // }
    if (pin) {
        await pin.update({ boardId: req.body.boardId });
        res.json({ pin });
    } else {
        next(pinNotFoundError(req.params.id));
    }
  })
);

// router.delete(
//     "/:id",
//     asyncHandler(async (req, res, next) => {
//         console.log('hello')
//         const board = await Board.findOne({
//             where: {
//                 id: req.params.id,
//             },
//         });
//         // if (req.params.id !== userId) {
//         //     const err = new Error("Unauthorized");
//         //     err.status = 401;
//         //     err.message = "You are not authorized to delete this board.";
//         //     err.title = "Unauthorized";
//         //     throw err;
//         // }
//         // if (board) {
//         //     await board.destroy();
//         //     res.json({ message: `Deleted board with id of ${req.params.id}.` });
//         // } else {
//         //     next(boardNotFoundError(req.params.id));
//         // }
//     })
// );

module.exports = router;
