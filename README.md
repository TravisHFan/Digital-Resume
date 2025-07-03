# Digital Resume

This project contains a simple resume website with a Node.js/Express backend for handling contact form submissions and a static frontend served as HTML, CSS and JavaScript.

## Prerequisites

- **Node.js** and **npm**
- **MongoDB** running locally or accessible via connection string

## Setup

1. Install backend dependencies:

   ```bash
   cd backend
   npm install
   ```

2. Create a `.env` file inside the `backend/` directory and define the following variables:

   ```
   MONGODB_URI=<your mongodb uri>
   EMAIL_USER=<email account used to send notifications>
   EMAIL_PASS=<password or app token for the email account>
   NOTIFICATION_EMAIL=<where contact notifications should be sent>
   FRONTEND_URL=http://localhost:3000
   PORT=3001
   ```

3. Start the backend server (from the `backend/` folder):

   ```bash
   npm start       # start normally
   # or
   npm run dev     # start with nodemon for development
   ```

4. Serve the frontend so that `resume.html` is available at [http://localhost:3000/resume.html](http://localhost:3000/resume.html). Two quick options are:

   ```bash
   cd frontend
   npx http-server -p 3000       # option A
   # or
   python3 -m http.server 3000   # option B
   ```

Open your browser to `http://localhost:3000/resume.html` to view the resume and use the contact form.
