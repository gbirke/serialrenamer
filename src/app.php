<?php
require_once __DIR__.'/../vendor/autoload.php';

use Silex\Application;

$app = new Application();

// Settings
$app["debug"] = true;

// Service providers
$app->register(new Silex\Provider\UrlGeneratorServiceProvider());
$app->register(new Silex\Provider\SessionServiceProvider());
$app->register(new Silex\Provider\TwigServiceProvider(), array(
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
	$files = new DirectoryIterator($currentPath ? $currentPath : "/");
	$filesInPath = $dirsInPath = [];
	$currentPathRel = substr($currentPath, 1);
	foreach ($files as $f) {
		if ($f->isDir()) {
			$name = $f->getFilename();
			if ($name == ".") {
				continue;
			}
			if (!$currentPathRel && $name == "..") {
				continue;
			}
			
			$dirsInPath[$currentPathRel."/".$name] = $name;
		}
		elseif ($f->isFile()) {
			$filesInPath[] = $f->getFilename();
		}
		
	}
	$parents = [];
	$path = "";
	if ($currentPath != "/") {
		foreach(explode("/", $currentPathRel) as $part) {
			$parents[$path."/".$part] = $part;
		}
	}
	else {
		$parents = [];
	}

    return $app['twig']->render('index.html.twig', [
    	'filesInPath' => $filesInPath,
    	'dirsInPath'  => $dirsInPath,
    	'currentPath' => $currentPath,
    	'parents'     => $parents
    ]);
});

return $app;