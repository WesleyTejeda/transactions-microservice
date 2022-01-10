import express from "express";
import session from "express-session"
import dotenv from "dotenv";
import router from "./routes/index.js";

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

app.listen(port, () =>{
    console.log(`Server live and listening on port ${port}`);
})

app.use(router)
