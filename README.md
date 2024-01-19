## Description
PokeDex
## Requirements
* Docker
* NVM

## First steps Backend
> **Go to directory `backend/pokedex` and create `.env` file at the root backend project with the environment variables:**

```sh
PORT='3200'
MONGODB_URI='mongodb://localhost:27017/pokedex'
POKE_API='https://pokeapi.co/api/v2/pokemon'

```
> **Run the following command to run `MongoDB` in docker container:**
```bash
$ docker-compose up -d
```
> **Run the following commands to setup node environment:**

This will install the node version required for this project.
```bash
$ nvm install 
```

This will set as current node version the required version for this project.
```bash
$ nvm use 
```

This will install the project dependencies.
```bash
$ npm install
```

## Running the BackEnd app
In terminal go to directory `backend/pokedex`
This command will start the server, the application will run on `port 3200`

```bash
# development
$ cd backend/pokedex
$ npm run start
```

## Running the FrontEnd app
In another terminal go to directory `frontend/pokedex`
This command will start the server, the application will run on `port 3000`

```bash
# development
$ cd frontend/pokedex
$ npm run start
```

## Getting started
> **Open browser in `http://localhost:3000/`**

> The app starts and two tabs `TODOS LOS POKEMON` AND `MIS POKEMON` will be shown.
In all of them the list of Pokémon from the pokeApi consumed through the backend is shown.

> You can select the rows to show, the page and an input where you can search for the pokemon by name.

> You can add pokemon to the list of `MIS POKEMON` by clicking on the button.
In `MIS POKEMON` you can edit, delete and export the pokemon information to a PDF file**


## BackEnd endPoints
> A `pokeDex.postman_collection.json` file with a postman collection is attached to the root project, showing the operation of each endpoint.
### Create pokemon
> It is necessary to send Json body in the request with the `name` of the pokemon.

```bash
Verb: POST
http://localhost:3200/pokemon
```

### Get all pokemons
> This returns all the pokemon from `MongoDB`.

```bash
Verb: GET
http://localhost:3200/pokemon
```

### Get pokemon by pokemonId
> It is necessary to send Path Variable `pokemonId`.

```bash
Verb: GET
http://localhost:3200/:pokemonId
```

### Update pokemon by pokemonId
> It is necessary to send Path Variable `pokemonId` and Json body with the `alias` of the pokemon to update.

```bash
Verb: PUT
http://localhost:3200/:pokemonId
```

### Delete pokemon by pokemonId
> It is necessary to send Path Variable `pokemonId`.
This does a soft delete to maintain data consistency

```bash
Verb: DELETE
http://localhost:3200/:pokemonId
```
### Export Pokemon info to PDF
> It is necessary to send Path Variable `pokemonId`.

```bash
Verb: POST
http://localhost:3200/:pokemonId
```
### Get all pokemons by pokeapi
> It is optional to send Query Param `limit`, `page` and `s` (to search for a pokemon by name) to return data paginated and ordered by name.

```bash
Verb: GET
http://localhost:3200/poke-api/pokemon?page=0&limit=10&s=pikachu
```
## Further work
* Do integration tests.
* Cache the API response to improve performance and have faster response times.