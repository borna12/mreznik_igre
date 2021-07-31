var broj_pitanja = 0;
var bodovi = 0;
var vrijeme = 0;
var pauza = 0;
var tocno = 0;

function shuffle(array) { //izmješaj pitanja
    var i = 0,
        j = 0,
        temp = null

    for (i = array.length - 1; i > 0; i -= 1) {
        j = Math.floor(Math.random() * (i + 1))
        temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
}

function ProgressCountdown(timeleft, bar, text) {
    return new Promise((resolve, reject) => {
        countdownTimer = setInterval(() => {
            if (pauza == 0) {
                timeleft--;
            }
            document.getElementById(bar).value = timeleft;
            document.getElementById(text).textContent = timeleft;
            if (timeleft <= 0) {
                clearInterval(countdownTimer);
                resolve(true);
            } else if (timeleft <= 1) {
                $("#sekunde").html("sekunda")
                $("#ostalo").html("ostala")
            } else if (timeleft <= 4) {
                $("#sekunde").html("sekunde")
            }
        }, 1000);
    });
}

function pocetak() {
    $(".init-page").hide()
    broj_pitanja = 0;
    $(".centriraj").fadeIn(300)
    $(".slovo").html(quiz[broj_pitanja].question)
    $(".broj").html(broj_pitanja + 1 + "/" + quiz.length)
    $(".vrijeme").html('<progress value="15" max="15" id="pageBeginCountdown"></progress><p><span id="ostalo">ostalo</span> je još <span id="pageBeginCountdownText">15 </span> <span id="sekunde">sekunda</span> za odgovor</p>')
    $(".tooltiptext").html('treba pritisnuti sljedeći broj polja: '+quiz[broj_pitanja].broj_poteza)
    
    timer()
    return
}

function timer() {
    ProgressCountdown(15, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => isteklo())
}

function isteklo() {
    $("#krivo")[0].play()
    if(quiz[broj_pitanja].question[1]==","){"<span class='mini3'>"+quiz[broj_pitanja].question+"</span>"}
    else if(quiz[broj_pitanja].question!="predznak za veliko slovo"){quiz[broj_pitanja].question=quiz[broj_pitanja].question.slice(0, 2)} 
        else{quiz[broj_pitanja].question="<span class='mini2'>"+quiz[broj_pitanja].question+"</span>"}
    pauza = 1;
    clearInterval(countdownTimer);
    bodovi -= 15
    swal({
        title: '<strong>Vrijeme je isteklo!</strong>',
        html: '<p class="bodovi"><span class="netocno">-</span> 15</p><div class="section group"><div class="col span_1_of_3">' +quiz[broj_pitanja].question + '</div><div class="col span_1_of_3"> <i class="fas fa-long-arrow-alt-right"></i> </div><div class="col span_1_of_3"><img src="slike/' + quiz[broj_pitanja].slika + '.jpg" class="slikica"/></div></div>',
        showCloseButton: false,
        confirmButtonText: 'nastavi',
        allowOutsideClick: false,
        allowEscapeKey: false
    })
    $(".swal2-confirm").click(function () {
        iduce_pitanje()
    })
}

function provjeri() {
    vrijeme = parseInt($("#pageBeginCountdownText").text())
    if ($('.aktivno').length == quiz[broj_pitanja].broj_poteza) {
        if(quiz[broj_pitanja].question[1]==","){quiz[broj_pitanja].question="<span class='mini3'>"+quiz[broj_pitanja].question+"</span>"}
        else if(quiz[broj_pitanja].question!="predznak za veliko slovo"){quiz[broj_pitanja].question=quiz[broj_pitanja].question.slice(0, 2)} 
        else{quiz[broj_pitanja].question="<span class='mini2'>"+quiz[broj_pitanja].question+"</span>"}
        t = 0;
        pauza = 1
        clearInterval(countdownTimer);
        for (x = 0; x < quiz[broj_pitanja].polja.length; x++) {
            if (!$("#" + quiz[broj_pitanja].polja[x]).hasClass("aktivno")) {
                $("#krivo")[0].play()
                bodovi -= 10;
                swal({
                    title: '<strong class="netocno">Netočno!</strong>',
                    html: '<p class="bodovi"><span class="netocno">-</span> 10</p><br><br><div class="section group"><div class="col span_1_of_3">' +quiz[broj_pitanja].question + '</div><div class="col span_1_of_3"> <i class="fas fa-long-arrow-alt-right"></i> </div><div class="col span_1_of_3"><img src="slike/' + quiz[broj_pitanja].slika + '.jpg" class="slikica"/></div></div>',
                    showCloseButton: false,
                    confirmButtonText: 'nastavi',
                    allowOutsideClick: false,
                    allowEscapeKey: false
                });
                $(".swal2-confirm").click(function () {
                    iduce_pitanje()
                })
                break
            } else {
                t++;
            }
        }
        if (t == quiz[broj_pitanja].polja.length) {
            tocno++;
            bodovi += 10
            bodovi += vrijeme;
            $("#tocno")[0].play()
            b = vrijeme + 10
            swal({
                title: '<strong class="tocno">Točno!</strong>',
                html: '<p class="bodovi"><span class="tocno">+</span> ' + b + '</p><br><br><div class="section group"><div class="col span_1_of_3">' +quiz[broj_pitanja].question + '</div><div class="col span_1_of_3"> <i class="fas fa-long-arrow-alt-right"></i> </div><div class="col span_1_of_3"><img src="slike/' + quiz[broj_pitanja].slika + '.jpg" class="slikica"/></div></div>',
                showCloseButton: false,
                confirmButtonText: 'nastavi',
                allowOutsideClick: false,
                allowEscapeKey: false
            })
            $(".swal2-confirm").click(function () {
                iduce_pitanje()
            })
        }

    }
    $(".mini2").parent(".span_1_of_3").css({"font-size":"50px"})
    $(".mini3").parent(".span_1_of_3").css({"font-size":"100px"})
}

function iduce_pitanje() {
    pauza = 0;
    broj_pitanja = broj_pitanja + 1
    postotak = Math.round((tocno / quiz.length) * 100, 2)
    if (broj_pitanja == quiz.length) {
        clearInterval(countdownTimer);
        pauza = 1;
        
        swal({
            title: '<strong>Kraj igre!</strong>',
            html: 'broj bodova: ' + bodovi + '<br>postotak točnih odgovora: ' + postotak + ' % <br><br><form action="https://docs.google.com/forms/d/e/1FAIpQLSe5dBkHW0aEFa95jOAndBuLuk7Nc7uEPllq-h1sMYh0Zh9Unw/formResponse" target="_self" id="bootstrapForm" method="POST"> <legend for="736982347"> <select id="ikona" style="height:30px"></select> ime:  <input id="312289462" type="text" name="entry.312289462" class="form-control" required id="input-q1" style="height:30px"> </legend> <div class="form-group"> <input style="display:none" value="' + bodovi + '" id="60656686" type="text" name="entry.60656686" class="form-control" required> </div><input type="hidden" name="fvv" value="1"> <input type="hidden" name="fbzx" value="4484478125650916779"><input type="hidden" name="pageHistory" value="0"><br><input class="swal2-styled" type="submit"  style="background-color: rgb(235, 73, 71);border-left-color: rgb(235, 73, 71);border-right-color: rgb(235, 73, 71);" id="predaj" value="predaj"></form>',
            showCloseButton: false,
            allowOutsideClick: false,
            showCancelButton: false, // There won't be any cancel button
            confirmButtonText: 'nova igra',
            allowEscapeKey: false
        })
        
        

     
        var target = document.getElementById("ikona");
        var emojiCount = emoji.length;

        for (var index = 0; index < emojiCount; index++) {
            addEmoji(emoji[index]);
        }

        function addEmoji(code) {
            var option = document.createElement('option');
            option.innerHTML = code;
            option.value = code;
            target.appendChild(option);
        }


        if (localStorage.getItem("ime") != null) {
            $('#312289462').val(localStorage.getItem("ime"))
            $('#ikona').val(localStorage.getItem("ikona"))
        }

        $('#bootstrapForm').submit(function (event) {
            localStorage.setItem("ime", $('#312289462').val())
            localStorage.setItem("ikona", $('#ikona').val())
            localStorage.setItem('pokrenuto', "da")
            event.preventDefault()
            $("#predaj").hide(300)
            $('#312289462').val(
                document.getElementById("ikona").value + document.getElementById("312289462").value
            )
            var extraData = {}
            $('#bootstrapForm').ajaxSubmit({
                data: extraData,
                dataType: 'jsonp',  // This won't really work. It's just to use a GET instead of a POST to allow cookies from different domain.
                error: function () {
                    // Submit of form should be successful but JSONP callback will fail because Google Forms
                    // does not support it, so this is handled as a failure.
                    window.open("rez.html","_self"); 
                    // You can also redirect the user to a custom thank-you page:
                    // window.location = 'http://www.mydomain.com/thankyoupage.html'
                }
            })
        })

        $(".swal2-confirm").click(function () {
            nova_igra()
        })
        return
    }
    $(".tooltiptext").html('treba pritisnuti sljedeći broj polja: '+quiz[broj_pitanja].broj_poteza)

    $(".krug").removeClass("aktivno")
    $(".slovo").html(quiz[broj_pitanja].question)
    $(".broj").html(broj_pitanja + 1 + "/" + quiz.length)
}

function hint(){
    $(".hint").html("Za ovaj znak potrebno je popuniti sljedeći broj polja: "+ quiz[broj_pitanja].broj_poteza)
    bodovi=bodovi-2
}



$(".krug").click(function () {
    $(this).toggleClass("aktivno")
    provjeri()
})

quiz = [{
    question: "a, 1",
    polja: [1],
    broj_poteza: 1,
    slika: "a"
}, {
    question: "b, 2",
    polja: [1, 2],
    broj_poteza: 2,
    slika: "b",
}, {
    question: "c, 3",
    polja: [1, 4],
    broj_poteza: 2,
    slika: "c"
}, {
    question: "č",
    polja: [1, 6],
    broj_poteza: 2,
    slika: "cc"

}, {
    question: "ć",
    polja: [1, 4, 6],
    broj_poteza: 3,
    slika: "ccc"
}, {
    question: "d, 4",
    polja: [1, 4, 5],
    broj_poteza: 3,
    slika: "d"

}, {
    question: "dž",
    polja: [1, 2, 4, 5, 6],
    broj_poteza: 5,
    slika: "dd"

}, {
    question: "đ",
    polja: [1, 4, 5, 6],
    broj_poteza: 4,
    slika: "ddd"

}, {
    question: "e, 5",
    polja: [1, 5],
    broj_poteza: 2,
    slika: "e"

}, {
    question: "f, 6",
    polja: [1, 2, 4],
    broj_poteza: 3,
    slika: "f"
}, {
    question: "g, 7",
    polja: [1, 2, 4, 5],
    broj_poteza: 4,
    slika: "g"
}, {
    question: "h, 8",
    polja: [1, 2, 5],
    broj_poteza: 3,
    slika: "h"
}, {
    question: "i, 9",
    polja: [4, 2],
    broj_poteza: 2,
    slika: "i"
}, {
    question: "j, 0",
    polja: [2, 4, 5],
    broj_poteza: 3,
    slika: "j"
}, {
    question: "k",
    polja: [1, 3],
    broj_poteza: 2,    slika: "k"

}, {
    question: "l",
    polja: [1, 2, 3],
    broj_poteza: 3,
    slika: "l"
}, {
    question: "lj",
    polja: [1, 2, 6],
    broj_poteza: 3,
    slika: "lj"
}, {
    question: "m",
    polja: [1, 3, 4],
    broj_poteza: 3,slika: "m"
}, {
    question: "n",
    polja: [1, 4, 3, 5],
    broj_poteza: 4,slika: "n"
}, {
    question: "nj",
    polja: [1, 2, 4, 6],
    broj_poteza: 4,slika: "nj"
}, {
    question: "o",
    polja: [1, 3, 5],
    broj_poteza: 3,slika: "o"
}, {
    question: "p",
    polja: [1, 2, 3, 4],
    broj_poteza: 4,slika: "p"
}, {
    question: "r",
    polja: [1, 2, 3, 5],
    broj_poteza: 4,slika: "r"
}, {
    question: "s",
    polja: [2, 3, 4],
    broj_poteza: 3,slika: "s"
}, {
    question: "š",
    polja: [1, 5, 6],
    broj_poteza: 3,slika: "ss"
}, {
    question: "t",
    polja: [2, 3, 4, 5],
    broj_poteza: 4,slika: "t"
}, {
    question: "u",
    polja: [1, 3, 6],
    broj_poteza: 3,slika: "u"
}, {
    question: "v",
    polja: [1, 2, 3, 6],
    broj_poteza: 4,slika: "v"
}, {
    question: "z",
    polja: [1, 3, 5, 6],
    broj_poteza: 4,slika: "z"
}, {
    question: "ž",
    polja: [2, 3, 4, 6],
    broj_poteza: 4,slika: "zz"
}, {
    question: ".",
    polja: [3],
    broj_poteza: 1,slika: "tocka"
}, {
    question: ",",
    polja: [2],
    broj_poteza: 1,slika: "zarez"
}, {
    question: ":",
    polja: [2, 5],
    broj_poteza: 2,slika: "dvotocka"
}, 
{
    question: ";",
    polja: [2, 3],
    broj_poteza: 2,slika: "tocka-zarez"
},
{
    question: "?",
    polja: [2, 6],
    broj_poteza: 2,slika: "upitnik"
}, {
    question: "!",
    polja: [2, 3, 5],
    broj_poteza: 3,slika: "usklicnik"
}, {
    question: "+",
    polja: [2, 3, 5],
    broj_poteza: 3,slika: "plus"
}, {
    question: "-",
    polja: [3, 6],
    broj_poteza: 2,slika: "minus"
}, {
    question: "x (množenje)",
    polja: [2, 3, 6],
    broj_poteza: 3,slika: "mnozenje"
}
, {
    question: "predznak za veliko slovo",
    polja: [4, 6],
    broj_poteza: 2,
    slika: "veliko_slovo"
}]

shuffle(quiz)

function nova_igra() {
    window.location.reload(true);
}
function uvod(){
    swal({
        title: '<strong>Prepoznaj brajicu</strong>',
        html: 'Brajica je pismo za slijepe i slabovidne osobe koje se sastoji od izbočenih točkica utisnutih u papir. Kviz je namijenjen osobama koje rade sa slijepima te žele naučiti slova brajice. Pritiskom popunite prazna polja kako biste dobili izbočene točkice te time predstavili određeno slovo ili znak. Za svaki odgovor imate 15 sekunda. Boduju se točnost odgovora te vrijeme potrebno za odgovor.<br><br><button id="znakovi" class="swal2-styled">znakovi brajice</button>',
        showCloseButton: false,
        focusConfirm: true,
        confirmButtonText: 'započni kviz',
        allowOutsideClick: false,
        allowEscapeKey: false
    })
    $(".swal2-confirm").click(function () {
        pocetak()
    })
    $("#znakovi").on("click",function(){
        swal({  
            title: '<strong>Znakovi brajice</strong>',
            html: '<div class="section group"> <div class="col span_1_of_3 mini min4" style="font-size:18px!important; display:initial; padding-bottom:50px"><img src="slike/a.jpg"></img><br><span>a, 1</span></div><div class="col span_1_of_3 mini" style="font-size:18px!important; display:initial; padding-bottom:50px"><img src="slike/b.jpg"></img><br><span>b, 2</span></div><div class="col span_1_of_3 mini"><img src="slike/c.jpg"></img><br><span>c, 3</span></div></div><div class="section group"> <div class="col span_1_of_3 mini min4" style="font-size:18px!important; display:initial; padding-bottom:50px"><img src="slike/cc.jpg"></img><br><span>č</span></div><div class="col span_1_of_3 mini" style="font-size:18px!important; display:initial; padding-bottom:50px"><img src="slike/ccc.jpg"></img><br><span>ć</span></div><div class="col span_1_of_3 mini"><img src="slike/d.jpg"></img><br><span>d, 4</span></div></div><div class="section group"> <div class="col span_1_of_3 mini min4" style="font-size:18px!important; display:initial; padding-bottom:50px"><img src="slike/dd.jpg"></img><br><span>dž</span></div><div class="col span_1_of_3 mini" style="font-size:18px!important; display:initial; padding-bottom:50px"><img src="slike/ddd.jpg"></img><br><span>đ</span></div><div class="col span_1_of_3 mini"><img src="slike/e.jpg"></img><br><span>e, 5</span></div></div><div class="section group"> <div class="col span_1_of_3 mini min4" style="font-size:18px!important; display:initial; padding-bottom:50px"><img src="slike/f.jpg"></img><br><span>f, 6</span></div><div class="col span_1_of_3 mini" style="font-size:18px!important; display:initial; padding-bottom:50px"><img src="slike/g.jpg"></img><br><span>g, 7</span></div><div class="col span_1_of_3 mini"><img src="slike/h.jpg"></img><br><span>h, 8</span></div></div><div class="section group"> <div class="col span_1_of_3 mini min4" style="font-size:18px!important; display:initial; padding-bottom:50px"><img src="slike/i.jpg"></img><br><span>i, 9</span></div><div class="col span_1_of_3 mini" style="font-size:18px!important; display:initial; padding-bottom:50px"><img src="slike/j.jpg"></img><br><span>j, 0</span></div><div class="col span_1_of_3 mini"><img src="slike/k.jpg"></img><br><span>k</span></div></div><div class="section group"> <div class="col span_1_of_3 mini min4" style="font-size:18px!important; display:initial; padding-bottom:50px"><img src="slike/l.jpg"></img><br><span>l</span></div><div class="col span_1_of_3 mini" style="font-size:18px!important; display:initial; padding-bottom:50px"><img src="slike/lj.jpg"></img><br><span>lj</span></div><div class="col span_1_of_3 mini"><img src="slike/m.jpg"></img><br><span>m</span></div></div><div class="section group"> <div class="col span_1_of_3 mini min4" style="font-size:18px!important; display:initial; padding-bottom:50px"><img src="slike/n.jpg"></img><br><span>n</span></div><div class="col span_1_of_3 mini" style="font-size:18px!important; display:initial; padding-bottom:50px"><img src="slike/nj.jpg"></img><br><span>nj</span></div><div class="col span_1_of_3 mini"><img src="slike/o.jpg"></img><br><span>o</span></div></div><div class="section group"> <div class="col span_1_of_3 mini min4" style="font-size:18px!important; display:initial; padding-bottom:50px"><img src="slike/p.jpg"></img><br><span>p</span></div><div class="col span_1_of_3 mini" style="font-size:18px!important; display:initial; padding-bottom:50px"><img src="slike/r.jpg"></img><br><span>r</span></div><div class="col span_1_of_3 mini"><img src="slike/s.jpg"></img><br><span>s</span></div></div><div class="section group"> <div class="col span_1_of_3 mini min4" style="font-size:18px!important; display:initial; padding-bottom:50px"><img src="slike/ss.jpg"></img><br><span>š</span></div><div class="col span_1_of_3 mini" style="font-size:18px!important; display:initial; padding-bottom:50px"><img src="slike/t.jpg"></img><br><span>t</span></div><div class="col span_1_of_3 mini"><img src="slike/u.jpg"></img><br><span>u</span></div></div><div class="section group"> <div class="col span_1_of_3 mini min4" style="font-size:18px!important; display:initial; padding-bottom:50px"><img src="slike/v.jpg"></img><br><span>v</span></div><div class="col span_1_of_3 mini" style="font-size:18px!important; display:initial; padding-bottom:50px"><img src="slike/z.jpg"></img><br><span>z</span></div><div class="col span_1_of_3 mini"><img src="slike/zz.jpg"></img><br><span>ž</span></div></div><div class="section group"> <div class="col span_1_of_3 mini min4" style="font-size:18px!important; display:initial; padding-bottom:50px"><img src="slike/veliko_slovo.jpg"></img><br><span>predznak za veliko slovo</span></div><div class="col span_1_of_3 mini" style="font-size:18px!important; display:initial; padding-bottom:50px"><img src="slike/tocka.jpg"></img><br><span>.</span></div><div class="col span_1_of_3 mini"><img src="slike/zarez.jpg"></img><br><span>,</span></div></div><div class="section group"> <div class="col span_1_of_3 mini min4" style="font-size:18px!important; display:initial; padding-bottom:50px"><img src="slike/tocka-zarez.jpg"></img><br><span>;</span></div><div class="col span_1_of_3 mini" style="font-size:18px!important; display:initial; padding-bottom:50px"><img src="slike/upitnik.jpg"></img><br><span>?</span></div><div class="col span_1_of_3 mini"><img src="slike/usklicnik.jpg"></img><br><span>!</span></div></div><div class="section group"> <div class="col span_1_of_3 mini min4" style="font-size:18px!important; display:initial; padding-bottom:50px"><img src="slike/plus.jpg"></img><br><span>+</span></div><div class="col span_1_of_3 mini" style="font-size:18px!important; display:initial; padding-bottom:50px"><img src="slike/minus.jpg"></img><br><span>-</span></div><div class="col span_1_of_3 mini"><img src="slike/mnozenje.jpg"></img><br><span>x (množenje)</span></div></div>',html: '<div class="section group"> <div class="col span_1_of_3 mini min4" style="font-size:18px!important; display:initial; padding-bottom:50px"><img src="slike/a.jpg"></img><br><span>a, 1</span></div><div class="col span_1_of_3 mini" style="font-size:18px!important; display:initial; padding-bottom:50px"><img src="slike/b.jpg"></img><br><span>b, 2</span></div><div class="col span_1_of_3 mini"><img src="slike/c.jpg"></img><br><span>c, 3</span></div></div><div class="section group"> <div class="col span_1_of_3 mini min4" style="font-size:18px!important; display:initial; padding-bottom:50px"><img src="slike/cc.jpg"></img><br><span>č</span></div><div class="col span_1_of_3 mini" style="font-size:18px!important; display:initial; padding-bottom:50px"><img src="slike/ccc.jpg"></img><br><span>ć</span></div><div class="col span_1_of_3 mini"><img src="slike/d.jpg"></img><br><span>d, 4</span></div></div><div class="section group"> <div class="col span_1_of_3 mini min4" style="font-size:18px!important; display:initial; padding-bottom:50px"><img src="slike/dd.jpg"></img><br><span>dž</span></div><div class="col span_1_of_3 mini" style="font-size:18px!important; display:initial; padding-bottom:50px"><img src="slike/ddd.jpg"></img><br><span>đ</span></div><div class="col span_1_of_3 mini"><img src="slike/e.jpg"></img><br><span>e, 5</span></div></div><div class="section group"> <div class="col span_1_of_3 mini min4" style="font-size:18px!important; display:initial; padding-bottom:50px"><img src="slike/f.jpg"></img><br><span>f, 6</span></div><div class="col span_1_of_3 mini" style="font-size:18px!important; display:initial; padding-bottom:50px"><img src="slike/g.jpg"></img><br><span>g, 7</span></div><div class="col span_1_of_3 mini"><img src="slike/h.jpg"></img><br><span>h, 8</span></div></div><div class="section group"> <div class="col span_1_of_3 mini min4" style="font-size:18px!important; display:initial; padding-bottom:50px"><img src="slike/i.jpg"></img><br><span>i, 9</span></div><div class="col span_1_of_3 mini" style="font-size:18px!important; display:initial; padding-bottom:50px"><img src="slike/j.jpg"></img><br><span>j, 0</span></div><div class="col span_1_of_3 mini"><img src="slike/k.jpg"></img><br><span>k</span></div></div><div class="section group"> <div class="col span_1_of_3 mini min4" style="font-size:18px!important; display:initial; padding-bottom:50px"><img src="slike/l.jpg"></img><br><span>l</span></div><div class="col span_1_of_3 mini" style="font-size:18px!important; display:initial; padding-bottom:50px"><img src="slike/lj.jpg"></img><br><span>lj</span></div><div class="col span_1_of_3 mini"><img src="slike/m.jpg"></img><br><span>m</span></div></div><div class="section group"> <div class="col span_1_of_3 mini min4" style="font-size:18px!important; display:initial; padding-bottom:50px"><img src="slike/n.jpg"></img><br><span>n</span></div><div class="col span_1_of_3 mini" style="font-size:18px!important; display:initial; padding-bottom:50px"><img src="slike/nj.jpg"></img><br><span>nj</span></div><div class="col span_1_of_3 mini"><img src="slike/o.jpg"></img><br><span>o</span></div></div><div class="section group"> <div class="col span_1_of_3 mini min4" style="font-size:18px!important; display:initial; padding-bottom:50px"><img src="slike/p.jpg"></img><br><span>p</span></div><div class="col span_1_of_3 mini" style="font-size:18px!important; display:initial; padding-bottom:50px"><img src="slike/r.jpg"></img><br><span>r</span></div><div class="col span_1_of_3 mini"><img src="slike/s.jpg"></img><br><span>s</span></div></div><div class="section group"> <div class="col span_1_of_3 mini min4" style="font-size:18px!important; display:initial; padding-bottom:50px"><img src="slike/ss.jpg"></img><br><span>š</span></div><div class="col span_1_of_3 mini" style="font-size:18px!important; display:initial; padding-bottom:50px"><img src="slike/t.jpg"></img><br><span>t</span></div><div class="col span_1_of_3 mini"><img src="slike/u.jpg"></img><br><span>u</span></div></div><div class="section group"> <div class="col span_1_of_3 mini min4" style="font-size:18px!important; display:initial; padding-bottom:50px"><img src="slike/v.jpg"></img><br><span>v</span></div><div class="col span_1_of_3 mini" style="font-size:18px!important; display:initial; padding-bottom:50px"><img src="slike/z.jpg"></img><br><span>z</span></div><div class="col span_1_of_3 mini"><img src="slike/zz.jpg"></img><br><span>ž</span></div></div><div class="section group"> <div class="col span_1_of_3 mini min4" style="font-size:18px!important; display:initial; padding-bottom:50px"><img src="slike/veliko_slovo.jpg"></img><br><span>predznak za veliko slovo</span></div><div class="col span_1_of_3 mini" style="font-size:18px!important; display:initial; padding-bottom:50px"><img src="slike/tocka.jpg"></img><br><span>.</span></div><div class="col span_1_of_3 mini"><img src="slike/zarez.jpg"></img><br><span>,</span></div></div><div class="section group"> <div class="col span_1_of_3 mini min4" style="font-size:18px!important; display:initial; padding-bottom:50px"><img src="slike/tocka-zarez.jpg"></img><br><span>;</span></div><div class="col span_1_of_3 mini" style="font-size:18px!important; display:initial; padding-bottom:50px"><img src="slike/upitnik.jpg"></img><br><span>?</span></div><div class="col span_1_of_3 mini"><img src="slike/usklicnik.jpg"></img><br><span>!</span></div></div><div class="section group"> <div class="col span_1_of_3 mini min4" style="font-size:18px!important; display:initial; padding-bottom:50px"><img src="slike/plus.jpg"></img><br><span>+</span></div><div class="col span_1_of_3 mini" style="font-size:18px!important; display:initial; padding-bottom:50px"><img src="slike/minus.jpg"></img><br><span>-</span></div><div class="col span_1_of_3 mini"><img src="slike/mnozenje.jpg"></img><br><span>x (množenje)</span></div></div>',
            showCloseButton: false,
            focusConfirm: true,
            confirmButtonText: 'nazad',
            allowOutsideClick: false,
            allowEscapeKey: false
        })
        $(".swal2-confirm").click(function () {
            window.location.reload(true);
        })
    })
}

uvod()

 	

$( "body" ).append( '<style>.mini{font-size:18px!important}.mini img{max-height:100px}@media only screen and (max-width:480px){.col:first-child {font-size:40px!important} .mini{font-size:14px!important .mini3{font-size:40px!important; }.col{margin:1% 0 1% 0%}}.span_3_of_3,.span_2_of_3,.span_1_of_3,.span_1_of_2{width:100%}.mini{width:33%}.slikica{max-height:120px} p + br{display:none}}</style>');