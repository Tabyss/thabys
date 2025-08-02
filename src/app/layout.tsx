import type { Metadata } from "next";
import '../styles/global.scss';
import { Bebas_Neue } from "next/font/google";
import InitialLoader from "@/components/InitialLoader/InitialLoader";
import { PageTransitionProvider } from "@/components/PageTransitionContext";
import Navbar from "@/components/Navbar/Navbar";
import { AuthProvider } from "@/context/auth/AuthProvider";

const bebas = Bebas_Neue({
    weight: "400",
    style: 'normal',
    variable: '--font-bebas',
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
            <body className={`${bebas.className}`}>
                <PageTransitionProvider>
                    <InitialLoader>
                        <AuthProvider>
                            <Navbar />
                            {children}
                        </AuthProvider>
                    </InitialLoader>
                </PageTransitionProvider>
            </body>
        </html>
    );
}
