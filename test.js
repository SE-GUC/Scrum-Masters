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

test ('assign reviewer 2',async()=>{
  //TODO: this is done below... check if the same later
  expect.assertions(1)
  const user = await functions.createUser('investor')
  const company = await functions.createCompany(user.data.data._id)
  const reviewer = await functions.createUser('reviewer')
  const companyafterupdate = await functions.assignreviewer(company.data._id,reviewer.data.data._id)

  expect(companyafterupdate.data.review_reviewer).toBe(reviewer.data.data._id)


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

test('get assigned lawyer for request', async() => {
  expect.assertions(1)
  
  const investor = await functions.createUser('investor')
  const lawyer = await functions.createUser('lawyer')
  const request = await functions.createRequest(investor.data.data._id)
  await functions.assignLawyerRequest(request.data.data._id, { lawyer_id: lawyer.data.data._id })
  const assignedLawyer = await functions.getAssignedLawyer(request.data.data._id)
  
  expect(lawyer.data.data).toEqual(expect.objectContaining(assignedLawyer.data))
})

test("getAllRequests",async()=>{
  expect.assertions(1)
  const userRes = await functions.createUser('investor')
  const requestRes = await functions.createRequest(userRes.data.data._id) 
  const requestsRes = await functions.getAllRequests()
  expect(requestsRes.data).toContainEqual(requestRes.data.data)
  
})

test("getUserRequest",async()=>{
  expect.assertions(1)
  const userRes = await functions.createUser('investor')
  const requestRes = await functions.createRequest(userRes.data.data._id)
  const request = await functions.getRequest(userRes.data.data._id)
  expect(request.data[0]._id).toEqual(requestRes.data.data._id)
})

test('createRequest', async() => {
  expect.assertions(1)
  const userRes = await functions.createUser('investor')
  const requestRes = await functions.createRequest(userRes.data.data._id)
  expect(requestRes.data.data._id).not.toBeFalsy()
})


test('assignLawyerRequest', async() => {
  expect.assertions(1)
  const invRes = await functions.createUser('investor')
  const requestRes = await functions.createRequest(invRes.data.data._id)
  const lawyerRes = await functions.createUser('lawyer')
  await functions.assignLawyerRequest(requestRes.data.data._id,{
    assigned : true,
    lawyer_id : lawyerRes.data.data._id
  })
  const request = await functions.getRequest(invRes.data.data._id)
  expect(request.data[0].lawyer_id).toEqual(lawyerRes.data.data._id)

})


test('deleteRequest', async() => {
  expect.assertions(1)
  const userRes = await functions.createUser('investor')
  const requestRes = await functions.createRequest(userRes.data.data._id)
  await functions.deleteRequest(requestRes.data.data._id)
  const requests = await functions.getAllRequests()
  expect(requests.data).not.toContainEqual({ _id: requestRes.data.data._id })
})

