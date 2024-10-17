import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000', // TODO: move it out to env
    timeout: 60000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
    withCredentials: true,
});

// Laravel will set the cookie XSRF-TOKEN cookie on the request automatically
const initCsrf = async () => {
    await fetch('/sanctum/csrf-cookie', {
        credentials: 'include',
    });
}

const getCookie = (name: string) => {
    const match = document.cookie.match(
        new RegExp('(^|;\\s*)(' + name + ')=([^;]*)')
    );
    return match ? decodeURIComponent(match[3]) : null;
};

export const getCsrfCookie = async () => {
    await initCsrf();
    return getCookie('XSRF-TOKEN') ?? '';
}

// Now add the following headers to your request
export default axiosInstance;