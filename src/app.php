<?php
namespace Birke\Serialrenamer;

require_once __DIR__.'/../vendor/autoload.php';

use Silex\Application;

$app = new Application();

// Settings
$app["debug"] = true;

// Service providers
$app->register(new \Silex\Provider\UrlGeneratorServiceProvider());
$app->register(new \Silex\Provider\SessionServiceProvider());
$app->register(new \Silex\Provider\TwigServiceProvider(), array(
    'twig.path' => __DIR__.'/../views',
));

// Controllers

// Switching paths
$app->get('path/{newpath}', function(Application $app, $newpath){
	if ($newpath[0] != "/") {
		$newpath = "/" . $newpath;
	}
	if (file_exists($newpath)) {
		$app['session']->set("currentPath", $newpath);	
	}
	return $app->redirect("/");
})
->assert("newpath", ".*")
->bind("path");

// Main view
$app->get('/', function (Application $app) {
	$currentPath = $app['session']->get("currentPath", "");
	$dirInfo = new DirectoryInfo($currentPath);

    return $app['twig']->render('index.html.twig', $dirInfo->getInfo());
});

return $app;