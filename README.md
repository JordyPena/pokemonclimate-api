# Pokemon Climate

## Live link 

https://pokemonclimate-client.vercel.app/login

![Screenshot](https://github.com/JordyPena/Portfolio/blob/main/images/project-screenshots/PokemonClimate.png)

## Summary

Pokemon Climate allows kids to explore their interest in meteorology by looking for different climates in the US, using pokemon to make it fun. In the search bar type in the name of a city, you will get the current weather of that city along with a pokemon sprite to demonstrate pokemon that could be found in that environment. Must create an account before you can use Pokemon Climate.

## Environment 

Fullstack app using React.js, CSS, Node, Express, and PostgreSQL.

## API 

Pokemon Climate API endpoints GET /api/accounts/account to login into a existing account. GET /api/account returns all accounts. POST /api/accounts creates a new account to gain access to Pokemon Climate.

## Endpoints

## GET /api/accounts/account
 Parameters -- username & password
 Type -- string 
 In -- body both username & password are required
 Default response -- Status: 201 Auth Successful 
 Requires authentication -- Status: 401 Auth failed

## GET /api/accounts -- returns all accounts.
 Parameters -- none
 Default response -- Status: 200 ok

## POST /api/accounts -- creates a new account.
 Parameters -- username & password
 Type -- string
 In -- body both username & password are required
 Bad request -- Status: 400 Request body must contain both 'username' and 'password'
 Requires Authentication -- Status: 401 User already exists, try signing in
 Default response -- Status: 201 Account created
