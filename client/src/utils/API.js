import axios from "axios";


export default {
    // searchBook: function(bookData) {
    //     return axios.get(GOOGLEURL + bookData + resultslimit);
    // },

    saveJob: function(jobData) {
        return axios.post("/api/jobs", jobData);
    },

    saveUser: function(userData) {
        return axios.post("/api/users/sign-up", userData);
    },

    authenticateUser: function(userData) {
        return axios.post("api/users/login", userData);
        
    },
    logOut: function() {
        return axios.get("/api/users/logout");
    }
  };