import useSpotify from '@/hooks/useSpotify';
import PosterCarousel from '../organisms/PosterCarousel';
import ArtistCarousel from '../organisms/ArtistCarousel';
import { motion } from 'framer-motion';
import { CiFaceSmile, CiFaceMeh, CiFaceFrown, } from 'react-icons/ci';
import { activePageState, moodState } from "@/atoms/atoms";
import { useRecoilState } from "recoil";
import { useEffect, useState } from 'react';
import { moodCriteria } from '@/lib/moodCriteria';
import { useSession } from 'next-auth/react';

export default function Mood({ chooseTrack }) {
    const { data: session } = useSession();
    const spotifyApi = useSpotify();

    const [activePage] = useRecoilState(activePageState);
    const [mood, setMood] = useRecoilState(moodState);
    const [moodTracks, setMoodTracks] = useState([]);
    const [favoriteArtists, setFavoriteArtists] = useState([]);

    // Change mood handler
    const changeMood = (e) => setMood(e.target.id === "" ? mood : e.target.id);
    
    // Fetch users favorite artists
    useEffect(() => {
        if (spotifyApi.getAccessToken()) {

            spotifyApi.getMyTopArtists({ time_range: "short_term" }).then(res => {
                setFavoriteArtists(res.body?.items.map(artist => {
                    return {
                        name: artist.name,
                        genre: artist.genres[0],
                        id: artist.id,
                        uri: artist.uri,
                        image: artist.images[0].url,
                    };
                }));
                console.log("Favorite Artists", favoriteArtists);
            });

        }
    }, [spotifyApi, session]);

    // Fetch tracks based on mood and favorite artists
    useEffect(() => {
        if (spotifyApi.getAccessToken()) {
                
            // Set mood criteria
            const currentMoodCriteria = moodCriteria[mood];

            // Fetch recommendations based on criteria
            spotifyApi.getRecommendations({
                limit: 20,
                seed_artists: favoriteArtists.length > 0 ? favoriteArtists.slice(0,5).map(artist => artist.id) : [],
                seed_genres: favoriteArtists.length < 1 ? ["pop", "rap", "rock", "classical", "indonesian pop"] : [],
                min_energy: currentMoodCriteria.energy[0],
                max_energy: currentMoodCriteria.energy[1],
                min_acousticness: currentMoodCriteria.acousticness[0],
                max_acousticness: currentMoodCriteria.acousticness[1],
                min_danceability: currentMoodCriteria.danceability[0],
                max_danceability: currentMoodCriteria.danceability[1],
                min_instrumentalness: currentMoodCriteria.instrumentalness[0],
                max_instrumentalness: currentMoodCriteria.instrumentalness[1],
                min_loudness: currentMoodCriteria.loudness[0],
                max_loudness: currentMoodCriteria.loudness[1],
                min_mode: currentMoodCriteria.mode[0],
                max_mode: currentMoodCriteria.mode[1],
                min_speechiness: currentMoodCriteria.speechiness[0],
                max_speechiness: currentMoodCriteria.speechiness[1],
                min_tempo: currentMoodCriteria.tempo[0],
                max_tempo: currentMoodCriteria.tempo[1],
                min_valence: currentMoodCriteria.valence[0],
                max_valence: currentMoodCriteria.valence[1],
            }).then(res => {
                console.log(`Filtered ${mood} Tracks`, res);
                setMoodTracks(res.body?.tracks?.map(track => {
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
            
            console.log(`Recommended ${mood} Tracks`, moodTracks);

        }
    }, [session, spotifyApi, mood, favoriteArtists]);

    return (
        <section className={`text-white w-full ${activePage === "mood" ? "active-page" : "inactive-page"}`}>
            {/* Mood Board */}
            <div className="mb-8">
                <h1 className="header mb-3">
                    How are you feeling today?
                </h1>
                <div 
                    className="flex items-center justify-center sm:h-[80px] h-[70px] space-x-16 mb-3 overflow-hidden min-w-max 
                                border-2 border-white/40 rounded-full backdrop-blur-md px-5"
                >
                    <CiFaceFrown
                        id="Negative" 
                        className={`sm:w-14 sm:h-14 w-12 h-12 cursor-pointer smooth-transition hover:text-white hover:glow
                                    ${mood === "Negative" ? "glow" : "text-white/50"}`}
                        onClick={changeMood}
                    />
                    <CiFaceMeh
                        id="Neutral" 
                        className={`sm:w-14 sm:h-14 w-12 h-12 cursor-pointer smooth-transition hover:text-white hover:glow
                                    ${mood === "Neutral" ? "glow" : "text-white/50"}`}
                        onClick={changeMood}
                    />
                    <CiFaceSmile
                        id="Positive" 
                        className={`sm:w-14 sm:h-14 w-12 h-12 cursor-pointer smooth-transition hover:text-white hover:glow
                                    ${mood === "Positive" ? "glow" : "text-white/50"}`}
                        onClick={changeMood}
                    />
                </div>
            </div>

            {/* Recommended Mood Tracks */}
            <div className="relative mb-2">
                <h1 className="header mb-3">
                        Songs for your 
                        <motion.span
                            key={mood}
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <strong className="gradient-text">
                                {mood === "Positive" && " happy vibes"}
                                {mood === "Neutral" && " calm state of mind"}
                                {mood === "Negative" && " moody heart"}
                            </strong>
                        </motion.span>
                </h1>
                <PosterCarousel 
                    tracks={moodTracks}
                    chooseTrack={chooseTrack}
                    id="moodTracksCarousel"
                />
                 
            </div>

            {/* Favorite Artists */}
            {favoriteArtists.length > 0 && (
                <div className="mb-8 max-[310px]:w-[375px] relative">
                    <h1 className="font-light glow-sm max-[460px]:text-xs">
                        Based on your <strong className="gradient-text font-bold">favorite artists</strong> the past month
                    </h1>
                    <ArtistCarousel 
                        artists={favoriteArtists} 
                        id="favoriteArtistsCarousel"
                    />
                </div>
            )}
        </section>
    );
};
