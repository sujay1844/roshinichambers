{
  description = "Roshini Chambers landing page";

  inputs = { nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable"; };

  outputs = { self, nixpkgs }:
    let
      system = "x86_64-linux";
      pkgs = nixpkgs.legacyPackages.${system};
    in {
      devShells.${system}.default = pkgs.mkShell {
        buildInputs = with pkgs; [ prettierd nodejs_22 nodePackages.pnpm ];
        shellHook =
          # bash
          ''
            prettierd start
          '';
      };
    };
}
