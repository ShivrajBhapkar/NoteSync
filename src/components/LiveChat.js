import React, { useEffect } from 'react'
import ChatMessage from './ChatMessage'
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../utils/chatSlice';

const LiveChat = () => {
    const dispatch = useDispatch();
    const chatMessages = useSelector((store)=> store.chat.messages)
    useEffect(() => {
        // const ApiPolling = setInterval(() => {
            console.log("API Polling");

            dispatch(
                addMessage({
                    name: "Shivraj Bhapkar",
                    message: "Lorem Inpsum Dolar"
                }));
        // }, 10000)
        // return () => clearInterval(ApiPolling);
    } , [])
  return (
      <div className="ml-2 w-full h-[500px] p-2 border border-black bg-slate-100 rounded-lg">
          {chatMessages.map((c, i) => (
              <ChatMessage key={i} name={c.name} message={c.message} />
          ))}
      </div>
  );
}

export default LiveChat
