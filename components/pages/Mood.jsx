import { CiFaceSmile, CiFaceMeh, CiFaceFrown, } from 'react-icons/ci';
import { moodState } from "@/atoms/playerAtom";
import { useRecoilState } from "recoil";
import { useEffect } from 'react';
import { moodCriteria } from '@/lib/moodCriteria';

export default function Mood({ chooseTrack }) {
    const [mood, setMood] = useRecoilState(moodState);

    // Fetch tracks based on mood
    useEffect(() => {
        // spotifyApi.getRecommendations().then((res) =>
    }, [mood])

    return (
        <div>
            <CiFaceSmile />
            <CiFaceMeh />
            <CiFaceFrown />
        </div>
    );
};
