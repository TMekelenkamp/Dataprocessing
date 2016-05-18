#!usr/bin/env python

# Thom Mekelenkamp

import csv
import json

# define data file and output file
csvfile = open('data.csv', 'r')
jsonfile = open('data.json', 'w')

# define field names for jason file
fieldnames = ("country","symbol","sqkm","pop","users","penetration")
reader = csv.DictReader( csvfile, fieldnames)
# read through file and split in separate lines + a ","
for row in reader:
    json.dump(row, jsonfile)
    jsonfile.write(',\n')
