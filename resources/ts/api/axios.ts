import axios, { AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
    baseURL: 'http://localhost:801', // APIのベースURLを設定
    withCredentials: true, // クロスオリジンリクエストでクッキーを送信
    withXSRFToken: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// axiosInstance.interceptors.request.use((config) => {
//     // リクエストが送信される前に実行される
//     const token = document.cookie.split('; ').find(row => row.startsWith('XSRF-TOKEN='));
//     if (token) {
//         // XSRF-TOKEN クッキーが存在すれば、ヘッダーに設定
//         config.headers['X-XSRF-TOKEN'] = decodeURIComponent(token.split('=')[1]);
//         console.log('X-XSRF-TOKEN');
//     }
//     return config;
// });

export default axiosInstance;
