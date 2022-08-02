code4stay is Workaway for computer programmers. We connect organizations working in socially or enviromentally minded projects, with volunteers with technical skills willing to work in exchange for food and shelter.

code4stay was created using Node and React, as well as the Google Maps API, by Alejandro Fisman and Ghers Fisman. It has an authentication system for users, that can be volunteers or hosts. Projects can be created, and joiners can rate them and leave comments on their page.

We hope you enjoy it!

URL:https://code4stay.herokuapp.com/api

We present below the API routes:

| Route                         | HTTP Verb     |Response| Description                     |
| -----------                   | -----------   | ------ |-----------                     |
| `/api/projects/createProject`              |     POST      |'{project}'| Create a new project            |
| `/api/projects/getAllProjects`             |     GET       |'[{project}]'|List of all projects            |
| `/api/projects/getOneProject/:project_id`  |     GET       |'{project}'|Details of a specific project   |   
| `/api/projects/editProject/:project_id`    |     PUT       |'{project}'|Update a specific project       |   
| `/api/projects/deleteProject/:project_id`  |     DELETE    |        |Delete a specific project       |   
| `/api/users/createUser`                 |     POST      |'{user}'|Create a new user                  |
| `/api/users/getAllUsers`                |     GET       |'[{user}]'|List of all users                | 
| `/api/users/getOneUser/:user_id`        |     GET       |'{user}'|Details of a specific user         | 
| `/api/users/editUser/:user_id`          |     PUT       |'{user}'|Edit a new user                    |    
| `/api/users/deleteUser/:user_id`        |     DELETE    |        |Delete a new user                  |   
| `/api/ratings/getRatings/:project_id`   |     GET       |'[{rating}]'|gets Ratings for project       |
| `/api/ratings/createRating/:project_id` |     POST      |'{rating}'|Create a new rating              |
| `/api/search/:continent`               |     GET       |'[{project}]'|gets projects from continent  |


