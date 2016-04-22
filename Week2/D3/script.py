#!usr/bin/env python

# Thom Mekelenkamp

import csv
import json

# define data file and output file
csvfile = open('knmi.csv', 'r')
jsonfile = open('file.json', 'w')

# define field names for jason file
fieldnames = ("date","rain")
reader = csv.DictReader( csvfile, fieldnames)
# read through file and split in separate lines + a ","
for row in reader:
    json.dump(row, jsonfile)
    jsonfile.write(',\n')