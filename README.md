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

## Deploying on Render

### Backend Web Service

1. Create a new **Web Service** in Render and connect it to this repository.
2. Set the build command to `npm install` and the start command to `npm start`.
3. Add the environment variables defined in the `.env` file, for example:

   - `MONGODB_URI`
   - `EMAIL_USER`
   - `EMAIL_PASS`
   - `NOTIFICATION_EMAIL`
   - `FRONTEND_URL`
   - `PORT`

### Frontend Static Site

1. Create a **Static Site** on Render pointing to the `frontend/` folder.
2. No build command is required. Set the publish directory to `frontend/`.
3. After the site is deployed, copy the generated URL and set it in the backend
   `FRONTEND_URL` environment variable.

### MongoDB

The backend expects the `MONGODB_URI` variable to contain a connection string.
You can provision a database using Render's **MongoDB** service or an external
provider such as MongoDB Atlas. Paste the connection URL into the `MONGODB_URI`
setting of your backend Web Service.
