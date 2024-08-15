"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Heading, Button } from "@chakra-ui/react";
import NoteCard from "./components/NoteCard";
import fetcher from "../utils/fetcher";
import "./style.css";

const HomePage = () => {
    const [notes, setNotes] = useState([]);
    const router = useRouter();

    useEffect(() => {
        // Fetch notes from the API on component mount
        const fetchNotes = async () => {
            try {
                const fetchedNotes = await fetcher("/api/notes");
                setNotes(fetchedNotes);
            } catch (error) {
                console.error("Failed to fetch notes:", error);
            }
        };

        fetchNotes();
    }, []);

    const handleDelete = async (noteId) => {
        try {
            await fetcher(`/api/notes/${noteId}`, {
                method: "DELETE",
            });
            // Remove the deleted note from the state
            setNotes(notes.filter((note) => note.id !== noteId));
        } catch (error) {
            console.error("Failed to delete note:", error);
        }
    };

    return (
        <Box p={4} margin={"0 auto"} width={"500px"}>
            <Heading mb={4}>Notes</Heading>
            <Button
                mb={4}
                colorScheme="teal"
                onClick={() => router.push("/notes/new")}
            >
                Create New Note
            </Button>
            {notes.length > 0 ? (
                notes.map((note) => (
                    <NoteCard
                        key={note.id}
                        note={note}
                        onDelete={() => handleDelete(note.id)}
                    />
                ))
            ) : (
                <p>Tidak ada catatan</p>
            )}
        </Box>
    );
};

export default HomePage;
