# custom-csv-reporter

To generate package : npm pack

To install package : npm i -g newman-reporter-customcsv-1.0.0.tgz

To use package : newman run Test_Page_BE-VIP.json -r customcsv

# docker
To build : docker build --tag newmancsv:1.0 .
(you have to be in the directory)

To run : 
docker run \
 -t newmancsv:1.0 run https://www.getpostman.com/collections/b628d689487f7df8ffb0  \
 -r customcsv
 
 OR
 
 docker run \
 -v /home/mmoussa/projects:/etc/newman \                
 -t newmancsv:1.0 run Test_Page_BE-VIP.json -r customcsv

/home/mmoussa/projects = folder where collection json is present
