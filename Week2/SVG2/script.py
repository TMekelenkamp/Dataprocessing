#!usr/bin/env python

# Thom Mekelenkamp

import csv
import json

csvfile = open('knmi.csv', 'r')
jsonfile = open('file.json', 'w')

fieldnames = ("short","country","pop")
reader = csv.DictReader( csvfile, fieldnames)
for row in reader:
    json.dump(row, jsonfile)
    jsonfile.write('\n')
	

