import express from "express";
import helmet from "helmet";
import cors from "cors";

function FrameworkLoader(app: express.Application) {
    app.use(helmet());
    app.use(cors());
}

export default FrameworkLoader;
