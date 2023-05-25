import { playState, playingTrackState } from '@/atoms/playerAtom';
import { HeartIcon, PauseIcon, PlayIcon } from "@heroicons/react/24/solid";
import { useState } from 'react';
import { useRecoilState } from 'recoil';

export default function MiniTrack({ track, chooseTrack }) {
    const [play, setPlay] = useRecoilState(playState);
    const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);

    const handlePlay = () => {
        chooseTrack(track);
        if (track.uri === playingTrack?.uri) setPlay(!play);
      };

    return (
        <div 
            className="flex items-center cursor-default justify-between hover:backdrop-blur-sm
                        hover:bg-black/30 py-2 rounded-lg group smooth-transition duration-200
                        overflow-x-hidden w-full relative"
        >
            <div className="flex items-center justify-center">
                {/* Track Info */}
                <img 
                    src={track?.image}
                    alt={track?.title} 
                    className="min-[450px]:rounded-xl object-contain mr-3
                                min-[450px]:h-12 min-[450px]:w-12 
                                min-[396px]:w-9 min-[396px]:h-9
                                w-8 h-8 rounded-md"
                />
                <div className="">
                    <h4 
                        className="text-white min-[450px]:text-sm min-[396px]:text-xs
                                    font-semibold truncate min-[450px]:w-[150px] 
                                    min-[396px]:w-[125px] w-[100px] text-[10px]
                                    group-hover:glow-sm"
                    >
                        {track.title}
                    </h4>
                    <p 
                        className="text-white/60 min-[450px]:text-[13px] min-[396px]:text-[11px]
                                    font-semibold truncate min-[450px]:w-[150px] 
                                    min-[396px]:w-[125px] w-[100px] text-[9px]
                                    group-hover:text-white group-hover:glow-sm"
                    >
                        {track.artist}
                    </p>
                </div>
            </div>

                {/* Play Button */}
                <div 
                    className={`w-8 h-8
                                min-[450px]:w-10 min-[450px]:h-10 rounded-full border-2 flex items-center justify-center absolute right-5
                                hover:border-[#ca5ccd] icon hover:scale-110 cursor-pointer
                                ${track.uri === playingTrack?.uri && play ? "bg-[#ca5ccd] border-[#ca5ccd]" : "hover:bg-[#ca5ccd] border-white/40"}`}
                    onClick={handlePlay}
                >
                    {track.uri === playingTrack?.uri && play ? (
                        <PauseIcon
                            className="text-white min-[450px]:w-5 w-4 ml-[1px]"
                        />
                    ) : (
                        <PlayIcon 
                            className="text-white min-[450px]:w-5 w-4 ml-[1px]"
                        />
                    )}
                </div>
        </div>
    );
};
