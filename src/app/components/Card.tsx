import React, { useContext } from "react";
import { stateContext } from "@/context/StateContext";

interface Props {
    title: string;
    profileImage: string;
    prevMessage?: string;
    verified?: boolean;
}

const Card = (props: Props) => {
    const context = useContext(stateContext);
    if (!context) throw new Error("Context Provider not found");

    const { setChat, activeChat, setActiveChat, username } = context;

    const createRoomName = (userA: string, userB: string) => {
        return [userA.toLowerCase(), userB.toLowerCase()].sort().join("_");
    };

    const handleSelect = () => {
        if (!username) return;
        const roomName = createRoomName(username, props.title);

        setChat((prev) => ({
            ...prev,
            [roomName]: {
                ...prev[roomName],
                id: prev[roomName]?.id || "",
                room: roomName,
                selected: true,
                messages: prev[roomName]?.messages || [],
                username,
                chatPartner: props.title,
            },
        }));

        setActiveChat(roomName);
    };

    const isSelected = activeChat === createRoomName(username, props.title);

    return (
        <figure
            onClick={handleSelect}
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
