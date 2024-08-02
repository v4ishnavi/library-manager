import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";

import { Book } from "./models/bookmodel.js";
import booksRoute from "./routes/booksRoute.js";
import cors from 'cors';
const app = express();
// middleware for parsing request body
app.use(express.json());
// middleware for CORS policy 
app.use(cors());
// middleware for routing 
app.use('/books', booksRoute);

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("welcome to mern stack");
}); // gets resource from server

// app.use(cors(
//   {
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   }
// ))
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("app connected to database");
    app.listen(PORT, () => {
      console.log(`app is listening to port: ${PORT}`);
    }); //only want it to run after we connect to database
  })
  .catch((error) => {
    console.log(error);
  });
