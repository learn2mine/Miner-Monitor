# Miner-Monitor

A program to monitor Bitcoin and Altcoin miners and use MQTT variables and NodeJS to make an easy to use dashboard program to monitor your software from anyware in the world through a webbrowser!

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for developement and testing purposes.

### Perequisites

```
NodeJS
mosquitto
```

### Supported Miners
```Antminer S9```

If you want to make support for other cryptocurrency miners setups(including graphics card setups) feel free to create a fork and when your done I will deffinetly review it when you make a pull request!

### Installing

```
apt-get install nodejs mosquitto
```

### Runing the file

To log values from the antminers currently you will have to configure ```passwordless ssh entry``` into your Antminer S9's from the machine you are running this file on. Then you will have to change the file to your ip addresses. Then run it on your machine by going ```./get-miner-values```. All this will effectively do as of now is log out temps, hashrate and other important data into mqtt variables.


## License


## Roadmap

**If you want to see what we(and you) plan to get done on this project. Please visit our Roadmap wiki on this github project**
