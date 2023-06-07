require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const {log} = require("mercedlogger")
const cors = require("cors")
const UserRouter = require("./controllers/user.controller")

//DESTRUCTURE ENV VARIABLES WITH DEFAULT VALUES
const {PORT = 3000} = process.env

const app = express()

// GLOBAL MIDDLEWARE
app.use(cors())
app.use(morgan("tiny"))
app.use(express.json())

// ROUTES AND ROUTES
app.get("/", (req, res) => {
    res.send("this is the test route to make sure server is working")
})

app.use("/user", UserRouter) // send all "/user" requests to UserRouter for routing

// APP LISTENER
app.listen(PORT, () => log.green("SERVER STATUS", `Listening on port ${PORT}`))
