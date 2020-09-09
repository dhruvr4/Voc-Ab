from bs4 import BeautifulSoup
import requests
import csv
from selenium import webdriver
import time

#Automater
# chrome_b = webdriver.Chrome('./chromedriver')
# chrome_b.maximize_window()
# chrome_b.get('https://www.vocabulary.com/lists/52473')
# assert 'Explore' in chrome_b.page_source
# # button = chrome_b.find_element_by_xpath("//*[@id='loadx4']/a/h2").click()
# time.sleep(1)
# # chrome_b.find_element_by_xpath("//span[text='list - 2']").click()
# new_html=chrome_b.page_source

#Scraper
res = requests.get('https://www.vocabulary.com/lists/52473')
soup = BeautifulSoup(res.text, 'html.parser')
# tables = soup('table')
lis = soup.find(id='wordlist')
#print(tables[0])
# print(lis)

#print(tables[1])
fields = ['Word', 'Adjective']
data = []
i = 0 

for tr in lis.find_all('li'):
    row = []
    row.append(tr['word'].strip())
    row.append(tr.find('div').text.strip())
    data.append(row)


# for tr in tables[1].find_all('tr'):
#     row = []
#     for td in tr.find_all('td'):
#         row.append(td.text.strip())
#     data.append(row)

FileName = 'EASY_list.csv'

import io
with io.open(FileName, "w", encoding="utf-8", newline='') as CSV_file:
    csvwriter = csv.writer(CSV_file)
    csvwriter.writerow(fields)
    csvwriter.writerows(data)





# with open(FileName, 'w', newline='') as CSV_file:
#     csvwriter = csv.writer(CSV_file)
#     csvwriter.writerow(fields)
#     csvwriter.writerows(data)


# chrome_b.close()