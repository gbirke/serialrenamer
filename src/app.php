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

// Starting folder, must always end with "/"
// TODO: User environment variable, default to "/"
$app["root_path"] = "/";

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

// get files and folder for path
$app->get('/path/{path}', function(Application $app, $path){
	try {
		$info = new DirectoryInfo($path, $app["root_path"]);
		return $app->json($info->getFiles());	
	}
	catch(\Exception $e) {
		return $app->json([
			"status" 	=> "error",,
			"message"   => gettype($e) . ": " . $e->getMessage()
		], 500);
	}
})
->assert("path", ".*")
->bind("path");

// Search for series
$app->post("/search", function(Application $app, Request $req){
	$q = $req->get("q");
	if(!$q) {
		return $app->json(new stdClass);		
	}

	$app["session"]->set("searchresult", $app["tvdb_client"]->getSeries($q));

    return $app->json($data);
})->bind("search");

// Main view
$app->get('/', function (Application $app) {
	$info = new DirectoryInfo("", $app["root_path"]);
    return $app['twig']->render('index.html.twig', [
    	"data_files" => $info->getFiles()
    ]);
});

return $app;