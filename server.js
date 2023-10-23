import express from "express";
import bodyParser from "body-parser";
import bcrypt from "bcrypt-nodejs";
import cors from "cors";
import knex from "knex";
import handleRegister from "./controllers/register.js";
import handleSignin from "./controllers/signin.js";
import handleProfile from "./controllers/profile.js";
import handleImage from "./controllers/image.js";

const app = express();
app.use(bodyParser.json());
app.use(cors());

const config = {
   client: "pg",
   connection: {
      connectionString: process.env.DATABASE_URL,
      host: process.env.DATABASE_HOST,
      port: 5432,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PW,
      database: process.env.DATABASE_DB,
   },
};

const db = knex(config);

db.select("*")
   .from("users")
   .then((data) => {
      console.log(data);
   });

app.get("/", (req, res) => {
   res.json("yes. your are connected.");
});

app.post("/signin", (req, res) => {
   handleSignin(req, res, db, bcrypt);
});

app.post("/register", (req, res) => {
   handleRegister(req, res, db, bcrypt);
});

app.get("/profile/:id", (req, res) => {
   handleProfile(req, res, db);
});

app.put("/image", (req, res) => {
   handleImage(req, res, db);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
   console.log(`server is running on port ${port}`);
});
