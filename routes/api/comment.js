const express = require("express");
const Joi = require("joi");
const uuid = require("uuid");
const router = express.Router();

const comment = require("../../models/comment");

const Comment = [
  new comment(1, "noone", 1, 10),
  new comment(2, "noone", 2, 12),
  new comment(3, "noone", 3, 15),
  new comment(4, "noone", 4, 14),
  new comment(5, "noone", 5, 13)
];

//create new comment
router.post("/", (req, res) => {
  const Comment_text = req.body.comment_text;
  const User_id = req.body.user_id;
  const application_ID = req.body.application_id;

  if (!Comment_text)
    return res.status(400).send({ err: "Comment field is required" });
  if (typeof Comment_text !== "string")
    return res.status(400).send({ err: "Invalid value for comment text" });

  const newcomment = {
    Comment_text,
    User_id,
    application_ID,
    comment_id: Comment.length + 1,
    comment_date: new Date()
  };
  return res.json({ data: newcomment });
});

router.get("/:user_id/:application_id", (req, res) => {
  var commentfs = Comment.find(
    c =>
      c.user_id == parseInt(req.params.user_id) &&
      c.application_id == parseInt(req.params.application_id)
  );

  if (!commentfs) {
    return res.status(400).send({ err: "mafysh 5ara" });
  } else {
    return res.json({ data: commentfs.comment_text });
  }
});

router.put("/:comment_id", (req, res) => {
  const updatedcommenttext = req.body.comment_text;
  if(!updatedcommenttext){
    return res.status(400).send({ err: "Comment field is required" });
  }
  else{
  const commentfs = Comment.find(
    c => c.comment_id == parseInt(req.params.comment_id)
  );
  if (!commentfs) {
    return res.status(400).send({ err: "mafysh 5ara" });
  } else {
    commentfs.comment_text = updatedcommenttext;
    return res.json({ data: commentfs });
  }}
});

router.delete("/:comment_id", (req, res) => {
  const commentds = Comment.find(
    c => c.comment_id == parseInt(req.params.comment_id)
  );
  const index = Comment.indexOf(commentds);
  Comment.splice(index, 1);
  return res.json({ data: Comment });
});

module.exports = router;
