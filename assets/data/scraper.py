from bs4 import BeautifulSoup
import requests
import csv

res = requests.get('https://www.graduateshotline.com/gre-word-list.html#x2')
soup = BeautifulSoup(res.text, 'html.parser')
tables = soup('table')
#print(tables[0])

fields = ['Word', 'Adjective']
data = []
i = 0 

for tr in tables[1].find_all('tr'):
    row = []
    for td in tr.find_all('td'):
        row.append(td.text)
    data.append(row)

FileName = 'GRE_list_2.csv'
with open(FileName, 'w', newline='') as CSV_file:
    csvwriter = csv.writer(CSV_file)
    csvwriter.writerow(fields)
    csvwriter.writerows(data)