const moodCriteria = {
    "Positive": {
        "acousticness": [0.0, 1.0],
        "danceability": [0.6, 1.0],
        "energy": [0.5, 1.0],
        "instrumentalness": [0.0, 1.0],
        "loudness": [-30, 0],
        "mode": [1],
        "speechiness": [0.0, 0.5],
        "tempo": [80, 500],
        "valence": [0.6, 1.0]
    },
    "Neutral": {
        "acousticness": [0.4, 1.0],
        "danceability": [0.2, 0.8],
        "energy": [0.4, 0.8],
        "instrumentalness": [0.0, 1.0],
        "loudness": [-60, 0],
        "mode": [0, 1],
        "speechiness": [0, 1],
        "tempo": [60, 120],
        "valence": [0.4, 0.9],
    },
    "Negative": {
        "acousticness": [0.2, 1.0],
        "danceability": [0.0, 0.5],
        "energy": [0.0, 0.3],
        "instrumentalness": [0.0, 1.0],
        "loudness": [-60, -5],
        "mode": [0],
        "speechiness": [0, 1.0],
        "tempo": [60, 100],
        "valence": [0.0, 0.4]
    }
};
  

const weatherCriteria = {
    "Thunderstorm": {
        "acousticness": [0.0, 0.3],
        "danceability": [0.3, 0.6],
        "energy": [0.7, 1.0],
        "instrumentalness": [0.0, 0.5],
        "loudness": [-60, 0],
        "mode": [0, 1],
        "speechiness": [0.0, 1.0],
        "tempo": [60, 200],
        "valence": [0.0, 0.5]
    },
    "Drizzle": {
        "acousticness": [0.0, 1.0],
        "danceability": [0.4, 0.7],
        "energy": [0.4, 0.7],
        "instrumentalness": [0.0, 1.0],
        "loudness": [-60, 0],
        "mode": [0, 1],
        "speechiness": [0.0, 1.0],
        "tempo": [60, 200],
        "valence": [0.0, 1.0]
    },
    "Rain": {
        "acousticness": [0.0, 0.5],
        "danceability": [0.3, 0.7],
        "energy": [0.3, 0.7],
        "instrumentalness": [0.0, 1.0],
        "loudness": [-60, 0],
        "mode": [0, 1],
        "speechiness": [0.0, 1.0],
        "tempo": [60, 200],
        "valence": [0.3, 0.7]
    },
    "Snow": {
        "acousticness": [0.4, 1.0],
        "danceability": [0.0, 0.5],
        "energy": [0.0, 0.5],
        "instrumentalness": [0.0, 1.0],
        "loudness": [-60, 0],
        "mode": [0, 1],
        "speechiness": [0.0, 1.0],
        "tempo": [60, 200],
        "valence": [0.4, 1.0]
    },
    "Mist": {
        "acousticness": [0.6, 1.0],
        "danceability": [0.0, 0.5],
        "energy": [0.0, 0.5],
        "instrumentalness": [0.0, 1.0],  
        "loudness": [-60, 0],
        "mode": [0, 1],
        "speechiness": [0.0, 1.0],
        "tempo": [60, 200],
        "valence": [0.3, 0.7]
    },
    "Smoke": {
        "acousticness": [0.0, 1.0],
        "danceability": [0.0, 0.5],
        "energy": [0.0, 0.5],
        "instrumentalness": [0.0, 1.0],     
        "loudness": [-60, 0],
        "mode": [0, 1],
        "speechiness": [0, 1],
        "tempo": [0, 500],
        "valence": [0, 1]
    },
    "Haze": {
        "acousticness": [0.0, 1.0],
        "danceability": [0.0, 0.5],
        "energy": [0.0, 0.5],
        "instrumentalness": [0.0, 1.0],     
        "loudness": [-60, 0],
        "mode": [0, 1],
        "speechiness": [0, 1],
        "tempo": [0, 500],
        "valence": [0, 1]
    },
    "Dust": {
        "acousticness": [0.0, 1.0],
        "danceability": [0.0, 0.5],
        "energy": [0.0, 0.5],
        "instrumentalness": [0.0, 1.0],     
        "loudness": [-60, 0],
        "mode": [0, 1],
        "speechiness": [0, 1],
        "tempo": [0, 500],
        "valence": [0, 1]
    },
    "Fog": {
        "acousticness": [0.0, 1.0],
        "danceability": [0.0, 0.5],
        "energy": [0.0, 0.5],
        "instrumentalness": [0.0, 1.0],     
        "loudness": [-60, 0],
        "mode": [0, 1],
        "speechiness": [0, 1],
        "tempo": [0, 500],
        "valence": [0, 1]
    },
    "Sand": {
        "acousticness": [0.0, 1.0],
        "danceability": [0.0, 0.5],
        "energy": [0.0, 0.5],
        "instrumentalness": [0.0, 1.0],     
        "loudness": [-60, 0],
        "mode": [0, 1],
        "speechiness": [0, 1],
        "tempo": [0, 500],
        "valence": [0, 1]
    },
    "Ash": {
        "acousticness": [0.0, 1.0],
        "danceability": [0.0, 0.5],
        "energy": [0.0, 0.5],
        "instrumentalness": [0.0, 1.0],     
        "loudness": [-60, 0],
        "mode": [0, 1],
        "speechiness": [0, 1],
        "tempo": [0, 500],
        "valence": [0, 1]
    },
    "Squall": {
        "acousticness": [0.0, 1.0],
        "danceability": [0.0, 0.5],
        "energy": [0.0, 0.5],
        "instrumentalness": [0.0, 1.0],     
        "loudness": [-60, 0],
        "mode": [0, 1],
        "speechiness": [0, 1],
        "tempo": [0, 500],
        "valence": [0, 1]
    },
    "Tornado": {
        "acousticness": [0.0, 1.0],
        "danceability": [0.0, 0.5],
        "energy": [0.0, 0.5],
        "instrumentalness": [0.0, 1.0],     
        "loudness": [-60, 0],
        "mode": [0, 1],
        "speechiness": [0, 1],
        "tempo": [0, 500],
        "valence": [0, 1]
    },
    "Clear": {
        "acousticness": [0.0, 1.0],
        "danceability": [0.0, 0.5],
        "energy": [0.0, 0.5],
        "instrumentalness": [0.0, 1.0],     
        "loudness": [-60, 0],
        "mode": [0, 1],
        "speechiness": [0, 1],
        "tempo": [0, 500],
        "valence": [0, 1]
    },
    "Clouds": {
        "acousticness": [0.0, 1.0],
        "danceability": [0.0, 0.5],
        "energy": [0.0, 0.5],
        "instrumentalness": [0.0, 1.0],     
        "loudness": [-60, 0],
        "mode": [0, 1],
        "speechiness": [0, 1],
        "tempo": [0, 500],
        "valence": [0, 1]
    }
};
  
export { moodCriteria, weatherCriteria };