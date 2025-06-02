"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push("/dashboard");
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded) {
    return null; 
  }

  if (isSignedIn) {
    return null; 
  }

  return (
    <div
      className="relative h-screen w-screen bg-cover bg-center flex flex-col items-center justify-center text-center px-6"
      style={{
        backgroundImage: "url('/room-background.jpg')",
      }}
    >
      {/* Overlay for better text contrast */}
      <div className="absolute inset-0 bg-white/60"></div>

      {/* Content goes here, positioned above overlay */}
      <div className="relative z-10 max-w-md">
        <header className="text-5xl font-bold text-purple-500 justify-center">AI Interior Design Planner</header>
        <br></br>
        <h2 className="text-lg text-gray-600">Transform your home in seconds!</h2>
        <Link href="/sign-in">
          <Button className="bg-purple-400 hover:bg-gray-600 mt-4">Sign In</Button>
        </Link>
      </div>
    </div>
  );
}
