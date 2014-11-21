<?php
require_once __DIR__.'/../vendor/autoload.php';

use Silex\Application;

$app = new Application();

// Service provider
$app->register(new Silex\Provider\SessionServiceProvider());
$app->register(new Silex\Provider\TwigServiceProvider(), array(
    'twig.path' => __DIR__.'/../views',
));

// Controllers


$app->get('/', function (Application $app) {
    return $app['twig']->render('index.html.twig', array(
        'name' =>"World",
    ));
});



$app->run();