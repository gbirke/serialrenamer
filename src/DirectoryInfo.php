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
		$pathRel = $this->getPathRel();
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

		return [
	    	'filesInPath' => $filesInPath,
	    	'dirsInPath'  => $dirsInPath,
	    	'currentPath' => $this->path,
	    	'parents'     => $this->getParents()
	    ];
	}

	public function getParents() {
		$parents = [];
		$path = "";
		if ($this->path != "/") {
			foreach(explode("/", $this->getPathRel()) as $part) {
				$parents[$path."/".$part] = $part;
			}
		}
		else {
			$parents = [];
		}
		return $parents;
	}

	protected function getPathRel() {
		return substr($this->path, 1);
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