import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";
import helmet from "helmet";
import multer from "multer";
import { register } from "./controllers/register.js";
import auth from "./routes/auth.js";
import user from "./routes/user.js";
import post from "./routes/post.js";
import { createPost } from "./controllers/post.js";

/*FILE CONFIGRATIONS*/

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
dotenv.config();
app.use("/assets", express.static("assets"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use("/assets", express.static(path.join(__dirname, "assests")));
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(morgan("common"));

/*FILE STORAGE*/

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "assets/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

/*FILES UPLOADING*/

app.post("/auth/register", upload.single("profilePicture"), register);
app.post("/post", upload.single("postPicture"), createPost);

/*ROUTES*/

app.use("/auth", auth);
app.use("/user", user);
app.use("/post", post);

/*DATABASE CONNECTION*/

const PORT = process.env.PORT || 6000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
