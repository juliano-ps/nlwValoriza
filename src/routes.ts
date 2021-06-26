import { Router } from "express";
import { Users } from "./controllers/Users"

const router = Router();

const users = new Users

router.post("/register", users.handle);

export { router };