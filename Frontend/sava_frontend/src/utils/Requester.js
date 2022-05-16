/**
 * 网络请求工具类，所有网络请求通过该类实现
 */
import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:8080'

export default class Requester {
    static getAuthToken() {
        // 获取local Storage中的Token
        return localStorage.getItem("sava-token");
    }

    static storeAuthToken(token) {
        localStorage.setItem("sava-token", token);
    }

    static requestJSON(request, withAuth, onSuccessCallback, onErrorCallback) {
        if (withAuth == true) {
            var token = this.getAuthToken();
            if (token == null) {
                onErrorCallback("NO_TOKEN_AVAILABLE");
            }
            request.headers['Authorization'] = token;
        }

        axios(request).then(onSuccessCallback).catch(onErrorCallback);
    }
}