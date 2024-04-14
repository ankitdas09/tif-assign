"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true, maxLength: 64 },
    email: { type: String, required: true, maxLength: 128, unique: true },
    password: { type: String, required: true },
}, {
    timestamps: true,
    toJSON: {
        transform: function (doc, ret) {
            ret.id = ret._id;
            ret.created_at = ret.createdAt;
            delete ret._id;
            delete ret.__v;
            delete ret.createdAt;
            delete ret.updatedAt;
            delete ret.password;
        },
    },
});
userSchema.statics.build = function (attrs) {
    return new User(attrs);
};
const User = mongoose_1.default.model("User", userSchema);
exports.User = User;
