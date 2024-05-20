import useSpotify from '@/hooks/useSpotify';
import { playState, playingTrackState } from '@/atoms/atoms';
import { HeartIcon, PauseIcon, PlayIcon } from "@heroicons/react/24/solid";
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

export default function Track({ track, chooseTrack }) {
    const { data: session } = useSession();
    const spotifyApi = useSpotify();
    const [play, setPlay] = useRecoilState(playState);
    const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);
    const [hasLiked, setHasLiked] = useState(false);

    const handlePlay = () => {
        chooseTrack(track);
        if (track?.uri === playingTrack?.uri) setPlay(!play);
    };

    const handleLike = () => {
        if (hasLiked) {
            spotifyApi.removeFromMySavedTracks([track.id]).then(res => 
                console.log("Removed " + track.title, res)
            );
            setHasLiked(false);
        } else {
            spotifyApi.addToMySavedTracks([track.id]).then(res => 
                console.log("Liked " + track.title, res)
            );
            setHasLiked(true);
        }
    };

    useEffect(() => {
        if (spotifyApi?.getAccessToken()) {

            spotifyApi.containsMySavedTracks([track.id]).then(res => setHasLiked(res?.body?.[0]));

        }
    }, [spotifyApi, session, hasLiked, track]);

    return (
        <div 
            className="flex items-center cursor-default justify-between hover:backdrop-blur-sm
                        hover:bg-black/30 py-2 px-4 rounded-lg group smooth-transition duration-200
                        overflow-x-hidden w-full"
        >
                <div className="flex items-center justify-center">
                    {/* Track Info */}
                    <img 
                        src={track?.image}
                        alt={track?.title} 
                        className="sm:rounded-xl sm:h-12 sm:w-12 
                                    rounded-lg w-10 h-10
                                    object-contain mr-3"
                    />
                    <div className="w-[50vw] min-[1100px]:w-[40vw]">
                        <h4 className="text-white sm:text-sm text-xs font-semibold truncate w-[40vw] group-hover:glow-sm">{track.title}</h4>
                        <p className="text-white/60 sm:text-[13px] text-[11px] font-semibold truncate w-[40vw] group-hover:text-white group-hover:glow-sm">{track.artist}</p>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex items-center rounded-full max-[455px]:border-none
                                border-2 border-white/40 group-hover:border-white/60
                                w-[85px] h-10 relative cursor-pointer">
                    <HeartIcon 
                        className={`w-5 ml-3 icon max-[455px]:hidden ${hasLiked ? "text-[#d67ed9]" : "text-white/40"}`} 
                        onClick={handleLike}
                    />
                    <div 
                        className={`h-10 w-10 rounded-full border-2 flex items-center justify-center absolute -right-0.5 
                                    hover:border-[#ca5ccd] icon hover:scale-110
                                    ${track?.uri === playingTrack?.uri && play ? "bg-[#ca5ccd] border-[#ca5ccd]" : "hover:bg-[#ca5ccd] border-white/40"}`}
                        onClick={handlePlay}
                    >
                        {track?.uri === playingTrack?.uri && play ? (
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
    );
};
