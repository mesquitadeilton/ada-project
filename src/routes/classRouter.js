import express from "express";
import ClassController from "../controllers/classController.js";

const router = express.Router();

router.post("/cadastrar/turma", ClassController.createClass);
router.get("/turmas", ClassController.getClasses);

export default router;