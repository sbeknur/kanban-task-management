import { useEffect, useRef, useState } from "react";
import "./Chat.css";
import { sendMsgToOpenAI } from "./openai";

function Chat() {
    const msgEnd = useRef(null);

    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([
        {
            text: "Hi, I am Manage Assistant. How can I help you?",
            isBot: true,
        },
    ]);

    useEffect(() => {
        msgEnd.current.scrollIntoView();
    }, [messages]);

    const handleSend = async () => {
        const text = input;
        setInput("");
        setMessages([...messages, { text, isBot: false }]);
        const res = await sendMsgToOpenAI(input);
        setMessages([...messages, { text, isBot: false }, { text: res, isBot: true }]);
    };

    const handleEnter = async (e) => {
        if (e.key == "Enter") await handleSend();
    }

    return (
        <div className="main">
            <div className="chats">
                {messages.map((message, i) => (
                    <div key={i} className={message.isBot ? "chat bot" : "chat"}>
                        <p className="txt">{message.text}</p>
                    </div>
                ))}
                <div ref={msgEnd} />
            </div>

            <div className="chatFooter">
                <div className="inp">
                    <input
                        type="text"
                        name=""
                        id=""
                        placeholder="Send a message"
                        value={input}
                        onKeyDown={handleEnter}
                        onChange={(e) => {
                            setInput(e.target.value);
                        }}
                    />
                    <button className="send" onClick={handleSend}>
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Chat;
