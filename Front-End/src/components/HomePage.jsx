import { Box, Button, Typography } from "@mui/material";
import MovieItem from "./MovieItem";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAllMovies } from "../api-helpers/api-helpers";

const HomePage = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        getAllMovies()
            .then((data) => setMovies(data.movies))
            .catch((err) => console.log(err));
    }, []);
    console.log(movies);

    return (
        <Box width={"100%"} height={"100%"} marginTop={2} margin={"auto"}>
            <Box margin={"auto"} width={"80%"} height={"40vh"} padding={2}>
                <img
                    src="https://static.toiimg.com/thumb/msid-109056222,width-1280,resizemode-4/109056222.jpg"
                    alt="kill"
                    width={"100%"}
                    height={"100%"}
                />
            </Box>

            <Box padding={5} margin={"auto"}>
                <Typography variant="h4" textAlign={"center"}>
                    Latest Releases
                </Typography>
            </Box>

            <Box
                margin={"auto"}
                alignItems={"center"}
                display={"flex"}
                width={"80%"}
                justifyContent={"center"}
                flexWrap={"wrap"}
            >
                {movies &&
                    movies
                        .slice(0, 4)
                        .map((movie, index) => (
                            <MovieItem
                                key={index}
                                id={movie._id}
                                title={movie.title}
                                releaseDate={movie.releaseDate}
                                posterUrl={movie.posterUrl}
                            />
                        ))}
            </Box>

            <Box display={"flex"} padding={"5"} margin={"auto"}>
                <Button LinkComponent={Link} to="/movies" variant="outlined" sx={{ margin: "auto", color: "#2b2d42" }}>
                    View All Movies
                </Button>
            </Box>
        </Box>
    );
};

export default HomePage;
