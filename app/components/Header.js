import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import Link from "next/link";

const Header = () => (
    <Box p={4} bg="teal.500" color="white">
        <Heading size="lg" textAlign={"center"}>
            <Link href="/">Notes App</Link>
        </Heading>
    </Box>
);

export default Header;
