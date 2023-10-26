// notesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    fetchNotes,
    createNote,
    updateNote,
    deleteNote,
} from "../Services/noteServices"; // Define your API functions

export const fetchNotesUtil = createAsyncThunk(
    "notes/fetchNotes",
    async (params) => {
        const response = await fetchNotes(params);
        
        return response;
    }
);

export const createNoteUtil = createAsyncThunk(
    "notes/createNote",
    async (params) => {
        await createNote(params);

        return params.newNote;
    }
);

export const updateNoteUtil = createAsyncThunk(
    "notes/updateNote",
    async (params) => {
        await updateNote(params);

        return params;
    }
);

export const deleteNoteUtil = createAsyncThunk(
    "notes/deleteNote",
    async (params) => {
        await deleteNote(params);
        return params.selectedNoteToDelete; // Return the deleted noteId for removing it from the state
    }
);

const notesSlice = createSlice({
    name: "notes",
    initialState: {
        data: [],
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchNotesUtil.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchNotesUtil.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload;
            })
            .addCase(fetchNotesUtil.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(createNoteUtil.fulfilled, (state, action) => {
                state.data.push(action.payload);
            })
            .addCase(updateNoteUtil.fulfilled, (state, action) => {
                const noteIndex = state.data.findIndex(
                    (note) => note._id === action.payload.noteId
                );
                const newNote = {
                    title: action.payload.updatedNote.title,
                    text: action.payload.updatedNote.text,
                    _id: action.payload.noteId,
                    timestamp: action.payload.updatedNote.timestamp,
                };
                if (noteIndex !== -1) {
                    state.data[noteIndex] = newNote;
                }
            })
            .addCase(deleteNoteUtil.fulfilled, (state, action) => {
                state.data = state.data.filter(
                    (note) => note._id !== action.payload
                );
            });
    },
});

export default notesSlice.reducer;
