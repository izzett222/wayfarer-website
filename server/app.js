import express from "express";
import morgan from "morgan";
import {error} from "celebrate";
import users from "./routes/usersRoute";
import trips from "./routes/tripsRoute";
import booking from "./routes/bookingRoute"
// import  "config" from "config";
const app = express();
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use("/api/auth", users);
app.use("/api/trips", trips)
app.use("/api/booking", booking);
// app.use("/trips", trips)
// app.use(error())

export default app;

