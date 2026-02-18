{
  description = "Notes Canvas App";
  
  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-24.11";
  
  outputs = { self, nixpkgs }:
    let
      pkgs = import nixpkgs { system = "x86_64-linux"; };
    in
    {
      packages.x86_64-linux.default = pkgs.python3.withPackages (p: with p; [ pyqt5 sip_4 ]);
      
      devShells.x86_64-linux.default = pkgs.mkShell {
        buildInputs = with pkgs; [
          python3
          python3Packages.pyqt5
          python3Packages.sip_4
        ];
      };
    };
}
