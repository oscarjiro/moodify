import React from 'react';
import Sidebar from './organisms/Sidebar';
import Body from './Body';
import Right from './Right';
import Player from './Player';
import SpotifyWebApi from 'spotify-web-api-node';
import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { playingTrackState } from '@/atoms/playerAtom';
import { useSession } from 'next-auth/react';

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
});

export default function Dashboard() {
    const { data: session } = useSession();

    const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);
    const [showPlayer, setShowPlayer] = useState(false);

    useEffect(() => {
        setShowPlayer(true);
    }, []);

    const chooseTrack = (track) => setPlayingTrack(track);

    return (
        <main className="flex min-h-screen min-w-max bg-black lg:pb-24">
            <Sidebar />
            <Body spotifyApi={spotifyApi} chooseTrack={chooseTrack} />
            <Right spotifyApi={spotifyApi} chooseTrack={chooseTrack} />

            <div className="fixed bottom-0 left-0 right-0 z-50">
                <Player 
                    accessToken={session.user.accessToken}
                    trackUri={playingTrack.uri}
                />
            </div>
        </main>
    );
};
