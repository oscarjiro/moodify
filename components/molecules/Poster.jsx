import Tilt from "react-parallax-tilt";
import Image from "next/image";
import { PlayIcon, PauseIcon } from "@heroicons/react/24/solid";
import { playState, playingTrackState } from "@/atoms/atoms";
import { useRecoilState } from "recoil";

export default function Poster({ track, chooseTrack, onMouseOver, onMouseLeave }) {
  const [play, setPlay] = useRecoilState(playState);
  const [playingTrack] = useRecoilState(playingTrackState);

  const handlePlay = () => {
    chooseTrack(track);
    if (track?.uri === playingTrack?.uri) setPlay(!play);
  };

  return (
    <div onClick={handlePlay} onMouseOver={onMouseOver} onMouseLeave={onMouseLeave}>
      <Tilt
        glareEnable="true"
        glareMaxOpacity={0.2}
        glarePosition="all"
        scale={1.1}
        reset="false"
        className="track-on-window sm:w-[260px] w-[180px] sm:h-[370px] h-[256px] sm:rounded-[50px] rounded-[30px] overflow-hidden 
                  relative text-white/80 cursor-pointer hover:scale-105 hover:text-white/100 
                  smooth-transition group mx-auto"
      >
          <Image
              src={track?.image}
              alt={track?.title} 
              layout="fill"
              unoptimized
              className="h-full w-full absolute inset-0 object-cover opacity-80 group-hover:opacity-100" 
          />
          
          <div className="absolute bottom-10 inset-x-0 ml-4 flex items-center space-x-3.5">
              <div 
                className="sm:h-10 sm:w-10 w-8 h-8 bg-[#ab40af] rounded-full flex items-center justify-center
                        group-hover:bg-[#ca5ccd] flex-shrink-0 hover:scale-[1.2] smooth-transition duration-[175ms]"
              >
                  {track?.uri === playingTrack?.uri && play ? (
                    <PauseIcon className="sm:w-5 w-4" />
                    ) : (
                      <PlayIcon className="sm:w-5 w-4 ml-[2px]" /> 
                  )}
              </div>
              <div className="sm:text-[15px] text-[10px] group-hover:glow-sm smooth-transition ">
                <h4 className="font-extrabold truncate sm:w-44 w-[100px]">{track?.title}</h4> 
                <h4>{track?.artist}</h4> 
              </div>
          </div>
      </Tilt>
    </div>
  );
};
