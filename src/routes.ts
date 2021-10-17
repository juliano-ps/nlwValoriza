import { Router } from "express";
import { CreateUserController } from "./controllers/CreateUserController"
import { CreateTagsController } from "./controllers/CreateTagController";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import { ListUserSentComplimentsController } from "./controllers/ListUserSentComplimentsController";
import { ListUserReceivedComplimentsController } from "./controllers/ListUserReceivedComplimentsController";
import { ListTagsController } from "./controllers/ListTagsController";
import { ListUsersController } from "./controllers/ListUsersController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

const router = Router();

const createUserController = new CreateUserController();
const createTagsController = new CreateTagsController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
const listUserSentComplimentsController = new ListUserSentComplimentsController();
const listUserReceivedComplimentsController = new ListUserReceivedComplimentsController();
const listTagsController = new ListTagsController();
const listUsersController = new ListUsersController();

router.post("/register", createUserController.handle);
router.post("/tags/create", ensureAuthenticated, ensureAdmin, createTagsController.handle);
router.post("/login", authenticateUserController.handle);
router.post("/compliments/create", ensureAuthenticated, createComplimentController.handle);

router.get("/users/compliments/sent", ensureAuthenticated, listUserSentComplimentsController.handle);
router.get("/users/compliments/received", ensureAuthenticated, listUserReceivedComplimentsController.handle);
router.get("/tags/read", ensureAuthenticated, listTagsController.handle);
router.get("/users", ensureAuthenticated, ensureAdmin, listUsersController.handle);

export { router };