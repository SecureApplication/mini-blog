# Project name

Mini Blog Web Application (Insecure)

# Student details

Name: Yago Masanobu Taira <br />
Student number: x19238568

# Project Dependencies

1. Nodejs (v20.11.1)
2. Reactjs (v18.2.0)
3. npm (v10.4.0)
4. mysql2 (v3.9.2)
5. VSCode (1.87.2)

# Install project steps

1. Navigate to the `server` directory into the `mini-blog` project using the `cd` command.
2. Run the `npm install` command to install all the dependencies needed for the `server` side.
3. Navigate to the `client` directory into the `mini-blog` project using the `cd` command.
4. Run the `npm install` command to install all the dependencies needed for the `client` side.

# Note

To run this full stack web application you will need to:

1. Run project `server`
2. Run project `client` <br />
   Follow the steps below.

# Run server steps

1. Navigate to the `server` directory into the mini-blog project using the `cd` command.
2. No need to update MySQL credentials in this branch because there is Sensitive Data Exposure in `config/database.js` where the database is connected to a free hosting MySQL database. (Learning purpose)
3. Run the `npm start` to start the production server.
4. Access the website via localhost address by typing `localhost:5000` in a browser. (optional) <br />
   Note: the server will only be used to make API calls there is no need to access localhost address in the browser.

# Run client steps

1. Navigate to the `client` directory into the mini-blog project using the `cd` command.
2. Run the `npm start` to start the production server.
3. The command `npm start` will automatically open the localhost website address `localhost:3000`.

# Branches

1. Check existent branches by running command `git branch`.
2. Switch branches by running command `git checkout name_of_the_branch`. <br />
   Note: The `main` and `insecure` branches contain vulnerabilities. Only `insecure` branch has vulnerabilities fix. <br />
   Note: For a better experience keep `server` and `client` running while switching branches.
