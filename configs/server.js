'use strict';

import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import apiLimiter from "../src/middlewares/rate-limit-validator.js";
import { connectionDB } from "./mongo.js";
import publicationRoutes from "../src/publications/publication.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const corsOptions = {
    origin: process.env.CORS_ORIGIN?.split(",") || ["http://localhost:5173"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    optionsSuccessStatus: 200,
};

const middlewares = (app) => {
    app.use(express.json());
    app.use(helmet());
    app.use(cors(corsOptions)); 
    app.use(morgan("dev"));
    app.use(apiLimiter);
    app.use("/public", (req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
        next();
    });

    app.use("/public", express.static(path.join(__dirname, "../public")));
};

const connectionMongo = async () => {
    try {
        await connectionDB();
    } catch (error) {
        console.log(` Data Base connection failed, please try again. Error: ${error}`);
    }
};

const routes = (app) => {
    app.use("/blog/v1/publication", publicationRoutes);
};

export const initServer = () => {
    const app = express();
    const timeInit = Date.now();
    try {
        middlewares(app);
        connectionMongo();
        routes(app);
        app.listen(process.env.PORT);
        const elapsedTime = Date.now() - timeInit;
        console.log(`Server running on port ${process.env.PORT} (${elapsedTime}ms)`);
    } catch (error) {
        console.log(`Server failed to start: ${error}`);
    }
};
