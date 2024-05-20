const GENRES = [
    "Pop",
    "Hip-Hop",
    "Rock",
    "Classical",
    "Country",
    "Indonesian Pop",
    "K-Pop",
    "Jazz",
    "Metal",
    "Gospel",
    "Anime",
    "Guitar",
    "Blues",
    "Funk",
    "French",
    "Chill",
    "Bossanova",
    "Alternative",
    "Reggae",
    "Soul",
];

export default GENRES;

const toSlugCase = (string) => string.replace(/\s+/g, "-").toLowerCase();

export { toSlugCase };



