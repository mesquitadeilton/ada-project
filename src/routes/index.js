import express from "express";
import router from "./studentRoutes.js";

const routes = (app) => {
    app.route("/").get((req, res) => res.status(200).send("ada-project"));
}

export default routes;