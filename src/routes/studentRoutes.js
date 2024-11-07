import express from "express";
import StudentController from "../controllers/studentController.js";

const router = express.Router();

router.post("/alunos", StudentController.createStudent);
router.get("/alunos", StudentController.getStudents);

export default router;