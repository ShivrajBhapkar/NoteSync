// NoteForm.js
import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
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
    const editorRef = useRef(null);
    const handleEditorChange = (content, editor) => {
        formik.setFieldValue("noteText", content, true); // Set the third parameter to true for immediate update
    };

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="mt-1">
                <label
                    htmlFor="noteText"
                    className="block text-gray-700 text-lg font-extrabold mb-2 p-2"
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
                    className="max-w-md w-full border-gray-300 shadow-md border-solid solid border-2 rounded-md px-4 py-1 leading-5 sm:text-sm sm:leading-5 resize-none focus:outline-none focus:border-blue-500 bg-gray-200 mb-2"
                    placeholder="Add your title here ..."
                />
                {formik.touched.noteTitle && formik.errors.noteTitle ? (
                    <div className="text-red-500 text-xs">
                        {formik.errors.noteTitle}
                    </div>
                ) : null}
            </div>
            <div>
                <div className="max-w-lg w-full   rounded-md py-1 leading-5 sm:text-sm sm:leading-5 resize-none focus:outline-none focus:border-blue-500 bg-gray-200">
                    <Editor
                        apiKey="9qyj6xrdheyz8gp44n9es375urkqrtt915o40ou3szeowydi"
                        value={formik.values.noteText}
                        onInit={(evt, editor) => (editorRef.current = editor)}
                        onEditorChange={handleEditorChange}
                        init={{
                            menubar: "file edit view",
                            height: 300,
                            plugins: [
                                "mentions advlist autolink lists link image charmap print preview anchor",
                                "searchreplace visualblocks code fullscreen",
                                "insertdatetime media paste code help wordcount",
                            ],
                            toolbar:
                                "undo redo | formatselect | " +
                                "bold italic backcolor | alignleft aligncenter " +
                                "alignright alignjustify | bullist numlist outdent indent | " +
                                "removeformat | emoticons| help",
                            content_style:
                                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                        }}
                    />
                </div>
                {formik.touched.noteText && formik.errors.noteText ? (
                    <div className="text-red-500 text-xs">
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
                    } px-2 py-1 rounded-md flex justify-center items-center w-1/5`}
                    type="submit"
                >
                    Add <BiSolidSend />
                </button>
            </div>
        </form>
    );
};

export default NoteForm;
