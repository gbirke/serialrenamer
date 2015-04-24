<?php
namespace Birke\Serialrenamer;

require_once __DIR__.'/../vendor/autoload.php';

use Silex\Application;
use Symfony\Component\HttpFoundation\Request;
use Moinax\TvDb;
use Dotenv;

$app = new Application();

// Config load & check
Dotenv::load(dirname(__DIR__));
Dotenv::required('TVDB_API_KEY');

// Settings
$app["debug"] = (boolean) getenv("DEBUG");
$app["tvdb_url"] = "http://thetvdb.com";
$app["tvdb_api_key"] = getenv("TVDB_API_KEY");
$app["tvdb_cache_ttl"] = 3600; //Cache requests for 1 hour
$app["tvdb_cache_dir"] = dirname(__DIR__) . "/var/cache";

// Starting folder, must always end with "/"
$app["root_path"] = getenv("ROOT") ?: "/";

// services
$app["tvdb_client"] = function($app) {
	if(!$app['tvdb_api_key']) {
	 	throw new \RuntimeException("TVDB_API_KEY not specified in environment!");
	}
	$cache = new TvDb\Http\Cache\FilesystemCache($app["tvdb_cache_dir"]);
	$httpClient = new TvDb\Http\CacheClient($cache, $app["tvdb_cache_ttl"]);
	$tvdb = new TvDb\Client($app["tvdb_url"], $app["tvdb_api_key"]);
	$tvdb->setHttpClient($httpClient);
	return $tvdb;
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
			"status" 	=> "error",
			"message"   => gettype($e) . ": " . $e->getMessage()
		], 500);
	}
})
->assert("path", ".*")
->bind("path");

// Search for series
$app->post("/search", function(Application $app, Request $req){
	$q = trim($req->get("q"));
	if(!$q) {
		return $app->json(null);
	}

	$data = $app["tvdb_client"]->getSeries($q);

    return $app->json($data);
})->bind("search");


// Search for episodes
$app->get("/series/{id}/episodes", function(Application $app, $id){

	$data = $app["tvdb_client"]->getSerieEpisodes($id, 'en', \Moinax\TvDb\Client::FORMAT_ZIP);

    return $app->json($data);
})->bind("getEpisodes");

// Main view
$app->get('/', function (Application $app) {
	$info = new DirectoryInfo("", $app["root_path"]);
    return $app['twig']->render('index.html.twig', [
    	"data_files" => $info->getFiles()
    ]);
});

return $app;