import { useState } from "react";

export default function SearchBar({ search, setSearch }) {
    const [glowBorder, setGlowBorder] = useState(false);

    return (
        <div 
            className={`w-full backdrop-blur-md rounded-full border-2 p-1.5 px-5 pr-8 flex items-center smooth-transition
                        ${glowBorder ? "border-white/60 glow-sm" : "border-white/[0.45]"}`}
        >
            <div 
                className={`h-4 w-4 rounded-full border-2 flex-shrink-0 smooth-transition 
                            ${search ? "animate-ping" : "animate-pulse"}
                            ${glowBorder ? "border-white glow-sm" : "border-white/[0.45]"}`} 
            />     
            <input 
                type="text" 
                value={search} 
                onChange={(e) => setSearch(e.target.value)} 
                className="bg-transparent text-white border-none w-full outline-none placeholder-white/50 text-sm
                            focus:ring-0 focus:glow focus:placeholder-white smooth-transition"
                placeholder="Search..."
                onFocus={() => setGlowBorder(true)}
                onBlur={() => setGlowBorder(false)}
            />
        </div>
    );
};
