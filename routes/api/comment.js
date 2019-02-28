const express = require('express');
const Joi = require('joi');
const uuid = require('uuid');
const router = express.Router();


const comment = require('../../models/comment');

const Comment = [
	new comment('noone',1,10),
	new comment('noone',2,12),
	new comment('noone',3,15),
	new comment('noone',4,14),
	new comment('noone',5,13),

];


//create new comment
router.post('/', (req, res) => {
	const comment_text = req.body.comment_text;
    const user_id = req.body.user_id;
    const application_id=req.body.application_id;


    

	if (!comment_text) return res.status(400).send({ err: 'Comment field is required' });
	if (typeof comment_text !== 'string') return res.status(400).send({ err: 'Invalid value for comment text' });


	const newcomment = {
		comment_text,
        user_id,
        application_id,
        comment_id: uuid.v4(),
        comment_date:new Date(),

	};
	return res.json({ data: newcomment });
});

router.get('/', (req, res) => {

const User_id= req.body.user_id;
const application_ID=req.body.application_id;
const commentf = Comment.find(comment =>( comment.user_id === User_id && comment.application_id===application_ID));





return res.json({ data:commentf.comment_text });




});

router.put('/:comment_id', (req, res) => {
    const commentId = req.params.comment_id
    const updatedcommenttext = req.body.comment_text
    const commentfs = Comment.find(comment => comment.comment_id === commentId)
    commentfs.title = updatedcommenttext
    return res.json({ data: commentfs.comment_text});
})



router.delete('/comment_id', (req, res) => {
    const comment_ID = req.params.id 
    const commentds = Comment.find(comment => comment.comment_id === comment_ID)
    const index = Comment.indexOf(commentds)
    Comment.splice(index,1)
    return res.json({ data:Comment});
})



module.exports=router;