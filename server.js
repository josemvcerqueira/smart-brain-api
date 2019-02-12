const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const cors = require("cors");
const knex = require("knex");
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const image = require("./controllers/image");
const profile = require("./controllers/profile");

const db = knex({
	client: "pg",
	connection: {
		host: "127.0.0.1",
		user: "",
		password: "",
		database: "smart-brain"
	}
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
	res.send("It is working!");
});

app.post("/signin", signin.handleSignin(db, bcrypt));

app.post("/register", register.handleRegister(db, bcrypt, saltRounds));

app.get("/profile/:id", profile.handleProfile(db));

app.put("/image", image.handleImage(db));

app.post("/imageurl", image.handleApiCall());

app.listen(process.env.PORT || 3000, () => {
	console.log(`app is running on port ${process.env.PORT}`);
});
