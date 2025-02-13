# Nganimation - Animated Movie App

## Overview
Animated Movie App is a modern web application designed to help users discover animated movies easily. Built with Angular 19, styled with Tailwind CSS, and leveraging Spartan UI components, the app provides a seamless and visually appealing experience. The movie data is powered by TMDB API.

Live Demo: [nganimation.vercel.app](https://nganimation.vercel.app)

![Home Desktop](/public/result/home-desktop.png)

## Features
### Tech Stack
- **Angular 19:** Core framework for building the application ([srouce](http://angular.dev/)).
- **TMDB API:** Fetch movie data, including details and ratings ([source](https://www.themoviedb.org/)).
- **Tailwind CSS:** Modern styling for a clean and responsive design ([source](https://tailwindui.com/)).
- **Spartan UI:** Headless UI components for better accessibility ([source](https://spartan.ng/)).
- **Vercel:** Deployment platform for hosting the app ([source](https://vercel.com/)).
- **Environment Handling:** Generates `app/environments/environment.ts` from `.env` during development and build.

### Feature as Tech View
**Home Page**\
[✅] Trending Today \
[✅] Trending Week \
[✅] Popular \
[✅] List Movies by Genre  \
[] Search \
**Detail Page** \
[✅] Movie Detail \
[✅] Movie Recommandation \
[✅] Movie Media - Posters, Backdrops, and Videos  \
[✅] Favorite \
[✅] Video Trailer \
**List Movie** \
[✅] List Movie \
[✅] Filter \
**Other** \
[] Theme

#### ESLINT
https://justangular.com/blog/configure-prettier-and-eslint-with-angular

## Installation & Setup
### Prerequisites
- Node.js (latest LTS recommended)
- Angular CLI installed globally (`npm install -g @angular/cli`)

### Steps
```bash
# Clone the repository
git clone https://github.com/your-repo/movie-animation-app.git
cd movie-animation-app

# Install dependencies
npm install

# Create a .env from .env.example file and add your TMDB API key
# Example:
# API_KEY=your_api_key_here

# Run the development server
npm run dev

# Build for production
npm run build
```

### Deployment
The app is deployed using Vercel. To deploy your own instance:
```bash
vercel
```
#### Useful Guide for Development
- https://dev.to/jdgamble555/the-state-of-angular-ssr-deployment-in-2024-17jb
- https://dev.to/jdgamble555/how-to-deploy-angular-universal-to-vercel-31d0/comments

## Screenshots
![Home Desktop](/public/result/home-desktop.png)
![Home Mobile](/public/result/home-mobile.png)
![Detail Desktop](/public/result/detail-desktop.png)
![Detail Mobile](/public/result/detail-mobile.png)

## Next To Dev or Enhance
[✅] enhance carousel layout shift \
[✅] Enhance image placeholder \
[✅] Blip in Home Page, not happend in Detail page, clear this happen in local cause hydration \
[✅] enhance mobile \
[✅] Show All genre in home \
[✅] Update Readme \
[✅] Add Feature My Favorite in Detail \
[✅] Make sure how to deploy in vercel \
[✅] Add Video: click trailer or vides will open dialog and embed youtube \
[] Add page 404 \
[] create documentation how to deploy Angular 19 in vercel \
[] add eslint global \
[] eslint delete unused import \
[] Theme \
[] international i9 \
[] Fix: The 'allowSignalWrites' flag is deprecated and no longer impacts effect() (writes are always allowed)
[] Fix: Component ID generation collision detected.

### Example Project
- https://github.com/tastejs/angular-movies/tree/main
- https://github.com/JancoBH/Angular-Movies
- https://github.com/mazyar1128/tailwindcss-movie-dashboard

## License
This project is licensed under the MIT License.
