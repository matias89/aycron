const baseUrl = 'http://localhost:3001';
const headers = {
    'Content-Type': 'application/json',
};

const get = async (url: string) => {
    const response = await fetch(`${baseUrl}/${url}`, { headers });
    const data = await response.json();
    return data;
};

const post = async (url: string, body: any) => {
    const response = await fetch(`${baseUrl}/${url}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
}

export {
    get,
    post,
}