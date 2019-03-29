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
console.log(company.data._id)
const response= await functions.createComment('the comment is created succ',company.data._id,user1.data.data._id)
console.log(response.data.comment._id)
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

test('add Fees',async()=>{

expect.assertions(1)
const user1 = await functions.createUser('investor')
const company = await functions.createCompany(user1.data.data._id)
const response = await functions.addFees(company.data._id,13456)

const application = await functions.getCompany(company.data._id)
expect(application.data.fees).toBe(13456)

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

test('create notification', async() => {
  expect.assertions(2)
  const user = await functions.createUser('investor')
  const notification = await functions.createNotification(user.data.data._id)
  expect(notification.data._id).not.toBeFalsy()
  const newUser = await functions.getUser(user.data.data._id)
  expect(newUser.data.notifications).toContainEqual(notification.data._id)
})

test('get notifications', async() => {
  expect.assertions(1)
  const user = await functions.createUser('investor')
  const notification = await functions.createNotification(user.data.data._id)
  const response = await functions.getUserNotifications(user.data.data._id)
  expect(response.data).toContainEqual(expect.objectContaining({ _id: notification.data._id }))
})

test('set notification viewed', async() => {
  expect.assertions(1)
  const user = await functions.createUser('investor')
  const notification = await functions.createNotification(user.data.data._id)
  await functions.setNotificationViewed(notification.data._id)
  const response = await functions.getUserNotifications(user.data.data._id)
  expect(response.data).toContainEqual(expect.objectContaining({ _id: notification.data._id, viewed: true }))
})

test('assign reviewer', async() => {
  expect.assertions(1)
  const investor = await functions.createUser('investor')
  const reviewer = await functions.createUser('reviewer')
  const company = await functions.createCompany(investor.data.data._id)
  await functions.assignReviewer(company.data._id, reviewer.data.data._id)
  const newCompany = await functions.getCompany(company.data._id)
  expect(newCompany.data.review_reviewer).toEqual(reviewer.data.data._id)
})

test('assign lawyer', async() => {
  expect.assertions(2)
  
  const investor = await functions.createUser('investor')
  const lawyer = await functions.createUser('lawyer')
  const company = await functions.createCompany(investor.data.data._id)
  await functions.assignLawyer(company.data._id, lawyer.data.data._id)
  const newCompany = await functions.getCompany(company.data._id)
  expect(newCompany.data.review_lawyer).toEqual(lawyer.data.data._id)
  
  const notifications = await functions.getUserNotifications(lawyer.data.data._id)
  expect(notifications.data).toContainEqual(expect.objectContaining({ target_type: "company", target_id: company.data._id }))
})

/*test('get assigned lawyer', async() => {
  expect.assertions(1)
  
  const investor = await functions.createUser('investor')
  const lawyer = await functions.createUser('lawyer')
  //const company = await functions.createCompany(investor.data.data._id)
  //await functions.assignLawyer(company.data._id, lawyer.data.data._id)
  //change to company request ^^
  
  const assignedLawyer = await functions.getAssignedLawyer(company.data._id)
  
  
  //TODO: finish when company request helpers are created
})*/
