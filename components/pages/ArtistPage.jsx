import useSpotify from "@/hooks/useSpotify";
import Track from "../molecules/Track";
import ArtistCarousel from "../organisms/ArtistCarousel";
import { AnimatePresence, motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";

export default function ArtistPage({ artistId, chooseTrack }) {
    const { data: session } = useSession();
    const spotifyApi = useSpotify();

    const [artist, setArtist] = useState([]);
    const [artistTopTracks, setArtistTopTracks] = useState([]);
    const [relatedArtists, setRelatedArtists] = useState([]);

    const formatter = new Intl.NumberFormat(undefined, { notation: "compact", });

    // Fetch artist data from ID
    useEffect(() => {
        if (spotifyApi.getAccessToken()) {

            // Get artist profile
            spotifyApi.getArtist(artistId).then(res => {
                const artist = res?.body;
                console.log("Artist Page", artist);
                setArtist({
                    name: artist?.name,
                    uri: artist?.uri,
                    id: artist?.id,
                    image: artist?.images?.[0]?.url,
                    popularity: artist?.popularity,
                    followers: artist?.followers?.total, 
                });
            });

            // Get artist top tracks
            spotifyApi.getArtistTopTracks(artistId, "ID").then(res => {
                console.log("Artist Top Tracks", res);
                setArtistTopTracks(res.body?.tracks.map(track => {
                    return {
                        title: track.name,
                        id: track.id,
                        uri: track.uri,
                        image: track.album?.images?.[0]?.url,
                        artist: track.artists?.[0]?.name,
                    };
                }));
            });
            
            // Get related artists
            spotifyApi.getArtistRelatedArtists(artistId).then(res => {
                console.log("Artist Related Artists", res);
                setRelatedArtists(res.body?.artists.map(artist => {
                    return {
                        name: artist?.name,
                        uri: artist?.uri,
                        id: artist?.id,
                        image: artist?.images?.[0]?.url,
                    };
                }));
            });

        }
    }, [spotifyApi, session, artistId]);

    return (
        <motion.div
            key={artistId}
            initial={{ opacity: 0, }}
            animate={{ opacity: 1 }}
        >
            <section className="min-[760px]:mt-[120px] min-[495px]:mt-[80px] min-[420px]:mt-[60px] text-white">

                {/* Header */}
                <div className="flex items-center justify-start overflow-hidden h-[180px]
                                min-[760px]:space-x-12 min-[495px]:space-x-5 space-x-3">
                    {/* Image */}
                    <div
                        className="min-[760px]:h-36 min-[760px]:w-36 
                                    min-[495px]:h-28 min-[495px]:w-28
                                    min-[420px]:h-24 min-[420px]:w-24
                                    h-20 w-20 rounded-full overflow-hidden"
                    >
                        {artist?.image ? (
                            <img 
                                src={artist?.image} 
                                alt={artist?.name} 
                                className="object-cover"
                            />
                        ) : (
                            <div 
                                className="bg-gradient-to-tr from-black/60 from-10% to-[#ca5ccd]
                                            border-2 border-white/30 backdrop-blur-md
                                            w-full h-full rounded-full flex items-center justify-center"
                            >
                                <div className="p-1 gradient-text font-light min-[760px]:text-base min-[495px]:text-xs text-[9px] glow-sm w-[70%] min-[495px]:leading-4 leading-3">
                                    {artist?.name}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Profile */}
                    <div className="flex flex-col items-start space-y-1 w-[50%]">
                        {/* Name */}
                        <div 
                            className="min-[760px]:text-5xl min-[495px]:text-4xl min-[420px]:text-3xl text-2xl
                                        font-bold gradient-text truncate
                                        [filter:drop-shadow(0_0_10px_rgba(255,255,255,0.5))]"
                        >
                            {artist?.name}
                        </div>

                        <div className="flex justify-center min-[495px]:space-x-8 space-x-6 items-center">  
                            {/* Followers */}
                            <div className="flex justify-center space-x-2 items-center">
                                <div className="min-[760px]:text-5xl min-[420px]:text-[40px] text-4xl
                                                text-white/70 font-light glow">
                                    {formatter.format(artist?.followers)}
                                </div>
                                <div className="min-[760px]:text-sm min-[495px]:text-xs min-[420px]:text-[10px] text-[8px]
                                                glow-sm gradient-text [writingMode:vertical-rl]">
                                    Followers
                                </div>
                            </div>   
                            
                            {/* Popularity */}
                            <div className="flex justify-center space-x-2 items-center">
                                <CircularProgressbar 
                                    value={artist?.popularity}
                                    text={artist?.popularity}
                                    strokeWidth={4}
                                    className="min-[760px}:w-[80px] min-[495px]:w-[60px] min-[420px]:w-[50px] w-[40px]
                                                CircularProgressbar 
                                                CircularProgressbar-path 
                                                CircularProgressbar-trail 
                                                CircularProgressbar-text 
                                                CircularProgressbar-background"
                                />
                                <div className="min-[760px]:text-sm min-[495px]:text-xs min-[420px]:text-[10px] text-[8px]
                                                glow-sm gradient-text [writingMode:vertical-rl]">
                                    Popularity
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Top Tracks */}
                {artistTopTracks.length > 0 && (
                    <div className={``}>
                        <h1 className="min-[495px]:text-xl text-md font-light glow-sm">Top Tracks</h1> 
                            <div 
                                className="space-y-3 rounded-2xl min-[495px]:p-3 p-1 smooth-transition
                                            overflow-y-scroll h-full w-full
                                            scrollbar-thin scrollbar-thumb-white/20
                                            scrollbar-thumb-rounded hover:scrollbar-thumb-white/50"
                                >
                                    {artistTopTracks.map(track => (
                                        <AnimatePresence
                                            key={track?.id}
                                        >
                                            <motion.div
                                                initial={{ opacity: 0, transform: "translate(-20px, 0)" }}
                                                whileInView={{ opacity: 1, transform: "translate(0, 0)" }}
                                                exit={{ opacity: 0 }}
                                                transition={{ opacity: { duration: 0.5 }, transform: { duration: 0.5, ease: "easeOut" } }}
                                            >
                                                <Track 
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
                {(relatedArtists.length > 0) && (

                    <div className="relative">
                        <h1 className="min-[495px]:text-xl text-md font-light glow-sm">
                            More Like <span className="gradient-text font-bold">{artist.name}</span>
                        </h1>
                        <ArtistCarousel 
                            artists={relatedArtists}
                        />
                    </div>

                )}
            </section>
        </motion.div>
    );
};
