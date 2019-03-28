const uuid = require('uuid')

const functions = require('./fn')
const Comment = require('./models/comment') 
var Company = require('./models/company') 

/*
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
*/

test('create user', async() => {
  expect.assertions(1)
  const response = await functions.createUser('investor')
  expect(response.data.data._id).not.toBeFalsy()
})

test('get user', async() => {
  expect.assertions(1)
  const response = await functions.createUser('investor')
  const user = await functions.getUser(response.data.data._id)
  expect(response.data.data._id).toEqual(user.data._id)
})

test('get all users', async() => {
  expect.assertions(1)
  const response = await functions.createUser('investor')
  const users = await functions.getAllUsers()
  expect(users.data.data).toContainEqual({ _id: response.data.data._id })
})

test('update user', async() => {
  expect.assertions(1)
  const response = await functions.createUser('investor')
  const newName = uuid.v4().substring(0, 30)
  await functions.updateUser(response.data.data._id, {
    firstName: newName,
    lastName: response.data.data.lastName,
    password: response.data.data.password,
    gender: response.data.data.gender,
  })
  const user = await functions.getUser(response.data.data._id)
  expect(user.data.firstName).toEqual(newName)
})

test('delete user', async() => {
  expect.assertions(1)
  const response = await functions.createUser('investor')
  await functions.deleteUser(response.data.data._id)
  const users = await functions.getAllUsers()
  expect(users.data.data).not.toContainEqual({ _id: response.data.data._id })
})

test('create company', async() => {
  expect.assertions(1)
  const user = await functions.createUser('investor')
  const company = await functions.createCompany(user.data.data._id)
  expect(company.data._id).not.toBeFalsy()
})