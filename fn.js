const axios = require('axios')
const uuid = require('uuid')

axios.defaults.adapter = require('axios/lib/adapters/http')
const functions = {
  createRequest: async (inv_id) => {
    const request = await axios.post('http://localhost:3000/api/company-request', {
      'investor_id': inv_id
    })
    return request
  },

  getAllRequests: async () => {
    const requests = await axios.get('http://localhost:3000/api/company-request')
    return requests
  },

  getRequest: async (id) => {
    const request = await axios.get('http://localhost:3000/api/company-request/' + id)
    return request
  },

  updateUser: async (id, params) => {
    const user = await axios.put('http://localhost:3000/api/user/' + id, params)
    return user
  },

  assignLawyerRequest: async (requestId, params) => {
    const request = await axios.post('http://localhost:3000/api/company-request/assign/' + requestId, params)
    return request
  },

  deleteRequest: async (id) => {
    const request = await axios.delete('http://localhost:3000/api/company-request/' + id)
    return request
  },

  getComment: async (app_id) => {
    const comment = await axios.get('http://localhost:3000/api/comment/' + app_id)
    return comment
  },
  createComment: async (comment_text, app_id, user_id) => {
    const comment = await axios.post('http://localhost:3000/api/comment',
      { comment_text: comment_text,
        application_id: app_id,
        user_id: user_id })
    return comment
  },
  updateComment: async (comment_id, comment_text) => {
    const comment = await axios.post('http://localhost:3000/api/comment/' + comment_id, { 'comment_text': comment_text })
    return comment
  },
  deleteComment: async (app_id, comment_id) => {
    const comment = await axios.delete('http://localhost:3000/api/comment/' + app_id + '/' + comment_id)
    return comment
  },
  calculateFees: async (app_id) => {
    const company = await axios.put('http://localhost:3000/api/company/calculatefees/' + app_id)
    return company
  },
  getCompany: async (id) => {
    const company = await axios.get('http://localhost:3000/api/company/' + id)
    return company
  },
  getCommenttest: async (id) => {
    try {
      const comment = await axios.get('http://localhost:3000/api/comment/viewSpecific/' + id)
      return comment
    } catch (err) {
      return undefined
    }
  },

  getUser: async (id) => {
    const user = await axios.get('http://localhost:3000/api/user/' + id)
    return user
  },

  getAllUsers: async (id) => {
    const user = await axios.get('http://localhost:3000/api/user')
    return user
  },

  createUser: async (type) => {
    const user = await axios.post('http://localhost:3000/api/user', {
      'firstName': 'Test',
      'lastName': 'User',
      'email': uuid.v4() + '@gmail.com',
      'password': 'abcdefgh',
      'gender': 'male',
      'type': type
    })
    return user
  },

  updateUser: async (id, params) => {
    const user = await axios.put('http://localhost:3000/api/user/' + id, params)
    return user
  },

  deleteUser: async (id) => {
    const user = await axios.delete('http://localhost:3000/api/user/' + id)
    return user
  },

  createCompany: async (owner) => {
    const company = await axios.post('http://localhost:3000/api/company', {
      'organizational_rule': 'organizational_rule2',
      'legal_form': 'legal_form1',
      'company_name_arabic': uuid.v4(),
      'company_name_english': uuid.v4(),
      'hq_governorate': 'hq_governorate2',
      'hq_city': 'hq_city2',
      'hq_address': 'company_address3',
      'hq_telephone': 'company_number3',
      'hq_fax': 'company_fax3',
      'capital_currency': 'EGP',
      'capital': 50000,
      'investor_name': 'Test Investor',
      'investor_gender': 'Male',
      'nationality': 'German',
      'investor_id_type': 'id_type2',
      'investor_id_number': '101010',
      'investor_birth_date': '1997-11-13T22:00:00.000Z',
      'investor_address': 'investor_address',
      'investor_telephone': 'investor_number',
      'investor_fax': 'investor_fax',
      'investor_email': 'investor_email1',
      'company_type': 'ssc',
      'investor_type': 'type1',
      'board_members': [ ],
      'owner': owner
    })
    return company
  },

  createNotification: async (user) => {
    const notification = await axios.post('http://localhost:3000/api/notification', {
      'owner_id': user,
      'target_type': 'user',
      'target_id': user,
      'notif_text': 'Test Notification'
    })
    return notification
  },

  getUserNotifications: async (user) => {
    const notifications = await axios.get('http://localhost:3000/api/notification/' + user)
    return notifications
  },

  setNotificationViewed: async (id) => {
    const notification = await axios.delete('http://localhost:3000/api/notification/' + id)
    return notification
  },

  assignReviewer: async (company_id, reviewer_id) => {
    const company = await axios.post('http://localhost:3000/api/user/assignreviewer/' + company_id + '/' + reviewer_id)
    return company
  },

  assignLawyer: async (company_id, lawyer_id) => {
    const company = await axios.post('http://localhost:3000/api/user/assignLawyer/' + company_id + '/' + lawyer_id)
    return company
  },

  unassignReviewer: async (company_id) => {
    const company = await axios.put('http://localhost:3000/api/user/unassignreviewer/' + company_id)
    return company
  },

  unassignLawyer: async (company_id) => {
    const company = await axios.put('http://localhost:3000/api/user/unassignLawyer/' + company_id)
    return company
  },

  getAssignedLawyer: async (company_id) => {
    const lawyer = await axios.get('http://localhost:3000/api/user/getlawyer/' + company_id)
    return lawyer
  }
}

module.exports = functions
