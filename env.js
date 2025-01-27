// https://medium.com/@lara.delrio333/deploy-an-angular-project-in-vercel-with-secret-environment-variables-74323925712d
const fs = require('fs');
const path = require('path');
const successColor = '\x1b[32m%s\x1b[0m';
const checkSign = '\u{2705}';
const dotenv = require('dotenv').config({ path: 'src/.env' });;

const envFile = `export const environment = {
  production: true,
  tmdbUrl: '${process.env.TMDB_URL}',
  apiKey: '${process.env.API_KEY}',
  movieImage: '${process.env.TMDB_IMAGE_URL}',
  movieMedia: '${process.env.TMDB_MEDIA_URL}',
  movieVideoThumbnail: '${process.env.TMDB_VIDEO_THUMBNAIL_URL}',
  movieVideoUrl: '${process.env.TMDB_VIDEO_URL}',
};
`;

const targetDir = path.join(__dirname, './src/environments');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const targetPath = path.join(__dirname, './src/environments/environment.development.ts');
fs.writeFile(targetPath, envFile, (err) => {
  if (err) {
    console.error(err);
    throw err;
  } else {
    console.log(successColor, `${checkSign} Successfully generated environment.development.ts`);
  }
});

const targetPathProd = path.join(__dirname, './src/environments/environment.ts');
fs.writeFile(targetPathProd, envFile, (err) => {
  if (err) {
    console.error(err);
    throw err;
  } else {
    console.log(successColor, `${checkSign} Successfully generated environment.ts`);
  }
});