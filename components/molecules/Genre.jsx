import { toSlugCase } from '@/lib/genres';
import { useState } from 'react'

export default function Genre({ genre, id, selectGenre, selected }) {
    return (
        <div 
            id={id}
            onClick={selectGenre}
            className={`backdrop-blur-md border-2 border-white/30
                        rounded-3xl sm:px-7 max-w-fit min-[580px]:h-[50px] 
                        min-[390px]:h-[40px] min-[390px]:px-5
                        h-[30px] px-4 group
                        overflow-hidden 
                        flex items-center justify-center
                        bg-gradient-to-br from-5% from-[black]/20
                        cursor-pointer smooth-transition
                        hover:bg-black/40 duration-150 hover:scale-105
                        ${selected === toSlugCase(genre) && "bg-black/40 border-white"}`}
        >
            <span 
                className={`glow-sm font-bold
                            min-[580px]:text-sm min-[390px]:text-xs
                            text-[10px] group-hover:glow smooth-transition
                            ${selected === toSlugCase(genre) ? "text-white animate-pulse" : 
                            "group-hover:text-white gradient-text"}`}
            >
                {genre}
            </span>
        </div>
    );
};
