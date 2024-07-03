# Backend Engineer Work Sample

## Running locally with docker-compose

The easiest way to run the application is using [docker-compose](https://docs.docker.com/compose/). you will need to have [Docker](https://www.docker.com/get-started/) installed and running.

From the root of the project, run:

```sh
docker-compose up --build
```
This command will use the [docker-compose.yml](./docker-compose.yml) file to create and run two containers:
- app container as defined in the [Dockerfile](./Dockerfile)
- postgres container with schema and seed files applied

Once everything is up and running, you can reach the app server at http://localhost:4111.

To stop the containers press `Ctrl + C`. To remove the containers, ensuring they are recreated next time, run:

```sh
docker-compose down
```

## Running locally with npm

Altenratively, you could run the application without using Docker.

Create a `.env` file at the root of the project. The `.env.example` contains default values you can use locally.

To copy the `.env.example` file, run:

```sh
cp .env.example .env
```
The application assumes that there is a running instance of postgres accessible on localhost:5432.

### Database setup

You can run a database using the postgres image.

For example:

```sh
docker run \
    -p 5432:5432 \
    -e POSTGRES_USER=user \
    -e POSTGRES_PASSWORD=password \
    -e POSTGRES_DB=perspective \
    --name postgres \
    -d \
    postgres
```

Alternatively, you can install postgres locally as per the postgres [documentation](https://www.postgresql.org/download/).

#### Database schema

A database [schema file](./db/schema.sql) is provided. Apply the schema to your running postgres database.

For example, using the `psql` cli, from the root of the project, run:

```sh
psql postgresql://user:password@localhost:5432/perspective -a -f ./db/schema.sql

```
**Note**: The example command uses the same values as the `docker run` command example above. If you are using different values, update the command accordingly.

#### Database seeds

A database [seed file](./db/schema.sql) is provided. Apply the seed file to your running postgres database.

For example, from the root of the project, run:

```sh
psql postgresql://user:password@localhost:5432/perspective -a -f ./db/seeds.sql
```

**Note**: The example command uses the same values as the `docker run` command example above. If you are using different values, update the command accordingly.

### Running the app

Once you have a running instance of postgres accessible on localhost:5432, start the application.

From the root of the project, run:

```sh
npm install
npm start
```

You can now reach the app server at http://localhost:4111.


## Testing

From the root of the project, run:

```sh
npm install
npm run test
```