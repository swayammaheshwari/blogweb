//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash")
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/newblogDB", {useNewUrlParser: true});

const blogSchema = {
  author: String,
  title: String,
  poster: String,
  date: Date
}

const Post = mongoose.model("Post", blogSchema);

app.get("/",(req,res)=>{
  Post.find({}, function(err, posts){
    res.render("index", {
      posts: posts
      });
  });
})

app.post("/compose",(req,res)=>{
  const post = new Post({
    author:req.body.authorNameR,
    title: req.body.postTitleR,
    poster: req.body.postBodyR
  });
   post.save();
  res.redirect("/")
})

app.get("/author",(req,res)=>{
    res.render("author");
})
app.get("/post",(req,res)=>{
    res.render("post",{author:"author",title:"title",poster:"post"});
})

app.get("/post/:postId", function(req, res){

  const requestedPostId = req.params.postId;

    Post.findOne({_id: requestedPostId}, function(err, post){
      res.render("post", {
        author:post.author,
        title: post.title,
        poster: post.poster
      });
    });
  });


app.get("/compose",(req,res)=>{
    res.render("compose");
})














let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function() {
  console.log("Server started on port 3000");
});