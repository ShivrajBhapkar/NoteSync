
import axios from "../axios-config";

export const fetchVideoInfo = async (playlistId, videoId) => {
    const apiUrl = `/users/playlist/${playlistId}/video/${videoId}`;
    try {
        const response = await axios
            .get(apiUrl);
        return response.data;
    } catch (error) {
        return await Promise.reject(error);
    }
};

export const fetchNotes = async ({ userId, playlistId, videoId } ) => {
    const apiUrl = `/users/${userId}/playlist/${playlistId}/videos/${videoId}/notes`;
    try {
        const response = await axios
            .get(apiUrl);
        return response.data;
    } catch (error) {
        return await Promise.reject(error);
    }
};

export const createNote = ({ userId, playlistId, videoId, newNote }) => {
    const apiUrl = `/users/${userId}/playlist/${playlistId}/videos/${videoId}/notes`;
    return axios.post(apiUrl, newNote);
};

export const updateNote = ({ noteId, userId, updatedNote }) => {
    const apiUrl = `/users/${userId}/notes/${noteId}`;
    console.log(updatedNote);
    return axios.put(apiUrl, updatedNote);
};

export const deleteNote = ({ userId, noteToDeleteId }) => {
    const apiUrl = `/users/${userId}/notes/${noteToDeleteId}`;
    return axios.delete(apiUrl);
};
