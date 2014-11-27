<?php

namespace Birke\Serialrenamer;

class DirectoryInfo {

	protected $path;
	protected $root;

	public function __construct($path, $root) 
	{
		$this->path = $path;
		$this->root = $root;
	}

	public function getFiles() {
		$fullPath = $this->root . $this->path;
		error_log("fp=$fullPath");
		if (!file_exists($fullPath)) {
			throw new InvalidPathException("Path $this->path does not exist.");
		}
		$files = [];
		foreach (new \DirectoryIterator($fullPath) as $f) {
			$name = $f->getFilename();
			$info = [
				"name" => $name,
				"id" => $this->path ? $this->path . "/" . $name : $name
			];
			if ($f->isDir()) {
				if ($name == ".") {
					continue;
				}
				// Skip "directory up" on root path
				if ($name == ".." && !$this->path) {
					continue;
				}
				$info["path"] = $this->path;
				$info["type"] = "d";
			}
			elseif ($f->isFile()) {
				$info["type"] = "f";
			}
			else {
				continue;
			}
			$files[] = $info;
		}

		return $files;
	}

}