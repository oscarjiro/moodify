import Script from 'next/script';
import useSpotify from '@/hooks/useSpotify';
import useSongInfo from '@/hooks/useSongInfo';
import SpotifyPlayer from 'react-spotify-web-playback';
import { FiVolumeX, FiVolume1, FiVolume2 } from 'react-icons/fi';
import { experimentalPlayerState, playState, playingTrackState } from '@/atoms/playerAtom';
import { ArrowPathIcon, ArrowUturnLeftIcon, BackwardIcon, ForwardIcon, PauseIcon, PlayIcon } from '@heroicons/react/24/solid';
import { useCallback, useEffect, useRef, useState } from 'react';
import { errorSelector, useRecoilState } from 'recoil';
import { useSession } from 'next-auth/react';
import { debounce } from 'lodash';

export default function Player() {
    const { data: session } = useSession();
    const spotifyApi = useSpotify();
    const [play, setPlay] = useRecoilState(playState);
    const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);
    const [experimental, setExperimental] = useRecoilState(experimentalPlayerState);
    const [originalPlayer, setOriginalPlayer] = useState(true);
    const [volume, setVolume] = useState(50);
    const previousVolume = useRef(null);
    const songInfo = useSongInfo();

    // Handle volume change
    const handleMuteVolume = () => {
        previousVolume.current = volume;
        setVolume(0);
    };
    const handleUnmuteVolume = () => setVolume(previousVolume.current);
    
    // Debounce volume adjustment
    const debouncedAdjustVolume = useCallback(
        debounce((volume) => {
            spotifyApi.setVolume(volume).catch(error => {});
        }, 500), [],
    );
    useEffect(() => {
        if (volume >= 0 && volume <= 100) {
            debouncedAdjustVolume(volume);
        }
    }, [volume]);

    // Handle playing and pausing
    const handlePlayPause = () => {
        spotifyApi.getMyCurrentPlaybackState().then(data => {
            if (data.body?.is_playing) {
                spotifyApi.pause();
                setPlay(false);
            } else {
                spotifyApi.play();
                setPlay(true);
            }
        }).catch(error => {
            console.log("Error with player", error);
            setOriginalPlayer(false);
        });
    };
    
    // Fetch currently playing song
    const fetchCurrentSong = () => {
        if (!songInfo) {
            spotifyApi.getMyCurrentPlayingTrack().then(data => {
                console.log("Now playing: ", data.body?.item);
                setPlayingTrack(data.body?.item);
                spotifyApi.getMyCurrentPlaybackState().then(data => {
                    setPlayingTrack(data.body?.is_playing);
                });
            }).catch(error => {
                console.log("Error fetching song", error);
            });
        }
    };
    useEffect(() => {
        if (spotifyApi.getAccessToken() && !playingTrack?.id) {
            fetchCurrentSong();
            setVolume(50);
        }
    }, [playingTrack, spotifyApi, session]);
    

    console.log("songInfo", songInfo);
    console.log("component volume", volume/100)

    return (
        <>        
            {experimental ? (
                /* Custom Player */
                <div 
                    className="h-[70px] sm:h-24 w-screen backdrop-blur-lg text-white rounded-full bg-black/30
                                grid grid-cols-3 text-xs md:text-base px-8"
                >
                    {/* Left */}
                    <div className={`flex items-center space-x-4 ${!songInfo && "invisible"}`}>
                        <img 
                            className="inline h-12 w-12 rounded-xl object-cover"
                            src={songInfo?.album?.images?.[0]?.url} 
                            alt="Track Image" 
                        />
                        <div>
                            <h4 className="font-semibold text-base truncate sm:w-[calc(100vw/5)] w-[50vw]">{songInfo?.name}</h4>
                            <p className="font-light text-xs truncate sm:w-[calc(100vw/5)] w-[50vw]">{songInfo?.artists?.[0]?.name}</p>
                        </div>
                    </div>

                    {/* Center */}
                    <div className="flex items-center justify-center w-screen sm:w-auto sm:justify-evenly">
                        <ArrowPathIcon className="controls hidden sm:block" />
                        <BackwardIcon className="controls hidden sm:block" />
                        <div id="togglePlay">
                            {play ? (
                                <PauseIcon
                                    className="controls w-10 h-10"
                                    onClick={handlePlayPause} 
                                /> 
                            ) : (
                                <PlayIcon 
                                    className="controls w-10 h-10" 
                                    onClick={handlePlayPause}
                                />
                            )}
                        </div>
                        <ForwardIcon className="controls hidden sm:block" />
                        <ArrowUturnLeftIcon className="controls hidden sm:block" />
                    </div>

                    {/* Right */}
                    <div className="flex items-center space-x-3 md:space-x-4 justify-end pr-5">
                        {volume < 1 && (
                            <FiVolumeX
                                onClick={handleUnmuteVolume}
                                className="controls invisible sm:visible glow-sm" 
                            />
                        )}
                        {(volume > 0 && volume < 50) && (
                            <FiVolume1
                                onClick={handleMuteVolume}
                                className="controls invisible sm:visible glow-sm" 
                            />
                        )}
                        {(volume >= 50) && (
                            <FiVolume2
                                onClick={handleMuteVolume}
                                className="controls invisible sm:visible glow-sm" 
                            />
                        )}
                        <input 
                            id="volumeSettings"
                            type="range" 
                            value={volume}
                            min={0}
                            max={100}
                            onChange={e => setVolume(e.target.value)}
                            className="invisible sm:visible w-20 accent-[#ca5ccd]"
                        />
                    </div>
                </div>

            ) : (
                <>
                    <div className="text-center h-[70px] sm:h-[96px] backdrop-blur-md rounded-full bg-black/30 overflow-hidden">
                        <div className="scale-[60%] min-[768px]:scale-100 flex items-center p-5 w-full h-full">
                            <SpotifyPlayer
                                styles={{
                                    activeColor: "#ffffff",
                                    bgColor: "rgba(90, 90, 90, 0)",
                                    color: "#ffffff",
                                    loaderColor: "#ffffff",
                                    sliderColor: "#ca5ccd",
                                    trackArtistColor: "#ffffff",
                                    trackNameColor: "#ffffff",
                                    height: "90px",
                                    sliderTrackColor: "rgba(255, 255, 255, 0.2)",
                                    sliderTrackBorderRadius: "4px",
                                    sliderHandleColor: "#fff",
                                    errorColor: "#fff",
                                }}
                                token={session.user.accessToken}
                                callback={(state) => setPlay(state.isPlaying)}
                                play={play}
                                uris={playingTrack ? [playingTrack.uri] : []}
                                magnifySliderOnHover={true}
                            />     
                        </div>
                    </div>
                </>
            )}

            {/* Script for Experimental Custom Player */}
            <Script src="https://sdk.scdn.co/spotify-player.js" />
            <Script>
                {window.onSpotifyWebPlaybackSDKReady = () => {

                    if (experimental) {
                        const token = session?.user?.accessToken;
                        const player = new Spotify.Player({
                            name: 'Moodify',
                            getOAuthToken: cb => { cb(token); },
                            volume: 0.5
                        });
    
                        player.addListener('ready', ({ device_id }) => {
                            console.log('Ready with Device ID', device_id);
                        });
    
                        player.addListener('not_ready', ({ device_id }) => {
                            console.log('Device ID has gone offline', device_id);
                        });
    
                        player.addListener('initialization_error', ({ message }) => {
                            console.error(message);
                        });
    
                        player.addListener('authentication_error', ({ message }) => {
                            console.error(message);
                        });
    
                        player.addListener('account_error', ({ message }) => {
                            console.error(message);
                        });

                        document.getElementById('togglePlay').onclick = function() {
                            player.togglePlay();
                        };
    
                        player.connect();
    
                        document.getElementById('volumeSettings').onchange = function(e) {
                            player.setVolume(e.target.value).then(() => {
                                console.log('Volume updated!');
                            });
                        };
                    }  

                }}
            </Script>
        </>
    );
};
