import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import "express-async-errors";
import './database';
import { router } from "./routes"

const app = express();

app.use(express.json());
app.use(router);

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  if(error instanceof Error) {
    return response.status(400).json({Error: error.message});
  }

  return response.status(500).json({Message: "Internal Server Error"});
});

app.listen(3000, () => { console.log("Server is running on port 3000"); })
