import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Dropdown from "./Dropdown";
import RecentlyPlayed from './RecentlyPlayed';
import { BellIcon, Cog6ToothIcon, ShieldCheckIcon, ViewColumnsIcon } from "@heroicons/react/24/solid";

export default function Right({ spotifyApi, chooseTrack }) {
  const { data: session } = useSession();
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
      <div className="flex space-x-2 items-center justify-between">
        {/* Icons */}
        <div className="flex items-center space-x-4 border-2 border-[#262626] rounded-full h-12 py-3 px-4">
          <ShieldCheckIcon className="text-[#cccccc] w-5" />
          <Cog6ToothIcon className="text-[#cccccc] w-5" />
          <BellIcon className="text-[#cccccc] w-5" />
        </div>

        {/* Profile */}
        <Dropdown />
      </div>

      {/* Recently Played Tracks */}
      <div className="bg-[#0d0d0d] border-2 border-[#262626] p-4 rounded-xl space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-white font-semibold text-sm">Recently Played</h4>
          <ViewColumnsIcon className="w-5 text-[#686868]" />
        </div>

        <div className="space-y-4 overflow-y-scroll overflow-x-hidden h-[250px] md:h-[400px] scrollbar-hide">
          {recentlyPlayed.map((track, i) => (
            <RecentlyPlayed
              key={i}
              track={track}
              chooseTrack={chooseTrack}
            />
          ))}
        </div>
        <button className="btn">View All</button>
      </div>
    </section>
  );
};
