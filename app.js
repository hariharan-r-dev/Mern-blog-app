const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const homeStartingContent = "Welcome to Wander & Wonder! I'm Hariharan, the creator of this platform, and I'm excited to have you here. This space is designed for sharing stories, exploring new ideas, and connecting with a vibrant community. Whether you're looking to discover fresh perspectives or share your own experiences, I hope you find inspiration and creativity in every corner of this site. Let's embark on this journey together and start sharing today!";
const aboutContent = "Welcome to Wander & Wonder, a platform designed to foster creativity, connection, and knowledge-sharing. Created by Hariharan, this space allows individuals from all walks of life to share their stories, experiences, and insights. Whether you're here to explore new perspectives, express your thoughts, or connect with like-minded individuals, Wander & Wonder offers a dynamic space for everyone. Join our growing community and start sharing today!";
const contactContent = "Feel free to reach out to us for any queries, suggestions, or just a friendly hello! We would love to hear from you and will get back to you as soon as possible.";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Connecting to database - using local MongoDB (port 27017) with blogDB database name
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test', { useNewUrlParser: true });
  console.log("Connected to MongoDB successfully.");
}

// Creating Schema for the posts
const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true }
});

// Creating a mongoose model based on this Schema
const Post = mongoose.model("Post", postSchema);

// Schema for contact form data
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

// Model based on the schema
const Contact = mongoose.model("Contact", contactSchema);

// API Routes
app.get("/api/posts", function (req, res) {
  Post.find().then(posts => {
    res.json({
      startingContent: homeStartingContent,
      posts: posts
    });
  }).catch(err => {
    res.status(500).json({ error: "Error fetching posts" });
  });
});

app.get("/api/about", function (req, res) {
  res.json({ aboutContent: aboutContent });
});

app.get("/api/contact", function (req, res) {
  res.json({ contactContent: contactContent });
});

app.post("/api/posts", function (req, res) {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });

  post.save().then((savedPost) => {
    console.log('Post added to DB.');
    res.status(201).json(savedPost);
  })
    .catch(err => {
      res.status(400).json({ error: "Unable to save post to database." });
    });
});

app.get("/api/posts/:postId", function (req, res) {
  const requestedPostId = req.params.postId;

  Post.findOne({ _id: requestedPostId })
    .then(function (post) {
      if (post) {
        res.json(post);
      } else {
        res.status(404).json({ error: "Post not found" });
      }
    })
    .catch(function (err) {
      res.status(400).json({ error: "Invalid post ID format" });
    });
});

app.post("/api/contact", (req, res) => {
  const contactData = new Contact({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
  });

  contactData
    .save()
    .then((savedContact) => {
      console.log("Contact form data saved to database.");
      res.status(201).json({ message: "Message sent successfully!", data: savedContact });
    })
    .catch((err) => {
      console.error("Error saving contact data:", err);
      res.status(500).json({ error: "An error occurred while saving your message." });
    });
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});