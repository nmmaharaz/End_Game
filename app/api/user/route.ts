import { collectionNameObj } from "@/lib/CollectionNameObj";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

interface users {
  name?: string;
  user_name?: string;
  email?: string;
  password?: string;
  confirm_password?: string;
}

export const POST = async (req: Request) => {
    const body: users = await req.json();
    const userCollection = await dbConnect(collectionNameObj.userCollection)
    const result = await userCollection.insertOne(body)
    console.log(result, "this is my result function")
    return NextResponse.json(result);
};
