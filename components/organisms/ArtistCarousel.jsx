import Artist from "../molecules/Artist";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function ArtistCarousel({ artists, id }) {
    const [showControls, setShowControls] = useState(false); 

    // Scroll carousel
    const handleScrollCarousel = (direction) => {
        const grid = document.getElementById(id);
        if (grid) {
            grid.scrollBy({
                top: 0,
                left: direction === "right" ? 140 : -140, 
                behavior: "smooth",
            });
        }
    };

    return (
        <>
            <div 
                id={id}
                className={`mt-1 py-2 sm:px-4 px-3 flex overflow-y-hidden scrollbar-hide items-center space-x-4`}
            >
                {artists.map(artist => (
                    <AnimatePresence
                        key={artist.id}
                    >
                        <motion.div
                            initial={{ opacity: 0, transform: "translate(0, -20px)" }}
                            whileInView={{ opacity: 1, transform: "translate(0, 0)" }}
                            exit={{ opacity: 0 }}
                            transition={{ opacity: { duration: 0.5 }, transform: { duration: 0.5, ease: "easeOut" } }}
                        >
                            <Artist 
                                artist={artist}
                                onMouseOver={() => setShowControls(true)}
                                onMouseLeave={() => setShowControls(false)}
                            />
                        </motion.div>
                    </AnimatePresence>
                ))}
            </div>

            {/* Controls */}
            <div className="smooth-transition" id="gridControls">
                <ChevronLeftIcon 
                    className={`controls smooth-transition ${showControls ? "opacity-50" : "opacity-0"}
                                absolute sm:top-20 top-16 left-0 w-7 h-7 hover:opacity-100`}
                    onClick={() => handleScrollCarousel("left")}
                />
                <ChevronRightIcon
                    className={`controls smooth-transition ${showControls ? "opacity-50" : "opacity-0"}
                                absolute sm:top-20 top-16 right-0 w-7 h-7 hover:opacity-100`}
                    onClick={() => handleScrollCarousel("right")}
                />
            </div>
        </>
    );
};
