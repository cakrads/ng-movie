// https://medium.com/@lara.delrio333/deploy-an-angular-project-in-vercel-with-secret-environment-variables-74323925712d

export const environment = {
  production: true,
  tmdbUrl: process.env['TMDB_URL'],
  apiKey: process.env['API_KEY'],
  movieImage: process.env['TMDB_IMAGE_URL'],
};
