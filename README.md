# Database Server Tech Test

The project involved building a small [express.js](https://expressjs.com/) database server using express.js that allowed for the storage and retrieval of key-value pairs using HTTP requests.

## Background
This project was assigned during my time at Makers Academy as part of a week focused on producing high-quality code with minimal time pressure. As a week for solo work, it presented an opportunity to further my skills and I decided to explore a new language - TypeScript - which I had not used before.

## Running the project

To run this project, first clone the repository and run

```bash
npm install
```

You can then start up the server on `localhost:4000` by running

```bash
npm start
```

You can add a key-value pair to the server by sending a `PUT` request to `localhost:4000/set`, with the key-value pair as query parameters.
For example, sending

```
PUT localhost:4000/set?name=Foo
```

will store the pair `name: Foo` on the server.
Sending a request for a key-value pair already stored in the server with a different value will overwrite the previous value stored on the server.
You can also make several pairs at once by chaining query parameters, eg:

```
PUT localhost:4000/set?name=Foo&occupation=Bar
```

You can then query the database for the value of a given key by sending a `GET` request to the `localhost:4000/get` path with the query parameter `key` set to the key you want to retrieve.
For instance, to retrieve the value stored with the `name` key, send the following request

```
GET localhost:4000/get?key=name
```

The value will be stored in the `value` key of the JSON response.
You will get a `404 Not Found` status if the key isn't already in the database, and you cannot chain any other query parameters to your request.

A full example using this server could look like

```bash
# Set the name and occupation keys
PUT localhost:4000/set?name=Foo&occupation=Bar
# HTTP response status: 201 (CREATED)
# body: { message: "OK" }

# Get the occupation value stored in the server
GET localhost:4000/get?key=occupation
# HTTP Response status: 200 (OK)
# body: { message: "OK", value: "Bar" }

# Fails with 404 if the key isn't set
GET localhost:4000/get?key=hobby
# HTTP Response status: 404 (NOT FOUND)
# body: { message: "Key "hobby" not found" }
```

## Testing
Throughout the project, I focused on maintaining clean, readable code and thorough testing. I utilized [Jest](https://jestjs.io/) and the [supertest](https://github.com/ladjs/supertest#readme) package to achieve 97% test coverage across 27 tests.

![Test Coverage](/images/database-server-test-coverage.png)

To run the tests, run

```
npm run test
```

## Technical Details

The server logic is implemented using `express`, which is responsible for hosting the server and routing incoming requests.

I implemented the server using express' `app.locals` object for storage, which persists for the lifetime of the server and can be accessed from the `request` object of any `express` route function (`req.app.locals`), meaning it is visible to both the PUT and GET request controllers.

When our server starts up, we initialize `app.locals.memory` to an empty object.

When sending a `PUT /set` request, we call the `SetController.put` function.
We create/update keys in `app.locals.memory` with those in the query parameters of the request (accessed via the `req.query` object).

When sending a `GET /get` request, we call the `GetController.get` function.
We then query `app.locals.memory` for the given key, and either return the associated value, or respond with a `404` status if the key has not yet been set.

## Things to add

- While the current implementation uses global keys, I recognize the need for additional features such as a persistent database rather than using `app.locals`, and user accounts with authentication to allow for independent key storage and access. This would involve creating a model class to read/write from a database like [MongoDB](https://www.mongodb.com/), which could directly store keys inside a user's database entry.
- Overall, this project allowed me to gain further valuable experience with TypeScript and express.js, and deepen my understanding of server-side development and HTTP request handling. I am proud of the clean, well-tested code I produced and look forward to incorporating the additional features to further improve the server's functionality.

## The original brief:

You receive a message from a prospective employer:

"Before your interview, write a program that runs a server that is accessible on `http://localhost:4000/`. When your server receives a request on `http://localhost:4000/set?somekey=somevalue` it should store the passed key and value in memory. When it receives a request on `http://localhost:4000/get?key=somekey` it should return the value stored at `somekey`. Store the data in memory, not in a database, but bear in mind that you will later need to add a database to this code."

Create a new git repository and write code to fulfil the brief to the best of your ability. We will be looking for clean, well tested code in your choice of technology. In addition, the last sentence of the brief implies that you should consider how the code could easily be extended to add an as-yet-unknown data store.

If you still have time at the end of the day, you can extend the code by adding a data store of your choice.