A new version of the NASA project is in progress — now with Three.js 3D effects and exciting new features
![Nasa (9)](https://github.com/user-attachments/assets/dfec5262-c366-4532-b14b-21cbe06eabcf)
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

This project was created to practice building a full-stack application using PostgreSQL, Node.js (Express), React, TypeScript, and the NASA API.

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
- Node.js v22
- npm v10.8.2

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


### Project is still a work in progress, issues I am working on:

# ✅ Planning

| Feature/Bug | Status |
|-------------|--------|
| Follow button | Users can follow other users |
| Chat between friends | Friends can send and receive messages |
| Add friends | Users can send friend requests and receive notifications |
| Display user join date | Shows when users joined the app |
| Show article likes | Displays how many likes a specific article has |

