import express from "express";
import {
  getUser,
  getFriends,
  addRemoveFriend,
  getUsers,
} from "../controllers/user.js";
const routes = express.Router();

/*READ*/
routes.get("/:id", getUser);
routes.get("/:id/friends", getFriends);
routes.get("/", getUsers);
/*UPDATE*/
routes.patch("/:id/:friendId", addRemoveFriend);
export default routes;
