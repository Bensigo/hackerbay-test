# CloudBoost/ HackerBay  Test
  A Microservice api for api for image thumbnails generation
#### Getting started 
This instruction would get you a copy of the project up and running on you local machine for development and testing purpose </br>
#### Prerequisites
To install all the dependencies required to spin the server after getting a clone of the project run the command . first make sure you have nodeJS install in your local machine .</br>
#### Installing
A step by step series of examples that tell you have to get a development env running
``` cd projectDirectory
    # run the command
    npm install 
```
#### build 
compile es6 to es5 
``` npm run build ```
#### starting development server 
To start a development server .</br>
```
 npm run dev
 # then go to the link below
 http://localhost:8080/api
 ```
#### starting production server
To start server on production.</br>
``` 
  npm run start 
  # OR
  npm start
```
#### running unit testing 
To run test, using mocha and chia for unit testing.</br>
```
  npm run test
```
#### Coding style 
using JavaScript standard of eslint </br>
#### Built with 
<ul>
  <li>Node Js - javascript runtime engine </li>
  <li> Express JS - web framework </li>
  </li> Mocha and chia - for unit testing </li>
</ul>

#### API route 
<ul>
  <li> http://loacalhost:8080/api/v1/ --- base route</li>
  <li>
     http://loacalhost:8080/api/v1/auth/login --- auth route (use mock data) with return a token </br>

     ```
        field 
        ------
         username : String
         password: string
     ```

  </li>
  <li>
      http://loacalhost:8080/api/v1/patch ----  secured route that require a token(jwt). Take a json object and return a patch with json-patch</br>
      token can be added as query, x-access-token, body</br>

      ```
        field
        -------
        json : object
        patch: [object]

      ```

  </li>
  <li>
    http://loacalhost:8080/api/v1/thumbnail ----- secured route that an img uri and name and make a thumbnail</br>
    token can be added as query, x-access-token, body </br>

    ```
       field
       ------
       name: String
       uri:  String
    ```

  </li>
</ul>

