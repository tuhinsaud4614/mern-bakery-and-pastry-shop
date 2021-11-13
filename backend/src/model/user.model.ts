import { Document, model, Schema, Types } from "mongoose";
import { UserGenderType, UserRoleType } from "../utility/types";

interface IUser extends Document {
  firstName: string | null;
  lastName: string | null;
  email: string;
  password: string;
  role: UserRoleType;
  gender: UserGenderType;
  dob: Date | null;
  mobile: string | null;
  address: string | null;
  avatar: string | null;
  area: string | null;
  city: string | null;
  zip: number | null;
}

export type UserDocument = Document<any, any, IUser> &
  IUser & {
    _id: Types.ObjectId;
  };

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      default: null,
    },
    lastName: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    role: {
      type: String,
      required: true,
      enum: {
        values: ["admin", "customer"],
        message: "{VALUE} must be admin or customer",
      },
    },
    gender: {
      type: String,
      default: null,
      enum: {
        values: ["male", "female", "other", null],
        message: "{VALUE} must be male or female or other",
      },
    },
    dob: {
      type: Date,
      default: null,
    },
    mobile: {
      type: String,
      required: false,
      index: {
        unique: true,
        partialFilterExpression: { mobile: { $type: "string" } },
      },
      default: null,
    },
    address: {
      type: String,
      default: null,
    },
    avatar: {
      type: String,
      default: null,
    },
    area: {
      type: String,
      default: null,
    },
    city: {
      type: String,
      default: null,
    },
    zip: {
      type: Number,
      default: null,
    },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

const User = model<IUser>("User", UserSchema);
export default User;
