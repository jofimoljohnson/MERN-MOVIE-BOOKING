import { Dialog, Typography, Box, FormLabel, TextField, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

const labelStyle = { mb: 1, mt: 1 };

const AuthForm = ({ onSubmit, isAdmin }) => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);
        onSubmit({inputs,signup:isAdmin?false:isSignUp})
    };

    return (
        <>
            <Dialog open={true} PaperProps={{ style: { borderRadius: 20 } }}>
                <Box sx={{ ml: "auto", padding: 1 }}>
                    <IconButton>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Typography variant="h4" textAlign={"center"}>
                    {isSignUp ? "SignUp" : "Login"}
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Box
                        display={"flex"}
                        justifyContent={"center"}
                        flexDirection={"column"}
                        width={400}
                        margin={"auto"}
                        alignContent={"center"}
                        padding={6}
                    >
                        {!isAdmin && isSignUp && (
                            <>
                                <FormLabel sx={labelStyle}>Name</FormLabel>
                                <TextField
                                    margin="normal"
                                    variant="standard"
                                    type="text"
                                    value={inputs.name}
                                    onChange={handleChange}
                                    name="name"
                                />
                            </>
                        )}

                        <FormLabel sx={labelStyle}>Email</FormLabel>
                        <TextField
                            margin="normal"
                            variant="standard"
                            type="email"
                            value={inputs.email}
                            onChange={handleChange}
                            name="email"
                        />

                        <FormLabel sx={labelStyle}>Password</FormLabel>

                        <TextField
                            margin="normal"
                            variant="standard"
                            type="password"
                            value={inputs.password}
                            onChange={handleChange}
                            name="password"
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 2, borderRadius: 10, bgcolor: "#2b2d42" }}
                        >
                            {isSignUp ? "SignUp" : "Login"}
                        </Button>

                        {!isAdmin && (
                            <Button onClick={() => setIsSignUp(!isSignUp)} fullWidth sx={{ mt: 2, borderRadius: 10 }}>
                                Switch To {isSignUp ? "Login" : "SignUp"}
                            </Button>
                        )}
                    </Box>
                </form>
            </Dialog>
        </>
    );
};

export default AuthForm;
