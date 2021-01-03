# Pokemon Climate

## Live link 

https://pokemonclimate-client.vercel.app/login

![Screenshot](https://github.com/JordyPena/Portfolio/blob/main/images/project-screenshots/PokemonClimate.png)

## Summary

Pokemon Climate allows kids to explore their interest in meteorology by looking for different climates in the US, using pokemon to make it fun. In the search bar type in the name of a city, you will get the current weather of that city along with a pokemon sprite to demonstrate pokemon that could be found in that environment. Must be 13+ years old to use, and must create an account before you can use Pokemon Climate.

## Environment 

Fullstack app using React.js, CSS, Node, Express, and PostgreSQL.

## API 

Pokemon Climate API fetches existing accounts in the database and allows users to create new accounts.

Endpoints: 

GET /api/accounts/account logs into account, req.body req.body needs username and password

GET /api/accounts  returns all accounts

POST /api/accounts  creates a new account, req.body needs username and password

