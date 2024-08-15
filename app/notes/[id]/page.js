"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Box, Heading, Text, Button, Flex } from "@chakra-ui/react";
import fetcher from "../../../utils/fetcher";
import { format, isValid } from "date-fns";

const NotePage = () => {
    const { id } = useParams();
    const [note, setNote] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const fetchedNote = await fetcher(`/api/notes/${id}`);
                setNote(fetchedNote);
            } catch (error) {
                console.error("Failed to fetch note:", error);
            }
        };

        if (id) fetchNote();
    }, [id]);

    const date = new Date(note?.updatedAt);
    const formattedDate = isValid(date)
        ? format(date, "dd MMM yyyy, HH:mm")
        : "Date not available";

    if (!note) return <div>Loading...</div>;

    return (
        <Box p={4} width={"800px"} margin={"20px auto"} borderWidth={2}>
            <Flex>
                <Button variant={"link"} onClick={() => router.push("/")}>
                    ⬅️ Back
                </Button>
                <Heading marginLeft={"80px"} ml={4} size="lg">
                    Note Detail
                </Heading>
            </Flex>
            <Flex justify="space-between" mt={4}>
                <Text
                    marginLeft={"80px"}
                    fontSize={"large"}
                    fontWeight={"bold"}
                >
                    {note.title}
                </Text>
                <Text fontSize={"small"}>{formattedDate}</Text>
            </Flex>
            <Text marginLeft={"80px"} mt={2}>
                {note.body}
            </Text>
            <Button
                marginLeft={"80px"}
                mt={4}
                onClick={() => router.push(`/notes/${id}/edit`)}
            >
                Edit Note
            </Button>
        </Box>
    );
};

export default NotePage;
