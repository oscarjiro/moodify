import { playState, playingTrackState } from "@/atoms/playerAtom";
import { useRecoilState } from "recoil";
import { useEffect } from 'react';
import SpotifyPlayer from "react-spotify-web-playback";

export default function Player({ accessToken, trackUri }) {
    const [play, setPlay] = useRecoilState(playState);

    useEffect(() => {
        if (trackUri) setPlay(true);
    }, [trackUri]);

    if (!accessToken) return null;

    return (  
        <div className="text-center backdrop-blur-md rounded-full p-5 bg-black/30">
            <SpotifyPlayer
                styles={{
                    activeColor: "#ffffff",
                    bgColor: "rgba(90, 90, 90, 0.3)",
                    color: "#ffffff",
                    loaderColor: "#fff",
                    sliderColor: "#1cb954",
                    trackArtistColor: "#ccc",
                    trackNameColor: "#ffffff",
                    height: "90px",
                    sliderTrackColor: "#535353",
                    sliderTrackBorderRadius: "4px",
                    sliderHandleColor: "#fff",
                    errorColor: "#fff",
                }}
                token={accessToken}
                callback={(state) => setPlay(state.isPlaying)}
                play={play}
                uris={trackUri ? [trackUri] : []}
                magnifySliderOnHover={true}
                showSaveIcon
            />     
        </div>
    );
};
