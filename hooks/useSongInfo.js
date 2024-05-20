import useSpotify from './useSpotify';
import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { playingTrackState } from '@/atoms/atoms';

export default function useSongInfo() {
    const spotifyApi = useSpotify();
    const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);
    const [songInfo, setSongInfo] = useState(null);

    useEffect(() => {
        const fetchSongInfo = async () => {
            if (playingTrack?.id) {
                const trackInfo = await fetch(
                    `https://api.spotify.com/v1/tracks/${playingTrack.id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
                        },
                    },
                ).then(res => res.json()).catch(error => console.log("Error fetching song info", error));

                setSongInfo(trackInfo);
            }
        };
        fetchSongInfo();
    }, [playingTrack?.id, spotifyApi]);

    return songInfo;
};
