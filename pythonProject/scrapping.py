import time

from flask_cors import cross_origin
from scrapingbee import ScrapingBeeClient
from bs4 import BeautifulSoup;
import requests;
import json
from flask import Flask
app = Flask(__name__)


@cross_origin("http://localhost:3000")
@app.route('/list_of_stocks')
def index():

    headers = {
        "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:89.0) Gecko/20100101 Firefox/89.0",
    }
    with requests.session() as s:
        response=s.get('https://ca.investing.com/equities/united-states',headers=headers,verify=False)
    print(response)
    soup = BeautifulSoup(response.content, 'html.parser')
    results = soup.find(id="marketInnerContent")
    elements = results.find_all("table")
    time.sleep(0.25)
    for element in elements:
        time.sleep(0.125)
        k = element.find('tbody')
        list=[]
        i = 0
        for x in k:
            print(x)
            i += 1
            print("stock_number:", i)
            Fi = str(x).find('bold left noWrap elp plusIconTd')
            ch=str(x).find('pcp')
            print(Fi)
            e4 = str(x)[Fi:].find('</a>')
            n = str(x)[Fi:Fi + e4].rfind('">')
            l = str(x).find('low')
            h = str(x).find('high')
            c = str(x).find('last')
            v = str(x).find('turnover')
            e1 = str(x)[h:].find('</td>')
            e2 = str(x)[c:].find('</td>')
            e3 = str(x)[v:].find('</td>')
            e = str(x)[l:].find('</td>')
            e5=str(x)[ch:].find('</td>')
            print(str(x)[l + 5:l + e])
            print(str(x)[h + 6:h + e1])
            print(str(x)[c + 6:c + e2])
            print(str(x)[v + 10:v + e3])
            print(str(x)[Fi + n + 2:Fi + e4])
            print(str(x)[ch+5:ch+e5])
            o = {"Stock_Symbol":str(x)[Fi + n + 2:Fi + e4],
                 "high":str(x)[h + 6:h + e1],"low":str(x)[l + 5:l + e],"close":str(x)[c + 6:c + e2],
                 "change":str(x)[ch+5:ch+e5],"Volume":str(x)[v + 10:v + e3]
                 }
            stock=json.dumps(o)
            time.sleep(0.25)
            list.append(o)
        time.sleep(0.25)
        return json.dumps(list)

app.run()
