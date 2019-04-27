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
    }, 
    getMyJobs: function(id) {
        return axios.get(`/api/jobs/${id}`);
    },
    deleteMyJob: function(id) {
        return axios.delete(`/api/jobs/${id}`);
    },
    getJobsByCategory: function(category) {
        return axios.get(`/api/jobs/${category}`);
    },
    saveMessage: function(messageData) {
        return axios.post("/api/messages/", messageData);
    },
    getMyMessages: function(id) {
        return axios.get(`/api/messages/${id}`);
    },
    getSentMessages: function(id) {
        return axios.get(`/api/messages/sent/${id}`);
    },
    deleteMyMessage: function(id) {
        return axios.delete(`/api/messages/remove/${id}`);
    },
  };