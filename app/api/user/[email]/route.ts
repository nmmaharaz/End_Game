import { collectionNameObj } from "@/lib/CollectionNameObj";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export const GET = async () => {
    // console.log(req.json())
  const userCollection = await dbConnect(collectionNameObj.userCollection);
  const user = await userCollection.find({}).toArray();
  if (!user) {
    return NextResponse.json({ error: "Cra" }, { status: 409 });
  }
  return NextResponse.json(user);

};