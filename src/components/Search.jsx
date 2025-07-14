import React from "react";

const Search = ({ setSearch, search }) => {
  return (
    <div className="w-1/2 h-[50px] bg-[#0F0D23] rounded flex px-4 gap-2 items-center ">
      <img className="h-[20px] w-[20px]" src="/search.svg" alt="" />
      <input
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        className="placeholder:text-[#A8B5DB] w-full h-full outline-none text-white"
        type="text"
        value={search}
        placeholder="Search through 300+ movies online"
      />
    </div>
  );
};

export default Search;
