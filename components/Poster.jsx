import { PlayIcon, PauseIcon } from "@heroicons/react/24/solid";
import Tilt from "react-parallax-tilt";
import Image from "next/image";
import { playState, playingTrackState } from "@/atoms/playerAtom";
import { useRecoilState } from "recoil";

export default function Poster({ track, chooseTrack }) {
  const [play, setPlay] = useRecoilState(playState);
  const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);

  const handlePlay = () => {
    chooseTrack(track);
    if (track.uri === playingTrack.uri) setPlay(!play);
  };

  return (
    <div onClick={handlePlay}>
      <Tilt 
        glareEnable="true"
        glareMaxOpacity={0.2}
        glarePosition="all"
        scale={1.1}
        reset="false"
        className="track-on-window w-[260px] h-[360px] rounded-[50px] overflow-hidden relative text-white/80 cursor-pointer hover:scale-105 hover:text-white/100 transition duration-200 ease-out group mx-auto"
      >
          <img
              src={track.albumUrl}
              alt={track.title} 
              className="h-full w-full absolute inset-0 object-cover rounded-[50px] opacity-80 group-hover:opacity-100" 
          />
          
          <div className="absolute bottom-10 inset-x-0 ml-4 flex items-center space-x-3.5">
              <div className="h-10 w-10 bg-[#15883e] rounded-full flex items-center justify-center group-hover:bg-[#1db954] flex-shrink-0">
                  {track.uri === playingTrack.uri && play ? (
                    <PauseIcon className="w-5" />
                    ) : (
                      <PlayIcon className="w-5 ml-[2px]" /> 
                  )}
              </div>
              <div className="text-[15px]">
                <h4 className="font-extrabold truncate w-44">{track.title}</h4> 
                <h4>{track.artist}</h4> 
              </div>
          </div>
      </Tilt>
    </div>
  );
};
