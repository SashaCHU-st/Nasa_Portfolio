# NASA project is in progress now with Three.js 3D effects and exciting new features
![Nasa (9)](https://github.com/user-attachments/assets/dfec5262-c366-4532-b14b-21cbe06eabcf)

## Note not yet, ready for Mobile layout
# Table of Contents

- [About Project](#about-project)
- [Watch Demo](#watch-demo)
- [What Works Now](#what-works-now)
  - [When Not Logged In](#when-not-logged-in)
  - [When Logged In](#when-logged-in)
- [Usage on Local Computer](#usage-on-local-computer)
  - [Requirements](#requirements)
  - [Steps](#steps)
- [Planning](#planning)

# About Project

**Live Demo:** [nasa-portfolio.vercel.app](https://nasa-portfolio.vercel.app/)

## Project Description

This project was created to practice building a full-stack application using **PostgreSQL**, **Node.js (Fastify)**, **Three.js**, **React**, **TypeScript**, and the **NASA API**.  
It also implements **ESLint** and **Prettier** for clean and consistent code, **JWT** and **Fastify Cookie** for secure authentication, **bcrypt** for password hashing, and **Zod** for robust schema validation.  

The frontend is deployed on **Vercel**, and the backend is deployed on **Render**.

## Technologies Used

- **PostgreSQL** — database
- **Node.js (Fastify)** — backend framework
- **React & Three.js** — frontend and 3D rendering
- **TypeScript** — type safety
- **NASA API** — external data source
- **ESLint & Prettier** — code quality and formatting
- **JWT & Fastify Cookie** — authentication
- **bcrypt** — password hashing
- **Zod** — runtime schema validation
- **Deployment** — frontend on Vercel, backend on Render



# Watch Demo
https://vimeo.com/1116421740?fl=pl&fe=sh


# What Works Now

## When NOT Logged In
- On the home page, you can see the "Picture of the Day" from the NASA API.
- On the Users page, you can view a list of registered users and their favorite items.
- Search option to find articles from the NASA API.
- Check article details.
- Interact with the 3D universe (rotate, move, etc.).
- Login or sign up.

## When Logged In
- Search for articles from the NASA API.
- Add articles to favorites.
- Remove articles from favorites.
- Update profile (name, password, upload a new image).
- Logout.

# Usage on Local Computer

## Requirements
- Node.js v18 or higher (recommended: v20)
- npm v9 or higher


## Steps

### 1. Clone Repository
```bash
git clone <repository_url>
cd <repository_name>


## Steps
1.💻 Clone repository

 ### 🚀2. For backend
2.1 Move to server directory
```bash
cd server
```
2.2 Install dependencies
```bash
npm install
```
### ❗ NOTE
This project uses a .env file to manage sensitive environment variables. 

For security reasons, the .env file is not included in this repository. Instead, an example file is provided.

2.2.1 Replace the enviroment values with your own.
    
2.3 Start server
```
npm run dev
```
the backend will run http://localhost:3000/

 ### 🚀3. For frontend
3.1 Move to client directory
```bash
cd client
```
3.2 Install dependencies
```bash
npm install
```
This project uses a .env file to manage sensitive environment variables. 
### ❗ NOTE
For security reasons, the .env file is not included in this repository. Instead, an example file is provided.

3.2.1 Replace the enviroment values with your own.
  
3.3 Start server
```
npm run dev
```
the frontend will run http://localhost:5173/

# Testing
2.1 Move to server directory
```bash
npm test
```

### Project is still a work in progress, issues I am working on:

# ✅ Planning

| Feature/Bug | Status |
|-------------|--------|
| Tests | in progress |
| Follow button | done |
| Chat between friends | Friends can send and receive messages |
| Add friends | Users can send friend requests and receive notifications |
| Display user join date | Shows when users joined the app |
| Show article likes | Displays how many likes a specific article has |

