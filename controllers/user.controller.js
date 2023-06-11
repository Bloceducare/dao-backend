require("dotenv").config(); // load .env variables
const { Router } = require("express"); // import router from express
const User = require("../models/user.model");
const Tranasction = require("../models/transaction.model");
const Transaction = require("../models/transaction.model");

const router = Router(); // create router to create route bundle

//DESTRUCTURE ENV VARIABLES WITH DEFAULTS
const { SECRET = "secret" } = process.env;

router.post("/", async (req, res) => {
  try {
    const { walletAddress, txnId } = req.body;
    const amount = Number(req.body.amount);
    const currentDate = Date.now();
    if (!walletAddress || !txnId) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Find the user with the specified wallet address
    const findUser = User.findOne({ walletAddress });
    const findTx = Transaction.findOne({ txnId });
    let [user, tx] = await Promise.all([findUser, findTx]);

    if (!tx) {
      Tranasction.create({
        user: walletAddress,
        txnId,
        amount,
        data: currentDate,
      });
    }

    if (user) {
      let updateUser = user;
      if (!tx) {
        updateUser = await User.findOneAndUpdate(
          { walletAddress },
          {
            amount: user.amount + amount,
            $push: {
              transactionId: {
                txnId,
                amount,
                date: currentDate,
              },
            },
          }
        );
      }

      return res.status(201).send({
        success: true,
        message: "Amount Updated Successfully",
        data: updateUser._doc,
      });
    } else {
      const newUser = await User.create({
        ...req.body,
        transactionId: [
          {
            txnId: req.body.txnId,
            amount,
            date: currentDate,
          },
        ],
      });

      return res.status(201).send({
        success: true,
        message: "User Details Added Successfully",
        data: newUser._doc,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(400).send({
      success: false,
      message: error,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(400).send({
      success: false,
      message: error,
    });
  }
});

router.get("/:walletAddress", async (req, res) => {
  try {
    const walletAddress = req.params.walletAddress;

    const user = await User.findOne({ walletAddress });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Return the user details in the response
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(400).send({
      success: false,
      message: error,
    });
  }
});

module.exports = router;
