import { useState } from "react";
import Poster from "../molecules/Poster";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

export default function PosterCarousel({ tracks, chooseTrack, id }) {
    const [showControls, setShowControls] = useState(false);
    
    // Scroll carousel
    const handleScrollCarousel = (direction) => {
        const grid = document.getElementById(id);
        if (grid) {
            grid.scrollBy({
                top: 0,
                left: direction === "right" ? 285 : -285, 
                behavior: "smooth",
            });
        }
    };
    
    return (
        <>
            {/* Carousel */}
            <div 
                id={id}
                className={`relative grid overflow-x-scroll overflow-y-hidden scrollbar-hide sm:h-[400px]  
                            grid-cols-[repeat(21,minmax(0,1fr))] sm:py-4 sm:gap-x-72 py-3 gap-x-48`}
            >
                {tracks.map(track => 
                    <Poster 
                        key={track.id}
                        track={track} 
                        chooseTrack={chooseTrack}
                        onMouseOver={() => setShowControls(true)}
                        onMouseLeave={() => setShowControls(false)}
                    />
                )}
            </div>

            {/* Controls */}
            <div className="smooth-transition" id="gridControls">
                <ChevronLeftIcon 
                    className={`controls smooth-transition ${showControls ? "opacity-50" : "opacity-0"}
                                absolute sm:top-52 top-40 left-0 w-10 h-10 hover:opacity-100`}
                    onClick={() => handleScrollCarousel("left")}
                />
                <ChevronRightIcon 
                    className={`controls smooth-transition ${showControls ? "opacity-50" : "opacity-0"}
                                absolute sm:top-52 top-40 right-0 w-10 h-10 hover:opacity-100`}
                    onClick={() => handleScrollCarousel("right")}
                />
            </div>
        </>
    );
};
