import { Router } from "express";
import { Users } from "./controllers/Users"
import { Tags } from "./controllers/Tags";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import { ListUserSentComplimentsController } from "./controllers/ListUserSentComplimentsController";
import { ListUserReceivedComplimentsController } from "./controllers/ListUserReceivedComplimentsController";
import { ListTagsController } from "./controllers/ListTagsController";
import { ListUsersController } from "./controllers/ListUsersController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";



const router = Router();

const users = new Users();
const tags = new Tags();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
const listUserSentComplimentsController = new ListUserSentComplimentsController();
const listUserReceivedComplimentsController = new ListUserReceivedComplimentsController();
const listTagsController = new ListTagsController();
const listUsersController = new ListUsersController();

router.post("/register", users.handle);
router.post("/tags/create", ensureAuthenticated, ensureAdmin, tags.handle);
router.post("/login", authenticateUserController.handle);
router.post("/compliments/create", ensureAuthenticated, createComplimentController.handle);

router.get("/users/compliments/sent", ensureAuthenticated, listUserSentComplimentsController.handle);
router.get("/users/compliments/received", ensureAuthenticated, listUserReceivedComplimentsController.handle);
router.get("/tags/read", ensureAuthenticated, listTagsController.handle);
router.get("users", ensureAdmin, ensureAuthenticated, listUsersController.handle);

export { router };