"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const dotenv_1 = __importDefault(require("dotenv"));
const auth_routes_1 = require("./routes/auth.routes");
const error_handler_1 = require("./middlewares/error-handler");
const mongoose_1 = __importDefault(require("mongoose"));
const community_routes_1 = require("./routes/community.routes");
const role_routes_1 = require("./routes/role.routes");
const member_routes_1 = require("./routes/member.routes");
dotenv_1.default.config();
exports.config = {
    jwtSecret: process.env.JWT_SECRET
};
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/v1", auth_routes_1.AuthRouter);
app.use("/v1", community_routes_1.CommunityRouter);
app.use("/v1", role_routes_1.RoleRouter);
app.use("/v1", member_routes_1.MemberRouter);
app.use(error_handler_1.errorHandler);
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(process.env.MONGO_URI);
            console.log("[SUCCESS] DB CONNECTED!");
            app.listen(process.env.PORT, () => {
                console.log("Started on PORT", process.env.PORT);
            });
        }
        catch (error) {
            console.log("[ERROR] DB CONN FAILED!");
        }
    });
}
start();
