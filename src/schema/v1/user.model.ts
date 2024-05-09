import mongoose from "mongoose";

interface UserAttrs {
    name: string;
    email: string;
    password: string;
}

interface UserDoc extends mongoose.Document {
    name: string;
    email: string;
    password: string;
    created_at: Date;
    updated_at: Date;
}

interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc
}

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, maxLength: 64 },
        email: { type: String, required: true, maxLength: 128, unique: true },
        password: { type: String, required: true },
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
                delete ret.password;
            },
        },
    }
);

userSchema.statics.build = function (attrs: UserAttrs) {
    return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
