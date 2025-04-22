import { collectionNameObj } from "@/lib/CollectionNameObj";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
  const userCollection = await dbConnect(collectionNameObj.userCollection);
  const result = await userCollection.find({}).toArray();
  return NextResponse.json(result); 
}