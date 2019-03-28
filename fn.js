const axios = require('axios');
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
    
    }

}
module.exports = functions;