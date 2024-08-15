"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Heading,
} from "@chakra-ui/react";
import fetcher from "../../../../utils/fetcher";

const EditNotePage = () => {
    const { id } = useParams();
    const [note, setNote] = useState(null);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const router = useRouter();

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const fetchedNote = await fetcher(`/api/notes/${id}`);
                setNote(fetchedNote);
                setTitle(fetchedNote.title);
                setBody(fetchedNote.body);
            } catch (error) {
                console.error("Failed to fetch note:", error);
            }
        };

        if (id) fetchNote();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await fetcher(`/api/notes/${id}`, {
                method: "PUT",
                body: JSON.stringify({ title, body }),
                headers: { "Content-Type": "application/json" },
            });
            router.push(`/notes/${id}`); // Redirect to the note detail page
        } catch (error) {
            console.error("Failed to update note:", error);
        }
    };

    if (!note) return <div>Loading...</div>;

    return (
        <Box p={4} width={"80%"} margin={"0 auto"}>
            <Heading mb={4}>Edit Note</Heading>
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

export default EditNotePage;
