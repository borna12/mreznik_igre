from os import *
import io
f1 = io.open('djeca_ije_je.txt', mode='r', encoding="utf-8")
f2 = io.open('djeca_ije_je.js',mode='w',  encoding="utf-8")

for i in f1:
    if "ije" in i:
        i=i.split("ije")
        prvi_dio=i[0]
        drugi_dio=i[1].strip("\n")
        kod='{"question":"popuni","hint":"ije/je","correctAnswer":["ije",""],"osnova":"'+prvi_dio+'","osnova2":"'+drugi_dio+'","glagol":"","pin":"",},\n'
        f2.writelines(kod)
    elif "je" in i:
        i=i.split("je")
        prvi_dio=i[0]
        drugi_dio=i[1].strip("\n")
        kod='{"question":"popuni","hint":"ije/je","correctAnswer":["je",""],"osnova":"'+prvi_dio+'","osnova2":"'+drugi_dio+'","glagol":"","pin":"",},\n'
        f2.writelines(kod)
f2.close()