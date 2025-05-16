import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import Replicate from "replicate";
import { storage } from "@/config/firebaseConfig";
import { getDownloadURL, uploadString } from "firebase/storage";
import { AiGeneratedImage } from "@/config/schema";
import { useUser } from "@clerk/nextjs";

const replicate = new Replicate({
    auth: process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN
});


export async function POST(req){
    // const {user}=useUser();
    const {imageUrl, roomType, designType, additionalReq, userEmail}=await req.json();

    // convert image to AI image using replicate

    try{  
        const input = {
        image: imageUrl,
        prompt: 'A ' +roomType+' with a ' +designType+ ' style interior.'
    };

   // const output = await replicate.run("adirik/interior-design:76604baddc85b1b4616e1c6475eca080da339c8875bd4996705440484a6eac38", { input });
    // await writeFile("output.png", output);
   // console.log(output)
   // return NextResponse.json({result:output})
    // Convert output url to base64 image
    const output=""
    const base64Image=await ConvertImageToBase64(output);

    //save base64 to firebase
    const fileName=Date.now()+'.png';
    const storageRef=ref(storage, 'room-redesign/'+fileName);
    await uploadString(storageRef,base64Image, 'data_url');
    const downloadUrl=await getDownloadURL(storageRef);
    console.log(downloadUrl);
    //save all to database

    const dbResult=await db.insert(AiGeneratedImage).values({
        roomType:roomType,
        designType:designType,
        ogImage:ogImage,
        aiImage:downloadUrl,
        userEmail:userEmail
    }).returning({id:AiGeneratedImage.id});
    console.log(dbResult);
    return NextResponse.json({'result':dbResult[0]});

    }catch(e){
        return NextResponse.json({error:e})
    }


    return NextResponse.json({result:'Hello'})
}
async function ConvertImageToBase64(imageUrl){
    const resp=await axios.get(imageUrl, {responseType: 'arraybuffer'});
    const base64ImageRaw=Buffer.from(resp.data).toString('base64')
    return "data:image/png;base64,"+base64ImageRaw;
}