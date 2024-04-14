"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true, maxLength: 64, unique: true },
    scopes: { type: [String], default: [] },
}, {
    timestamps: true,
    toJSON: {
        transform: function (doc, ret) {
            ret.id = ret._id;
            ret.created_at = ret.createdAt;
            ret.updated_at = ret.updatedAt;
            delete ret._id;
            delete ret.__v;
            delete ret.createdAt;
            delete ret.updatedAt;
            delete ret.scopes;
        },
    },
});
userSchema.statics.build = function (attrs) {
    return new Role(attrs);
};
const Role = mongoose_1.default.model("Role", userSchema);
exports.Role = Role;
