# Blog API

A simple blog API built with Node.js, Express, TypeScript, and MongoDB. This API supports CRUD operations for blog posts and comments.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [License](#license)

## Features

- **CRUD operations** for posts and comments.
- **TypeScript** for static type checking.
- **MongoDB** for data persistence.
- **Express** for handling HTTP requests.

## Installation

1. **Clone the repository:**

    ```bash
   <git repo url>
    cd blog-api
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set up connection string :**

    

    Replace `mongodb://localhost:27017/blog` with your MongoDB connection string if needed in src/index.ts.

4. **Compile TypeScript files:**

    ```bash
    npm run build
    ```

5. **Start the server:**

    ```bash
    npm start
    ```

    Alternatively, you can run the development server with:

    ```bash
    npm run dev
    ```

    This command will use `ts-node` to run TypeScript files directly.

## Usage

- **Base URL:** `http://localhost:3001/api`

### Example Requests

- **Get all posts:**

    ```bash
    curl http://localhost:3001/api/posts
    ```

- **Create a new post:**

    ```bash
    curl -X POST http://localhost:3001/api/posts \
    -H "Content-Type: application/json" \
    -d '{"title": "My First Post", "content": "This is the content of the post."}'
    ```

- **Get a single post by ID:**

    ```bash
    curl http://localhost:3001/api/posts/<POST_ID>
    ```

- **Update a post by ID:**

    ```bash
    curl -X PUT http://localhost:3001/api/posts/<POST_ID> \
    -H "Content-Type: application/json" \
    -d '{"title": "Updated Title", "content": "Updated content."}'
    ```

- **Delete a post by ID:**

    ```bash
    curl -X DELETE http://localhost:3001/api/posts/<POST_ID>
    ```

- **Add a comment to a post:**

    ```bash
    curl -X POST http://localhost:3001/api/comments/<POST_ID> \
    -H "Content-Type: application/json" \
    -d '{"author": "John Doe", "text": "This is a comment."}'
    ```

## API Endpoints

### Posts

- **GET /api/posts**: Retrieve all posts.
- **POST /api/posts**: Create a new post.
- **GET /api/posts/:id**: Retrieve a single post by ID.
- **PUT /api/posts/:id**: Update a post by ID.
- **DELETE /api/posts/:id**: Delete a post by ID.

### Comments

- **POST /api/comments/:id**: Add a comment to a post by post ID.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
