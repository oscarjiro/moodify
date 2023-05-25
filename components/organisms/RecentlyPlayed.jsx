import RecentlyPlayedItems from "../molecules/RecentlyPlayedItems";
import { BellIcon, Cog6ToothIcon, ShieldCheckIcon, ViewColumnsIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import useSpotify from "@/hooks/useSpotify";

export default function RecentlyPlayed({ chooseTrack }) {
    const { data: session } = useSession();
    const spotifyApi = useSpotify();
    const [recentlyPlayed, setRecentlyPlayed] = useState([]);

    useEffect(() => {
        if (!session.user.accessToken) return;

        spotifyApi.getMyRecentlyPlayedTracks({ limit: 20 }).then((res) => {
            setRecentlyPlayed(res.body.items.map(({ track }) => {
                return {
                    id: track.id,
                    artist: track.artists[0].name,
                    title: track.name,
                    albumUrl: track.album.images[0].url,
                    uri: track.uri,
                };
            }));
        });
    }, [session]);

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
                    <RecentlyPlayedItems
                        key={i}
                        track={track}
                        chooseTrack={chooseTrack}
                    />
                ))}
                </div>
            </div>
        </section>
    );
};
