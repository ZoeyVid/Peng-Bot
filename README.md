# [Peng-Bot](https://github.com/SanCraftDev/Peng-Bot)

A Bot that reacts to messages that starts with ping, pewpew or peng...

## [Invite Link](https://discord.com/oauth2/authorize?client_id=742096151301455882&permissions=274877908992&scope=applications.commands%20bot)

## Run it for your own (Debian):

Install Nodejs v16 / v17 if you do not have done this already:

```sh
apt update && apt upgrade -y && apt autoremove -y
apt install curl
curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
apt update
apt-get install nodejs -y
npm config set fund false --global
npm i npm -g
{ crontab -l 2>/dev/null; echo "$(( $RANDOM % 60 )) $(( $RANDOM % 3 + 3 )) * * * sudo npm i npm -g" ; } | crontab -
```

Download it and install requirements:

```sh
apt update && apt upgrade -y && apt autoremove -y
apt install git nano screen cron
cd /home
git clone https://github.com/SanCraftDev/Peng-Bot.git
cd Peng-Bot
npm i
```

Edit the configuration and replace `your-token-goes-here` with your Bot tooken from [here](https://discord.com/developers/applications):

```sh
nano config.json
```

Save it with ctrl + x and ENTER <br>
Make a test run:

```sh
node main.js
```

Run it:

```sh
screen -AmdS peng-bot node main.js
```

Start it on boot:

```sh
{ crontab -l 2>/dev/null; echo "@reboot sleep 10 && cd /home/Peng-Bot && screen -AmdS peng-bot node main.js" ; } | crontab -
```
