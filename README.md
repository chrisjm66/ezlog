
# ezlog - An online logbook solution for pilots using React & Node.js
Production Server Link: https://ezlog.chrismangan.net
This is my capstone project for Brookdale Community College.

The issues page is the progress of current systems. The production site is updated periodically through a GitHub workflow.

# Initializing the project

Run `npm install`
Input your database URL (see prisma docs or env.example) into your .env file
Run `npx prisma migrate dev` to create database

Two terminals will have to be opened. One for react (`npm run dev`) and one for the server (`npm run server`).
