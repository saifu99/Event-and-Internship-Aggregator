import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000", // backend URL
});

// Events
export const getEvents = () => api.get("/events");
export const getEventById = (id) => api.get(`/events/${id}`);

// Internships
export const getInternships = () => api.get("/internships");
export const getInternshipById = (id) => api.get(`/internships/${id}`);
