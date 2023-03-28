
# Hospital Management System - Mini Project

## Disclaimer
-   this was not the repository we used while working on this project if you want to check our working repo checkout to: https://github.com/rudrakpatra/DBMS_MiniProject <br>
-   WEBSITE: https://paras.onrender.com <br>

## About
This is a web application developed as a mini project for the course Web Application Development. It is a simple hospital management system that enables patients to book appointments with doctors, view their medical records, and also pay their medical bills.

## Technologies Used

-   HTML
-   CSS
-   JavaScript
-   MySQL
-   Nodejs
-   Express
-   React

## Features
- (username,password,type) based user system
- admin can see a list of all users currently available
- admin can add(username,password,type) or delete any existing user
- frontdesk can register,admit,discharge patients
- frontdesk can fix appointments of a registered patient with a doctor based on availability and preference
- frontdesk can schedule a test for a patient
- scheduling don using a calender
- dataentry can add info on prescriptions,treatments,tests related to a patient
- dataentry can attach pdf reports to test results
- doctor dashboard shows a list of patient who have an appointments with the doctor
- doctor can query any patient info (name,appointments,prescription,admissions,tests) of patient
- doctor gets emailed about the condition of all his/her patients (the entire patient info) every week
- doctor gets emergency email if patient health turns out to be critical

## Installation And Setup

1. Clone the repository using the following command
2. Install Nodejs and React
3. run npm i command on both client and backend to install all the dependancies
4. run client(frontend) and backend and enjoy!

-   install dependencies
```
npm i
```
-   run client
```
npm run dev
```
-   run backend
```
npm start dev
```

## Modules

### backend:
-   make a connection to the sql database and collect data from the database(Mysql)
-   run on a port so that client can request data from the backend through this port

### client:
-   frontend code for our PARAS hospital which fetches the required data from the backend

### Database:
-   Shown our ER-Model Implementation in sql, populate tables and also for deleting.
-   some of the queries are given but it will be recommended to look into the backend(index.js).

## Contributors

-   [Akash Das](https://github.com/Akash-Das2024)
-   [Rudrak Patra](https://github.com/rudrakpatra)
-   [Atishay Jain](https://github.com/ati-jain)
-   [Prakhar Singh]()
-   [Saras Pantulwar](https://github.com/pantulwars)


