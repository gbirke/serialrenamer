The Serial Renamer
==================

Web-based TV series renamer using theTVDB

## Installation
You must have (composer)[http://getcomposer.org/] installed to run this app.

After downloading and extracting the source, run 

	composer install

to install the necessary PHP dependencies. Then run

    npm install
    npm build

to install the necessary JavaScript dependencies. You must have a recent version of (NodeJS)[http://nodejs.org/] and npm (>1.4.x) installed.

## Usage
To run the program with the builtin web server on Port 8080, use the following command:

	php -S localhost:8080 -t web web/index.php


