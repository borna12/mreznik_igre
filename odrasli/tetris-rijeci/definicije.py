import xml.etree.ElementTree as ET
from os import *
import io
root = ET.parse('mreznik-definicije.xml').getroot()


fajl = io.open("definicije.js", mode='w',  encoding="utf-8")
fajl2 = io.open("rijeci.txt", mode='w',  encoding="utf-8")
lista=[]
for type_tag in root.findall('entry'):
    try:
        natuknica = type_tag.find('natuknica').text
        definicija = type_tag.find('definicija')
        if len(natuknica)>=3:
            lista.append(natuknica)
            red='"'+natuknica+'" :' '"'+ET.tostring(definicija).decode().replace("<definicija> ","").replace("</definicija>\n	","").replace("	","")+'",\n'
            fajl.writelines(red) 
    except:
        print("An exception occurred") 
fajl2.write(str(lista))
fajl2.close()