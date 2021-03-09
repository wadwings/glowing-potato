import requests
from bs4 import BeautifulSoup
import random
import time
import json
import os
headers = {
                'Cookie':'OCSSID=4df0bjva6j7ejussu8al3eqo03',
                'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                '(KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36',
}
path = '/home/wings/electron-app'
for size in range(6, 13, 2):
    if not os.path.exists("{}/{}".format(path, size)):
        os.mkdir("{}/{}".format(path, size))
    for level in range(1, 5, 1):
        if not os.path.exists("{}/{}/{}".format(path, size, level)):
            os.mkdir("{}/{}/{}".format(path, size, level))
        for nr in range(1, 50, 1):
            f = open("{}/{}/{}/{}".format(path, size, level, nr), "w")
            # time.sleep(random.randint(1,5))
            print('http://www.binarypuzzle.com/puzzles.php?size={}&level={}&nr={}'.format(size, level, nr))
            html = requests.get('http://www.binarypuzzle.com/puzzles.php?size={}&level={}&nr={}'.format(size, level, nr), headers = headers).text
            # print(html)
            soup = BeautifulSoup(html,'html.parser')
            table = soup.find('div', class_="intekst").find_all('div')
            for x in range(1, size):
                for y in range(1, size):
                    if len(table[(x - 1) * size + y - 1].text.strip()):
                        print(table[(x - 1) * size + y - 1].text.strip())
                        str = "{} {} {}\n".format(x, y, table[(x - 1) * size + y - 1].text.strip())
                        f.write(str)