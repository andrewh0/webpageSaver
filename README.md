# Webpage Saver

## Overview
Webpage Saver allows a user to input a webpage URL for a worker to crawl later. While the worker is processing the job queue (1 job every 10 seconds), the user can check on the progress with a job ID. Once the HTML for the webpage has been saved, the user can see the results inline on the page.

### Technologies
- jQuery: a client-side library for DOM manipulation, great for rapid prototyping.
- Node/Express: a lightweight, un-opinionated web framework for handling HTTP requests.
- Redis: a quick-access data store with a variety of built-in data structures, used to implement a jobs queue.
- MongoDB: a persistent data store for storing saved webpages.

## Usage
This application requires MongoDB and Redis. Please make sure you have those installed before proceeding. (You can `brew install redis` and `brew install mongodb`.)
1. Start MongoDB by running `mongod` in the terminal.
2. Start Redis by running `redis-server` in the terminal.
3. Clone this repository, navigate to it, and run `npm install` to install the dependencies.
4. Start the server by running `npm start` in the terminal.
5. Navigate to `localhost:8080` in your browser.

## Development
This application uses `nodemon` to automatically refresh the page when files change during development. If you do not have `nodemon`, install it by running `npm install -g nodemon` in the terminal.

To start developing, simply run `npm run dev` in the terminal and navigate to `localhost:8080` in the browser.

## Testing
The tests determine whether the API endpoint have the correct output, and require the server to be running. To run the server, run the following command: `npm start`. Then run: `npm test` to start testing.
