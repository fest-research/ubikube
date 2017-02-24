# Ubikube
Application flashing cards for microcontrollers.

## Setup
Currently no binaries are packaged. To build from source:


```
sudo apt-get install p7zip-full
git clone https://github.com/fest-research/ubikube.git
cd ubikube
npm i
sudo env PATH="$PATH" npm start
```
Please fill:
- Name of the device
- IP address of the Kubernetes master

Please note: support for Windows is not fully implemented 



## Interface
<p align="center">
    <img src="assets/main-view.png"/>
    <img src="assets/progress-view.png"/>
</p>

## Tools

- File formatting - `npm run format`

## Possible enhancements

- Use `electron-compile` or other tool for building (SCSS and JS)?
- Remove unnecessary dependencies from `package.json`.
- Update file formatter to match app style.
- Add validation.
- Update image after flashing it.
- Add `npm` module to run in `sudo` mode.
