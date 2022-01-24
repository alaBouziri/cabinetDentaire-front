import axios from 'axios'

const url = 'http://localhost:3001';

export const login = async (email , password) => {
    await axios
        .post(url + '/login' , {email , password})
        .then(
            (res) => {
                console.log({res})
                localStorage.setItem("token", JSON.stringify(res.data.token));
                localStorage.setItem("user", JSON.stringify(res.data.user));
                let response = res.data;
                return response;
            },
            (err) => {
                console.log({err : err.response.data.msg});
                let response =  err.response.data.msg;
                return response;
            }
        )
}


export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
  };
  
