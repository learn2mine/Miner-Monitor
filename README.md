# Miner-Monitor
A program to monitor the Antminer S9 and use MQTT variables to interact with a dashboard software that we are developing. Software to get altcoin miners have not been done yet! 
To use you will have to configure the ssh keys for you Antminer S9's private keys to allow passwordless entry. You will also have to go into get-values-from-antminer/get-miner-values and change the ips in their. Currently this monitor is only in its first stages so it is hardcoded to only monitor two miner. Currently this only will run in Linux. Set the get-miner-values file to executable and run it. You should be able to see the values being printed to the screen!
Dependencies
mosquitto
