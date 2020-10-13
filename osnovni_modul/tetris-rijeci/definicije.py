import xml.etree.ElementTree as ET
from os import *
import io
root = ET.parse('mreznik-definicije.xml').getroot()


fajl = io.open("definicije.js", mode='w',  encoding="utf-8")
for type_tag in root.findall('entry'):
    try:
        natuknica = type_tag.find('natuknica').text
        definicija = type_tag.find('definicija').text
        red="'"+natuknica+"' : " "'"+definicija+"',\n"
        fajl.writelines(red)
    except:
        print("An exception occurred") 
    