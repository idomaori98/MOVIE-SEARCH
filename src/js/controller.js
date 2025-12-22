const movieContainer = document.querySelector('.movie');
const API_KEY = '7aa246197b82932d5adb284763498c4d';

const showMovie = async function () {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${19995}?api_key=${API_KEY}&append_to_response=credits`
    );
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.status_message} (${res.status})`);

    console.log(res, data);
    let movie = data;
    movie = {
      adult: movie.adult,
      backdropPath: movie.backdrop_path,
      belongToCollection: movie.belongs_to_collection,
      budget: movie.budget,
      credits: movie.credits,
      originCountry: movie.origin_country,
      originalLanguage: movie.original_language,
      releaseDate: movie.release_date,
      runTime: movie.runtime,
      title: movie.title,
      overview: movie.overview,
    };
    console.log(movie);
  } catch (err) {
    alert(err);
  }
};

showMovie();
