const functions = require('./fn');
const Comment = require('./models/comment') 
var Company = require('./models/company') 

test('check the company comments',async()=>{
expect.assertions(1)
const response = await functions.getComment()
//console.log(response.data[0].application_id);

const index = response.data[0].application_id
const company= await functions.getCompany(index)
expect(company.data.comments).not.toBeNull()
})

test('adding comment',async()=>{
    expect.assertions(1)  

const response= await functions.createComment()
console.log(response.data.comment._id)
const comment = await functions.getCommenttest(response.data.comment._id)

expect(comment).not.toBeNull()

})
test('update comment', async()=>{

expect.assertions(1)  

const response= await functions.updateComment()
console.log(response)
const comment = await functions.getCommenttest(response.data._id)

expect(comment.data.comment_text).toBe("heyupdated")


})

test('add Fees',async()=>{

expect.assertions(1)
const response = await functions.addFees()
const application = await functions.getCompany(response.data._id)
expect(application.data.fees).toBe(123456789)

})

test('delete comment',async()=>{    
    expect.assertions(1) 
    
   const response= await functions.deleteComment()
   console.log(response.data)
    const comment = await functions.getCommenttest(response.data[0])

     expect(comment).toBeFalsy()
})


