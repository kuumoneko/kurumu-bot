# Kurumu discord bot

> Discord bot using javascript

# Version 0.7.0

> Support Prefix_command

> Prefix: `~`

# install

Using `npm install` for installing all node js package

Using `pip install -r requirements.txt` for installing all python package

# Before starting

I. Create a folder `data_base` (You will save discord token, bing AI cookies and google Bard cookies in this folder)
II. Create file named `config.js` in `data_base`

```
{
  "token": "",
  "Secure_1PSID": "",
  "Secure_1PSIDTS": "",
  "prefix": "",
  "cookies":
}

```

III. Choose your prefix in `prefix`

IV. Setup cookies extension

> Go to your web browser

> Download an extension for reading cookies

> You can use any cookies exxtension to get cookies

## Get discord bot Token

1. Go to https://discord.com/developers/applications/
2. Chose your discord bot
3. Chose `Bot`
4. Chose `Reset Token` and follow the directions, then copy the token
5. Go to `config.js`
6. Paste your Token to variable named `token`

## Get Bing AI cookies

1. Go to https://bing.com/chat
2. Run your `cookies extension`
3. Copy all cookies by using `export by json` to your clipboard
4. Go to `config.json`
5. Paste the cookies to `cookies`

## Get Google Bard cookies

1. Go to https://bard.google.com/
2. Run your `cookies extension`
3. Copy value of `Secure_1PSID` to your clipboard
4. Copy value of `Secure_1PSIDTS` to your clipboard
5. Go to `config.js`
6. Paste value of `Secure_1PSID` to variable named `Secure_1PSID`
7. Paste value of `Secure_1PSIDTS` to variable named `Secure_1PSIDTS`

## Get ffmpeg

1. Go to https://ffmpeg.org/download.html
2. Download latest version for your OS system
3. Make sure that ffmpeg can run in your terminal or cmd; if you use Windows, you should add to `Path`

V. Note:

> Before running your bot, please update Bing AI cookies and Google Bard cookies if you don't want to have some error when running:>

# Contributors

</summary>

This project exists thanks to all the people who contribute.

<a href="https://github.com/kuumoneko/kurumu-bot/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=kuumoneko/kurumu-bot" />
</a>

</details>
