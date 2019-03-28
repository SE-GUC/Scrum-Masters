const axios = require('axios')
const uuid = require('uuid')

axios.defaults.adapter = require('axios/lib/adapters/http')
const functions = {
  getComment: async()=>{
      const comment = await axios.get('http://localhost:3000/api/comment/5c93936e94ddee69b0dd5684')
      return comment 
  },
  createComment: async()=>{
      const comment =await axios.post('http://localhost:3000/api/comment',{comment_text:"anaaa", application_id:"5c93936e94ddee69b0dd5684", user_id:"5c93960a2e72ce25d8cf6a56" })
      return comment
  },
  updateComment:async()=>{
      const comment = await axios.post('http://localhost:3000/api/comment/5c9d03bc6ae0230e20fbd5c1',{"comment_text":"heyupdated"})
      return comment
    
  },
  deleteComment:async()=>{
      const comment=await axios.delete('http://localhost:3000/api/comment/5c93936e94ddee69b0dd5684/5c9d074ec1bf5011acdd568e')
      return comment
  },
  addFees:async()=>{
       const company = await axios.put('http://localhost:3000/api/company/addfees/5c93936e94ddee69b0dd5684',{"feesvalue": 123456789})
       return company
  },
  getCompany:async(id)=>{
    const company = await axios.get('http://localhost:3000/api/company/'+id)
    return company
  },
  getCommenttest:async(id)=>{
    try{  
      const comment= await axios.get('http://localhost:3000/api/comment/viewSpecific/'+id)
      return comment
    }catch(err){
        return undefined
    }
  },
  
  getUser: async(id) => {
    const user = await axios.get('http://localhost:3000/api/user/' + id)
    return user
  },
  
  getAllUsers: async(id) => {
    const user = await axios.get('http://localhost:3000/api/user')
    return user
  },
  
  createUser: async(type) => {
    const user = await axios.post('http://localhost:3000/api/user', {
      "firstName": "Test",
      "lastName": "User",
      "email": uuid.v4() + "@gmail.com",
      "password": "abcdefgh",
      "gender": "male",
      "type": type
    })
    return user
  },
  
  updateUser: async(id, params) => {
    const user = await axios.put('http://localhost:3000/api/user/' + id, params)
    return user
  },
  
  deleteUser: async(id) => {
    const user = await axios.delete('http://localhost:3000/api/user/' + id)
    return user
  },
  
  createCompany: async(owner) => {
    const company = await axios.post('http://localhost:3000/api/company', {
      "organizational_rule": "organizational_rule2",
      "legal_form": "legal_form1",
      "company_name_arabic": uuid.v4(),
      "company_name_english": uuid.v4(),
      "hq_governorate": "hq_governorate2",
      "hq_city": "hq_city2",
      "hq_address": "company_address3",
      "hq_telephone": "company_number3",
      "hq_fax": "company_fax3",
      "capital_currency": "EGP",
      "capital": 50000,
      "investor_name": "Test Investor",
      "investor_gender": "Male",
      "nationality": "German",
      "investor_id_type": "id_type2",
      "investor_id_number": "101010",
      "investor_birth_date": "1997-11-13T22:00:00.000Z",
      "investor_address": "investor_address",
      "investor_telephone": "investor_number",
      "investor_fax": "investor_fax",
      "investor_email": "investor_email1",
      "company_type": "ssc",
      "investor_type": "type1",
      "board_members": [ ],
      "owner": owner
    })
    return company
  },
}
module.exports = functions
