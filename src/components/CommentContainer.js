import React from "react";

const commentsData = [
    {
        name: "Shivraj Bhapkar",
        text: "Lorem ipsum dolar sit amet , conse tioj",
        replices: [],
    },
    {
        name: "Shivraj Bhapkar",
        text: "Lorem ipsum dolar sit amet , conse tioj",
        replices: [
            {
                name: "Shivraj Bhapkar",
                text: "Lorem ipsum dolar sit amet , conse tioj",
                replices: [
                    {
                        name: "Shivraj Bhapkar",
                        text: "Lorem ipsum dolar sit amet , conse tioj",
                        replices: [],
                    },
                    {
                        name: "Shivraj Bhapkar",
                        text: "Lorem ipsum dolar sit amet , conse tioj",
                        replices: [],
                    },
                ],
            },
        ],
    },
    {
        name: "Shivraj Bhapkar",
        text: "Lorem ipsum dolar sit amet , conse tioj",
        replices: [
            {
                name: "Shivraj Bhapkar",
                text: "Lorem ipsum dolar sit amet , conse tioj",
                replices: [],
            },
            {
                name: "Shivraj Bhapkar",
                text: "Lorem ipsum dolar sit amet , conse tioj",
                replices: [],
            },
            {
                name: "Shivraj Bhapkar",
                text: "Lorem ipsum dolar sit amet , conse tioj",
                replices: [
                    {
                        name: "Shivraj Bhapkar",
                        text: "Lorem ipsum dolar sit amet , conse tioj",
                        replices: [],
                    },
                    {
                        name: "Shivraj Bhapkar",
                        text: "Lorem ipsum dolar sit amet , conse tioj",
                        replices: [],
                    },
                ],
            },
        ],
    },
    {
        name: "Shivraj Bhapkar",
        text: "Lorem ipsum dolar sit amet , conse tioj",
        replices: [
            {
                name: "Shivraj Bhapkar",
                text: "Lorem ipsum dolar sit amet , conse tioj",
                replices: [],
            },
            {
                name: "Shivraj Bhapkar",
                text: "Lorem ipsum dolar sit amet , conse tioj",
                replices: [],
            },
            {
                name: "Shivraj Bhapkar",
                text: "Lorem ipsum dolar sit amet , conse tioj",
                replices: [],
            },
        ],
    },
    {
        name: "Shivraj Bhapkar",
        text: "Lorem ipsum dolar sit amet , conse tioj",
        replices: [
            {
                name: "Shivraj Bhapkar",
                text: "Lorem ipsum dolar sit amet , conse tioj",
                replices: [],
            },
            {
                name: "Shivraj Bhapkar",
                text: "Lorem ipsum dolar sit amet , conse tioj",
                replices: [
                    {
                        name: "Shivraj Bhapkar",
                        text: "Lorem ipsum dolar sit amet , conse tioj",
                        replices: [],
                    },

                    {
                        name: "Shivraj Bhapkar",
                        text: "Lorem ipsum dolar sit amet , conse tioj",
                        replices: [],
                    },
                ],
            },
        ],
    },
    {
        name: "Shivraj Bhapkar",
        text: "Lorem ipsum dolar sit amet , conse tioj",
        replices: [],
    },
    {
        name: "Shivraj Bhapkar",
        text: "Lorem ipsum dolar sit amet , conse tioj",
        replices: [],
    },
    {
        name: "Shivraj Bhapkar",
        text: "Lorem ipsum dolar sit amet , conse tioj",
        replices: [],
    },
];
const Comment = ({ data }) => {
    const { name, text, replies } = data;
    return (
        <div className="flex shadow-sm bg-gray-100 p-2 my-2">
            <img
                className="h-12 w-12"
                alt="user"
                src="https://cdn-icons-png.flaticon.com/512/552/552721.png"
            />
            <div className="px-3">
                <p className="font-bold" >{name}</p>
                <p >{text}</p>
            </div>
        </div>
    );
};
const CommentsList = ({ comments }) => {
    return comments.map((comment, index) => (
        <div key={index}>
            <Comment data={comment} />
            <div className="pl-5 border border-l-black ml-5">
                <CommentsList comments={comment.replices} />
            </div>
        </div>
    ));
}
const CommentContainer = () => {
    return (
        <div className="m-5 p-2">
            <h1 className="text-2xl font-bold">Comments:</h1>
           <CommentsList comments={commentsData}/>
        </div>
    );
};

export default CommentContainer;
