import mongoose from "mongoose";

export interface MemberAttrs {
    community: string;
    user: string;
    role: string;
}

interface MemberDoc extends mongoose.Document {
    community: string;
    user: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}

interface MemberModel extends mongoose.Model<MemberDoc> {
    build(attrs: MemberAttrs): MemberDoc;
}

const memberSchema = new mongoose.Schema(
    {
        community: { type: mongoose.Types.ObjectId, ref: "Community", required: true },
        user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
        role: { type: mongoose.Types.ObjectId, ref: "Role", required: true },
    },
    {
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
    }
);

memberSchema.statics.build = function (attrs: MemberAttrs) {
    return new Member(attrs);
};

const Member = mongoose.model<MemberDoc, MemberModel>("Member", memberSchema);

export { Member };
