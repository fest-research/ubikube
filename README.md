# Ubikube
Electron app flashing card images.

## Setup
Just run:

```
git clone git@github.com:maciaszczykm/ubikube.git
cd ubikube
npm i
sudo env PATH="$PATH" npm start
```

## Tools

- File formatting - `npm run format`

## Interface
<p align="center">
    <img src="assets/main-view.png"/>
    <img src="assets/progress-view.png"/>
</p>

## Possible enhancements

- Use `electron-compile` or other tool for building (SCSS and JS)?
- Remove unnecessary dependencies from `package.json`.
- Update file formatter to match app style.
- Add validation.
- Update image after flashing it.
- Add `npm` module to run in `sudo` mode.
