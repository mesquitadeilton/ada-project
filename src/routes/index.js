import express from "express";
import routerStudent from "./studentRoutes.js";
import routerLogin from "./loginRouter.js";

const routes = (app) => {
    app.use(routerStudent);
    app.use(routerLogin);
}

export default routes;