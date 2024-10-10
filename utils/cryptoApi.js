import axios from 'axios';
import { XRapidAPIHost, XRapidAPIKey, apibaseUrl } from './api';

// Function to make API calls 
const CryptoApiCall = async (endpoint, params) => {
    const url = `${apibaseUrl}/${endpoint.replace(/^\//, '')}`;

    const options = {
        method: 'GET',
        url: url, // Constructed URL
        params: params || {},
        headers: {
            'x-rapidapi-key': XRapidAPIKey,
            'x-rapidapi-host': XRapidAPIHost, // Correctly set as a hostname
        },
    };

    try {
        const response = await axios.request(options);
        console.log("API Response:", response.data); // Log response data
        return response.data;
    } catch (error) {
        console.error("API call error:", {
            message: error.message,
            status: error.response ? error.response.status : 'No response status',
            data: error.response ? error.response.data : 'No response data'
        });
        return {};
    }
};

// Function to fetch all coins
export const fetchAllCoins = async () => {
    return CryptoApiCall('coins', {
        referenceCurrencyId: 'USD',
        sort: 'price',
        limit: 30
    });
};

// Function to fetch coin price
export const fetchCoinPrice = async (coinId) => {
    return CryptoApiCall(`coin/${coinId}/price`, {});
};

// Example of how to use fetchAllCoins
fetchAllCoins().then(data => {
    console.log('All Coins:', data);
}).catch(error => {
    console.error('Error fetching coins:', error);
});

export const FetchCoinDetails = async (coinUuid) => {
    const endpoints = `${apibaseUrl}/coin/${coinUuid}?referenceCurrencyUuid=yhjMzLphuIDl&timePeriod=24h`
    return await CryptoApiCall(endpoints);
}

export const FetchCoinHistory = async (coinUuid) => {
    const endpoints = `${apibaseUrl}/coin/${coinUuid}/history?referenceCurrencyUuid=yhjMzLphuIDl&timePeriod=24h`
    return await CryptoApiCall(endpoints);
}