import express from "express";
import { login } from "../controllers/register.js";
const routes = express.Router();
routes.post("/login", login);

export default routes;
