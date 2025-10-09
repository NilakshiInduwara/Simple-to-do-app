# Full Stack Todo App (React + Node.js + MySQL + Docker)

This project is a simple **Todo Application** built using:
- **Frontend:** React (Vite)  
- **Backend:** Node.js + Express  
- **Database:** MySQL  
- **Containerization:** Docker & Docker Compose  

-------------------------------------------------------------------------------------------------------------------------

## Features
- Full-stack Dockerized setup (frontend, backend, and database) 
- Persistent MySQL data using Docker volumes  
- Easy one-command startup via Docker Compose  

-------------------------------------------------------------------------------------------------------------------------

## Prerequisites
Make sure these are installed:
- [Docker](https://www.docker.com/get-started)  
- [Docker Compose](https://docs.docker.com/compose/install/)  

-------------------------------------------------------------------------------------------------------------------------

## How to Build & Run

```bash
### 1️. Clone the Repository
git clone https://github.com/NilakshiInduwara/Simple-to-do-app.git
cd Simple-to-do-app

### 2️. Build and Start Containers
docker-compose up --build

### Access the App
### Frontend	http://localhost:5173
### Backend	http://localhost:5000
### MySQL DB	localhost:3307

docker-compose down -v

-------------------------------------------------------------------------------------------------------------------------

### Testing the Setup
docker ps

### To open a terminal inside the backend container:
docker exec -it project-backend-1 sh

### To open a MySQL shell:
docker exec -it mysql-container-todoapp mysql -u root -p
# Enter password: root

### Stop the App

# To stop all containers:
docker-compose down

# To stop and remove everything (including volumes):
docker-compose down -v
```

# Run both backend and frontend tests
```bash
docker-compose up --abort-on-container-exit backend-test frontend-test