"use client";
import { io, Socket } from "socket.io-client";
import React, { useContext, useEffect, useRef, useState } from "react";
import SideBar from "@/app/components/SideBar";
import { stateContext } from "@/context/StateContext";

export default function Home() {
    const [message, setMessage] = useState("");
    const socketRef = useRef<Socket | null>(null);
    const context = useContext(stateContext);
    if (!context) throw new Error("Invalid context");

    const { chat, setChat, activeChat, username, setUsername } = context;

    useEffect(() => {
        const socket = io("http://localhost:8080", { transports: ["websocket"] });
        socketRef.current = socket;

        socket.on("connect", () => console.log("Connected:", socket.id));

        socket.on("receive_message", (data) => {
            setChat((prev) => {
                const room = data.room;
                const prevChat = prev[room] || { messages: [] };
                return {
                    ...prev,
                    [room]: {
                        ...prevChat,
                        messages: [...(prevChat.messages || []), data],
                    },
                };
            });
        });

        // ✅ Fix: ensure cleanup returns void
        return () => {
            socket.disconnect();
        };
    }, [setChat]);


    useEffect(() => {
        if (activeChat && socketRef.current) {
            socketRef.current.emit("join_room", activeChat);
        }
    }, [activeChat]);

    useEffect(() => {
        if (typeof window !== "undefined" && !username) {
            const name =
                prompt("Enter your username:") || `User_${Math.floor(Math.random() * 1000)}`;
            setUsername(name);
        }
    }, [setUsername, username]);

    const currentChat = activeChat ? chat[activeChat] : null;

    const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!message.trim() || !currentChat?.room) return;

        const data = {
            id: socketRef.current?.id,
            room: currentChat.room,
            message,
        };

        setChat((prev) => {
            const room = currentChat.room!;
            const existingChat = prev[room] || currentChat;

            const newMessage = {
                id: socketRef.current?.id ?? "unknown", // make sure id is a string
                room,
                message: data.message,
            };

            return {
                ...prev,
                [room]: {
                    ...existingChat,
                    messages: [...(existingChat.messages || []), newMessage],
                },
            };
        });


        socketRef.current?.emit("send_message", data);
        setMessage("");
    };

    return (
        <div className="w-full h-screen flex">
            <SideBar />
            <div className="w-3/4 h-full bg-[url('/images/backgroundPrint.jpg')]">
                {currentChat ? (
                    <>
                        {/* Header */}
                        <div className="bg-white h-1/12 w-full flex justify-between border-l-2 border-l-gray-300 p-2 px-4">
                            <figure className="flex space-x-2">
                                <img
                                    src="/images/img_2.jpeg"
                                    alt=""
                                    className="w-[50px] h-[50px] rounded-full"
                                />
                                <figcaption className="w-5/6 h-[50px] pb-2">
                                    <h1 className="text-lg font-bold flex items-center space-x-2">
                                        {currentChat.chatPartner}
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

                        {/* Chat Body */}
                        <div className="w-full h-11/12 px-20 pt-4 flex flex-col justify-between pb-4">
                            <div className="w-full h-5/6 overflow-y-scroll flex flex-col space-y-2 p-3">
                                {currentChat?.messages?.map((msg, i) => {
                                    const isMine = msg.id === socketRef.current?.id;
                                    return (
                                        <div
                                            key={i}
                                            className={`px-3 py-2 rounded-2xl text-lg shadow-sm ${
                                                isMine
                                                    ? "self-end bg-green-500 text-white"
                                                    : "self-start bg-gray-200 text-black"
                                            }`}
                                        >
                                            {msg.message}
                                        </div>
                                    );
                                })}
                            </div>
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
                ) : (
                    <div className="flex justify-center items-center h-full text-gray-500 text-xl">
                        Select a chat to start messaging
                    </div>
                )}
            </div>
        </div>
    );
}
