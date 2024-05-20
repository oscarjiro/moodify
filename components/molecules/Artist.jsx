import Tilt from "react-parallax-tilt";
import Image from "next/image";
import { artistViewState } from "@/atoms/atoms";
import { useRecoilState } from "recoil";

export default function Artist({ artist, onMouseOver, onMouseLeave }) {
  const [artistView, setArtistView] = useRecoilState(artistViewState);
  
  const onClick = () => {
    setArtistView(artist?.id);
  };
  
  return (
    <div 
      onClick={onClick}
      onMouseOver={onMouseOver} 
      onMouseLeave={onMouseLeave}
    >
      <Tilt scale={1.2} className="flex items-start space-x-1 sm:py-2 group">

        <Tilt 
          tiltEnable={false}
          glareEnable={true}
          glareMaxOpacity={0.2}
          glarePosition="all"
          reset={false}
          className="track-on-window overflow-hidden relative text-white/80 cursor-pointer 
                  hover:text-white/100 hover:scale-105 transition duration-200 ease-out group mx-auto
                    w-[80px] h-[80px] rounded-xl  
                    sm:w-[100px] sm:h-[100px] sm:rounded-2xl "
        >
            {artist?.image ? (
              <Image
                  src={artist?.image}
                  alt={artist?.name} 
                  layout="fill"
                  unoptimized
                  className="h-full w-full absolute inset-0 object-cover rounded-xl opacity-80 group-hover:opacity-100" 
              />
            ) : (
              <div className="bg-gradient-to-br from-black from-30% to-[#ca5ccd] h-full w-full p-4 leading-4">
                {artist?.name}
              </div>
            )} 
        </Tilt>

        <div 
          className="sm:text-xs text-[10px] font-semibold truncate sm:h-[100px] h-[80px] smooth-transition gradient-text bg-gradient-from-br sm:from-5%"
          style={{ writingMode: "vertical-lr", filter: "drop-shadow(0 0 5px rgba(255, 255, 255, 1))" }}  
        >
          {artist.name} 
        </div>

      </Tilt>
    </div>
  );
};
