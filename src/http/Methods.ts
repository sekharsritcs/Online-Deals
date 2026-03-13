import Services from "./Services";

const path = Services;

export const api = {

    get: async (endpoint: string, params: any = {}) => {

        const response = await path.get(endpoint, { params });

        if (response.status === 200 || response.data.success===true) {
            console.log("Success:", response.data.data);
            return response.data.data;
        }
        else {
            console.error("API Error:", response);
            throw new Error("API request failed");
        }

    },

    post: async (endpoint: string, data: any = {}) => {

        const response = await path.post(endpoint, data);
        if (response.status === 200 || response.data.success===true) {
            console.log("Success:", response.data.data);
            return response.data.data;   
        }
        else {
            console.error("API Error:", response);
            throw new Error("API request failed");
        }


    },

    put: async (endpoint: string, data: any = {}) => {

        const response = await path.put(endpoint, data);
         if (response.status === 200 || response.data.success===true){
            console.log("Success:", response);
            return response.data.data;  
        }
        else {
            console.error("API Error:", response);
            throw new Error("API request failed");
        }
    },
    update: async (endpoint: string, data: any = {}) => {
        const response = await path.put(endpoint, data);
         if (response.status === 200 || response.data.success===true) {
            console.log("Success:", response.data);
            return response.data.data;   
        }
        else {
            console.error("API Error:", response);
            throw new Error("API request failed");
        }

    },
    delete: async (endpoint: string,params: any={}) => {
        const response = await path.delete(endpoint, { params });
        if (response.status === 200 || response.data.success===true){
            console.log("Success:", response.data.data);
            return response.data.data;   
        }
        else {
            console.error("API Error:", response);
            throw new Error("API request failed");
        }
    },

}

export default api;