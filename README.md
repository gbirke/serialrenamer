The Serial Renamer
==================

Web-based TV series renamer using theTVDB

## Installation
You must have [composer](http://getcomposer.org/) installed to run this app.

After downloading and extracting the source, run 

	composer install

to install the necessary PHP dependencies. Then run

    npm install
    npm build

to install the necessary JavaScript dependencies. You must have a recent version of (NodeJS)[http://nodejs.org/] and npm (>1.4.x) installed.

## Usage
To run the program with the builtin web server on Port 8080, use the following command:

	php -S localhost:8080 -t web web/index.php

For the program to work, you must register with theTVDB and get an API key and set it in the environment configuration file. Copy the file `.env.example` to `.env` and edit it.

## TODO
This app is still in development and does not have the full functionality. The following parts still have to be developed:

- "All" button for seasons as default selection and matching criterion
- Search theTVDB in the background based on the currently selected folder name.
- Configurable rename pattern as class
- Rename action in PHP code
- Switch between DVD season and aired season

### Future Improvements
- Interface for manually assigning episode info in case the matcher got it wrong
- Input field for rename pattern
- Replace PHP app with node.js to get an isomorphic app
- Sort result by episode number
