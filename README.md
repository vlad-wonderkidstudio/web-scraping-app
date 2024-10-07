# The web scraping and data presentation application

## Technologies used:

- Backend: NestJS for scraping and serverfunctionality.
- Frontend: React for the web application.
- DevOps (Bonus): Docker for containerization.
- Database: MongoDB for storing results.

## How to Launch using Docker

1) Go into the `./web-scraping-app` folder ensure, that the `docker-compose.yml` is present there,
and that the ports 27017, 8081, 3000, 4000 and 5000 are free.

2) Launch `docker-compose up`

3) Then wait while all the containers are up and launched corresponding services (this may take like 5-15 mins).

After that you would be able to:

- Open MongoDB admin tool at http://localhost:8081 in your browser
(log: admin, pas: pass)

- Open http://localhost:3000 (it will show "Demo Scraping Service!" string)
  and http://localhost:3000/swager swager tool for Web Scraping Service.

- Open http://localhost:4000 (it will show "BackEnd Service!" string)
  and http://localhost:4000/swager swager tool for Backend Server.

- Open Frontend with React at http://localhost:5000


How to use it:

1) Go to the Frontend and enter any web page url.
The Frontend part will send a command to Backend service, and it will triger the Scraping process to scrap all the unique urls on that page, and unique domain names inside those urls.

It will save the results data into mongoDB.
Database: scrapingDB
Collection: scraping_result

If there is any error on the back-end part, it will send it to the front-end.

2) After the Backend part processed successfully, the frontend will ask for the list of results and show it.

Note: since in the task description it is said to only show the amount of urls, and domains, the back-end does not send the list of urls and domains to the front-end in order to descrease the traffic usage. You can see the scraped urls and domains in the MongoDB tool: http://localhost:8081/db/scrapingDB/scraping_result

## How to Launch manually

### 1) `./backend-service`:
- copy `.env.sample` file into `.env` and make the needed changes in it if needed.
- run `npm install`
- tun `npm run start:dev`

### 2) `./scraping-service`:
- copy `.env.sample` file into `.env` and make the needed changes in it if needed.
- run `npm install`
- tun `npm run start:dev`

### 3) `./front-end`:
- copy `.env.sample` file into `.env` and make the needed changes in it if needed.
- run `npm install`
- tun `npm start`


## How to Launch unit tests:

`./backend-service`:
- `npm run test`

`./scraping-service`:
- `npm run test`

`./front-end`:
- `npm run test`
