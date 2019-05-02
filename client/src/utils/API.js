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
    getMyWorkedJobs: function(id) {
        return axios.get(`/api/jobs/workedJobs/${id}`);
    },
    deleteMyJob: function(id) {
        return axios.delete(`/api/jobs/${id}`);
    },
    completeMyJob: function(id) {
        return axios.put(`/api/jobs/${id}`);
    },
    reopenMyJob: function(id) {
        return axios.put(`/api/jobs/incomplete/${id}`);
    },
    saveMessage: function(messageData) {
        return axios.post("/api/messages/", messageData);
    },
    saveOfferMessage: function(messageData) {
        return axios.post("/api/messages/offer", messageData);
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
    acceptJob: function(id, acceptingUser) {
        return axios.put(`/api/jobs/accept/${id}`, acceptingUser);
    },
    updateRating: function(id, rating) {
        return axios.put(`/api/users/rating/${id}`, rating);
    },
    updateJobRatingBool: function(id) {
        return axios.put(`/api/jobs/ratingBool/${id}`);
    },
    updateWorkrJobRatingBool: function(id) {
        return axios.put(`/api/jobs/workrRatingBool/${id}`);
    },
  };