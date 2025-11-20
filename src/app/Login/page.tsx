"use client"

import { FcGoogle } from "react-icons/fc";
import {useAuth} from "@/context/AuthContext";

const  Page = ()=> {

    const signIn = useAuth()

    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-between bg-gray-100 p-4 pb-12">
            <div className={`w-full`}>
                <h1 className={`text-xl p-2 font-bold text-shadow-lg`}>Xian Socket Chat</h1>
            </div>
            <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8 space-y-6">
                <h2 className="text-2xl font-semibold text-center text-gray-800">Welcome Back</h2>

                {/* Google Login */}
                <button className="w-full py-3 border rounded-xl flex items-center justify-center space-x-3 hover:bg-gray-50 transition">
                    <FcGoogle size={24} />
                    <span className="text-gray-700 font-medium">Login with Google</span>
                </button>


                <div className="relative flex items-center justify-center my-4">
                    <span className="w-full h-px bg-gray-300"></span>
                    <span className="absolute bg-white px-3 text-gray-500 text-sm">OR</span>
                </div>


                {/* Email */}
                <div>
                    <label className="block text-gray-600 mb-1">Email</label>
                    <input
                        type="email"
                        className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your email"
                    />
                </div>


                {/* Password */}
                <div>
                    <label className="block text-gray-600 mb-1">Password</label>
                    <input
                        type="password"
                        className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your password"
                    />
                </div>


                <div className="w-full flex justify-between text-sm">
                    <a href="#" className="text-blue-600 hover:underline">Forgot password?</a>
                    <a href="/Register" className="text-blue-600 hover:underline">Register</a>
                </div>


                <button onClick={signIn} className="w-full py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition">
                    Login
                </button>
            </div>
        </div>
    )
}

export default Page;