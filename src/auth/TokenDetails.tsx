const base64UrlDecode = (str: string) => {
    // Adding '=' in the end for padding
    str = str.replace(/-/g, '+').replace(/_/g, '/');
    while (str.length % 4) {
        str += '=';
    }

    const raw = atob(str);
    let result = "";

    for (let i = 0; i < raw.length; i++) {
        result += '%' + ('0' + raw.charCodeAt(i).toString(16)).slice(-2);
    }

    return decodeURIComponent(result);
}

const getTokenDetails = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
        const payload = token.split('.')[1];
        return JSON.parse(base64UrlDecode(payload));
    } catch (e) {
        return null;
    }
};

export default getTokenDetails;