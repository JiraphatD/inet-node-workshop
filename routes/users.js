var express = require("express");
var router = express.Router();
const multer = require("multer");
const userModel = require("../models/user");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/file", upload.single("file"), (req, res) => {
  return res.send({
    message: "upload success",
  });
});

/* GET users listing. */
// router.get("/", function (req, res, next) {
//   res.send("respond with a resource");
// });

router.post("/", async (req, res) => {
  try {
    let body = req.body;
    let new_user = new userModel({
      user_id: body.user_id
        ? body.user_id
        : () => {
            throw new Error("field invalid");
          },
      username: body.username,
      password: body.password,
      first_name: body.first_name,
      last_name: body.last_name,
      age: body.age,
      sex: body.sex,
    });
    let user = await new_user.save();
    return res.status(201).send({
      data: user,
      message: "add user success",
    });
  } catch (error) {
    return res.status(error.status || 500).send({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    let users = await userModel.find();
    return res.send({
      data: users,
      message: "get users success",
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
});
router.get("/:user_id", async (req, res) => {
  try {
    let id = req.params.user_id;
    console.log("id: ", id);
    let user = await userModel.findOne({ user_id: id });
    return res.send({
      data: user,
      message: "get by ID success",
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
});
router.put("/:user_id", async (req, res) => {
  try {
    let id = req.params.user_id;
    let body = req.body;
    console.log("id: ", id);
    console.log("body: ", body);
    await userModel
      .updateOne(
        { user_id: id },
        {
          $set: {
            user_id: body.product_id,
            username: body.username,
            password: body.password,
            first_name: body.first_name,
            last_name: body.last_name,
            age: body.age,
            sex: body.sex,
          },
        }
      )
      .then(console.log("success"));
    let user = await userModel.findOne({ user_id: id });
    return res.send({
      data: user,
      message: "change user success",
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
});

router.delete("/:user_id", async (req, res) => {
  try {
    let id = req.params.user_id;
    console.log("id: ", id);
    await userModel.deleteOne({ user_id: id }); // Use 'id' instead of '_id'
    let user = await userModel.find();
    return res.send({
      data: user,
      message: "delete user success",
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
});

module.exports = router;
