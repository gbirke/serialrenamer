<?php
namespace Birke\Serialrenamer;

require_once __DIR__.'/../vendor/autoload.php';

use Silex\Application;
use Symfony\Component\HttpFoundation\Request;

$app = new Application();

// Settings
$app["debug"] = true;
$app["tvdb_url"] = "http://thetvdb.com";
$app["tvdb_api_key"] = getenv("TVDB_API_KEY");

// services
$app["tvdb_client"] = function($app) {
	 if(!$app['tvdb_client']) {
	 	throw new \RuntimeException("TVDB_API_KEY not specified in environment!");
	 }
	 return new \Moinax\TvDb\Client($app["tvdb_url"], $app["tvdb_api_key"]);
};

// Service providers
$app->register(new \Silex\Provider\UrlGeneratorServiceProvider());
$app->register(new \Silex\Provider\SessionServiceProvider());
$app->register(new \Silex\Provider\TwigServiceProvider(), array(
    'twig.path' => __DIR__.'/../views',
));

// Controllers

// Switching paths
$app->get('/path/{newpath}', function(Application $app, $newpath){
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

// Search for series
$app->post("/search", function(Application $app, Request $req){
	$q = $req->get("q");
	if(!$q) {
		return $app->redirect("/");		
	}

	$currentPath = $app['session']->get("currentPath", "");
	$dirInfo = new DirectoryInfo($currentPath);
	$data = $dirInfo->getInfo();

	$app["session"]->set("searchresult", $app["tvdb_client"]->getSeries($q));

    return $app['twig']->render('index.html.twig', $data);
})->bind("search");

// Main view
$app->get('/', function (Application $app) {
	$currentPath = $app['session']->get("currentPath", "");
	$dirInfo = new DirectoryInfo($currentPath);

    return $app['twig']->render('index.html.twig', $dirInfo->getInfo());
});

return $app;