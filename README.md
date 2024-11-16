# Express Post App with User Authentication & Authorization

This is a simple Express-based app that includes user authentication and authorization. It uses `bcrypt` for password hashing, `jsonwebtoken (JWT)` for secure token generation, and cookies for storing the JWT. Once logged in, users can create, view, edit, and like posts.

## Features

- **User Authentication**: Login with a username and password.
- **User Authorization**: Only logged-in users can access post-related actions (view, create, edit, and like posts).
- **Post Management**: Users can create new posts, view existing ones, edit posts they created, and like posts.

## Technologies Used

- **Express.js**: Web framework for Node.js
- **bcrypt.js**: For hashing and comparing passwords
- **jsonwebtoken (JWT)**: For generating secure tokens to handle user authentication
- **Cookies**: For storing and verifying JWT on the client side
- **MongoDB**: Database to store user data and posts (or any other database of your choice)

## Setup

### Prerequisites

- Node.js installed (version 14.x or higher)
- MongoDB instance (locally or via MongoDB Atlas) for storing users and posts

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/likhithkp/express-posts.git
   cd express-posts

2. Install dependencies:
   ```bash
   yarn

3. Start the server:
    ```bash
    yarn dev

## How It Works

- **Registration**: Users can register with their username and password. The password is hashed using bcrypt before being stored in the database.
- **Login**: Upon successful login, a JWT is generated and sent to the client. This token should be stored securely (e.g., in cookies).
- **Authorization**: For any post-related actions (like viewing, creating, editing, or liking a post), the client must send the JWT in the Authorization header to authenticate the user.
- **Post Management**: Users can create, view, edit, and like posts. Only the user who created a post can edit or delete it.