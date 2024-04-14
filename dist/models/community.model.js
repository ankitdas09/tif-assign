"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Community = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const communitySchema = new mongoose_1.default.Schema({
    name: { type: String, required: true, maxLength: 64 },
    slug: { type: String, required: true, maxLength: 255, unique: true },
    owner: { type: mongoose_1.default.Types.ObjectId, ref: "User", required: true },
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
        },
    },
});
communitySchema.statics.build = function (attrs) {
    return new Community(attrs);
};
const Community = mongoose_1.default.model("Community", communitySchema);
exports.Community = Community;
