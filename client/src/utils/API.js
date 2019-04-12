import axios from "axios";
const GOOGLEURL = "https://www.googleapis.com/books/v1/volumes?q="
const resultslimit = "&maxResults=40"

export default {
    searchBook: function(bookData) {
        return axios.get(GOOGLEURL + bookData + resultslimit);
    },

    saveJob: function(jobData) {
        return axios.post("/api/jobs", jobData);
    },

    saveUser: function(userData) {
        return axios.post("/api/users/sign-up", userData);
    },

    getBooks: function() {
        return axios.get("/api/books");
    },
    deleteBook: function(id) {
        return axios.delete("/api/books/" + id);
    }
  };