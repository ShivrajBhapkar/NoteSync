import React, { useEffect, useState } from 'react'
import ChatMessage from './ChatMessage'
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../utils/chatSlice';
import { generateRandomName } from '../utils/helper';
import { makeRandomMessage } from '../utils/helper';

const LiveChat = () => {
    const dispatch = useDispatch();
    const [liveMessage, setLiveMessage] = useState();
    const chatMessages = useSelector((store)=> store.chat.messages)
    useEffect(() => {
        const ApiPolling = setInterval(() => {
           

            dispatch(
                addMessage({
                    name: generateRandomName(),
                    message: makeRandomMessage(20)+"Lorem Inpsum Dolar"
                }));  
        }, 500)
         return () => clearInterval(ApiPolling);
    } , [])
    return (
        <>
            <div className="ml-2 w-full h-[500px] p-2 border border-black bg-slate-100 rounded-lg overflow-y-scroll flex flex-col-reverse">
                <div>
                    {chatMessages.map((c, i) => (
                        <ChatMessage
                            key={i}
                            name={c.name}
                            message={c.message}
                        />
                    ))}
                </div>
            </div>
            <form onSubmit={(e) => {
                e.preventDefault();
                dispatch(addMessage({
                    name: "Shivraj",
                    message:liveMessage
                }))
                setLiveMessage("");
            }} className="w-full p-2 ml-2 border border-black">
                <input type="text" className="w-[80%]" value={liveMessage} onChange={(e) => {
                    setLiveMessage(e.target.value);
                }} />
                <button className="px-2 mx-2 bg-green-100">Send</button>
            </form>
        </>
    );
}

export default LiveChat
