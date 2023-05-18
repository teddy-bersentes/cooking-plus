import { Ref } from "@typegoose/typegoose";
import { User } from "~/user"

export type NodeRef<T> = Ref<T, ObjectId & { _id: ObjectId }>;
export type UserRef = Ref<User, string> & string

export type CreateArgs<T> = Omit<T, '_id' | 'createdAt' | 'updatedAt' | 'deletedAt'>;