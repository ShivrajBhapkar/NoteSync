import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
const EditNoteModal = ({ isOpen, onClose, note, onNoteUpdate }) => {
    const formik = useFormik({
        initialValues: {
            noteTitle: note.title,
            noteText: note.text,
        },
        validationSchema: Yup.object({
            noteTitle: Yup.string()
                .trim()
                .min(5, "Title must be at least 5 characters")
                .required("Title is required"),
            noteText: Yup.string()
                .trim()
                .min(20, "Text must be at least 30 characters")
                .required("Note text is required"),
        }),
        onSubmit: (values) => {
            onNoteUpdate(
                note._id,
                values.noteTitle,
                values.noteText,
                note.timestamp
            );
            onClose();
        },
    });

    return (
        isOpen && (
            <div className="flex items-center justify-center">
                <div className="bg-white w-96 p-4 rounded shadow-lg">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold">Edit Note</h2>
                            <button
                                onClick={onClose}
                                className="text-gray-600 hover:text-gray-800"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6 fill-current"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M19 6.41l-1.41-1.41-5.59 5.59-5.59-5.59-1.41 1.41 5.59 5.59-5.59 5.59 1.41 1.41 5.59-5.59 5.59 5.59 1.41-1.41-5.59-5.59 5.59-5.59z" />
                                </svg>
                            </button>
                        </div>
                        <div className="mb-4">
                            <input
                                type="text"
                                name="noteTitle"
                                className="w-full border rounded px-2 py-1"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.noteTitle}
                            />
                            {formik.touched.noteTitle &&
                            formik.errors.noteTitle ? (
                                <div className="text-red-500">
                                    {formik.errors.noteTitle}
                                </div>
                            ) : null}
                        </div>
                        <div className="mb-4">
                            <textarea
                                name="noteText"
                                className="w-full border rounded px-2 py-1"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.noteText}
                            />
                            {formik.touched.noteText &&
                            formik.errors.noteText ? (
                                <div className="text-red-500">
                                    {formik.errors.noteText}
                                </div>
                            ) : null}
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className={`${
                                    !formik.isValid ||
                                    !formik.dirty ||
                                    formik.isSubmitting
                                        ? "opacity-50 pointer-events-none bg-blue-500"
                                        : "bg-blue-500 hover:bg-blue-700 text-white"
                                } px-2 py-2 rounded-md flex justify-center items-center w-1/4 mr-2`}
                            >
                                Save
                            </button>
                            <button
                                className="bg-gray-400 hover:bg-gray-600 text-white px-4 py-2 rounded"
                                onClick={onClose}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    );
};

export default EditNoteModal;
