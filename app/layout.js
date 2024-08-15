import { ChakraProvider } from "@chakra-ui/react";
import Header from "./components/Header";

export const metadata = {
    title: "Notes App",
    description: "A simple notes application built with Next.js and Chakra-UI",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <ChakraProvider>
                    <Header />
                    <main>{children}</main>
                </ChakraProvider>
            </body>
        </html>
    );
}
