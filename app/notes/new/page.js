"use client";

import React, { useState } from "react";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Heading,
} from "@chakra-ui/react";
import fetcher from "../../../utils/fetcher";
import { useRouter } from "next/navigation";

const NewNotePage = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await fetcher("/api/notes", {
                method: "POST",
                body: JSON.stringify({ title, body }),
                headers: { "Content-Type": "application/json" },
            });
            router.push("/"); // Redirect to the main page or notes list
        } catch (error) {
            console.error("Failed to create note:", error);
        }
    };

    return (
        <Box p={4} width={"80%"} margin={"0 auto"}>
            <Heading mb={4}>Create New Note</Heading>
            <form onSubmit={handleSubmit}>
                <FormControl mb={4}>
                    <FormLabel htmlFor="title">Title</FormLabel>
                    <Input
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </FormControl>
                <FormControl mb={4}>
                    <FormLabel htmlFor="body">Body</FormLabel>
                    <Textarea
                        id="body"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        required
                    />
                </FormControl>
                <Button type="submit" colorScheme="teal">
                    Save
                </Button>
            </form>
        </Box>
    );
};

export default NewNotePage;
