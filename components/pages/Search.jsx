import useSpotify from '@/hooks/useSpotify';
import SearchBar from '../molecules/SearchBar';
import Track from '../molecules/Track';
import ArtistCarousel from '../organisms/ArtistCarousel';
import GENRES, { toSlugCase } from '@/lib/genres';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRecoilState } from 'recoil';
import { activePageState } from '@/atoms/atoms';
import { AnimatePresence, motion } from 'framer-motion';
import Genre from '../molecules/Genre';

export default function Search({ chooseTrack }) {
    const { data: session } = useSession();
    const spotifyApi = useSpotify();

    const [activePage] = useRecoilState(activePageState);
    const [search, setSearch] = useState("");
    const [tracksSearchResults, setTracksSearchResults] = useState([]);
    const [artistsSearchResults, setArtistsSearchResults] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState("");

    // Search for Tracks and Artists
    useEffect(() => {
        if (search.trim().length < 1 || search === "*") {
            setTracksSearchResults([]);
            setArtistsSearchResults([]);
            return;
        }

        if (spotifyApi.getAccessToken()) {

            // Conditional queries
            const trackQuery = selectedGenre !== "" ? 
                                `genre:${selectedGenre} track:${search}`
                                : search;
            const artistQuery = selectedGenre !== "" ? 
                                `genre:${selectedGenre} artist:${search}`
                                : search;

            // Search for Tracks
            spotifyApi.searchTracks(trackQuery).then((res) => {
                console.log("Track Search", res);
                console.log(`${selectedGenre !== "" && `genre:${selectedGenre} track:`}${search}`)
                setTracksSearchResults(res.body.tracks.items.map((track) => {
                    return {
                        id: track.id,
                        artist: track.artists[0].name,
                        title: track.name,
                        uri: track.uri,
                        image: track.album.images[0].url,
                        popularity: track.popularity,
                    };
                }));
                console.log("Track Search Results", tracksSearchResults);
            });
    
            // Search for Artists
            spotifyApi.searchArtists(artistQuery).then((res) => {
                console.log("Artist Search", res);
                setArtistsSearchResults(res.body.artists.items.map((artist) => {
                    return {
                        name: artist.name,
                        id: artist.id,
                        uri: artist.uri,
                        popularity: artist.popularity,
                        genres: artist.genres,
                        type: artist.type,
                        image: artist.images[0]?.url,
                    };
                }));
                console.log("Artist Search Results", artistsSearchResults);
            });
            
        }

    }, [search, session, selectedGenre]);

    // Select genre
    const selectGenre = (e) => {
        if (toSlugCase(e.target.textContent) === selectedGenre) {
            setSelectedGenre("");
        } else {
            setSelectedGenre(toSlugCase(e.target.textContent));
        }
    };

    return (
        <section 
            className={`text-white absolute sm:top-0 -top-6 w-[calc(100vw-40px)] sm:w-[calc(100vw-140px)] min-[1100px]:w-[calc(100vw-410px)] 
                        overflow-y-hidden ${activePage === "search" ? "active-page" : "inactive-page"} scrollbar-hide`}
        >
            {/* Search Bar */}
            <SearchBar search={search} setSearch={setSearch} />

            {/* Default Display */}
            {search.trim().length < 1 && (
                <>
                    <div
                        className="flex flex-wrap gap-x-2 gap-y-2.5 mt-4 overflow-y-scroll
                                    max-h-fit scrollbar-hide"
                    >
                        {GENRES.map(genre => (
                            <Genre 
                                genre={genre}
                                key={() => toSlugCase(genre)}
                                id={() => toSlugCase(genre)}
                                selectGenre={selectGenre}
                                selected={selectedGenre}
                            />
                        ))}
                    </div>
                </>
            )}

            {/* No Results */}
            {(search.trim().length > 0 && tracksSearchResults.length === 0 && artistsSearchResults.length === 0) && (
                <div className="text-white text-center mt-6">
                    <div className="min-[495px]:text-lg mb-2 font-extrabold w-full truncate px-14">
                        No results found for &quot;<strong>{search}</strong>&quot;.
                    </div>
                    <div className="min-[495px]:text-sm text-xs font-light glow-sm">
                        Check for spelling mistakes or try another keyword.
                    </div>
                </div>
            )}

            {/* Tracks */}
            {(search.trim().length > 0 && tracksSearchResults.length > 0) && (
                <div className={`px-2 mt-4`}>
                    <h1 className="sm:text-xl text-lg font-extrabold glow-sm">Songs</h1> 
                        <div 
                            className="sm:space-y-3 space-y-2 rounded-2xl sm:p-3 p-2 smooth-transition
                            overflow-y-scroll h-[calc(100vh-480px)] sm:h-[calc(100vh-450px)] w-full
                            scrollbar-thin scrollbar-thumb-white/20
                            scrollbar-thumb-rounded hover:scrollbar-thumb-white/50"
                        >
                            {tracksSearchResults.map(track => (
                                <AnimatePresence
                                    key={track.id}
                                >
                                    <motion.div
                                        initial={{ opacity: 0, transform: "translate(-20px, 0)" }}
                                        whileInView={{ opacity: 1, transform: "translate(0, 0)" }}
                                        exit={{ opacity: 0 }}
                                        transition={{ opacity: { duration: 0.5 }, transform: { duration: 0.5, ease: "easeOut" } }}
                                    >
                                        <Track 
                                            key={track.id}
                                            track={track}
                                            chooseTrack={chooseTrack}
                                        />
                                    </motion.div>
                                </AnimatePresence>
                            ))}
                        </div>
                </div>
)}
                {/* Artists */}
                {(search.trim().length > 0 && artistsSearchResults.length > 0) && (

                    <div className={`px-2 relative  ${tracksSearchResults.length > 0 ? "mt-1" : "mt-4"}`}>
                        <h1 className="sm:text-xl text-lg font-extrabold glow-sm">Artists</h1>
                        <ArtistCarousel
                            artists={artistsSearchResults}
                        />
                    </div>

                )}

        </section>
    );  
};
