# MyFlix

MyFlix is a single-page application (SPA) built using React, React Bootstrap, React Router, and Bootstrap. It allows users to browse and explore a curated collection of movies. Users can view detailed information about each movie, search for specific titles, and mark movies as favorites. The application is designed to be responsive and mobile-friendly, providing an optimal viewing experience across devices.

## Accessing the Hosted Site
MyFlix is now hosted and accessible online. You can visit the site at [MyFlix Online](https://myflixonline.netlify.app/signup).

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js installed on your local machine.
- npm (Node Package Manager)

## Technologies Used
- React: A JavaScript library for building user interfaces.
- React Bootstrap: A front-end framework built on top of Bootstrap for React components.
- React Router: A routing library for React that enables navigation between different components.
- Bootstrap: A popular CSS framework for building responsive and mobile-first websites.

## Dependencies
- Production Dependencies
  - bootstrap: ^5.3.2
  - react: ^18.2.0
  - react-bootstrap: ^2.9.0-beta.1
  - react-dom: ^18.2.0
  - react-router: ^6.22.0
  - react-router-dom: ^6.22.0

## Development Dependencies
- @babel/plugin-proposal-private-property-in-object: ^7.16.5
- @parcel/transformer-sass: ^2.11.0
- parcel: ^2.11.0
- process: ^0.11.10
- react-scripts: ^5.0.1

## API
MyFlix interacts with a custom movie API available at [movies_2](https://github.com/cannoahgkt/movies_2). The API provides data about movies, including their titles, descriptions, genres, directors, and more. Please refer to the API documentation for more details on available endpoints and data formats.

## Testing with Parcel

If you prefer to test the project locally, follow these steps:

1. Install Parcel globally if you haven't already:
      ```
      npm install -g parcel
      ```
2. Run the following command to start the development server:
      ```
      parcel src/index.html
      ```
3. Open your browser and navigate to `http://localhost:3000/` to view the site.

## Deployment
To deploy MyFlix to a hosting provider, follow these general steps:

1. Build your React project for production using Parcel (or another bundler of your choice). For example, to build the project using Parcel, run the following command (replace the public URL with your own if necessary to match your hosting provider's configuration):

```
parcel build src/index.html --public-url /
```

2. Upload the generated dist folder to your hosting provider. The dist folder contains the compiled and minified files for your project. You can use an FTP client, the hosting provider's file manager, or another method to upload the files to your server.

3. Configure your hosting provider to serve the index.html file as the default file for your website. This step is necessary for single-page applications (SPAs) built with React Router to work correctly. The exact steps for configuring this setting depend on your hosting provider.