import { useDispatch } from "react-redux"
import { sendUserAuthRequest } from "../api-helpers/api-helpers"
import AuthForm from "./AuthForm"
import { userActins } from "../store"

const Auth = () => {
const dispatch=useDispatch()

const onResponseReceived=(data)=>{
  dispatch(userActins.login())
  console.log(data)
  localStorage.setItem("userId",data.id)

}



  const getData=(data)=>{
    console.log("Auth",data)
    sendUserAuthRequest(data.inputs,data.signup).then(onResponseReceived)
    .catch((err)=>console.log(err))
   
  }
  
  return (
    <div>
      <AuthForm onSubmit={getData} isAdmin={false}/>
    </div>
  )
}

export default Auth