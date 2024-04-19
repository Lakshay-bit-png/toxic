const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const UserModel = require("./models/user.model");
const searchRouter = require("./routes/search.route");
const userRouter = require("./routes/user.routes");
const app = express();


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname+"/uploads/"); // Specify the destination folder
  },
  filename: function (req, file, cb) {
    const li = file.originalname.split(".");
   //console.log(li)
    cb(null, req.params.id + "." + li[li.length - 1]);
  },
});

const upload = multer({ storage: storage });

const corsOptions = {
  origin: "*", // Replace with your app's domain
  optionsSuccessStatus: 200,
  //Credential: true
};

app.use(cors(corsOptions));

app.use(bodyparser.json());


app.use('/api/users', searchRouter);
app.use("/api/users", userRouter);





app.use('/api/uploads', express.static(__dirname + '/uploads'));

app.post('/api/upload/:id', upload.single('image'), async(req, res) => {
  const file = req.file;
  console.log(file)
  if (!file) {
    return res.status(400).send('No file uploaded.');
  }

  // Process the uploaded file (e.g., save information to the database)
  // For now, just send a success response with the file details
  try {
    // Save imgUrl to user schema
    const userId = req.params.id;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).send("User not found.");
    }
    user.imgUrl = `http://localhost:3001/api/uploads/${file.filename}` // Assuming file.filename is the URL to be saved
    await user.save();

    // Send success response with file details
    res.send({
      message: "File uploaded successfully.",
      fileDetails: {
        url: "/api/uploads/" + file.filename,
        filename: file.filename,
        originalname: file.originalname,
        size: file.size + "b",
      },
    });
  } catch (error) {
    console.error("Error saving imgUrl to user schema:", error);
    res.status(500).send("Internal server error.");
  }
});


app.use("/", (req, res) => {
  res.send("<h1>welcome to trading tiers!</h1>");
});

module.exports = app;
