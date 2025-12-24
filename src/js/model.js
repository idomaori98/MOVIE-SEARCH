const API_KEY = '7aa246197b82932d5adb284763498c4d';
export const state = {
  movie: {},
};
export const loadMovie = async function (id) {
  try {
    const res = await fetch(
      ` https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=credits`
    );
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    const movie = data;
    state.movie = {
      image: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
      actors: movie.credits.cast
        .slice(0, 5) // Take first 5 actors
        .map(actor => actor.name),
      director:
        movie.credits.crew.find(person => person.job === 'Director')?.name ||
        'Unknown',
      releaseDate: movie.release_date,
      runTime: movie.runtime,
      title: movie.title,
      overview: movie.overview,
      rating: movie.vote_average.toFixed(2),
    };
    console.log(state.movie);
  } catch (e) {
    alert(e);
  }
};
