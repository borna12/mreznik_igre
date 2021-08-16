from os import *
import io
f1 = io.open('deca-č-ć.txt', mode='r', encoding="utf-8")
f2 = io.open('deca-č-ć.js',mode='w',  encoding="utf-8")

for i in f1:
    if "č" in i:
        i=i.split("č")
        prvi_dio=i[0]
        drugi_dio=i[1].strip("\n")
        kod='{"question":"popuni","hint":"č/ć","correctAnswer":["č","ć"],"osnova":"'+prvi_dio+'","osnova2":"'+drugi_dio+'","glagol":"","pin":"",},\n'
        f2.writelines(kod)
    elif "ć" in i:
        i=i.split("ć")
        prvi_dio=i[0]
        drugi_dio=i[1].strip("\n")
        kod='{"question":"popuni","hint":"č/ć","correctAnswer":["ć","č"],"osnova":"'+prvi_dio+'","osnova2":"'+drugi_dio+'","glagol":"","pin":"",},\n'
        f2.writelines(kod)
f2.close()


f1 = io.open('djeca-dž-đ.txt', mode='r', encoding="utf-8")
f2 = io.open('djeca-dž-đ.js',mode='w',  encoding="utf-8")

for i in f1:
    if "dž" in i:
        i=i.split("dž")
        prvi_dio=i[0]
        drugi_dio=i[1].strip("\n")
        kod='{"question":"popuni","hint":"dž/đ","correctAnswer":["dž","đ"],"osnova":"'+prvi_dio+'","osnova2":"'+drugi_dio+'","glagol":"","pin":"",},\n'
        f2.writelines(kod)
    elif "đ" in i:
        i=i.split("đ")
        prvi_dio=i[0]
        drugi_dio=i[1].strip("\n")
        kod='{"question":"popuni","hint":"dž/đ","correctAnswer":["đ","dž"],"osnova":"'+prvi_dio+'","osnova2":"'+drugi_dio+'","glagol":"","pin":"",},\n'
        f2.writelines(kod)
f2.close()

f1 = io.open('djeca-ije-je.txt', mode='r', encoding="utf-8")
f2 = io.open('djeca-ije-je.js',mode='w',  encoding="utf-8")

for i in f1:
    if "ije" in i:
        i=i.split("ije")
        prvi_dio=i[0]
        drugi_dio=i[1].strip("\n")
        kod='{"question":"popuni","hint":"ije/je","correctAnswer":["ije","je"],"osnova":"'+prvi_dio+'","osnova2":"'+drugi_dio+'","glagol":"","pin":"",},\n'
        f2.writelines(kod)
    elif "je" in i:
        i=i.split("je")
        prvi_dio=i[0]
        drugi_dio=i[1].strip("\n")
        kod='{"question":"popuni","hint":"ije/je","correctAnswer":["je","ije"],"osnova":"'+prvi_dio+'","osnova2":"'+drugi_dio+'","glagol":"","pin":"",},\n'
        f2.writelines(kod)
f2.close()

f1 = io.open('stranci-č-ć.txt', mode='r', encoding="utf-8")
f2 = io.open('stranci-č-ć.js',mode='w',  encoding="utf-8")

for i in f1:
    if "č" in i:
        i=i.split("č")
        prvi_dio=i[0]
        drugi_dio=i[1].strip("\n")
        kod='{"question":"popuni","hint":"č/ć","correctAnswer":["č","ć"],"osnova":"'+prvi_dio+'","osnova2":"'+drugi_dio+'","glagol":"","pin":"",},\n'
        f2.writelines(kod)
    elif "ć" in i:
        i=i.split("ć")
        prvi_dio=i[0]
        drugi_dio=i[1].strip("\n")
        kod='{"question":"popuni","hint":"č/ć","correctAnswer":["ć","č"],"osnova":"'+prvi_dio+'","osnova2":"'+drugi_dio+'","glagol":"","pin":"",},\n'
        f2.writelines(kod)
f2.close()


f1 = io.open('stranci-dž-đ.txt', mode='r', encoding="utf-8")
f2 = io.open('stranci-dž-đ.js',mode='w',  encoding="utf-8")

