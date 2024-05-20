"use client";

import Image from 'next/image';
import Link from 'next/link';
import useSpotify from '@/hooks/useSpotify';
import Homepage from '@/components/pages/Homepage';
import Search from '@/components/pages/Search';
import Mood from '@/components/pages/Mood';
import AboutUs from '@/components/pages/AboutUs';
import ArtistPage from '@/components/pages/ArtistPage';
import Player from '@/components/organisms/Player';
import Sidebar from '@/components/organisms/Sidebar';
import Dropdown from '@/components/organisms/Dropdown';
import RecentlyPlayed from '@/components/organisms/RecentlyPlayed';
import Loader from '@/components/molecules/Loader';
import { AnimatePresence, motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { useRecoilState } from 'recoil';
import { activePageState, artistViewState, experimentalPlayerState, playState, playingTrackState } from '@/atoms/atoms';

export default function Home() {
  const { data: session, status } = useSession({ required: true, });
  const spotifyApi = useSpotify();

  const [activePage] = useRecoilState(activePageState);
  const [artistView, setArtistView] = useRecoilState(artistViewState);

  const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);
  const [play] = useRecoilState(playState);
  const [experimental] = useRecoilState(experimentalPlayerState);
  
  // Choose track
  const chooseTrack = track => {
    if (experimental)
    {
      if (track?.uri === playingTrack?.uri) {
        play ? spotifyApi.pause() : spotifyApi.play();
      } else {
        setPlayingTrack(track);
        spotifyApi.play({ uris: [track?.uri], });
      }
    } else {
      setPlayingTrack(track);
    }
  };

  // Loader when still loading
  if (status === "loading") return <Loader />; 

  // Log session
  console.log("SESSION", session);

  return (
    <main>
      {/* Content */ }
      <div
        className="flex-grow w-screen px-5 min-[1100px]:w-[calc(100vw-370px)]
                  sm:w-[calc(100vw-90px)] sm:ml-24 max-[375px]:w-[375px] max-w-[375px]:overflow-sroll"
      >

        {/* Top Background */}
        <div className="fixed top-0 left-0 bg-gradient-to-b from-[#ca5ccd] from-50% h-[90px] w-screen z-[49] opacity-80" />

        {/* Logo */}
        <Link href="/">
          <Image 
                src="/logo.png"
                width={225}
                height={0}
                alt="Logo"
                
                style={{ filter: "drop-shadow(0 0 4px rgba(255, 255, 255, 0.75))" }}
          />
        </Link>


        {/* User Dropdown */}
        <div className="fixed top-6 right-4 z-50 max-[396px]:scale-75 max-[375px]:right-0 max-[375px]:min-w-max">
          <Dropdown />
        </div>

        {/* Recently Played */}
        <div
          className="fixed hidden min-[1100px]:block z-[49] w-[300px] -right-4 top-20"
        >
          <RecentlyPlayed chooseTrack={chooseTrack} />
        </div>

        {/* Pages */}
        <div className="mt-24 sm:mb-24 mb-32">
          {artistView === "" && (
            <>
              {/* Homepage */}
              <AnimatePresence>
                <motion.div
                  initial={{ 
                    opacity: 0, 
                    transform: "translate(0, -120px)",
                  }}
                  animate={{ 
                    opacity: activePage === 'home' ? 1 : 0, 
                    transform: activePage === "home" ? "translate(0, 0)" : "translate(0, -25px)",
                  }}
                  transition={{ 
                    opacity: { duration: 0.5 },
                    transform: { ease: "easeOut", duration: 1 }
                  }}
                  exit={{ 
                    opacity: 0,
                    transform: "translate(0, 120px)",
                  }}
                >
                  <Homepage chooseTrack={chooseTrack} />
                </motion.div>
              </AnimatePresence>

              {/* Search */}
              <motion.div
                initial={{ 
                  opacity: 0, 
                  transform: "translate(0, -120px)",
                }}
                animate={{ 
                  opacity: activePage === 'search' ? 1 : 0, 
                  transform: activePage === "search" ? "translate(0, 0)" : "translate(0, -25px)",
                }}
                transition={{ 
                  opacity: { duration: 0.5 },
                  transform: { ease: "easeOut", duration: 1 }
                }}
              >
                <Search chooseTrack={chooseTrack} />
              </motion.div>

              {/* Mood Page */}
              <motion.div
                initial={{ 
                  opacity: 0, 
                  transform: "translate(0, -120px)",
                }}
                animate={{ 
                  opacity: activePage === 'mood' ? 1 : 0, 
                  transform: activePage === "mood" ? "translate(0, 0)" : "translate(0, -25px)",
                }}
                transition={{ 
                  opacity: { duration: 0.5 },
                  transform: { ease: "easeOut", duration: 1 }
                }}
              >
                <Mood chooseTrack={chooseTrack} />
              </motion.div>

              {/* About Us */}
              <motion.div
                initial={{ 
                  opacity: 0, 
                  transform: "translate(0, -120px)",
                }}
                animate={{ 
                  opacity: activePage === 'aboutUs' ? 1 : 0, 
                  transform: activePage === "aboutUs" ? "translate(0, 0)" : "translate(0, -25px)",
                }}
                transition={{ 
                  opacity: { duration: 0.5 },
                  transform: { ease: "easeOut", duration: 1 }
                }}
              >
                <AboutUs />
              </motion.div>
            </>
          )}

          {/* Artist View */}
          {artistView !== "" && (
            <motion.div
              initial={{ 
                opacity: 0, 
                transform: "translate(0, -120px)",
              }}
              animate={{ 
                opacity: artistView !== "" ? 1 : 0, 
                transform: artistView === "" ? "translate(0, 0)" : "translate(0, -25px)",
              }}
              transition={{ 
                opacity: { duration: 0.5 },
                transform: { ease: "easeOut", duration: 1 }
              }}
            >
              <ArtistPage artistId={artistView} chooseTrack={chooseTrack} />
            </motion.div>
          )}
        </div>
      </div>

      {/* Player */}
      <div className="fixed bottom-16 sm:bottom-2 z-[51] w-screen">
        <Player />
      </div>

      {/* Sidebar */}
      <Sidebar />
      
    </main>
  );
};
