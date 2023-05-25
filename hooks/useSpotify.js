import spotifyApi from '@/lib/spotify';
import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';

export default function useSpotify() {
    const { data: session, status } = useSession();

    useEffect(() => {
        if (session) {
            // Force user to login if refresh access token attempt fails
            if (session.error === "RefreshAccessTokenError") signIn;

            spotifyApi.setAccessToken(session.user.accessToken);
        }
    }, [session]);

    return spotifyApi;
};
