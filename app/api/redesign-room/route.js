import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import Replicate from "replicate";

const replicate = new Replicate({
    auth: process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN
});


export async function POST(req){
    const {imageUrl, roomType, designType, additionalReq}=await req.json();

    // convert image to AI image using replicate

    try{  
        const input = {
        image: imageUrl,
        prompt: 'A ' +roomType+' with a ' +designType+ ' style interior.'
    };

    const output = await replicate.run("adirik/interior-design:76604baddc85b1b4616e1c6475eca080da339c8875bd4996705440484a6eac38", { input });
    // await writeFile("output.png", output);
    console.log(output)
    return NextResponse.json({result:output})
    // Convert output url to base64 image


    //save base64 to firebase


    //save all to database
    }catch(e){
        return NextResponse.json({error:e})
    }


    return NextResponse.json({result:'Hello'})
}