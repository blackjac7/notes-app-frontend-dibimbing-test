"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Box, Heading, Text, Button, Flex } from "@chakra-ui/react";
import { format } from "date-fns";

const NoteCard = ({ note, onDelete }) => {
    const router = useRouter();

    const formattedDate = format(
        new Date(note.updatedAt),
        "dd MMM yyyy, HH:mm"
    );

    return (
        <Box
            borderWidth={1}
            borderRadius="md"
            p={4}
            mb={4}
            width={"500px"}
            margin={"20px auto"}
        >
            <Flex justify="space-between" mt={4}>
                <Heading size="md">{note.title}</Heading>
                <Text>{formattedDate}</Text>
            </Flex>
            <Text mt={2}>{note.body}</Text>

            <Flex justify="space-between" mt={4}>
                <Button onClick={() => router.push(`/notes/${note.id}`)}>
                    View
                </Button>
                <Button colorScheme="red" onClick={onDelete}>
                    Delete
                </Button>
            </Flex>
        </Box>
    );
};

export default NoteCard;
