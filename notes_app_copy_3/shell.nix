with import <nixpkgs> {};

mkShell {
  buildInputs = [
    python3
    python3Packages.pyqt5
    python3Packages.sip4
    qt5.qtbase
    qt5.qtwayland
  ];
  
  QT_QPA_PLATFORM = "wayland";
}
