import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import Replicate from "replicate";
import { storage } from "@/config/firebaseConfig";
import { getDownloadURL, uploadString } from "firebase/storage";
import { AiGeneratedImage } from "@/config/schema";
import { ref } from "firebase/storage";
import axios from "axios";
import { db } from "@/config/db";

const replicate = new Replicate({
  auth: process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN,
});

export async function POST(req) {
  // Parse incoming JSON data
  const { imageUrl, roomType, designType, additionalReq, userEmail, ogImage } = await req.json();

  console.log("POST body:", { imageUrl, roomType, designType, additionalReq, userEmail, ogImage });

  try {
    // Prepare input for Replicate model
    const input = {
      image: imageUrl,
      prompt: `A ${roomType} with a ${designType} style interior.`,
    };

    // Run Replicate model
    const output = await replicate.run(
      "adirik/interior-design:76604baddc85b1b4616e1c6475eca080da339c8875bd4996705440484a6eac38",
      { input }
    );
    console.log("Replicate output:", output);

    // Use first image if output is array
    const aiImageUrl = Array.isArray(output) ? output[0] : output;

    // Convert AI image URL to base64
    const base64Image = await ConvertImageToBase64(aiImageUrl);

    // Save base64 image to Firebase Storage
    const fileName = Date.now() + ".png";
    const storageRef = ref(storage, "room-redesign/" + fileName);
    await uploadString(storageRef, base64Image, "data_url");
    const downloadUrl = await getDownloadURL(storageRef);
    console.log("Firebase download URL:", downloadUrl);

    // Save record to database
    const dbResult = await db.insert(AiGeneratedImage).values({
      roomType: roomType,
      designType: designType,
      ogImage: ogImage,
      aiImage: downloadUrl,
      userEmail: userEmail,
    }).returning({ id: AiGeneratedImage.id });

    console.log("DB insert result:", dbResult);

    // Return URL of saved AI image
    return NextResponse.json({ result: downloadUrl });
  } catch (e) {
    console.error("Error in /api/redesign-room:", e);
    return NextResponse.json({ error: e.message || "Unknown error" }, { status: 500 });
  }
}

async function ConvertImageToBase64(imageUrl) {
  const resp = await axios.get(imageUrl, { responseType: "arraybuffer" });
  const base64ImageRaw = Buffer.from(resp.data).toString("base64");
  return "data:image/png;base64," + base64ImageRaw;
}
