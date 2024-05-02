# nook

A better soundboard for Discord.

## Installation

First, install VB-Cable from [here](https://vb-audio.com/Cable/).

Then, paste the following into your terminal:

> Windows

```bash
git clone https://github.com/FujiwaraChoki/nook.git
cd nook
cd server
pip install -r requirements.txt
cd ..
yarn install

start cmd /k "cd server && python main.py"

yarn dev
```

> Linux

```bash
git clone https://github.com/FujiwaraChoki/nook.git
cd nook
cd server
pip install -r requirements.txt
cd ..
yarn install

yarn dev & (cd server && python main.py)
```

## Usage

1. Wait for the Electron app to open.
2. Join a voice channel in Discord.
3. Choose an output device in the Electron app.
4. Upload & play sounds.

## License

Released under the [AGPL-3.0 License](LICENSE).

## Author

[@FujiwaraChoki](https://github.com/FujiwaraChoki)
