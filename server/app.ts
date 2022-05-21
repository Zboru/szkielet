import express from "express";
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
require("dotenv").config();
const path = require('path');
require("./config/database.config");
import bookRoutes from "./routes/books.route";
import authorRoutes from "./routes/authors.route";
class App {
    public express: express.Application;

    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }

    private middleware(): void {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: true }));
        this.express.use(cookieParser(process.env.COOKIE_SECRET));
        this.express.use(express.static(path.join(__dirname, '../ui/build')));
    }

    private routes(): void {

        this.express.use(bookRoutes);
        this.express.use(authorRoutes);

        // API Routes
        this.express.get("/1", (req, res, next) => {
            res.send("1");
            // res.sendFile(path.join(__dirname, '../ui/build/index.html'));
        });

        // Frontend route
        this.express.get("/", (req, res, next) => {
            res.sendFile(path.join(__dirname, '../ui/build/index.html'));
        });

        // handle undefined routes
        this.express.use("*", (req, res, next) => {
            res.send("404");
        });
    }
}
export default new App().express;