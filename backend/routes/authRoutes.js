import express from "express";
import { reg ,login} from "../controller/authcontroller.js";


const router = express.Router();

router.post('/register', reg);
router.post('/login',login)

export default router;
