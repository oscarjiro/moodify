import useSpotify from '@/hooks/useSpotify';
import Poster from '../molecules/Poster';
import Welcome from '../organisms/Welcome';
import Tilt from "react-parallax-tilt";
import { BeatLoader } from 'react-spinners';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRecoilState } from 'recoil';
import { activePageState } from '@/atoms/playerAtom';

export default function Body({ chooseTrack }) {
    const { data: session } = useSession();
    const spotifyApi = useSpotify();

    const [activePage, setActivePage] = useRecoilState(activePageState);
    const [newReleases, setNewReleases] = useState([]);
    const [showGridControls, setShowGridControls] = useState(false); 
    const [greeting, setGreeting] = useState("");

    // Scroll Grid
    const handleScrollGrid = (direction) => {
        const grid = document.getElementById('newReleasesGrid');
        if (grid) {
            grid.scrollBy({
                top: 0,
                left: direction === "right" ? 200 : -200, 
                behavior: "smooth",
            });
        }
    };

    // Get New Releases
    useEffect(() => {
        if (spotifyApi.getAccessToken()) {   
            spotifyApi.getNewReleases().then((res) => {
                setNewReleases(res.body.albums.items.map((track) => {
                    return {
                        id: track.id,
                        artist: track.artists[0].name,
                        title: track.name,
                        uri: track.uri,
                        albumUrl: track.images[0].url,
                    };
                }));
            });
        }
    }, [session]);

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
    }, [])

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
                    <h1 className="homepage-header font-bold glow whitespace-nowrap mb-3">
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
            <div className="mb-8 relative">
                <h1 className="homepage-header font-bold glow whitespace-nowrap">
                    New Releases
                </h1>
                <div 
                    id="newReleasesGrid"
                    className="relative grid overflow-x-scroll overflow-y-hidden scrollbar-hide h-[400px]  
                                grid-cols-[repeat(22,minmax(0,1fr))] py-4 gap-x-72"
                >
                    {newReleases.slice(0,newReleases.length).map(track => 
                        <Poster 
                            key={track.id} 
                            track={track} 
                            chooseTrack={chooseTrack}
                            onMouseOver={() => setShowGridControls(true)}
                            onMouseLeave={() => setShowGridControls(false)}
                        />
                    )}
                </div>

                {/* New Releases Arrow */}
                <div className="smooth-transition" id="gridControls">
                    <ChevronLeftIcon 
                        className={`controls smooth-transition ${showGridControls ? "opacity-50" : "opacity-0"}
                                    absolute top-52 left-0 w-10 h-10 hover:opacity-100`}
                        onClick={() => handleScrollGrid("left")}
                    />
                    <ChevronRightIcon 
                        className={`controls smooth-transition ${showGridControls ? "opacity-50" : "opacity-0"}
                                    absolute top-52 right-0 w-10 h-10 hover:opacity-100`}
                        onClick={() => handleScrollGrid("right")}
                    />
                </div>
            </div>
        </section>
    );  
};
 