const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const app = express();

app.use(cors());
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/upload", upload.single("photo"), (req, res) => {
  console.log(req.file);
});

app.post("/uploads", upload.array("photos[]"), (req, res) => {
  console.log(req.files);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server running...");
});
