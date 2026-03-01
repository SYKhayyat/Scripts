{
  description = "Nexus Package Manager - Rust Development Environment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    rust-overlay.url = "github:oxalica/rust-overlay";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, rust-overlay, flake-utils, ... }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        overlays = [ (import rust-overlay) ];
        pkgs = import nixpkgs {
          inherit system overlays;
        };

        # Rust toolchain with all components
        rustToolchain = pkgs.rust-bin.stable.latest.default.override {
          extensions = [
            "rust-src"        # For rust-analyzer
            "rust-analyzer"   # LSP
            "clippy"          # Linter
            "rustfmt"         # Formatter
          ];
        };

        # System dependencies for crates
        buildInputs = with pkgs; [
          # SSL/TLS (for reqwest, native-tls)
          openssl
          
          # Compression (for flate2, tar)
          zlib
          
          # Required by some crates
          pkg-config
        ];

        # Native build inputs
        nativeBuildInputs = with pkgs; [
          pkg-config
          rustToolchain
        ];

        # Development tools
        devTools = with pkgs; [
          # Cargo extensions
          cargo-watch       # Auto-rebuild on changes
          cargo-edit        # cargo add, cargo rm
          cargo-outdated    # Check for outdated deps
          cargo-audit       # Security audit
          cargo-deny        # Dependency checker
          cargo-tarpaulin   # Code coverage
          cargo-flamegraph  # Performance profiling
          cargo-expand      # Macro expansion
          cargo-bloat       # Binary size analysis
          cargo-nextest     # Better test runner
          cargo-machete     # Find unused dependencies
          
          # Build tools
          gcc               # C compiler for build scripts
          gnumake           # Make for some build scripts
          
          # Debugging
          lldb              # Debugger
          gdb               # Alternative debugger
          
          # Profiling
          linuxPackages.perf  # Performance profiling (Linux)
          
          # Utilities
          just              # Command runner (like make)
          tokei             # Code statistics
          hyperfine         # Benchmarking
          
          # Git
          git
          
          # For testing backends (optional, comment out if not needed)
          # python3
          # nodejs
          # pipx
        ];

      in
      {
        devShells.default = pkgs.mkShell {
          inherit buildInputs nativeBuildInputs;
          
          packages = devTools;

          # Environment variables
          shellHook = ''
            # Rust
            export RUST_BACKTRACE=1
            export RUST_LOG=nexus=debug
            
            # For openssl-sys crate
            export OPENSSL_DIR="${pkgs.openssl.dev}"
            export OPENSSL_LIB_DIR="${pkgs.openssl.out}/lib"
            export OPENSSL_INCLUDE_DIR="${pkgs.openssl.dev}/include"
            export PKG_CONFIG_PATH="${pkgs.openssl.dev}/lib/pkgconfig"
            
            # For native compilation
            export LD_LIBRARY_PATH="${pkgs.lib.makeLibraryPath buildInputs}:$LD_LIBRARY_PATH"
            
            # Helpful aliases
            alias c="cargo"
            alias cb="cargo build"
            alias cr="cargo run"
            alias ct="cargo test"
            alias cc="cargo check"
            alias cl="cargo clippy"
            alias cf="cargo fmt"
            alias cw="cargo watch -x check"
            alias cdoc="cargo doc --open"
            
            # Project info
            echo ""
            echo "🦀 Nexus Development Environment"
            echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
            echo "Rust: $(rustc --version)"
            echo "Cargo: $(cargo --version)"
            echo ""
            echo "Quick commands:"
            echo "  c     → cargo"
            echo "  cb    → cargo build"
            echo "  cr    → cargo run"
            echo "  ct    → cargo test"
            echo "  cc    → cargo check"
            echo "  cl    → cargo clippy"
            echo "  cf    → cargo fmt"
            echo "  cw    → cargo watch -x check"
            echo "  cdoc  → cargo doc --open"
            echo ""
          '';
        };

        # For building the actual package (optional, for later)
        packages.default = pkgs.rustPlatform.buildRustPackage {
          pname = "nexus";
          version = "0.1.0";
          src = ./.;
          cargoLock.lockFile = ./Cargo.lock;
          
          inherit buildInputs nativeBuildInputs;
          
          # Skip tests during nix build (run separately)
          doCheck = false;
        };
      }
    );
}