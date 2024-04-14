import mongoose from "mongoose";

interface UserAttrs {
    name: string;
    scopes: string[];
}

export interface RoleDoc extends mongoose.Document {
    name: string;
    scopes: string[];
}

interface RoleModel extends mongoose.Model<RoleDoc> {
    build(attrs: UserAttrs): RoleDoc;
}

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, maxLength: 64, unique: true },
        scopes: { type: [String], default: [] },
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
                delete ret.scopes;
            },
        },
    }
);

userSchema.statics.build = function (attrs: UserAttrs) {
    return new Role(attrs);
};

const Role = mongoose.model<RoleDoc, RoleModel>("Role", userSchema);

export { Role };
