import useSpotify from '@/hooks/useSpotify';
import PosterCarousel from '../organisms/PosterCarousel';
import Welcome from '../organisms/Welcome';
import Tilt from "react-parallax-tilt";
import { BeatLoader } from 'react-spinners';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRecoilState } from 'recoil';
import { activePageState } from '@/atoms/atoms';

export default function Body({ chooseTrack }) {
    const { data: session } = useSession();
    const spotifyApi = useSpotify();

    const [activePage] = useRecoilState(activePageState);
    const [newAlbums, setNewAlbums] = useState([]);
    const [newReleases, setNewReleases] = useState([]);
    const [userPlaylists, setUserPlaylists] = useState([]);

    const [greeting, setGreeting] = useState("");

    // Get New Albums
    useEffect(() => {
        if (spotifyApi.getAccessToken()) {   

            // Get Albums
            spotifyApi.getNewReleases().then(res => {
                console.log("New Releases Albums Fetched", res);
                setNewAlbums(res.body?.albums?.items?.map(album => {
                    return {
                        id: album?.id,
                        image: album?.images?.[0]?.url,
                    };
                }));
            });
        }
    }, [session, spotifyApi]);

    // Get New Song Releases
    useEffect(() => {
        if (spotifyApi.getAccessToken()) {

            // Get Album IDs first track
            Promise.all(newAlbums.map(newAlbum => {
                return spotifyApi.getAlbumTracks(newAlbum.id, { limit: 1, offset: 0 }).then(trackRes => {
                    console.log("New Releases Tracks Fetched", trackRes);
                    const track = trackRes.body?.items?.[0];
                    return {
                        id: track?.id,
                        artist: track?.artists?.[0]?.name,
                        title: track?.name,
                        uri: track?.uri,
                        image: newAlbum.image,
                    };
                });
            })).then(newReleases => {
                setNewReleases(newReleases);
            });
            
        }
    }, [session, spotifyApi, newAlbums]);

    // Update greeting
    useEffect(() => {
        // Update greeting every 1 minute
        const interval = setInterval(() => {
            const currentTime = new Date();
            const currentHour = currentTime.getHours();

            switch (true) {
                case currentHour >= 5 && currentHour < 12:
                    setGreeting("Good morning"); break;
                case currentHour >= 12 && currentHour < 18:
                    setGreeting("Good afternoon"); break;
                case currentHour >= 18 && currentHour < 21: 
                    setGreeting("Good evening"); break;
                default:
                    setGreeting("Good night"); break;
            }
        }, 1000);

        // Clean up interval on unmount
        return () => clearInterval(interval);
    }, []);

    console.log("New Releases", newReleases);

    return (
        <section className={`text-white ${activePage === "home" ? "active-page" : "inactive-page"}`}>
        
            {/* Welcome */}
            <div className="mb-8">
                {greeting === "" ? (
                    <div className="text-center mb-[22.5px]">
                        <BeatLoader 
                            color="rgba(255, 255, 255, 0.3)"
                            loading={true}
                            size={15}
                        />
                    </div>
                ) : (
                    <h1 className="header">
                        {greeting}, <span className="font-bold gradient-text">{session.user.name}</span>
                    </h1>
                )}
                <Tilt 
                    tiltEnable={false}
                    glareEnable={true}
                    glarePosition='all'
                    glareMaxOpacity={0.15}
                    className="w-full h-full min-[810px]:h-[300px] backdrop-blur-md rounded-xl overflow-hidden 
                                object-cover border-2 border-white/30 px-4"
                >
                    <Welcome 
                        chooseTrack={chooseTrack}
                    />
                </Tilt>
            </div>

            {/* New Releases */}
            {newReleases.length > 0 && (
                <div className="mb-8 relative">
                    <h1 className="header mb-0">
                        New Releases
                    </h1>
                    <PosterCarousel 
                        tracks={newReleases}
                        chooseTrack={chooseTrack}
                        id="newReleasesCarousel"
                    />
                </div>
            )}

        </section>
    );  
};
 

    /*
    useEffect(() => {
        if (spotifyApi.getAccessToken())
        {

            spotifyApi.getUserPlaylists().then(res => {
                console.log("Playlists", res);
                setUserPlaylists(res?.body?.items?.map(playlist => {
                    return {
                        name: playlist?.name,
                        id: playlist?.id,
                        uri: playlist?.uri,
                        image: playlist?.images?.[0]?.url,
                    };
                }));
            }).catch(err => {
                console.log("Playlists fetching error", err);
                setUserPlaylists([]);
            });

        }
    }), [session, spotifyApi];
    */
