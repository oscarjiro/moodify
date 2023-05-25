import { atom } from "recoil";

export const activePageState = atom({
    key: "activePageState",
    default: "home",
});

export const playState = atom({
    key: "playState",
    default: false,
});

export const playingTrackState = atom({
    key: "playingTrackState",
    default: "",
});

export const experimentalPlayerState = atom({
    key: "experimentalPlayerState",
    default: false,
});

export const moodState = atom ({
    key: "moodState",
    default: "Positive",
});