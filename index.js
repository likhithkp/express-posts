const express = require("express");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const isLoggenIn = require("./middlewares/authentication")
const userModel = require("./models/user");
const postModel = require("./models/post");

const app = express();

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.get("/", (_, res) => {
    res.render("index")
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
        res.cookie("jwtToken", jwtToken, {
                httpOnly: true,
                secure: true 
            });
        return res.redirect("/profile");

    } catch (error) {
        res.status(500).send("Something went wrong");
    }
});

app.get("/profile", isLoggenIn, async (req, res) => {
    let user = await userModel.findOne({email: req.user.email}).populate("posts");
    res.render("profile", {user: user});
});

app.post("/post",isLoggenIn, async (req, res) => {
    let user = await userModel.findOne({email: req.user.email})

    const post = await postModel.create({
        user: user._id,
        content: req.body.content,
    }) 

    user.posts.push(post._id);
    await user.save();
    res.redirect("/profile");
});

app.get("/like/:id", isLoggenIn, async (req, res) => {
    let post = await postModel.findOne({_id: req.params.id}).populate("user");

    if(post?.likes.indexOf(req.user.userId) === -1){
        post?.likes.push(req.user.userId);
    } else {
        post?.likes.splice(post?.likes.indexOf(req.user.userId), 1)
    }

    await post.save();
    res.redirect("/profile");
});

app.get("/edit/:id", isLoggenIn, async (req, res) => {
    let post = await postModel.findOne({_id: req.params.id}).populate("user");
    res.render("edit", {post: post});
});

app.post("/update/:id", isLoggenIn, async (req, res) => {
    await postModel.findOneAndUpdate({_id: req.params.id}, {content: req?.body?.content});
    res.redirect("/profile");
});

app.get("/logout", (_, res) => {
    res.cookie("jwtToken", "");
    res.redirect("/login");
})

app.listen(3000);

