# angular-toggle-counterpart

Easily toggle counterpart files (.ts|.spec.ts|.html) in angular.

## Usage

- `ctrl+c c`
  - open `.html` if you are opening `.ts`.
  - open `.ts` if you are opening `.html`.
- `ctrl+c s`
  - open `.html` if you are opening `.scss`.
  - open `.scss` if you are opening `.html`.
- `ctrl+c ctrl+c` (for testing)
  - open `.spec.ts` if you are opening `.ts`.
  - open `.ts` if you are opening `.spec.ts`.
- `no keybind` (toggle of three)
  - open `.ts` if you are opening `.html`.
  - open `.spec.ts` if you are opening `.ts`.
  - open `.html` if you are opening `.spec.ts`.
- `ctrl+c m`
  - open `*.module.ts` if you are opening `*-routing.module.ts`.
  - open `*-routing.module.ts` if you are opening `*.module.ts`.

## Release Notes

### 0.5.0

add new command that toggle scss couterpart files.

### 0.4.0

add new command that toggle module counterpart files.

### 0.3.1

fix command names

### 0.3.0

add new command that toggle four counterpart files at random.

### 0.2.0

add new command that toggle three counterpart files.

### 0.1.2

fix README

## Source

[GitHub](https://github.com/yanutetsu/angular-toggle-counterpart.git)