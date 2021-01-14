import querystring from 'querystring';
import request from '../utils/request';
const API_URL = 'http://localhost:3500';

export const API = {
    async fetchStockData(payload) {
        const response = await request(`${API_URL}/v1/stock-data?${querystring.stringify(payload)}`, {
            method: 'GET',
        });
        const result = {
            data: response.data,
            status: response.status,
            message:
                response.status === 'ERROR'
                    ? response.data && response.data.message
                        ? response.data.message
                        : response.error.error.message
                    : '',
        };
        return result;
    },
    async getUser() {      
        try {
            const response = await fetch(`${API_URL}/api/current_user`, {
                method: 'GET',
                credentials: 'include'
            })
            const r =  await response.json()
            // console.log(r, 'RESPONSE')
            return r
        } catch (e) {
            console.error(e, 'Get user error')
        }
    }
};

export const SuccessStatusCode = [200, 201, 202];
