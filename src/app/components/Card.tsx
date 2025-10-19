import React, { useContext, useEffect, useState } from "react";
import { stateContext } from "@/context/StateContext";

interface Props {
    title: string;
    profileImage: string;
    prevMessage?: string;
    verified?: boolean;
}

const Card = (props: Props) => {
    const [selected, setSelected] = useState(false);
    const context = useContext(stateContext);

    if (!context) throw new Error("Context Provider not found");
    const { chat, setChat } = context;

    // Generate a deterministic room name based on both usernames
    const createRoomName = (userA: string, userB: string) => {
        if (!userA || !userB) return "";
        return [userA.toLowerCase(), userB.toLowerCase()].sort().join("_");
    }


    // Prompt for username once per session
    useEffect(() => {
        if (!chat?.username) {
            const name =
                prompt("Enter username:") || `User_${Math.floor(Math.random() * 1000)}`;
            setChat((prev) => ({ ...prev, username: name }));
        }
    }, [chat?.username, setChat]);

    const createRoom = () => {
        const newSelected = !selected;
        setSelected(newSelected);

        if (!chat?.username) return;

        const roomName = createRoomName(chat?.username, props.title);

        setChat((prev) => ({
            ...prev,
            id: prev.id || "",
            room: roomName,
            selected: newSelected,
            messages: prev.messages || [],
            chatPartner:props.title
        }));
    };

    const isSelected = chat.room === createRoomName(chat.username, props.title);

    return (
        <figure
            onClick={createRoom}
            className={`w-full h-[60px] flex items-center space-x-4 px-2 mb-2 cursor-pointer transition ${
                isSelected ? "bg-gray-200" : "hover:bg-gray-100"
            }`}
        >
            <img
                src={props.profileImage}
                alt={props.title}
                className="w-[50px] h-[50px] rounded-full"
            />
            <figcaption className="w-5/6 h-[50px]">
                <h1 className="text-xl font-bold flex items-center gap-2">
                    {props.title}
                    {props.verified && (
                        <img
                            src="/icons/verified%20bot.png"
                            alt="verified"
                            className="w-[20px] h-[25px] pt-1"
                        />
                    )}
                </h1>
                <p className="font-light truncate">{props.prevMessage}</p>
            </figcaption>
        </figure>
    );
};

export default Card;
