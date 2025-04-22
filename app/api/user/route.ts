import { collectionNameObj } from "@/lib/CollectionNameObj";
import dbConnect from "@/lib/dbConnect";
import bcrypt from "bcryptjs";
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
    const userInfo = await userCollection.findOne({email:body?.email})
    if(userInfo){
      return NextResponse.json({ error: "Email already exists" }, { status: 409 });
    }
    const existingUserName = await userCollection.findOne({user_name:body?.user_name});
    if (existingUserName)
      return NextResponse.json({ error: "Email already exists" }, { status: 409 });

      const hashPassword = await bcrypt.hash(body?.password||"", 10)

      body.password = hashPassword; 
      const confirmHashPassword = await bcrypt.hash(body.confirm_password||"", 10)
      body.confirm_password = confirmHashPassword; 
      const result = await userCollection.insertOne({
        ...body,
        user_photo: "",
      });
    return NextResponse.json(result);
};

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  const password = searchParams.get("password");
  const userCollection = await dbConnect(collectionNameObj.userCollection);
  const user = await userCollection.findOne({email});
  if (!user) {
    return NextResponse.json({ error: "Cra" }, { status: 409 });
  }
  const hashPassword = await bcrypt.compare(password||"", user.password)
  if(!hashPassword)return NextResponse.json({ ok: false, message: "Invaild Password" });
  return NextResponse.json(user);
};