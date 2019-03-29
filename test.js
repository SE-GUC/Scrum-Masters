const uuid = require('uuid')

const functions = require('./fn')
const Comment = require('./models/comment') 
var Company = require('./models/company') 


test('check the company comments',async()=>{
expect.assertions(1)
const user1 = await functions.createUser('investor')
const company = await functions.createCompany(user1.data.data._id)
const commentcreated= await functions.createComment('the comment is created succ',company.data._id,user1.data.data._id)
const newcompany= await functions.getCompany(company.data._id) 
const array = newcompany.data.comments 
expect(array).toContainEqual(commentcreated.data.comment._id)
})

test('adding comment',async()=>{
    expect.assertions(1)  
const user1 = await functions.createUser('investor')

const company = await functions.createCompany(user1.data.data._id)

const response= await functions.createComment('the comment is created succ',company.data._id,user1.data.data._id)

const comment = await functions.getCommenttest(response.data.comment._id)

expect(comment).not.toBeNull()

})
test('update comment', async()=>{

expect.assertions(1)  
const user1 = await functions.createUser('investor')
const company = await functions.createCompany(user1.data.data._id)

const commentcreated= await functions.createComment('the comment is created succ',company.data._id,user1.data.data._id)

const response= await functions.updateComment(commentcreated.data.comment._id,'hey user')

const comment = await functions.getCommenttest(response.data._id)

expect(comment.data.comment_text).toBe('hey user')


 })

test('calculate and add Fees',async()=>{

expect.assertions(1)
const user1 = await functions.createUser('investor')
const company = await functions.createCompany(user1.data.data._id)
const response = await functions.calculateFees(company.data._id)

const application = await functions.getCompany(company.data._id)
expect(application.data.fees).toBe(response.data.targetcompany.fees)

})

test('delete comment',async()=>{    
    expect.assertions(1) 
const user1 = await functions.createUser('investor')
const company = await functions.createCompany(user1.data.data._id)
const commentcreated= await functions.createComment('the comment is created succ',company.data._id,user1.data.data._id)
   const response= await functions.deleteComment(company.data._id,commentcreated.data.comment._id)
    const comment = await functions.getCommenttest(response.data[0])

     expect(comment).toBeFalsy()
})


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

test ('assign reviewer',async()=>{
  expect.assertions(1)
  const user = await functions.createUser('investor')
  const company = await functions.createCompany(user.data.data._id)
  const reviewer = await functions.createUser('reviewer')
  const companyafterupdate = await functions.assignreviewer(company.data._id,reviewer.data.data._id)

  expect(companyafterupdate.data.review_reviewer).toBe(reviewer.data.data._id)


})