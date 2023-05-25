import useSpotify from '@/hooks/useSpotify';
import SearchBar from '../molecules/SearchBar';
import Track from '../molecules/Track';
import Artist from '../molecules/Artist';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRecoilState } from 'recoil';
import { activePageState } from '@/atoms/playerAtom';

export default function Body({ chooseTrack }) {
    const { data: session } = useSession();
    const spotifyApi = useSpotify();

    const [activePage] = useRecoilState(activePageState);
    const [search, setSearch] = useState("");
    const [tracksSearchResults, setTracksSearchResults] = useState([]);
    const [artistsSearchResults, setArtistsSearchResults] = useState([]);
    const [showGridControls, setShowGridControls] = useState(false); 

    // Scroll Grid
    const handleScrollGrid = (direction) => {
        const grid = document.getElementById('artistsGrid');
        if (grid) {
            grid.scrollBy({
                top: 0,
                left: direction === "right" ? 200 : -200, 
                behavior: "smooth",
            });
        }
    };

    // Search for Tracks and Artists
    useEffect(() => {
        if (search.trim().length < 1 || search === "*") return setTracksSearchResults([]);
        if (spotifyApi.getAccessToken()) {

            // Search for Tracks
            spotifyApi.searchTracks(search).then((res) => {
                console.log("Track Search", res);
                setTracksSearchResults(res.body.tracks.items.map((track) => {
                    return {
                        id: track.id,
                        artist: track.artists[0].name,
                        title: track.name,
                        uri: track.uri,
                        albumUrl: track.album.images[0].url,
                        popularity: track.popularity,
                    };
                }));
                console.log("Track Search Results", tracksSearchResults);
            });
    
            // Search for Artists
            spotifyApi.searchArtists(search).then((res) => {
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

    }, [search, session]);

    return (
        <section 
            className={`text-white fixed w-[calc(100vw-40px)] sm:w-[calc(100vw-140px)] min-[1100px]:w-[calc(100vw-410px)] 
                        overflow-y-hidden ${activePage === "search" ? "active-page" : "inactive-page"} scrollbar-hide`}
        >
            {/* Search Bar */}
            <SearchBar search={search} setSearch={setSearch} />

            {/* Default Display */}
            {search.trim().length < 1 && (
                <div className="text-white text-center text-lg mt-6">
                    Discover your favorite artists and music.
                </div>
            )}

            {/* No Results */}
            {(search.trim().length > 0 && tracksSearchResults.length === 0 && artistsSearchResults.length === 0) && (
                <div className="text-white text-center mt-6">
                    <div className="text-lg mb-2 font-extrabold w-full truncate px-14">
                        No results found for "<strong>{search}</strong>".
                    </div>
                    <div className="text-sm font-light">
                        Check for spelling mistakes or try another keyword.
                    </div>
                </div>
            )}

            {/* Artists */}
            {(search.trim().length > 0 && artistsSearchResults.length > 0) && (

                <div className="px-2 mt-4 relative">
                    <h1 className="text-xl font-extrabold glow-sm">Artists</h1>
                    <div 
                        id="artistsGrid"
                        className={`mt-1 py-2 px-4 flex overflow-y-hidden scrollbar-hide items-center space-x-4`}
                    >
                        {artistsSearchResults.slice(0,20).map(artist => (
                            <Artist 
                                key={artist.id}
                                artist={artist}
                                onMouseOver={() => setShowGridControls(true)}
                                onMouseLeave={() => setShowGridControls(false)}
                            />
                        ))}
                    </div>

                    {/* Grid Controls Arrow */}
                    <div className="smooth-transition" id="gridControls">
                        <ChevronLeftIcon 
                            className={`controls smooth-transition ${showGridControls ? "opacity-50" : "opacity-0"}
                                        absolute top-20 left-0 w-7 h-7 hover:opacity-100`}
                            onClick={() => handleScrollGrid("left")}
                        />
                        <ChevronRightIcon 
                            className={`controls smooth-transition ${showGridControls ? "opacity-50" : "opacity-0"}
                                        absolute top-20 right-0 w-7 h-7 hover:opacity-100`}
                            onClick={() => handleScrollGrid("right")}
                        />
                    </div>
                </div>

            )}

            {/* Tracks */}
            {(search.trim().length > 0 && tracksSearchResults.length > 0) && (

                <div className={`px-2 ${artistsSearchResults.length > 0 ? "mt-1" : "mt-4"}`}>
                    <h1 className="text-xl font-extrabold glow-sm">Songs</h1> 
                    <div 
                        className="space-y-3 rounded-2xl p-3 smooth-transition
                                    overflow-y-scroll h-[calc(100vh-480px)] sm:h-[calc(100vh-450px)] w-full
                                    scrollbar-thin scrollbar-thumb-white/20
                                    scrollbar-thumb-rounded hover:scrollbar-thumb-white/50"
                    >
                        {tracksSearchResults.map(track => (
                            <Track 
                                key={track.id}
                                track={track}
                                chooseTrack={chooseTrack}
                            />
                        ))}
                    </div>
                </div>

            )}
        </section>
    );  
};
