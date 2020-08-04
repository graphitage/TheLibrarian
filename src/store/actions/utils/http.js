const httpReq = async (url, method, body) => {
    try {
        let response = await fetch(
            url, {
            // mode: 'no-cors',
            method,
            body,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        let data = await response.json();

        if (data.status)
            throw Error();
        else
            return { data: data, error: false };
    } catch (error) {
        return { data: null, error: true }
    }

}

export const flaskBaseUrl = 'http://localhost:8000';

export default httpReq;