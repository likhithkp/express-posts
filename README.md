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
