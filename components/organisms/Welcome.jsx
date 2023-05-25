import axios from 'axios';
import useSpotify from '@/hooks/useSpotify';
import MiniTrack from '../molecules/MiniTrack';
import Weather from '../molecules/Weather';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { weatherCriteria } from '@/lib/moodCriteria';
import { BeatLoader, MoonLoader } from 'react-spinners';


export default function Welcome({ chooseTrack }) {
    const { data: session } = useSession();
    const spotifyApi = useSpotify();
    
    const [city, setCity] = useState("Jakarta");
    const [weather, setWeather] = useState({});
    const [weatherTracks, setWeatherTracks] = useState([]);
    const [weatherTracksFeatures, setWeatherTracksFeatures] = useState([])

    // Get weather data
    useEffect(() => {
        const getWeatherData = async () => {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`;
            await axios.get(url).then(res => {
                setWeather(res.data)
                console.log(`Weather in ${city}`, weather);

            }).catch(error => console.log("Error", error));
        };
        getWeatherData();
    }, []);


    // Search for Recommended Weather Tracks
    useEffect(() => {
        if (spotifyApi.getAccessToken() && weather?.main) {
                
            // Set weather and weather criteria
            const weatherNow = weather?.weather?.[0]?.main;
            const weatherNowCriteria = weatherCriteria[weatherNow];

            spotifyApi.getRecommendations({
                limit: 8,
                seed_genres: ["pop", "rap", "rock", "country", "classical"],
                min_popularity: 50,
                min_energy: weatherNowCriteria.energy[0],
                max_energy: weatherNowCriteria.energy[1],
                min_acousticness: weatherNowCriteria.acousticness[0],
                max_acousticness: weatherNowCriteria.acousticness[1],
                min_danceability: weatherNowCriteria.danceability[0],
                max_danceability: weatherNowCriteria.danceability[1],
                min_instrumentalness: weatherNowCriteria.instrumentalness[0],
                max_instrumentalness: weatherNowCriteria.instrumentalness[1],
                min_key: weatherNowCriteria.key[0],
                max_key: weatherNowCriteria.key[1],
                min_liveness: weatherNowCriteria.liveness[0],
                max_liveness: weatherNowCriteria.liveness[1],
                min_loudness: weatherNowCriteria.loudness[0],
                max_loudness: weatherNowCriteria.loudness[1],
                min_mode: weatherNowCriteria.mode[0],
                max_mode: weatherNowCriteria.mode[1],
                min_speechiness: weatherNowCriteria.speechiness[0],
                max_speechiness: weatherNowCriteria.speechiness[1],
                min_tempo: weatherNowCriteria.tempo[0],
                max_tempo: weatherNowCriteria.tempo[1],
                min_time_signature: weatherNowCriteria.time_signature[0],
                max_time_signature: weatherNowCriteria.time_signature[1],
                min_valence: weatherNowCriteria.valence[0],
                max_valence: weatherNowCriteria.valence[1],
            }).then(res => {
                console.log("Filtered Weather Tracks", res);
                setWeatherTracks(res.body.tracks.map(track => {
                    return {
                        id: track.id,
                        artist: track.artists[0].name,
                        title: track.name,
                        popularity: track.popularity,
                        uri: track.uri,
                        image: track.album.images[0].url,
                    };
                }));
            });
            
            console.log("Recommended Weather Tracks", weatherTracks);

        }
    }, [city, weather, session]);


    return (
        <div className="w-full h-full flex flex-col justify-center items-center 
                        min-[810px]:flex-row min-[810px]:p-4 min-[810px]:space-x-10 min-[810px]:space-y-0
                        min-[397px]:space-y-10 space-y-2 min-[397px]:p-10 p-5 pt-0">
            {/* Weather Info */}
            <div className="flex-shrink max-[396px]:scale-75">
                <Weather weather={weather} /> 
            </div>

            {/* Music recommendations based on weather */}
            {weather?.main ? (
                <div className="flex flex-grow flex-col w-full h-full overflow-hidden items-start font-light">

                    {/* Description */}
                    <div>
                        Music for the <strong className="gradient-text font-bold">{weather.weather[0].description}</strong> right now.
                    </div>

                    {/* Recommended Weather Tracks */}
                    {(weatherTracks.length > 0 && weather?.main) ? (
                        <div 
                            className="space-y-3 rounded-2xl py-1 smooth-transition
                                        overflow-y-scroll h-[140px] min-[810px]:h-[240px] w-full
                                        scrollbar-thin scrollbar-thumb-white/20
                                        scrollbar-thumb-rounded hover:scrollbar-thumb-white/50"
                        >
                            {weatherTracks.map(track => (
                                <MiniTrack 
                                    key={track.id}
                                    track={track}
                                    chooseTrack={chooseTrack}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="flex items-center justify-center w-full h-full">
                            <MoonLoader color="white" />
                        </div>
                    )}

                  

                </div>
            ) : (
                <div className="flex justify-center items-center w-full h-full">
                    <BeatLoader color="#ffffff" />
                </div>
            )}
        </div>
    );
};
