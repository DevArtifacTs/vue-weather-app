import axios from 'axios';

//create axios instance 
export const axiosInstance = axios.create({
    baseURL : 'https://api.openweathermap.org/data/2.5',
})


//create axios interceptor for HTTP request's response 
axiosInstance.interceptors.response.use(
    (res) => {
        // alert('interceptor work!')
        // console.log('interceptors.response.use = ', res);
        return res
    },
    //do if there are any response that out side 2xx status code
    async (err) => {
        const originalConfig = err.config
        if (err.response) {
            //if token expire
            if (err.response.status === 401 && !originalConfig._retry) {
                console.log('err', err.response)
            }
            if (err.response.status === 404 && err.response.data) {
                console.log("🚀 ~ file: interceptor.js ~ line 83 ~ err.response.data", err.response.data)
                console.log('err.response.data : ' + JSON.stringify(err.response.status))
                return Promise.reject(err.response.data);
            }
            if (err.response.status === 403 && err.response.data) {
                console.log("🚀 ~ file: interceptor.js ~ line 82 ~ err.response.status", err.response.status)
                console.log('status 403, yor are going to navigate to login page')
                console.log('status 403, err.response.data : ' + JSON.stringify(err.response.status))
                return Promise.reject(err.response.data);
            }
            if (err.response.status === 500 && err.response.data) {
                console.log("🚀 ~ file: interceptor.js ~ line 88 ~ err.response.status", err.response.status)
                console.log('status 500')
                console.log('status 500, err.response.data : ' + JSON.stringify(err.response.data))
                return err.response.status

            }
        }
        return Promise.reject(err);
    }
)