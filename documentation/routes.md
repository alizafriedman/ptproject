##front end:

home = /
- displays pins


profile = /profile

- users can see all of their boards

boards = /profile/:boardId

- users can see a specific board 

(login = /login)

(signup = /signup)


##backend:

boards:

get: /boards

- displays page with users boards

post: /board

- create new board

post & delete: /:boardId

- adds a new board, deletes a specifc board

users:

post: /users

 - gets user info

  post:  /token

- gets auth token for existing user

    /:usersid/boards

- gets users boards / profile page



##pins:

post, delete, get: /:pinid

- adds, deletes, gets a pin

patch: /:boardid/:pinid

adds a pin to a specific board


##homepage:

get: '/'

- homepage with main feed of pins - fetch random pins with api
