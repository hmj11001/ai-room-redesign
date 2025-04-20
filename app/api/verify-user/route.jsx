import { NextResponse } from "next/server";
import { db } from "@/config/db";
import { Users } from "@/config/schema";
import { eq } from "drizzle-orm";

export async function POST(req) {
  try {
    const { user } = await req.json();

    const email = user?.primaryEmailAddress?.emailAddress;

    if (!email) {
      return NextResponse.json({ error: "No email provided" }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await db
      .select()
      .from(Users)
      .where(eq(Users.email, email));

    if (existingUser.length === 0) {
      // Insert new user
      const saveResult = await db
        .insert(Users)
        .values({
          name: user?.fullName ?? '',
          email,
          imageUrl: user?.imageUrl ?? '',
        })
        .returning();

      return NextResponse.json({ result: saveResult[0] });
    }

    // Return existing user
    return NextResponse.json({ result: existingUser[0] });

  } catch (e) {
    console.error("Error in verify-user route:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
