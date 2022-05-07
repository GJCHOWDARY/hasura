# Hasura App

_project structure_

```
.

|
|
|── config
│       ├── config.json /*dev,test,production*/
|       |
│       └── connection.js
|
└── controllers 
│       └── users.js
|
├── middleware
│     ├── error-handler.js
│     └── request-handler.js
|
├── models 
│     └── user.js
|
├── server.js
|
├── schema.js
|
├── README.md
|
└── package.json

```

---

_Run server_

- sudo NODE_ENV=development npm start || sudo NODE_ENV=development node server.js
