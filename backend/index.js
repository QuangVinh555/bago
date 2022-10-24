const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const connect = require('./config/db/connect');
const route = require('./routes/index');
dotenv.config();
const multer = require('multer');
const path = require('path');

const app = express();

// connect db
connect();

// path
app.use("/images", express.static(path.join(__dirname, "public/images")))

// middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors());

// image multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    }
})

const upload = multer({storage});
app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
        return res.status(200).json("File upload successfully")
    } catch (error) {
        console.log(error);
    }
});

// route
route(app);

const port = process.env.PORT || 6000
app.listen(port, () => {
    console.log(`Backend server is running on ${port}!`);
})