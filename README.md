# todoListAPI
This project is designed to create a Restful API backend for a todolist application : Scheduling tasks, alarms and homeworks.

Features:
-Multiuser
-CRUD model
-Authentication using JWT: Json Web Tokens
-Authorization

Authentication: No client can consume the API if he's not already registered and given a token.
Authorization: Client can only see his own tasks scheduled.

After authentication, the received token must be placed in a header named Authorization. 
