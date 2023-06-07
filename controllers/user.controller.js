require("dotenv").config(); // load .env variables
const { Router } = require("express"); // import router from express
const User = require("../models/user.model")

const router = Router(); // create router to create route bundle

//DESTRUCTURE ENV VARIABLES WITH DEFAULTS
const { SECRET = "secret" } = process.env;

router.post("/", async (req, res) => {
  // const { User } = req.context.models;
  try {
    const walletAddress = req.body.walletAddress;
    const amount = req.body.amount;

    // Find the user with the specified wallet address
    let user = await User.findOne({ walletAddress });


    // if(user) {
    //   console.log("Available");
    // } else {
    //   console.log("Not Available");
    // }
    if (user) {

      user.amount += amount;
      user.save();

      res.status(201).send({
        success: true,
        message: "Amount Updated Successfully",
        data: user,
      });

      // res.status(201).json(user);
    } else {
      await User.create(req.body);

      res.status(201).send({
        success: true,
        message: "User Details Added Successfully",
        data: req.body,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(400).send({
      success: false,
      message: error
    });
  }
});

router.get("/", async (req, res) => {
  try {
    // Fetch all user details from the database
    const users = await User.find();

    // Return the user details in the response
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(400).send({
      success: false,
      message: error
    });
  }
});

router.get("/:walletAddress", async (req, res) => {
  // const { User } = req.context.models;
  try {
    const walletAddress = req.params.walletAddress;

    // Find the user with the specified wallet address
    const user = await User.findOne({ walletAddress });

    if (!user) {
      // User not found, handle accordingly
      return res.status(404).json({ error: "User not found" });
    }

    // Return the user details in the response
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(400).send({
      success: false,
      message: error
    });
  }
});

module.exports = router;
