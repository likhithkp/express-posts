const express = require("express");
const cookieParser = require("cookie-parser");
const userModel = require("./models/user");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const isLoggenIn = require("./middlewares/authentication")

const app = express();

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.get("/", (_, res) => {
    res.render("index")
});

app.get("/home", (_, res) => {
    res.render("home")
});

app.post("/register", async (req, res) => {
    let {username, name, age, email, password} = req.body

    if(!username || !name || !age || !email || !password) return res.send("All the fields are required");

    let userExists = await userModel.findOne({email});
    if(userExists) return res.status(500).send("User already exists");

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        await userModel.create({
            username,
            name,
            age,
            email,
            password: hashedPassword,
        })
        res.redirect("/login");
    } catch (error) {
        res.status(500).send("Something went wrong");
    }
});

app.get("/login", (_, res) => {
    res.render("login")
});

app.post("/login", async (req, res) => {
    let { email, password} = req.body
 
    if(!email || !password) return res.send("All the fields are required");

    let userExists = await userModel.findOne({email});
    if(!userExists) return res.status(500).send("User not found");

    try {
        let isMatch = await bcrypt.compare(password, userExists.password)
        if(!isMatch) return res.redirect("/login");

        let jwtToken = jwt.sign({email: userExists.email, userId: userExists._id}, "secretKey");
        res.cookie("jwtToken", jwtToken);
        return res.redirect("home");

    } catch (error) {
        res.status(500).send("Something went wrong");
    }
});

app.get("/profile", isLoggenIn, (_, res) => {
    res.render("profile");
});

app.get("/logout", (_, res) => {
    res.cookie("jwtToken", "");
    res.redirect("/login");
})

app.listen(3000);

