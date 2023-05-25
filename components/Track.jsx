import { useState } from 'react';
import { HeartIcon, PauseIcon, PlayIcon } from "@heroicons/react/24/solid";
import { useRecoilState } from 'recoil';
import { playState, playingTrackState } from '@/atoms/playerAtom';

export default function Track({ track, chooseTrack }) {
    const [play, setPlay] = useRecoilState(playState);
    const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);
    const [hasLiked, setHasLiked] = useState(false);

    const handlePlay = () => {
        chooseTrack(track);
        if (track.uri === playingTrack.uri) setPlay(!play);
      };

    return (
        <div className="flex items-center justify-between space-x-20 cursor-default hover:bg-white/10 py-2 px-4 rounded-lg group transition ease-in-out">
            <div className="flex items-center">
                <img 
                    src={track.albumUrl}
                    alt={track.title} 
                    className="rounded-xl h-12 w-12 object-contain mr-3"
                />
                <div>
                    <h4 className="text-white text-sm font-semibold truncate w-[450px]">{track.title}</h4>
                    <p className="text-[rgb(179,179,179)] text-[13px] font-semibold group-hover:text-white">{track.artist}</p>
                </div>
                <div className="md:ml-auto flex items-center space-x-2 5">
                    <div className="flex items-center rounded-full border-2 border-[#262626] w-[85px] h-10 relative cursor-pointer group-hover:border-white/40">
                        <HeartIcon 
                            className={`w-5 ml-3 icon ${hasLiked ? "text-[#1ed760]" : "text-[#868686]"}`} 
                            onClick={() => setHasLiked(!hasLiked)}
                        />
                        <div 
                            className={`h-10 w-10 rounded-full border flex items-center justify-center absolute -right-0.5 hover:border-[#15833e] icon hover:scale-110 ${track.uri === playingTrack.uri && play ? "bg-[#15883e] border-[#15883e]" : "hover:bg-[#15883e] border-white/60"}`}
                            onClick={handlePlay}
                        >
                            {track.uri === playingTrack.uri && play ? (
                                <PauseIcon
                                    className="text-white w-5 ml-[1px]"
                                />
                            ) : (
                                <PlayIcon 
                                    className="text-white w-5 ml-[1px]"
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
