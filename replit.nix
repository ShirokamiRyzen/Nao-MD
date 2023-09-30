{ pkgs }: {
	deps = [
		pkgs.neofetch
		pkgs.imagemagick
		pkgs.nodejs-18_x
        pkgs.nodePackages.typescript
		pkgs.speedtest-cli
		pkgs.jellyfin-ffmpeg
		pkgs.git
		pkgs.python2
		pkgs.python310Packages.python
        pkgs.libwebp
        pkgs.wget
        pkgs.yarn
        pkgs.libuuid
	];
}