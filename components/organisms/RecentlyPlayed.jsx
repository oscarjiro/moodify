import RecentlyPlayedItems from "../molecules/RecentlyPlayedItems";
import { ViewColumnsIcon } from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import useSpotify from "@/hooks/useSpotify";
import { useRecoilState } from "recoil";
import { playingTrackState } from "@/atoms/atoms";

export default function RecentlyPlayed({ chooseTrack }) {
    const { data: session } = useSession();
    const spotifyApi = useSpotify();

    const [playingTrack] = useRecoilState(playingTrackState);
    const [recentlyPlayed, setRecentlyPlayed] = useState([]);

    useEffect(() => {
        if (!session.user.accessToken) return;

        spotifyApi.getMyRecentlyPlayedTracks({ limit: 20 }).then((res) => {
            console.log("Recently Played", res);
            setRecentlyPlayed(res.body.items.map(({ track }) => {
                return {
                    id: track.id,
                    artist: track.artists[0].name,
                    artistId: track.artists[0].id,
                    title: track.name,
                    image: track.album.images[0].url,
                    uri: track.uri,
                };
            }));
        });
    }, [session, spotifyApi, playingTrack]);

    return (
        <section className="p-4 space-y-8 pr-8">
            {/* Recently Played Tracks */}
            <div className="backdrop-blur-md border-2 border-white/30 p-4 rounded-xl space-y-4">
                <div className="flex items-center justify-between">
                    <h4 className="text-white font-semibold text-sm">Recently Played</h4>
                    <ViewColumnsIcon className="w-5 text-white/30" />
                </div>

                <div className="space-y-4 overflow-y-scroll overflow-x-hidden h-[calc(100vh-280px)] scrollbar-hide">
                {recentlyPlayed.map((track, i) => (
                    <AnimatePresence
                        key={i}
                    >
                        <motion.div
                            initial={{ opacity: 0, transform: "translate(-20px, 0)" }}
                            whileInView={{ opacity: 1, transform: "translate(0, 0)" }}
                            exit={{ opacity: 0 }}
                            transition={{ opacity: { duration: 0.5 }, transform: { duration: 0.5, ease: "easeOut" } }}
                        >
                            <RecentlyPlayedItems
                                track={track}
                                chooseTrack={chooseTrack}
                            />
                        </motion.div>
                    </AnimatePresence>
                ))}
                </div>
            </div>
        </section>
    );
};
