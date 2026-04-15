# Backend Project Assignment

## Setup Instructions
1. Run `npm install`
2. Configure `.env` file with `PORT`, `MONGO_URI`, and `JWT_SECRET`
3. Run `npm run dev` or `node src/index.js`
4. Access API docs at `http://localhost:5000/api-docs`

## Scalability Note
For scalability, this application uses a modular MVC architecture:
- **Routes, Controllers, Models** are separated to allow the project to grow without becoming a monolith.
- **Database**: MongoDB is inherently scalable. We could add sharding for large datasets and caching (like Redis) for frequent read operations (e.g., fetching a dashboard).
- **Authentication**: JWT is stateless, allowing multiple backend microservices to verify tokens without querying a central session database.
- **Microservices**: As the application grows, modules such as Authentication can be split into separate microservices.
- **Deployment**: The application is docker-ready. Docker deployment with load balancers (NGINX/AWS ELB) can scale horizontally over multiple nodes.
