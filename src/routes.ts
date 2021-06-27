import { Router } from "express";
import { Users } from "./controllers/Users"
import { Tags } from "./controllers/Tags";
import { ensureAdmin } from "./middlewares/ensureAdmin";

const router = Router();

const users = new Users()
const tags = new Tags()

router.post("/register", users.handle);
router.post("/tags/create", ensureAdmin, tags.handle)

export { router };