"use client"
import {io,Socket} from "socket.io-client"
import {useContext, useEffect, useRef, useState} from "react";
import SideBar from "@/app/components/SideBar";
import {stateContext} from "@/context/StateContext";

export default function Home() {g

    const [message,setMessage]=useState<string>("");
    //const [receivedMessage,setReceivedMessage]=useState<string>("");
    //const [room,setRoom]=useState<string>("");
    const socketRef = useRef<Socket | null>(null);

    const context = useContext(stateContext);
    if(!context){
        throw new Error('Invalid context');
    }

    const {chat,setChat} = context;

    useEffect(() => {
        const socket = io("http://localhost:8080", { transports: ["websocket"] });
        socketRef.current = socket;

        socket.on("connect", () => {
            console.log("Connected:", socket.id);
        });

        socket.on("receive_message", (data) => {

            setChat((prev) => ({
                ...prev,
                messages: [...(prev.messages || []), data],
            }));
        });

        return () => {
            socket.disconnect();
        };
    }, [setChat]);


    useEffect(() => {
        if (chat?.room && socketRef.current) {
            socketRef.current.emit("join_room", chat.room);
        }
    }, [chat?.room]);


    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = message.trim();
        if (!trimmed || !chat?.room) return;

        const data = {
            id: socketRef.current?.id,
            room: chat.room,
            message: trimmed,
        };

        setChat((prev) => ({
            ...prev,
            messages: [...(prev.messages || []), data],
        }));

        socketRef.current?.emit("send_message", data);
        setMessage("");
    };

    return (
        <div className="w-full h-screen flex">
            <SideBar />

            <div className="w-3/4 h-full bg-[url('/images/backgroundPrint.jpg')]">
                {chat.selected && (
                    <>
                        {/* --- Chat Header --- */}
                        <div className="bg-white h-1/12 w-full flex justify-between border-l-2 border-l-gray-300 p-2 px-4">
                            <figure className="flex space-x-2">
                                <img
                                    src="/images/img_2.jpeg"
                                    alt=""
                                    className="w-[50px] h-[50px] rounded-full"
                                />
                                <figcaption className="w-5/6 h-[50px] pb-2">
                                    <h1 className="text-lg font-bold flex items-center space-x-2">
                                        {chat.chatPartner}
                                    </h1>
                                    <p>Last Seen 5 min ago</p>
                                </figcaption>
                            </figure>

                            <div className="flex h-full w-[100px] justify-center items-center space-x-2">
                                <img src="/icons/Search.png" alt="" className="w-[25px] h-[30px]" />
                                <img src="/icons/Call%20Icon.png" alt="" className="w-[35px] h-[40px]" />
                                <img src="/icons/more%20icon.png" alt="" className="w-[30px] h-[35px] pt-1" />
                            </div>
                        </div>

                        {/* --- Chat Body --- */}
                        <div className="w-full h-11/12 px-20 pt-4 flex flex-col justify-between pb-4">
                            <div className="w-full h-5/6 overflow-y-scroll  flex flex-col space-y-2 p-3">
                                {chat.messages?.map((msg, index) => {
                                    const isMine = msg.id === socketRef.current?.id;
                                    return (
                                        <div
                                            key={index}
                                            className={`relative px-3 py-2 min-w-[60px] rounded-2xl text-lg shadow-sm ${
                                                isMine
                                                    ? "self-end bg-green-500 text-white bubble-right"
                                                    : "self-start bg-gray-200 text-black bubble-left"
                                            }`}
                                        >
                                            {msg.message}
                                        </div>
                                    );
                                })}
                            </div>

                            {/* --- Message Input --- */}
                            <form onSubmit={handleSend}>
                                <input
                                    type="text"
                                    placeholder="Type Message To Send"
                                    className="w-full h-[50px] rounded-md p-2 text-lg bg-white focus:outline-none"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                            </form>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
