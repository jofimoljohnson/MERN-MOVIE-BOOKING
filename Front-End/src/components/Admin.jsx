import { useDispatch } from "react-redux"
import { sendAdminAuthRequest } from "../api-helpers/api-helpers"
import AuthForm from "./AuthForm"
import { adminActions } from "../store"

const Admin = () => {
  const dispatch=useDispatch()

  const onResponseReceived=(data)=>{
    console.log(data)
    dispatch(adminActions.login())
    localStorage.setItem("adminId",data.id)
    localStorage.setItem("token",data.token)

  }

  const getData=(data)=>{
    console.log("Admin",data)
    sendAdminAuthRequest(data.inputs).then(onResponseReceived)
    .catch((err)=>console.log(err))
  }
  return (
    <div>
      <AuthForm onSubmit={getData} isAdmin={true}/>

    </div>
  )
}

export default Admin