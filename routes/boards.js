const express = require("express");
const { check } = require("express-validator");
const { handleValidationErrors, asyncHandler } = require("../utils");
const { requireAuth } = require("../auth");
const router = express.Router();
const db = require("../db/models");

const { Board, Pin } = db;

//gets all boards - what to do w this

router.get(
    "/",
    asyncHandler(async (req, res) => {
        const boards = await Board.findAll({ model: Board,
            order: [["createdAt", "DESC"]],
        });
        // console.log(boards)
        res.json({ boards });
    })
);

const boardNotFoundError = (id) => {
    const err = Error("Board not found");
    err.errors = [`Board with id of ${id} could not be found.`];
    err.title = "Board not found.";
    err.status = 404;
    return err;
};

const validateBoard = [
    check("boardName")
        .exists({ checkFalsy: true })
        .withMessage("name field can't be empty."),
    //  message cannot be longer than 280 characters:
    // check("message")
    //     .isLength({ max: 280 })
    //     .withMessage("Board name can't be longer than 280 characters."),
    // handleValidationErrors,
];



//gets a board by a specific id number
router.get(
    "/:id",
     asyncHandler(async (req, res, next) => {
        const board = await Board.findOne({
            where: {
                id: req.params.id,
            },
            include: {model: Pin }
        });
        if (board) {
            res.json({ board });
        
        } else {
            next(boardNotFoundError(req.params.id));
        }
    })
);


//creates a new board
router.post(
    "/new",
    requireAuth, asyncHandler(async (req, res) => {
        const { boardName, img } = req.body;
        const board = await Board.create({ boardName, img, userId: req.user.id });
        res.json({ board });
    })
);

//updates a board
router.put(
    "/:id",
    validateBoard,
    asyncHandler(async (req, res, next) => {
        const board = await Board.findOne({
            where: {
                userId: req.params.id,
            },  
        });
        // if (req.user.id !== board.userId) {
        //     const err = new Error("Unauthorized");
        //     err.status = 401;
        //     err.message = "You are not authorized to edit this board.";
        //     err.title = "Unauthorized";
        //     throw err;
        // }
        // if (board) {
        //     await board.update({ message: req.body.message });
        //     res.json({ board });
        // } else {
        //     next(boardNotFoundError(req.params.id));
        // }
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
