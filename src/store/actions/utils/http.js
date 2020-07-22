const httpReq = async (url, method, body) => {
    console.log(url, method)
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

        console.log(response);

        let data = await response.json();

        if (data.status)
            throw Error();
        else
            return { data: data, error: false };
    } catch (error) {
        console.log(error)
        return { data: null, error: true }
    }

}

export default httpReq;