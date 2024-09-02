import { AppBar, Autocomplete, Box, Toolbar, TextField, Tabs, Tab } from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";
import { useState, useEffect } from "react";
import { getAllMovies } from "../api-helpers/api-helpers";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActins,adminActions } from "../store";

const Header = () => {
    const dispatch=useDispatch()
    const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
    const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);

    const [value, setValue] = useState();
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        getAllMovies()
            .then((data) => setMovies(data.movies))
            .catch((err) => console.log(err));
    }, []);


    const logOut=(isAdmin)=>{
        dispatch(isAdmin?adminActions.logout():userActins.logout())

    }






    return (
        <>
            <AppBar position="sticky" sx={{ bgcolor: "#222" }}>
                <Toolbar>
                    <Box width={"20%"} LinkComponent={Link} to="/">
                        <MovieIcon />
                    </Box>

                    <Box width={"30%"} margin={"auto"}>
                        <Autocomplete
                            freeSolo
                            options={movies && movies.map((option) => option.title)}
                            renderInput={(params) => (
                                <TextField
                                    sx={{ input: { color: "white" } }}
                                    variant="standard"
                                    {...params}
                                    placeholder="Search Across Multiple Movies"
                                />
                            )}
                        />
                    </Box>

                    <Box display={"flex"}>
                        <Tabs
                            textColor="inherit"
                            indicatorColor="secondary"
                            value={value}
                            onChange={(e, val) => setValue(val)}
                        >
                            <Tab LinkComponent={Link} to="/movies" label="Movies" />

                            {!isAdminLoggedIn && !isUserLoggedIn && (
                                <>
                                    <Tab LinkComponent={NavLink} to="/admin" label="Admin" />
                                    <Tab LinkComponent={NavLink} to="/auth" label="Auth" />
                                </>
                            )}

                            {isUserLoggedIn && (
                                <>
                                    <Tab LinkComponent={Link} to="/user" label="user" />
                                    <Tab LinkComponent={Link} to="/" label="Logout"  onClick={()=>logOut(false)}/>
                                </>
                            )}


                            {
                                isAdminLoggedIn && <>
                                <Tab LinkComponent={Link} to="/add" label="Add Movie" />
                                <Tab LinkComponent={Link} to="/user-admin" label="Profile" />
                                <Tab LinkComponent={Link} to="/" label="Logout" onClick={()=>logOut(true)}/>

                                
                                </>
                            }




                        </Tabs>
                    </Box>
                </Toolbar>
            </AppBar>
        </>
    );
};

export default Header;
