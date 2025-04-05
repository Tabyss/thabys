import type { Metadata } from "next";
import '../styles/global.scss'
import { Oswald } from "next/font/google";
import Navbar from "@/components/Navbar/Navbar";

const oswald = Oswald({
    variable: '--font-oswald',
    subsets: ["latin"]
});

export const metadata: Metadata = {
    title: "Thabys",
    description: "Website All about me",
    icons: {
        icon: "/favicon.gif",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${oswald.className}`}>
                <Navbar />
                {children}
            </body>
        </html>
    );
}
