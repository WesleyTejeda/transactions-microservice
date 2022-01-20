import express from "express";
import session from "express-session"
import dotenv from "dotenv";
import router from "./routes/index.js";
import cors from "cors";

const app = express();
const port = process.env.PORT || 4040;

//Dot Env
dotenv.config();

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

//session
app.use(session({
    secret: process.env.secret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

const whitelist = ["http://localhost:4200"]
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}
app.use(cors(corsOptions))

app.listen(port, () =>{
    console.log(`Server live and listening on port ${port}`);
})

app.use(router)
