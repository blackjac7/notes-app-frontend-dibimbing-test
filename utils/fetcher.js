const fetcher = async (url, method) => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + url, method);
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    return response.json();
};

export default fetcher;
