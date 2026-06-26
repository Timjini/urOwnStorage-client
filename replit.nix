{ pkgs }: {
  deps = [
    pkgs.stable-24_05
    pkgs.nodePackages.typescript-language-server
    pkgs.yarn
    pkgs.replitPackages.jest
    pkgs.libglib
  ];
}