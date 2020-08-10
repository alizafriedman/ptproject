const express = require("express");
require('dotenv').config();
const morgan = require("morgan");
const cors = require('cors');
const { environment } = require('./config');
const app = express();

const port = require('./config');
const boardsRouter = require("./routes/boards");
const pinsRouter = require("./routes/pins");
const usersRouter = require("./routes/users");
const homeRouter = require("./routes/home");

app.use(morgan("dev"));
app.use(express.json());
app.use(cors({ origin: true }));

app.use("/users", usersRouter);
app.use("/boards", boardsRouter);
app.use("/pins", pinsRouter);
app.use("/", homeRouter);


// Catch unhandled requests and forward to error handler.
app.use((req, res, next) => {
    const err = new Error("The requested resource couldn't be found.");
    err.status = 404;
    next(err);
});

// Custom error handlers.

// Generic error handler.
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    const isProduction = environment === "production";
    res.json({
        title: err.title || "Server Error",
        message: err.message,
        stack: isProduction ? null : err.stack,
        errors: err.errors
    });
});

// const server = app.listen(port, () => `Listening on port: ${port}`);

// const io = socketio(server);

// io.on('connection', (socket) => {
//   console.log('a user connected');
//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//   });
// });


module.exports = app;