"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Member = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const memberSchema = new mongoose_1.default.Schema({
    community: { type: mongoose_1.default.Types.ObjectId, ref: "Community", required: true },
    user: { type: mongoose_1.default.Types.ObjectId, ref: "User", required: true },
    role: { type: mongoose_1.default.Types.ObjectId, ref: "Role", required: true },
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
        },
    },
});
memberSchema.statics.build = function (attrs) {
    return new Member(attrs);
};
const Member = mongoose_1.default.model("Member", memberSchema);
exports.Member = Member;
