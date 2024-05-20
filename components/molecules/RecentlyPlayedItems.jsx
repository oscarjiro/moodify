import useSpotify from "@/hooks/useSpotify";
import { useRecoilState } from "recoil";
import { artistViewState, playState, playingTrackState } from "@/atoms/atoms";
import { useSession } from "next-auth/react";

export default function RecentlyPlayedItems({ track, chooseTrack }) {
    const [play, setPlay] = useRecoilState(playState);
    const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);
    const [artistView, setArtistView] = useRecoilState(artistViewState);

    const handlePlay = () => {
        chooseTrack(track);
        if (track?.uri === playingTrack?.uri) setPlay(!play);
    };
    
    return (
        <div className="flex items-center space-x-3">
            <img 
                src={track?.image} 
                alt={track?.title} 
                className="w-10 h-10 rounded-full"
            />
            <div className="group">
                <h4 
                    onClick={handlePlay}
                    className="text-white text-[13px] mb-0.5 font-semibold hover:underline cursor-pointer truncate max-w-[150px] group-hover:glow smooth-transition"
                >
                    {track?.title}
                </h4>
                <p 
                    onClick={() => setArtistView(track?.artistId)}
                    className="text-xs text-white/[0.55] font-semibold cursor-pointer hover:underline group-hover:glow-sm smooth-transition"
                >
                    {track?.artist}
                </p>
            </div>
        </div>
    );
};
