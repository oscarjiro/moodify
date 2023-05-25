import Tilt from "react-parallax-tilt";

export default function Artist({ artist, onMouseOver, onMouseLeave }) {
  return (
    <div onMouseOver={onMouseOver} onMouseLeave={onMouseLeave}>
      <Tilt scale={1.2} className="flex items-center space-x-1 py-2 group">

        <Tilt 
          tiltEnable={false}
          glareEnable={true}
          glareMaxOpacity={0.2}
          glarePosition="all"
          reset={false}
          className="track-on-window w-[100px] h-[100px] rounded-2xl overflow-hidden 
                    relative text-white/80 cursor-pointer hover:scale-105 hover:text-white/100 
                    transition duration-200 ease-out group mx-auto"
        >
            {artist.image ? (
              <img
                  src={artist.image}
                  alt={artist.name} 
                  className="h-full w-full absolute inset-0 object-cover rounded-xl opacity-80 group-hover:opacity-100" 
              />
            ) : (
              <div className="bg-gradient-to-br from-black from-30% to-[#ca5ccd] h-full w-full p-4 leading-4">
                {artist.name}
              </div>
            )} 
        </Tilt>

        <div 
          className="text-xs font-semibold truncate h-[100px] smooth-transition gradient-text bg-gradient-from-br from-5%"
          style={{ writingMode: "vertical-lr", filter: "drop-shadow(0 0 5px rgba(255, 255, 255, 1))" }}  
        >
          {artist.name} 
        </div>

      </Tilt>
    </div>
  );
};
