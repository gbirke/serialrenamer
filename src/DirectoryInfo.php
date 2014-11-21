<?php

namespace Birke\Serialrenamer;

class DirectoryInfo {

	protected $path;

	public function __construct($path) 
	{
		$this->path = $path;
	}

	public function getInfo() {
		$files = new \DirectoryIterator($this->path ? $this->path : "/");
		$filesInPath = $dirsInPath = [];
		$pathRel = substr($this->path, 1);
		foreach ($files as $f) {
			if ($f->isDir()) {
				$name = $f->getFilename();
				if ($name == ".") {
					continue;
				}
				if (null === ($destination = $this->getDestination($pathRel, $name))) {
					continue;
				}
				$dirsInPath[$destination] = $name;
			}
			elseif ($f->isFile()) {
				$filesInPath[] = $f->getFilename();
			}
			
		}
		$parents = [];
		$path = "";
		if ($this->path != "/") {
			foreach(explode("/", $pathRel) as $part) {
				$parents[$path."/".$part] = $part;
			}
		}
		else {
			$parents = [];
		}

		return [
	    	'filesInPath' => $filesInPath,
	    	'dirsInPath'  => $dirsInPath,
	    	'this->path' => $this->path,
	    	'parents'     => $parents
	    ];
	}

	protected function getDestination($pathRel, $name) {
		$destination = $pathRel . "/" . $name;
		if ($name == "..") {
			if (!$pathRel) {
				return null;
			}
			else {
				$destination = dirname($pathRel);
				$destination = $destination ?: "/";
			}
		}
		return $destination;
	}

}