import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { Provider } from "react-redux";
import {store} from './store'
axios.defaults.baseURL="https://movie-booking-app-backend.onrender.com"
ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
      <Provider store={store}> 
         <App />
         </Provider>
    </BrowserRouter>
);
