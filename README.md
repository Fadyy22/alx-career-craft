# Job Search API

## Table of Contents

1. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
2. [API Endpoints](#api-endpoints)
   - [Authentication](#authentication)
     - [Sign Up](#sign-up)
     - [Log In](#log-in)
     - [Forgot Password](#forgot-password)
     - [Verify Password Reset Code](#verify-password-reset-code)
     - [Reset Password](#reset-password)
   - [Users](#users)
     - [Get User](#get-user)
     - [Get Profile](#get-profile)
     - [Update User](#update-user)
     - [Delete User](#delete-user)
     - [Change Password](#change-password)
   - [Company](#company)
     - [Create Company](#create-company)
     - [Update Company](#update-company)
     - [Delete Company](#delete-company)
     - [Get Company](#get-company)
     - [Get all Companies](#get-all-companies)
     - [Get Company by name](#get-company-by-name)
   - [Job](#job)
     - [Create Job](#create-job)
     - [Update Job](#update-job)
     - [Delete Job](#delete-job)
     - [Get all Jobs](#get-all-jobs)
     - [Get all Jobs by Company](#get-all-jobs-by-company)
   - [Application](#application)
     - [Create Application](#create-application)
     - [Get all Applications for a Job](#get-all-applications-for-a-job)
     - [Download All Applications for a Job in Excel](#download-all-applications-for-a-job-in-excel)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/)

### Installation

1. Clone the repo
   `git clone https://github.com/Fadyy22/alx-career-craft.git`
2. Navigate to the project directory
   `cd alx-career-craft`
3. Install dependencies
   `npm install`
4. Create a `.env` file in the root directory and add the following environment variables:
   `Contact for the .env file or create your own and add the following:`

   ```env
    # APP
    PORT=

    # MONGODB
    DB_URI=

    # JWT
    JWT_KEY=
    JWT_EXPIRE_TIME=

    # EMAIL
    EMAIL_HOST=
    EMAIL_PORT=
    EMAIL_USER=
    EMAIL_PASSWORD=

    # CLOUDINARY
    CLOUDINARY_CLOUD_NAME=
    CLOUDINARY_API_KEY=
    CLOUDINARY_API_SECRET=
   ```

5. Start the server
   `npm start`

## API Endpoints

### Authentication

#### Sign Up

- **URL:** `/auth/signup`
- **Method:** `POST`
- **Request Body:**

```json
{
"firstName": String,
"lastName": String,
"email": String,
"password": String,
"DOB": YYYY-MM-DD,
"mobileNumber": String,
"role": String ["user", "hr"]
}
```

- **Response:**

```json
{
  "user": User Object,
  "token": JWT Token
}
```

#### Log In

- **URL:** `/auth/login`
- **Method:** `POST`
- **Request Body:**

```json
{
  "username": String [email or mobile number],
  "password": String
}
```

- **Response:**

```json
{
  "user": User Object,
  "token": JWT Token
}
```

#### Forgot Password

- **URL:** `/auth/forgotPassword`
- **Method:** `POST`
- **Request Body:**

```json
{
  "email": String
}
```

- **Response:**

```json
{
  "status": String,
  "message": String
}
```

#### Verify Password Reset Code

- **URL:** `/auth/verifyResetCode`
- **Method:** `POST`
- **Request Body:**

```json
{
  "resetCode": String
}
```

- **Response:**

```json
{
  "status": String
}
```

#### Reset Password

- **URL:** `/auth/resetPassword`
- **Method:** `PATCH`
- **Request Body:**

```json
{
  "email": String,
  "password": String,
  "confirmPassword": String
}
```

- **Response:**

```json
{
  "token": JWT Token
}
```

### Users

#### Get User

- **URL:** `/users`
- **Method:** `GET`
- **Request Headers:** `Authorization`: Bearer {JWT Token}
- **Response:**

```json
{
  "user": User Object
}
```

#### Get Profile

- **URL:** `/users/:id`
- **Method:** `GET`
- **Response:**

```json
{
  "user": User Object
}
```

#### Update User

- **URL:** `/users`
- **Method:** `PATCH`
- **Request Headers:** `Authorization`: Bearer {JWT Token}
- **Request Body:**

```json
{
  "firstName": String,
  "lastName": String,
  "email": String,
  "bio": String,
  "recoveryEmail": String,
  "password": String,
  "DOB": YYYY-MM-DD,
  "mobileNumber": String,
}
```

- **Response:**

```json
{
  "user": User Object
}
```

#### Delete User

- **URL:** `/users`
- **Method:** `DELETE`
- **Request Headers:** `Authorization`: Bearer {JWT Token}

#### Change Password

- **URL:** `/users/changePassword`
- **Method:** `PATCH`
- **Request Headers:** `Authorization`: Bearer {JWT Token}
- **Request Body:**

```json
{
  "currentPassword": String,
  "newPassword": String,
  "confirmPassword": String
}
```

- **Response:**

```json
{
  "user": User Object,
  "token": JWT Token
}
```

### Company

#### Create Company

- **URL:** `/company`
- **Method:** `POST`
- **Request Headers:** `Authorization`: Bearer {JWT Token}
- **Request Body:**

```json
{
  "companyName": String,
  "description": String,
  "industry": String,
  "address": String,
  "numberOfEmployees": {
    "min": Number,
    "max": Number
  },
  "companyEmail": String,
}
```

- **Response:**

```json
{
  "company": Company Object
}
```

#### Update Company

- **URL:** `/company`
- **Method:** `PATCH`
- **Request Headers:** `Authorization`: Bearer {JWT Token}
- **Request Body:**

```json
{
  "companyName": String,
  "description": String,
  "industry": String,
  "address": String,
  "numberOfEmployees": {
    "min": Number,
    "max": Number
  },
  "companyEmail": String,
}
```

- **Response:**

```json
{
  "company": Company Object
}
```

#### Delete Company

- **URL:** `/company`
- **Method:** `DELETE`
- **Request Headers:** `Authorization`: Bearer {JWT Token}

#### Get Company

- **URL:** `/company/:id`
- **Method:** `GET`
- **Request Headers:** `Authorization`: Bearer {JWT Token}

- **Response:**

```json
{
  "company": Company Object
}
```

#### Get all Companies

- **URL:** `/company`
- **Method:** `GET`

- **Response:**

```json
{
  "companies": [Company Object]
}
```

#### Get Company by name

- **URL:** `/company?name={companyName}`
- **Method:** `GET`

- **Response:**

```json
{
  "company": Company Object
}
```

### Job

#### Create Job

- **URL:** `/jobs`
- **Method:** `POST`
- **Request Headers:** `Authorization`: Bearer {JWT Token}
- **Request Body:**

```json
{
  "jobTitle": String,
  "jobLocation": String [Onsite, Remotely, Hybrid],
  "workingTime": String [Full-Time, Part-Time],
  "seniorityLevel": String [Junior, Mid-Level, Senior, Team-Lead, CTO],
  "jobDescription": String,
  "technicalSkills": [String],
  "softSkills": [String],
}
```

- **Response:**

```json
{
  "job": Job Object
}
```

#### Update Job

- **URL:** `/jobs/:id`
- **Method:** `PATCH`
- **Request Headers:** `Authorization`: Bearer {JWT Token}
- **Request Body:**

```json
{
  "jobTitle": String,
  "jobLocation": String [Onsite, Remotely, Hybrid],
  "workingTime": String [Full-Time, Part-Time],
  "seniorityLevel": String [Junior, Mid-Level, Senior, Team-Lead, CTO],
  "jobDescription": String,
  "technicalSkills": [String],
  "softSkills": [String],
}
```

- **Response:**

```json
{
  "job": Job Object
}
```

#### Delete Job

- **URL:** `/jobs/:id`
- **Method:** `DELETE`
- **Request Headers:** `Authorization`: Bearer {JWT Token}

#### Get all Jobs

- **URL:** `/jobs`
- **Method:** `GET`

- **Response:**

```json
{
  "results": Number,
  "jobs": [Job Object]
}
```

#### Get all Jobs by Company

- **URL:** `/jobs?company={companyName}`
- **Method:** `GET`

- **Response:**

```json
{
  "results": Number,
  "jobs": [Job Object]
}
```

### Application

#### Create Application

- **URL:** `/jobs/:id/apply`
- **Method:** `POST`
- **Request Headers:** `Authorization`: Bearer {JWT Token}
- **Request Body:**

```json
{
  "resume": pdf,
  "userTechSkills": [String],
  "userSoftSkills": [String],
}
```

- **Response:**

```json
{
  "application": Application Object
}
```

#### Get all Applications for a Job

- **URL:** `/jobs/:id/applications`
- **Method:** `GET`
- **Request Headers:** `Authorization`: Bearer {JWT Token}

- **Response:**

```json
{
  "applications": [Application Object]
}
```

#### Download All Applications for a Job in Excel

- **URL:** `/jobs/:id/applications/download`
- **Method:** `GET`
- **Request Headers:** `Authorization`: Bearer {JWT Token}

- **Response:** Excel file download