for i in f1:
    if "dž" in i:
        i=i.split("dž")
        prvi_dio=i[0]
        drugi_dio=i[1].strip("\n")
        kod='{"question":"popuni","hint":"dž/đ","correctAnswer":["dž","đ"],"osnova":"'+prvi_dio+'","osnova2":"'+drugi_dio+'","glagol":"","pin":"",},\n'
        f2.writelines(kod)
    elif "đ" in i:
        i=i.split("đ")
        prvi_dio=i[0]
        drugi_dio=i[1].strip("\n")
        kod='{"question":"popuni","hint":"dž/đ","correctAnswer":["đ","dž"],"osnova":"'+prvi_dio+'","osnova2":"'+drugi_dio+'","glagol":"","pin":"",},\n'
        f2.writelines(kod)
f2.close()

f1 = io.open('stranci-ije-je.txt', mode='r', encoding="utf-8")
f2 = io.open('stranci-ije-je.js',mode='w',  encoding="utf-8")

for i in f1:
    if "ije" in i:
        i=i.split("ije")
        prvi_dio=i[0]
        drugi_dio=i[1].strip("\n")
        kod='{"question":"popuni","hint":"ije/je","correctAnswer":["ije","je"],"osnova":"'+prvi_dio+'","osnova2":"'+drugi_dio+'","glagol":"","pin":"",},\n'
        f2.writelines(kod)
    elif "je" in i:
        i=i.split("je")
        prvi_dio=i[0]
        drugi_dio=i[1].strip("\n")
        kod='{"question":"popuni","hint":"ije/je","correctAnswer":["je","ije"],"osnova":"'+prvi_dio+'","osnova2":"'+drugi_dio+'","glagol":"","pin":"",},\n'
        f2.writelines(kod)
f2.close()


f1 = io.open('osnovni-č.txt', mode='r', encoding="utf-8")
f2 = io.open('osnovni-č.js',mode='w',  encoding="utf-8")

for i in f1:
    if "č" in i:
        i=i.split("č")
        prvi_dio=i[0]
        drugi_dio=i[1].strip("\n")
        kod='{"question":"popuni","hint":"č/ć","correctAnswer":["č","ć"],"osnova":"'+prvi_dio+'","osnova2":"'+drugi_dio+'","glagol":"","pin":"",},\n'
        f2.writelines(kod)
f2.close()

f1 = io.open('osnovni-ć.txt', mode='r', encoding="utf-8")
f2 = io.open('osnovni-ć.js',mode='w',  encoding="utf-8")

for i in f1:
    if "ć" in i:
        i=i.split("ć")
        prvi_dio=i[0]
        drugi_dio=i[1].strip("\n")
        kod='{"question":"popuni","hint":"č/ć","correctAnswer":["ć","č"],"osnova":"'+prvi_dio+'","osnova2":"'+drugi_dio+'","glagol":"","pin":"",},\n'
        f2.writelines(kod)
f2.close()


f1 = io.open('osnovni-dž-đ.txt', mode='r', encoding="utf-8")
f2 = io.open('osnovni-dž-đ.js',mode='w',  encoding="utf-8")

for i in f1:
    if "dž" in i:
        i=i.split("dž")
        prvi_dio=i[0]
        drugi_dio=i[1].strip("\n")
        kod='{"question":"popuni","hint":"dž/đ","correctAnswer":["dž","đ"],"osnova":"'+prvi_dio+'","osnova2":"'+drugi_dio+'","glagol":"","pin":"",},\n'
        f2.writelines(kod)
    elif "đ" in i:
        i=i.split("đ")
        prvi_dio=i[0]
        drugi_dio=i[1].strip("\n")
        kod='{"question":"popuni","hint":"dž/đ","correctAnswer":["đ","dž"],"osnova":"'+prvi_dio+'","osnova2":"'+drugi_dio+'","glagol":"","pin":"",},\n'
        f2.writelines(kod)
f2.close()

f1 = io.open('osnovni-ije-je.txt', mode='r', encoding="utf-8")
f2 = io.open('osnovni-ije.je.js',mode='w',  encoding="utf-8")

for i in f1:
    if "ije" in i:
        i=i.split("ije")
        prvi_dio=i[0]
        drugi_dio=i[1].strip("\n")
        kod='{"question":"popuni","hint":"ije/je","correctAnswer":["ije","je"],"osnova":"'+prvi_dio+'","osnova2":"'+drugi_dio+'","glagol":"","pin":"",},\n'
        f2.writelines(kod)
    elif "je" in i:
        i=i.split("je")
        prvi_dio=i[0]
        drugi_dio=i[1].strip("\n")
        kod='{"question":"popuni","hint":"ije/je","correctAnswer":["je","ije"],"osnova":"'+prvi_dio+'","osnova2":"'+drugi_dio+'","glagol":"","pin":"",},\n'
        f2.writelines(kod)
f2.close()