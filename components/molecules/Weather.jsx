import { MapPinIcon } from "@heroicons/react/24/solid";
import Image from 'next/image';
import { MoonLoader } from "react-spinners";

export default function Weather({ weather }) {
    return (
        <>
            {/* Ensure  */}
            {weather?.main ? (
                <div className="flex flex-col space-y-3 relative justify-center min-[810px]:items-start items-center">
                    
                    {/* Main */}
                    <div className="mb-6 space-y-2 glow">
                        {/* Location */}
                        <div className="flex items-center space-x-4">
                            <MapPinIcon className="w-10 h-10" />
                            <h1 className="text-4xl font-bold">
                                {weather.name}
                            </h1>
                        </div>

                        {/* Weather Condition and Temperature */}
                        <div className="text-8xl font-light gradient-text to-transparent bg-gradient-to-tr from-5%">
                            {weather.main.temp.toFixed(0)}&#176;C
                        </div>
                        <Image 
                            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                            width={100}
                            height={100}
                            alt={weather.weather[0].description}
                            className="absolute left-[70px] top-[80px] opacity-70"
                        />
                        <h3 className="font-bold text-2xl absolute left-[170px] top-[124px]">
                            {weather.weather[0].main}
                        </h3>
                    </div>

                    {/* More on Weather */}
                    <div 
                        className="w-[275px] h-[60px] flex bg-black/50 rounded-full
                                    items-center justify-center space-x-9 overflow-hidden"
                    >
                        <div className="flex flex-col items-center justify-center glow-sm space-y-[2px] mt-1">                             
                            <div className="text-md font-bold leading-3">
                                {weather.main.feels_like.toFixed(0)}&#176;C
                            </div>
                            <div className="text-[0.5rem] font-light leading-3">
                                Feels like
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center glow-sm space-y-[2px] mt-1">                      
                            <div className="text-md font-bold leading-3">
                                {weather.main.humidity.toFixed(0)}%
                            </div>
                            <div className="text-[0.5rem] font-light leading-3">
                                Humidity
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center glow-sm space-y-[2px] mt-1">
                            <div className="text-md font-bold leading-3">
                                {weather.wind.speed} m/s
                            </div>
                            <div className="text-[0.5rem] font-light leading-3">
                                Wind speed
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex justify-center items-center w-full h-full">
                    <MoonLoader 
                        color="#ffffff"
                    />
                </div>
            )}
        </>
    );
};
