import axios from "axios";

export const getAllMovies = async () => {
    const response = await axios.get("/movie").catch((err) => console.log(err));
    if (response.status !== 200) {
        return console.log("No Data");
    }
    const data = await response.data;
    return data;
};

export const sendUserAuthRequest = async (data, signup) => {
    const res = await axios
        .post(`/user/${signup ? "signup" : "login"}`, {
            name: signup ? data.name : "",
            email: data.email,
            password: data.password,
        })
        .catch((err) => console.log(err));

    if (res.status !== 200 && res.status !== 201) {
        console.log("Unexpected Error Occured");
    }
    const resData = await res.data;
    return resData;
};

export const sendAdminAuthRequest = async (data) => {
    const response = await axios
        .post("/admin/login", {
            email: data.email,
            password: data.password,
        })
        .catch((err) => console.log(err));

    if (response.status !== 200) {
        return console.log("Unexpected Error");
    }
    const resData = await response.data;
    return resData;
};

export const getMovieDetails = async (id) => {
    const res = await axios.get(`/movie/${id}`).catch((err) => console.log(err));
    if (res.status !== 200) {
        return console.log("Unexpected Error");
    }
    const resData = await res.data;
    return resData;
};


