import express from "express";
import path from "path";

import routerStudent from "./studentRoutes.js";
import routerProfessor from "./professorRouter.js";
import routerClass from "./classRouter.js";
import routerLogin from "./loginRouter.js";

const routes = (app) => {
    app.use(express.static('./src/views'));

    app.get("/", (req, res) => {
        res.sendFile(path.resolve("./src/views/login.html"));
    });
    app.get("/login.html", (req, res) => {
        res.sendFile(path.resolve("./src/views/login.html"));
    });
    app.get("/cadastrar.html", (req, res) => {
        res.sendFile(path.resolve("./src/views/cadastrar.html"));
    });
    app.get("/dashboard.html", (req, res) => {
        res.sendFile(path.resolve("./src/views/dashboard.html"));
    });
    app.get("/dashboard/turma.html", (req, res) => {
        res.sendFile(path.resolve("./src/views/turma.html"));
    });
    app.get("/professor/criar_turma.html", (req, res) => {
        res.sendFile(path.resolve("./src/views/criar_turma.html"));
    });

    app.use(routerStudent);
    app.use(routerProfessor);
    app.use(routerClass);
    app.use(routerLogin);
}

export default routes;