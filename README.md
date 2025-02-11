# This is a technical assessment for Fullstack Node position

Developed a RESTful APIs using Node.js (Nest.js framework) for a Grocery Booking API.

## Running the app with docker desktop

```bash
# Build & run containers
$ docker-compose up -d --build

# Check logs (optional)
$ docker-compose logs -f app

# Stop and remove old containers
$ docker-compose down -v

```

## API endpoints and their usage

I have added the swagger documentation for this project.

## Swagger documentation URL

http://localhost:3000/docs

## Any decisions or assumptions

Yes, I have used JWT for authentication and authorization for each API. Users need to register first and then login to access the API. Both user and admin must pass the JWT access token in the API header. I have also implemented role-based authentication for admin and user.
