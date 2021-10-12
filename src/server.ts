import 'reflect-metadata';
import express from 'express';
import "express-async-errors";
import './database';
import cors from "cors"
import { router } from "./routes"
import { errorHandler } from './middlewares/ErrorHandler';

const app = express();
app.use(cors());

app.use(express.json());
app.use(router);

app.use(errorHandler);

app.listen(3000, () => { console.log("Server is running on port 3000"); })
