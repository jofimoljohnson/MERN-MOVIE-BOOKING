1)components/Header.js
2)Header.jsx
-------------
import { useState } from "react";

a)    const [value, setValue] = useState(0)
b)   <Tabs textColor="white" indicatorColor="secondary" value={value} 
                      onChange={(e,val)=>setValue(val)}>


   3)create folder src/api-folder/api-folder.js

   4)const [movies, setMovies] = useState([])

    useEffect(() => {
        getAllMovies().then((data)=>setMovies(data.movies)).catch((err)=>console.log(err))
     
    }, []) 

    5)    <Box width={"50%"} margin={"auto"}>
                        <Autocomplete
                            freeSolo
                            options={movies && movies.map((option) => option.title)}
                            renderInput={(params) => 
                            <TextField 
                            sx={{input:{color:"white"}}}
                            variant="standard" 
                            {...params}
                            
                            placeholder="Search Across Multiple Movies"/>}
                        />
                    </Box>

  6)   Router setup
  ------------------
  a)create component Admin.jsx, Movies.jsx,Home.jsx,Auth.jsx

  7)HomePage.jsx
  --------------

   const [movies, setMovies] = useState([])

  useEffect(() => {
    getAllMovies().then((data)=>setMovies(data.movies)).catch((err)=>console.log(err))
  }, [])
  console.log(movies)


<Box margin={'auto'} 
alignItems={'center'} 
display={'flex'} 
width={'80%'}
 justifyContent={'center'} 
 flexWrap={'wrap'}>
{
  movies && movies.slice(0,4).map((movie,index)=>
  <MovieItem key={index} 
  id={movie.id}
  title={movie.title}
  releaseDate={movie.releaseDate}
  posterUrl={movie.posterUrl}
  
  />)
}
</Box>

8)Movie.jsx
------------
9)Create AuthForm.jsx,Auth.jsx,AdminAuth.jsx

---------------------------------------------
a)Auth.jsx
b)AuthForm.jsx
---------------
    const [isSignUp, setIsSignUp] = useState(false)

a) { isSignUp  &&

<>
     <FormLabel sx={labelStyle}>Name</FormLabel>
                    <TextField
                     margin="normal" 
                     variant="standard" 
                     type="text"
                      name="name"/>
</>
                  
                  }

                  b)for the title change 
                  -----------------------
                      <Typography variant="h4" textAlign={'center'}>
            {
                isSignUp?"SignUp":"Login"
            }
       
        </Typography>

c)for the button change 
------------------------
<Button type="submit" 
fullWidth
variant="contained"
 sx={{mt:2,borderRadius:10,bgcolor:"#2b2d42"}}>
{
    isSignUp?"SignUp":"Login"
}
    </Button>


d)for the button change
------------------------
<Button  
onClick={()=>setIsSignUp(!isSignUp)}
fullWidth
 sx={{mt:2,borderRadius:10}}>
    Switch To {isSignUp?"Login":"SignUp"}
    </Button>



10)form validation
--------------------
AuthForm.jsx
-------------

11)To import AuthForm.jsx in Admin Component
12)Auth.jsx
-----------
const getData=(data)=>{
    console.log("Auth",data)

  }
  
 <AuthForm onSubmit={getData} isAdmin={false}/>

 13)Admin.jsx
 --------------
  const getData=(data)=>{
    console.log("Admin",data)
  }

        <AuthForm onSubmit={getData} isAdmin={true}/>

        14)AuthForm.jsx
        ----------------
        const handleSubmit=(e)=>{
        e.preventDefault()
        console.log(inputs)
        onSubmit({inputs,signup:isAdmin?false:isSignUp})

    }

       

    15)next step how to get a request from backend 
    -----------------------------------------------
    api-helpers/api-helpers.jsx
    ----------------------------
    <!-- send user auth request -->
    
    16)Auth.jsx
    -----------

    17) api-helpers/api-helpers.jsx
    -------------------------------
        <!-- send admin auth request -->
  18)Admin.jsx

  19)Install RTK
  create folder src/store/index.js

20)app.jsx
-----------
  const isAdminLoggedIn=useSelector((state)=>state.admin.isLoggedIn)
  const isUserLoggedIn=useSelector((state)=>state.user.isLoggedIn)

21)Admin.jsx
--------------
import { adminActions } from "../store"
import { useDispatch } from "react-redux"

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



  22)Auth.jsx
  ------------
  const dispatch=useDispatch()

  const onResponseReceived=(data)=>{
  dispatch(userActins.login())
  console.log(data)
  localStorage.setItem("user",data.id)

}

 const getData=(data)=>{
    console.log("Auth",data)
    sendUserAuthRequest(data.inputs,data.signup).then(onResponseReceived)
    .catch((err)=>console.log(err))
   
  }
  

  23)App.jsx
  -----------
  to save the localStorage data after refreshing

  const dispatch=useDispatch()

  const isAdminLoggedIn=useSelector((state)=>state.admin.isLoggedIn)
  const isUserLoggedIn=useSelector((state)=>state.user.isLoggedIn)
console.log("isAdminLoggedIn",isAdminLoggedIn)
console.log("isUserLoggedIn",isUserLoggedIn)

  
  useEffect(() => {
   if(localStorage.getItem("userId")){
    dispatch(userActins.login())

   }else if(localStorage.getItem("adminId")){
    dispatch(adminActions.login())

   }
    
  }, [])

  [Authentication completed......]



  24)Header.jsx
  ---------------
  if user and admin not logged in 

   const isAdminLoggedIn=useSelector((state)=>state.admin.isLoggedIn)
    const isUserLoggedIn=useSelector((state)=>state.user.isLoggedIn)



     {
                        !isAdminLoggedIn && !isUserLoggedIn &&<>
                              <Tab LinkComponent={Link} to="/admin" label="Admin"/>
                     <Tab LinkComponent={Link} to="/auth" label="Auth"/>


                        
                        </>
                      }

25)Header.jsx
  ---------------

if user is logged in

 {isUserLoggedIn && (
                                <>
                                    <Tab LinkComponent={Link} to="/user" label="Profile" />
                                    <Tab LinkComponent={Link} to="/" label="Logout" />
                                </>
                            )}


if admin is logged in 


  {
                                isAdminLoggedIn && <>
                                <Tab LinkComponent={Link} to="/add" label="Add Movie" />
                                <Tab LinkComponent={Link} to="/admin" label="Profile" />
                                <Tab LinkComponent={Link} to="/" label="Logout" onClick={()=>logOut(true)}/>

                                
                                </>
                            }


26)Go to the MovieItem.jsx
-----------------------------
 <CardActions >
        <Button
        LinkComponent={Link}
        to={`/booking/${id}`}
        sx={{margin:'auto'}}
         size="small"
           color="primary">
            Book
            </Button>
      </CardActions>

      27)create component Booking.jsx
      28)api-helpers.js

