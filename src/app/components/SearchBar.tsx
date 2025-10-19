import React from 'react';


const SearchBar = () => {
    return (
        <div className={`w-[95%] h-full flex justify-start items-center space-x-2 pl-2 rounded-2xl bg-gray-200`}>
            <img src="/icons/Search.png" alt="search icon" className={`w-[20px] h-[20px]`}/>
            <input type="text" placeholder='Search' className={`w-[98%] px-1 focus:outline-none text-lg`}/>
        </div>
    );
};

export default SearchBar;