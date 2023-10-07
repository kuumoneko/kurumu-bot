# Kurumu discord bot

> Discord bot using javascript

# Version 0.9.0 beta 1

> Using new `googlebard-js` for `AI` commands

> Fix bug in v0.8.0

> Update `README.md`

# install

Using `npm install` for installing all node js package

# Before starting

1. Create a folder `database` (You will save discord token, bing AI cookies and google Bard cookies in this folder)
2. Create file named `config.js` in `database`

```json
{
  "token": "Your-Bot-Token",
  "prefix": "Your-prefix",
  "clientId": "Your-Bot-ClientId",
  "__Secure_1PSID": "Your-cookie-__Secure-1PSID",
  "__Secure_1PSIDTS": "Your-cookie-__Secure-1PSIDTS",
  "cookie_U": "Your-cookie-_U",
  "YOUTUBE_API_KEY": "Your-Youtube-API-key"
}
```

3. Choose your prefix in `prefix`

4. Setup cookies extension

> Go to your web browser

> Download an extension for reading cookies ( I used `Cookie-Editor` )

> You can use any cookies extension to get cookies

## Get discord bot token and clientId

1. Discord bot token

> Go to https://discord.com/developers/applications/

> Chose your discord bot

> Chose `Bot`

> Chose `Reset Token` and follow the directions, then copy the token

> Go to `database/config.js`

> Paste your Token to variable named `token`

2. Discord bot clientId

> Go to https://discord.com/developers/applications/

> Chose your discord bot

> Chose `Bot`

> Chose `Reset Token` and follow the directions, then copy the token

> Go to `database/config.js`

> Paste your clientId to variable named `clientId`

## Get Bing AI cookies:

> Go to https://bing.com/chat

> Run your cookies extension

> Copy value of cookie named `_U`

> Go to `database/config.json`

> Paste the cookies to `cookie_U`

## Get Google Bard cookies:

> Go to https://bard.google.com/

> Run your `cookies extension`

> Copy values of cookies named `__Secure-1PSID` and `__Secure-1PSIDTS`

> Go to `database/config.json`

> Paste your cookies value to `__Secure_1PSID` and `__Secure_1PSIDTS`

## Get ffmpeg:

> Go to https://ffmpeg.org/download.html

> Download latest version for your OS system

> Make sure that ffmpeg can run in your terminal or cmd. If you use Windows, you should add to Your environment variables

# Note:

> Before running your bot, please update Bing AI cookies and Google Bard cookies if you don't want to have some error when running:>

# Contributors

</summary>

This project exists thanks to all the people who contribute.

<a href="https://github.com/kuumoneko/kurumu-bot/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=kuumoneko/kurumu-bot" />
</a>

</details>
