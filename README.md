# custom-csv-reporter

To generate package : npm pack

To install package : npm i -g newman-reporter-customcsv-1.0.0.tgz

To use package : newman run Test_Page_BE-VIP.json -r customcsv

# docker
To build : docker build --tag newmancsv:1.0 .
(you have to be in the directory)

To run : 
docker run \
 -v /home/mmoussa/projects:/etc/newman \
 -t newmancsv:1.0 run Test_Page_BE-VIP.json \
 -r customcsv

