import express from "express";
import router from "./studentRoutes.js";

const routes = (app) => {
    app.use(router);
}

export default routes;