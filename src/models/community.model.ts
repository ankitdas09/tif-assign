import mongoose from "mongoose";

interface CommityAttrs {
    name: string;
    slug: string;
    owner: string;
}

interface CommunityDoc extends mongoose.Document {
    name: string;
    slug: string;
    owner: string;
    createdAt: Date;
    updatedAt: Date;
}

interface CommunityModel extends mongoose.Model<CommunityDoc> {
    build(attrs: CommityAttrs): CommunityDoc;
}

const communitySchema = new mongoose.Schema(
    {
        name: { type: String, required: true, maxLength: 64 },
        slug: { type: String, required: true, maxLength: 255, unique: true },
        owner: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    },
    {
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
    }
);

communitySchema.statics.build = function (attrs: CommityAttrs) {
    return new Community(attrs);
};

const Community = mongoose.model<CommunityDoc, CommunityModel>("Community", communitySchema);

export { Community };
