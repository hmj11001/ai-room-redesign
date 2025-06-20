import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import {Outfit} from 'next/font/google';
import Provider from "./provider";

export const metadata = {
  title: "AI Room Design",
  description: "Generated by create next app",
};
const outfit=Outfit({subsets:['latin']})

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={outfit.className}
      >
        <Provider>
        {children}  {/* keeps the layout file on the server side */} 
        </Provider>
      </body>
    </html>
    </ClerkProvider>
  );
}
