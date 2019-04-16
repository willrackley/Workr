import axios from "axios";


export default {
    getJobs: function() {
        return axios.get("/api/jobs");
    },

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
    },
    getUser: function(tokenInfo) {
        return axios.get("/api/users/find", tokenInfo);
    }
  };