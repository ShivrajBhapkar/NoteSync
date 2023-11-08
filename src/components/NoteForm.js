// NoteForm.js

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { BiSolidSend } from "react-icons/bi";

const NoteForm = ({ onSubmit }) => {
    const validationSchema = Yup.object({
        noteTitle: Yup.string()
            .trim()
            .min(5, "Title must be at least 5 characters")
            .required("Title is required"),
        noteText: Yup.string()
            .trim()
            .min(30, "Text must be at least 30 characters")
            .required("Note text is required"),
    });

    const formik = useFormik({
        initialValues: {
            noteTitle: "",
            noteText: "",
        },
        validationSchema,
        onSubmit: (values) => {
            onSubmit(values);
            formik.resetForm();
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div>
                <label
                    htmlFor="noteText"
                    className="block text-gray-700 text-sm font-bold mb-2"
                >
                    Note Content:
                </label>
                <input
                    type="text"
                    id="noteTitle"
                    name="noteTitle"
                    value={formik.values.noteTitle}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="max-w-md w-full border-grey shadow-md border-solid solid border-2 rounded-md px-4 py-2 leading-5 sm:text-sm sm:leading-5 resize-none focus:outline-none focus:border-blue-500 bg-gray-200 mb-2"
                    placeholder="Add your title here ..."
                />
                {formik.touched.noteTitle && formik.errors.noteTitle ? (
                    <div className="text-red-500 text-sm">
                        {formik.errors.noteTitle}
                    </div>
                ) : null}
            </div>
            <div>
                <textarea
                    rows="4"
                    id="noteText"
                    name="noteText"
                    value={formik.values.noteText}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="max-w-md w-full border-grey shadow-md border-solid solid border-2 rounded-md px-4 py-2 leading-5 sm:text-sm sm:leading-5 resize-none focus:outline-none focus:border-blue-500 bg-gray-200"
                    placeholder="Add your note here ..."
                />
                {formik.touched.noteText && formik.errors.noteText ? (
                    <div className="text-red-500 text-sm">
                        {formik.errors.noteText}
                    </div>
                ) : null}
            </div>
            <div className="flex items-center justify-between">
                <button
                    className={`${
                        !formik.isValid || !formik.dirty || formik.isSubmitting
                            ? "opacity-50 pointer-events-none bg-blue-500"
                            : "bg-blue-500 hover-bg-blue-700 text-white"
                    } px-2 py-2 rounded-md flex justify-center items-center w-1/4`}
                    type="submit"
                >
                    Add <BiSolidSend />
                </button>
            </div>
        </form>
    );
};

export default NoteForm;
