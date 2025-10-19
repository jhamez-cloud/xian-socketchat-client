import React, {ChangeEvent, FormEvent, useContext, useState} from 'react';
import SearchBar from "@/app/components/SearchBar";
import Card from "@/app/components/Card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import {stateContext} from "@/context/StateContext";

interface FormData {
    username: string;
    email: string;
}

interface Contact {
    id: number;
    username: string;
    email: string;
}

const SideBar = () => {
    const context = useContext(stateContext);
    if(!context){
        throw new Error('Invalid context');
    }

    const {chat,setChat} = context;
    const messagesLength = chat.messages?.length;

    const [components, setComponents] = useState<Number[]>([]);
    const [popup, setPopup] = useState<boolean>(false);
    const [formData, setFormData] = useState<FormData>({
        username: '',
        email: '',
    });
    const [contacts, setContacts] = useState<Contact[]>([]);

    const handleAddChat = ()=>{
        setPopup(!popup);
    }

    const handleInputChange = (event:ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;

        setFormData(prev=>({...prev,[name]: value}));
    }

    const createContact = (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const newContact = {
            id: Date.now(),
            username: formData.username,
            email: formData.email,
        };
        setContacts((prev) => [...prev, newContact]);

        setFormData({username:'',email:''})
        //setPopup(false);
        console.log(formData);
    }

    return (
        <div className={`w-1/4 h-full flex flex-col bg-white relative`}>
            <div className={`w-full h-[50px] p-2 flex justify-between items-center space-x-4 mb-8 top-0`}>
                <DropdownMenu>
                    <DropdownMenuTrigger className={`focus:outline-none cursor-pointer`}>
                        <div className={`space-y-1`}>
                            <div className={`w-[25px] h-1 bg-gray-400`}></div>
                            <div className={`w-[25px] h-1 bg-gray-400`}></div>
                            <div className={`w-[25px] h-1 bg-gray-400`}></div>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleAddChat}>Add Contact</DropdownMenuItem>
                        <DropdownMenuItem>Billing</DropdownMenuItem>
                        <DropdownMenuItem>Team</DropdownMenuItem>
                        <DropdownMenuItem>Subscription</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <SearchBar/>
            </div>

            <div className={`w-full`}>
                <Card title={`Xian`} prevMessage={`Chat With AI ...`} profileImage={`/images/img_1.jpeg`} verified={true}/>
                {contacts.map((contact) => (
                    <Card
                        key={contact.id}
                        title={contact.username}
                        prevMessage={chat.messages?.at(-1)?.message || ""}
                        profileImage="/images/img_2.jpeg"
                    />
                ))}
                {popup?<div className={`absolute w-[600px] h-[300px] rounded-md bg-[rgba(255,255,255,0.6)] z-20 top-[20%] -right-[200%]`} style={{boxShadow:"0 0 20px rgba(0,0,0,0.7)"}}>
                    <div className={`w-full h-[50px] flex items-center justify-between p-2 px-4 border-b-1 border-b-gray-500`}>
                        <h1 className={`text-xl font-medium`}>Add Contact</h1>
                        <div className={`w-6 h-6 relative cursor-pointer`} onClick={()=>{setPopup(false)}}>
                            <div className={`absolute top-1/2 left-0 w-full h-0.5 bg-red-500 rotate-45`}></div>
                            <div className={`absolute top-1/2 left-0 w-full h-0.5 bg-red-500 -rotate-45`}></div>
                        </div>
                    </div>
                    <form action="" className={`w-full p-2 flex flex-col items-center space-y-2`} onSubmit={createContact}>
                        <SearchBar/>
                        <input
                            type="text"
                            placeholder={`Username`}
                            className={`w-[95%] h-[50px] rounded-md p-2 bg-white border border-gray-300 focus:outline-none`}
                            name={"username"}
                            value={formData.username}
                            onChange={handleInputChange}
                        />
                        <input
                            type="email"
                            placeholder={`Email Address`}
                            className={`w-[95%] h-[50px] rounded-md p-2 bg-white border border-gray-300 focus:outline-none mb-8`}
                            name={"email"}
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                        <div className={`w-[95%] h-[45px] flex justify-start`}>
                            <button
                                className={`w-1/4 h-[45px] rounded-md bg-green-500 text-white text-lg font-semibold p-2`}
                                type={"submit"}
                            >
                                ADD +
                            </button>
                        </div>
                    </form>
                </div>:null}
            </div>
        </div>
    );
};

export default SideBar;