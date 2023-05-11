const config = {
    method: 'GET',
    mode: 'no-cors',
    headers: {
        'content-type': 'application/json'
    }
};
export async function fetchAPIResponse(url) {
    return fetch(`/${url}`, config)
        .then(res => {
            // a non-200 response code
            if (!res.ok) {
                // create error instance with HTTP status text
                const error = new Error(res.statusText);
                error.json = res.json();
                throw error;
            }

            return res.json();
        });
}
