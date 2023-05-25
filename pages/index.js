"use client";

import Image from 'next/image';
import useSpotify from '@/hooks/useSpotify';
import Loader from '@/components/molecules/Loader';
import Sidebar from '@/components/organisms/Sidebar';
import Player from '@/components/organisms/Player';
import Dropdown from '@/components/organisms/Dropdown';
import Homepage from '@/components/pages/Homepage';
import Search from '@/components/pages/Search';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRecoilState } from 'recoil';
import { activePageState, experimentalPlayerState, playState, playingTrackState } from '@/atoms/playerAtom';
import RecentlyPlayed from '@/components/organisms/RecentlyPlayed';
import Mood from '@/components/pages/Mood';

export default function Home() {
  const { data: session, status } = useSession({ required: true, });
  const spotifyApi = useSpotify();

  const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);
  const [activePage] = useRecoilState(activePageState);
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
  console.log("ACTIVEP AGE", activePage);

  return (
    <main>
      {/* Content */ }
      <div
        className="flex-grow w-screen px-5 min-[1100px]:w-[calc(100vw-370px)]
                  sm:w-[calc(100vw-90px)] sm:ml-24"
      >

        {/* Top Background */}
        <div className="fixed top-0 left-0 bg-gradient-to-b from-[#ca5ccd] from-50% h-[90px] w-screen z-[49] opacity-80" />

        {/* Logo */}
        <a href="/">
          <Image 
                src="/logo.png"
                width={225}
                height={0}
                alt="Logo"
                className="fixed top-8 z-50 max-[396px]:scale-75 max-[396px]:-left-2"
                style={{ filter: "drop-shadow(0 0 4px rgba(255, 255, 255, 0.75))" }}
          />
        </a>


        {/* User Dropdown */}
        <div className="fixed top-6 right-4 z-50 max-[396px]:scale-75">
          <Dropdown />
        </div>

        {/* Recently Played */}
        <div
          className="fixed hidden min-[1100px]:block z-[49] w-[300px] -right-4 top-20"
        >
          <RecentlyPlayed chooseTrack={chooseTrack} />
        </div>

        {/* Pages */}
        <div className="mt-24 mb-24">
          {/* Homepage */}
          <motion.div
            initial={{ 
              opacity: 0, 
              transform: "translate(0, -25px)" 
            }}
            animate={{ 
              opacity: activePage === 'home' ? 1 : 0, 
              transform: activePage === "home" ? "translate(0, 0)" : "translate(0, -25px)" 
            }}
            transition={{ duration: 0.5 }}
          >
            <Homepage chooseTrack={chooseTrack} />
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ 
              opacity: 0, 
              transform: "translate(0, -25px)" 
            }}
            animate={{ 
              opacity: activePage === 'search' ? 1 : 0, 
              transform: activePage === "search" ? "translate(0, 0)" : "translate(0, -25px)" 
            }}
            transition={{ duration: 0.5 }}
          >
            <Search chooseTrack={chooseTrack} />
          </motion.div>

          {/* Mood Page */}
          <motion.div
            initial={{ 
              opacity: 0, 
              transform: "translate(0, -25px)" 
            }}
            animate={{ 
              opacity: activePage === 'mood' ? 1 : 0, 
              transform: activePage === "mood" ? "translate(0, 0)" : "translate(0, -25px)" 
            }}
            transition={{ duration: 0.5 }}
          >
            <Mood chooseTrack={chooseTrack} />
          </motion.div>
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
