// Memory Game
// © 2014 Nate Wiley
// License -- MIT
// best in full screen, works on phones/tablets (min height for game is 500px..) enjoy ;)
// Follow me on Codepen

$("footer").hide();
var razina = 1;
var broj_karata = 3;

$(".uglata").click(function () {

    $(".modal").html("<h2 class='winner'>Odaberi broj parova:</h2><button id='prva'>4</button> <button id='druga'>8</button><button id='treca'>12</button>");
    $("#prva").click(function () {
        razina = "1";
        igra()
    })
    $("#druga").click(function () {
        razina = "2";
        igra()
    })
    $("#treca").click(function () {
        razina = "3";
        igra()
    })

    function igra() {

        if (razina == 1) {
            broj_karata = 4;

        } else if (razina == 2) {
            broj_karata = 8;
        } else {
            broj_karata = 12
        }

        $("footer").fadeIn(1000);
        $(".modal").fadeOut(1000);
        $(".modal-overlay").delay(1000).slideUp(1000);
        $(".game").show("slow");
        $("#okretanje")[0].play();

        //localStorage.clear();
        var br = 1;
        var sec = 0;
        var pokusaj = 0;
        var vrijeme = 1;
        var bodovi = 0;

        var najbolje_vrijeme;
        var najmanji_broj_pokusaja;
        var karte;

        function pad(val) {
            return val > 9 ? val : "0" + val;
        }
        setInterval(function () {
            if (vrijeme == 1) {
                $("#seconds").html(pad(++sec % 60));
                $("#minutes").html(pad(parseInt(sec / 60, 10)));
            }
        }, 1000);

        var Memory = {
            init: function (cards) {
                this.$game = $(".game");
                this.$modal = $(".modal");
                this.$overlay = $(".modal-overlay");
                this.$zanimanja = $(".uglata");
                this.cardsArray = $.merge(cards, cards);
                this.shuffleCards(this.cardsArray);
                this.setup();
            },

            shuffleCards: function (cardsArray) {
                this.$cards = $(this.shuffle(this.cardsArray));
            },

            setup: function () {
                this.html = this.buildHTML();
                this.$game.html(this.html);
                this.$memoryCards = $(".card");
                this.binding();
                this.paused = false;
                this.guess = null;
                this.$cards = $(this.shuffle(this.cardsArray));
            },

            binding: function () {
                this.$memoryCards.on("click", this.cardClicked);
                this.$zanimanja.on("click", $.proxy(this.reset, this));
            },
            // kinda messy but hey
            cardClicked: function () {
                $("#okret")[0].play();

                var _ = Memory;
                var $card = $(this);
                if (!_.paused && !$card.find(".inside").hasClass("matched") && !$card.find(".inside").hasClass("picked")) {

                    $card.find(".inside").addClass("picked");
                    if (!_.guess) {
                        _.guess = $(this).attr("data-id");
                        $(this).find('p').toggle();
                    } else if (_.guess == $(this).attr("data-id") && !$(this).hasClass("picked")) {
                        $(".picked").addClass("matched");
                        $("#win")[0].play();
                        bodovi = bodovi + 15;

                        _.guess = null;
                        $(".matched").find('p').remove();
                        pokusaj++;
                    } else {
                        pokusaj++;
                        $(this).find('p').toggle();
                        _.guess = null;
                        _.paused = true;
                        setTimeout(function () {
                            $(".picked").removeClass("picked");
                            Memory.paused = false;
                            $(".brojevi").show();
                            bodovi = bodovi - 5
                        }, 1200);
                    }
                    if ($(".matched").length == $(".card").length) {
                        _.win();
                    }
                }
            },

            win: function () {
                this.paused = true;
                setTimeout(function () {
                    Memory.showModal();
                    Memory.$game.fadeOut();
                }, 1000);
            },

            showModal: function () {
                var minute = Math.floor(sec / 60);
                var sekunde = sec - minute * 60;
                this.$overlay.show();
                this.$modal.fadeIn("slow");
                var najvrijeme = localStorage.getItem('najvrijeme');

                if (najvrijeme === undefined || najvrijeme === null) {
                    najvrijeme = sec;
                    localStorage.setItem('najvrijeme', sec);
                }

                // If the user has more points than the currently stored high score then
                if (sec < najvrijeme) {
                    // Set the high score to the users' current points
                    najvrijeme = sec;
                    // Store the high score
                    localStorage.setItem('najvrijeme', sec);
                }

                // Return the high score

                var najpokusaji = localStorage.getItem('najpokusaji');

                if (najpokusaji === undefined || najpokusaji === null) {
                    najpokusaji = pokusaj;
                    localStorage.setItem('najpokusaji', pokusaj);
                }

                // If the user has more points than the currently stored high score then
                if (pokusaj < najpokusaji) {
                    // Set the high score to the users' current points
                    najpokusaji = pokusaj;
                    // Store the high score
                    localStorage.setItem('najpokusaji', pokusaj);
                }
                var naj_minute = Math.floor(najvrijeme / 60);
                var naj_sekunde = najvrijeme - naj_minute * 60;
                $(".modal").show();
                $(".modal-overlay").show();
                bodovi = bodovi - sec
                $(".modal").html("<div class='winner'>Bravo!</div><div class='time'><br>broj pokušaja: " + pokusaj + "</br>vrijeme igre: " + minute + ":" + sekunde + "</br><p><form id='input-form' action='' method='POST' target='no-target'><br><select id='ikona' style='height:30px'></select><label for='ime'>Ime : </label><input id='input-q1' name='q1'><br> <label for='bodovi'>Bodovi : </label><input id='input-q2' placeholder='q2' name='q2' value='" + bodovi + "' disabled style='display:none'> <label for='bodovi'>" + bodovi + "</label><br><button id='form-submit' type='submit' disabled='true'>predaj rezultat</button> </form>    <iframe src='#' id='no-target' name='no-target' style='visibility:hidden;display:none'></iframe><br><a href='index.html' style='color:black;'>odaberi drugu igru</a></p></div>");
                
                $(' #input-q1').keyup(function () {
                    $('#form-submit').prop('disabled', this.value == "" ? true : false);
                })
                var target = document.getElementById("ikona");
                var emojiCount = emoji.length;

                for(var index = 0; index < emojiCount; index++)
                {
                addEmoji(emoji[index]);
                }

                function addEmoji(code)
                {
                var option = document.createElement('option');
                option.innerHTML =  code;
                    option.value=code;
                target.appendChild(option);
                }
                
                 if (localStorage.getItem("ime") != null) {
                     $('#input-q1').val(localStorage.getItem("ime"))
                     $('#ikona').val(localStorage.getItem("ikona"))
                     $('#form-submit').prop('disabled', this.value == "true");
                 }
                   
                if (razina == 1) {
                    $('#input-form').one('submit', function () {
                        $('#input-form').hide(300)
                        localStorage.setItem('ikona', $('#ikona').val())
                        localStorage.setItem('ime', $('#input-q1').val())
                        localStorage.setItem('pokrenuto', "da")
                        var inputq1 = encodeURIComponent($('#ikona').val()+" "+$('#input-q1').val());
                        var inputq2 = encodeURIComponent($('#input-q2').val());
                        var q1ID = "entry.412821582";
                        var q2ID = "entry.902512960";

                        var baseURL =
                            'https://docs.google.com/forms/d/e/1FAIpQLSfquwUrd6YVHwpb4hjnEA9va86H_5yVb4jLX21s4YurNlmjOQ/formResponse?';
                        var submitRef = '&submit=970054585833720596';
                        var submitURL = (baseURL + q1ID + "=" + inputq1 + "&" + q2ID + "=" + inputq2 + submitRef);
                        console.log(submitURL);
                        $(this)[0].action = submitURL;
                        setTimeout(
                            function () {
                                window.location.href = 'rez.html';
                            }, 2500);
                    });
                } else if (razina == 2) {

                    $('#input-form').one('submit', function () {
                        $('#input-form').hide(300)

                        localStorage.setItem('ikona', $('#ikona').val())
                        localStorage.setItem('ime', $('#input-q1').val())
                        localStorage.setItem('pokrenuto', "da")
                        var inputq1 = encodeURIComponent($('#ikona').val()+" "+$('#input-q1').val());
                        var inputq2 = encodeURIComponent($('#input-q2').val());
                        var q1ID = "entry.412821582";
                        var q2ID = "entry.902512960";

                        var baseURL =
                            'https://docs.google.com/forms/d/e/1FAIpQLScELCWlQNmgVvLsx1PdkqrBCdZ5Z-m2xR6BuDmFV81yg8rqpQ/formResponse?';
                        var submitRef = '&submit=970054585833720596';
                        var submitURL = (baseURL + q1ID + "=" + inputq1 + "&" + q2ID + "=" + inputq2 + submitRef);
                        console.log(submitURL);
                        $(this)[0].action = submitURL;
                        setTimeout(
                            function () {
                                window.location.href = 'rez2.html';
                            }, 2500);
                    });
                } else {
                  

                    $('#input-form').one('submit', function () {
                        $('#input-form').hide(300)
                        localStorage.setItem('ikona', $('#ikona').val())
                        localStorage.setItem('ime', $('#input-q1').val())
                        localStorage.setItem('pokrenuto', "da")
                        var inputq1 = encodeURIComponent($('#ikona').val()+" "+$('#input-q1').val());
                        var inputq2 = encodeURIComponent($('#input-q2').val());
                        var q1ID = "entry.412821582";
                        var q2ID = "entry.902512960";

                        var baseURL =
                            'https://docs.google.com/forms/d/e/1FAIpQLScLzWZdBJDsIpnWSx26xm1jStiAOoJWTYo4oMSabqCCwwNSbg/formResponse?';
                        var submitRef = '&submit=970054585833720596';
                        var submitURL = (baseURL + q1ID + "=" + inputq1 + "&" + q2ID + "=" + inputq2 + submitRef);
                        console.log(submitURL);
                        $(this)[0].action = submitURL;
                        setTimeout(
                            function () {
                                window.location.href = 'rez3.html';
                            }, 2500);
                    });
                }


            },

            hideModal: function () {
                this.$overlay.hide();
                this.$modal.hide();
            },

            reset: function () {
                this.hideModal();
                this.shuffleCards(this.cardsArray);
                this.setup();
                this.$game.show("slow");
                pokusaj = 0;
                sec = 0;
                br = 1;
                $(".back").addClass("pozadina-zanimaje");
            },

            // Fisher--Yates Algorithm -- http://bost.ocks.org/mike/shuffle/
            shuffle: function (array) {
                var counter = array.length,
                    temp, index;
                // While there are elements in the array
                while (counter > 0) {
                    // Pick a random index
                    index = Math.floor(Math.random() * counter);
                    // Decrease counter by 1
                    counter--;
                    // And swap the last element with it
                    temp = array[counter];
                    array[counter] = array[index];
                    array[index] = temp;
                }
                return array;
            },

            buildHTML: function () {


                var frag = '';
                br = 1;
                var lista_slika = [];
                var lista_imena = [];
                this.$cards.each(function (k, v) {
                    if (Math.floor((Math.random() * 2) + 1) == 1) {
                        if ($.inArray(v.name, lista_imena) == -1) {

                            frag += '<div class="card" data-id="' + v.id + '"><div class="inside">\
				<div class="front"><img src="' + v.img + '"\
				alt="' + v.name + '" /></div>\
				<div class="back"><p class="brojevi">' + br + '</p></div></div>\
				</div>';
                            if (br < cards.length) {
                                br++;
                            };

                            lista_imena.push(v.name);


                        } else {
                            frag += '<div class="card" data-id="' + v.id + '"><div class="inside">\
				<div class="front"><img src="' + v.img2 + '"\
				alt="' + v.name2 + '" /></div>\
				<div class="back"><p class="brojevi">' + br + '</p></div></div>\
				</div>';
                            if (br < cards.length) {
                                br++;
                            };

                            lista_slika.push(v.img);

                        }
                    } else {
                        if ($.inArray(v.img, lista_slika) == -1) {

                            frag += '<div class="card" data-id="' + v.id + '"><div class="inside">\
				<div class="front"><img src="' + v.img2 + '"\
				alt="' + v.name2 + '" /></div>\
				<div class="back"><p class="brojevi">' + br + '</p></div></div>\
				</div>';
                            if (br < cards.length) {
                                br++;
                            };

                            lista_slika.push(v.img);


                        } else {
                            frag += '<div class="card" data-id="' + v.id + '"><div class="inside">\
				<div class="front"><img src="' + v.img + '"\
				alt="' + v.name + '" /></div>\
				<div class="back"><p class="brojevi">' + br + '</p></div></div>\
				</div>';
                            if (br < cards.length) {
                                br++;
                            };

                            lista_imena.push(v.name);

                        }
                    }
                });
                return frag;
            }
        };
        
        var cards = [{
            name: "a glagoljica",
            name2: "a latinica",
            img: "slike/a.png",
            img2: "slike/lat-a.png",
            id: 1,
        }, {
            name: "b glagoljica",
            name2: "b latinica",
            img: "slike/b.png",
            img2: "slike/lat-b.png",
            id: 2
        }, {
            name: "c glagoljica",
            name2: "c latinica",
            img: "slike/c.png",
            img2: "slike/lat-c.png",
            id: 3
        }, {
            name: "ć glagoljica",
            name2: "ć latinica",
            img: "slike/cc.png",
            img2: "slike/lat-cc.png",
            id: 4
        }, {
            name: "č glagoljica",
            name2: "č latinica",
            img: "slike/ccc.png",
            img2: "slike/lat-ccc.png",
            id: 5
        }, {
            name: "d glagoljica",
            name2: "d latinica",
            img: "slike/d.png",
            img2: "slike/lat-d.png",

            id: 6
        }, {
            name: "đ glagoljica",
            name2: "đ latinica",
            img: "slike/dd.png",
            img2: "slike/lat-dd.png",
            id: 7
        }, {
            name: "e glagoljica",
            name2: "e latinica",
            img: "slike/e.png",
            img2: "slike/lat-e.png",
            id: 8
        }, {
            name: "f glagoljica",
            name2: "f latinica",
            img: "slike/f.png",
            img2: "slike/lat-f.png",
            id: 9
        }, {
            name: "g glagoljica",
            name2: "g latinica",
            img: "slike/g.png",
            img2: "slike/lat-g.png",
            id: 10
        }, {
            name: "h glagoljica",
            name2: "h latinica",
            img: "slike/h.png",
            img2: "slike/lat-h.png",
            id: 11
        }, {
            name: "i glagoljica",
            name2: "i latinica",
            img: "slike/i.png",
            img2: "slike/lat-i.png",
            id: 12
        }, {
            name: "j glagoljica",
            name2: "j latinica",
            img: "slike/j.png",
            img2: "slike/lat-j.png",
            id: 13
        }, {
            name: "k glagoljica",
            name2: "k latinica",
            img: "slike/k.png",
            img2: "slike/lat-k.png",
            id: 14
        }, {
            name: "l glagoljica",
            name2: "l latinica",
            img: "slike/l.png",
            img2: "slike/lat-l.png",
            id: 15
        }, {
            name: "m glagoljica",
            name2: "m latinica",
            img: "slike/m.png",
            img2: "slike/lat-m.png",
            id: 16
        }, {
            name: "n glagoljica",
            name2: "n latinica",
            img: "slike/n.png",
            img2: "slike/lat-n.png",
            id: 17
        }, {
            name: "o glagoljica",
            name2: "o latinica",
            img: "slike/o.png",
            img2: "slike/lat-o.png",
            id: 18
        }, {
            name: "p glagoljica",
            name2: "p latinica",
            img: "slike/p.png",
            img2: "slike/lat-p.png",
            id: 19
        }, {
            name: "r glagoljica",
            name2: "r latinica",
            img: "slike/r.png",
            img2: "slike/lat-r.png",
            id: 20
        }, {
            name: "s glagoljica",
            name2: "s latinica",
            img: "slike/s.png",
            img2: "slike/lat-s.png",
            id: 21
        }, {
            name: "š glagoljica",
            name2: "š latinica",
            img: "slike/ss.png",
            img2: "slike/lat-ss.png",
            id: 22
        },  {
            name: "t glagoljica",
            name2: "t latinica",
            img: "slike/t.png",
            img2: "slike/lat-t.png",
            id: 23
        },{
            name: "u glagoljica",
            name2: "u latinica",
            img: "slike/u.png",
            img2: "slike/lat-u.png",
            id: 24
        }, {
            name: "v glagoljica",
            name2: "v latinica",
            img: "slike/v.png",
            img2: "slike/lat-v.png",
            id: 25
        }, {
            name: "z glagoljica",
            name2: "z latinica",
            img: "slike/z.png",
            img2: "slike/lat-z.png",
            id: 26
        }, {
            name: "zz glagoljica",
            name2: "zz latinica",
            img: "slike/zz.png",
            img2: "slike/lat-zz.png",
            id: 27
        }, {
            name: "jer glagoljica",
            name2: "jer latinica",
            img: "slike/jer.png",
            img2: "slike/lat-jer.png",
            id: 28
        }, {
            name: "ju glagoljica",
            name2: "ju latinica",
            img: "slike/ju.png",
            img2: "slike/lat-ju.png",
            id: 29
        },
         {
            name: "jat glagoljica",
            name2: "jat latinica",
            img: "slike/jat.png",
            img2: "slike/lat-jat.png",
            id: 30
        },
         {
            name: "jat glagoljica",
            name2: "jat latinica",
            img: "slike/ii.png",
            img2: "slike/lat-ii.png",
            id: 31
        },
         {
            name: "dz glagoljica",
            name2: "dz latinica",
            img: "slike/dz.png",
            img2: "slike/lat-dz.png",
            id: 32
        },
         {
            name: "Ō glagoljica",
            name2: "Ō latinica",
            img: "slike/oo.png",
            img2: "slike/lat-oo.png",
            id: 33
        }
        ,
         {
            name: "jor glagoljica",
            name2: "jor latinica",
            img: "slike/jor.png",
            img2: "slike/lat-jor.png",
            id: 34
        }
    ]



        function shuffle(array) {
            var currentIndex = array.length,
                temporaryValue, randomIndex;

            // While there remain elements to shuffle...
            while (0 !== currentIndex) {

                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                // And swap it with the current element.
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }

            return array;
        }

        cards = shuffle(cards);

        cards = cards.slice(0, broj_karata);

        Memory.init(cards);


        $(".back").addClass("pozadina-zanimaje");
        if (razina == 1) {
            $(".card").css({
                "width": "25%",
                "height": "50%"
            })
        } else if (razina == 2) {
            $(".card").css({
                "width": "25%",
                "height": "25%"
            })
        } else if (razina == 3) {
            $(".card").css({
                "width": "16.66666%",
                "height": "25%"
            })
        }
    }
});
$(".boje").click(function () {

    $(".modal").html("<h2 class='winner'>Odaberi broj parova:</h2><button id='prva'>4</button> <button id='druga'>8</button><button id='treca'>12</button>");
    $("#prva").click(function () {
        razina = "1";
        igra()
    })
    $("#druga").click(function () {
        razina = "2";
        igra()
    })
    $("#treca").click(function () {
        razina = "3";
        igra()
    })

    function igra() {

        if (razina == 1) {
            broj_karata = 4;

        } else if (razina == 2) {
            broj_karata = 8;
        } else {
            broj_karata = 12
        }

        $("footer").fadeIn(1000);
        $(".modal").fadeOut(1000);
        $(".modal-overlay").delay(1000).slideUp(1000);
        $(".game").show("slow");
        $("#okretanje")[0].play();

        //localStorage.clear();
        var br = 1;
        var sec = 0;
        var pokusaj = 0;
        var vrijeme = 1;
        var bodovi = 0;

        var najbolje_vrijeme;
        var najmanji_broj_pokusaja;
        var karte;

        function pad(val) {
            return val > 9 ? val : "0" + val;
        }
        setInterval(function () {
            if (vrijeme == 1) {
                $("#seconds").html(pad(++sec % 60));
                $("#minutes").html(pad(parseInt(sec / 60, 10)));
            }
        }, 1000);

        var Memory = {
            init: function (cards) {
                this.$game = $(".game");
                this.$modal = $(".modal");
                this.$overlay = $(".modal-overlay");
                this.$zanimanja = $(".uglata");
                this.cardsArray = $.merge(cards, cards);
                this.shuffleCards(this.cardsArray);
                this.setup();
            },

            shuffleCards: function (cardsArray) {
                this.$cards = $(this.shuffle(this.cardsArray));
            },

            setup: function () {
                this.html = this.buildHTML();
                this.$game.html(this.html);
                this.$memoryCards = $(".card");
                this.binding();
                this.paused = false;
                this.guess = null;
                this.$cards = $(this.shuffle(this.cardsArray));
            },

            binding: function () {
                this.$memoryCards.on("click", this.cardClicked);
                this.$zanimanja.on("click", $.proxy(this.reset, this));
            },
            // kinda messy but hey
            cardClicked: function () {
                $("#okret")[0].play();

                var _ = Memory;
                var $card = $(this);
                if (!_.paused && !$card.find(".inside").hasClass("matched") && !$card.find(".inside").hasClass("picked")) {

                    $card.find(".inside").addClass("picked");
                    if (!_.guess) {
                        _.guess = $(this).attr("data-id");
                        $(this).find('p').toggle();
                    } else if (_.guess == $(this).attr("data-id") && !$(this).hasClass("picked")) {
                        $(".picked").addClass("matched");
                        $("#win")[0].play();
                        bodovi = bodovi + 15;

                        _.guess = null;
                        $(".matched").find('p').remove();
                        pokusaj++;
                    } else {
                        pokusaj++;
                        $(this).find('p').toggle();
                        _.guess = null;
                        _.paused = true;
                        setTimeout(function () {
                            $(".picked").removeClass("picked");
                            Memory.paused = false;
                            $(".brojevi").show();
                            bodovi = bodovi - 5
                        }, 1200);
                    }
                    if ($(".matched").length == $(".card").length) {
                        _.win();
                    }
                }
            },

            win: function () {
                this.paused = true;
                setTimeout(function () {
                    Memory.showModal();
                    Memory.$game.fadeOut();
                }, 1000);
            },

            showModal: function () {
                var minute = Math.floor(sec / 60);
                var sekunde = sec - minute * 60;
                this.$overlay.show();
                this.$modal.fadeIn("slow");
                var najvrijeme = localStorage.getItem('najvrijeme');

                if (najvrijeme === undefined || najvrijeme === null) {
                    najvrijeme = sec;
                    localStorage.setItem('najvrijeme', sec);
                }

                // If the user has more points than the currently stored high score then
                if (sec < najvrijeme) {
                    // Set the high score to the users' current points
                    najvrijeme = sec;
                    // Store the high score
                    localStorage.setItem('najvrijeme', sec);
                }

                // Return the high score

                var najpokusaji = localStorage.getItem('najpokusaji');

                if (najpokusaji === undefined || najpokusaji === null) {
                    najpokusaji = pokusaj;
                    localStorage.setItem('najpokusaji', pokusaj);
                }

                // If the user has more points than the currently stored high score then
                if (pokusaj < najpokusaji) {
                    // Set the high score to the users' current points
                    najpokusaji = pokusaj;
                    // Store the high score
                    localStorage.setItem('najpokusaji', pokusaj);
                }
                var naj_minute = Math.floor(najvrijeme / 60);
                var naj_sekunde = najvrijeme - naj_minute * 60;
                $(".modal").show();
                $(".modal-overlay").show();
                bodovi = bodovi - sec
                $(".modal").html("<div class='winner'>Bravo!</div><div class='time'><br>broj pokušaja: " + pokusaj + "</br>vrijeme igre: " + minute + ":" + sekunde + "</br><p><form id='input-form' action='' method='POST' target='no-target'><br><select id='ikona' style='height:30px'></select><label for='ime'>Ime : </label><input id='input-q1' name='q1'><br> <label for='bodovi'>Bodovi : </label><input id='input-q2' placeholder='q2' name='q2' value='" + bodovi + "' disabled style='display:none'> <label for='bodovi'>" + bodovi + "</label><br><button id='form-submit' type='submit' disabled='true'>predaj rezultat</button> </form>    <iframe src='#' id='no-target' name='no-target' style='visibility:hidden;display:none'></iframe><br><a href='index.html' style='color:black;'>odaberi drugu igru</a></p></div>");
                
                $(' #input-q1').keyup(function () {
                    $('#form-submit').prop('disabled', this.value == "" ? true : false);
                })

                var target = document.getElementById("ikona");
                var emojiCount = emoji.length;

                for(var index = 0; index < emojiCount; index++)
                {
                addEmoji(emoji[index]);
                }

                function addEmoji(code)
                {
                var option = document.createElement('option');
                option.innerHTML =  code;
                    option.value=code;
                target.appendChild(option);
                }
                
                 if (localStorage.getItem("ime") != null) {
                     $('#input-q1').val(localStorage.getItem("ime"))
                     $('#ikona').val(localStorage.getItem("ikona"))
                     $('#form-submit').prop('disabled', this.value == "true");
                 }
                if (razina == 1) {
                    $('#input-form').one('submit', function () {
                        $('#input-form').hide(300)
                        localStorage.setItem('ikona', $('#ikona').val())
                        localStorage.setItem('ime', $('#input-q1').val())
                        localStorage.setItem('pokrenuto', "da")
                        var inputq1 = encodeURIComponent($('#ikona').val()+" "+$('#input-q1').val());
                        var inputq2 = encodeURIComponent($('#input-q2').val());
                        var q1ID = "entry.412821582";
                        var q2ID = "entry.902512960";

                        var baseURL =
                            'https://docs.google.com/forms/d/e/1FAIpQLSdYiSgP-JJTVKNNKWQ7AAaWIeWbNw7TNI18C7owm6IuBR2qNw/formResponse?';
                        var submitRef = '&submit=970054585833720596';
                        var submitURL = (baseURL + q1ID + "=" + inputq1 + "&" + q2ID + "=" + inputq2 + submitRef);
                        console.log(submitURL);
                        $(this)[0].action = submitURL;
                        setTimeout(
                            function () {
                                window.location.href = 'rez4.html';
                            }, 2500);
                    });
                } else if (razina == 2) {
                    $('#input-form').one('submit', function () {
                        $('#input-form').hide(300)
                        localStorage.setItem('ikona', $('#ikona').val())
                        localStorage.setItem('ime', $('#input-q1').val())
                        localStorage.setItem('pokrenuto', "da")
                        var inputq1 = encodeURIComponent($('#ikona').val()+" "+$('#input-q1').val());
                        var inputq2 = encodeURIComponent($('#input-q2').val());
                        var q1ID = "entry.412821582";
                        var q2ID = "entry.902512960";

                        var baseURL =
                            'https://docs.google.com/forms/d/e/1FAIpQLSePzGtNK2NSa1qTmXzmA2rGlykTjq8PjdcW1SOfFQs-N-aSxA/formResponse?';
                        var submitRef = '&submit=970054585833720596';
                        var submitURL = (baseURL + q1ID + "=" + inputq1 + "&" + q2ID + "=" + inputq2 + submitRef);
                        console.log(submitURL);
                        $(this)[0].action = submitURL;
                        setTimeout(
                            function () {
                                window.location.href = 'rez5.html';
                            }, 2500);
                    });
                } else {
                    $('#input-form').one('submit', function () {
                        $('#input-form').hide(300)
                         localStorage.setItem('ikona', $('#ikona').val())
                         localStorage.setItem('ikona', $('#ikona').val())
                        localStorage.setItem('ime', $('#input-q1').val())
                        localStorage.setItem('pokrenuto', "da")
                        var inputq1 = encodeURIComponent($('#ikona').val()+" "+$('#input-q1').val());
                        var inputq2 = encodeURIComponent($('#input-q2').val());
                        var q1ID = "entry.412821582";
                        var q2ID = "entry.902512960";

                        var baseURL =
                            'https://docs.google.com/forms/d/e/1FAIpQLSe6RxB-MfHCm24VAPzdkClL9bV68IyH6nhqTBq8MrXY4XnFDA/formResponse?';
                        var submitRef = '&submit=970054585833720596';
                        var submitURL = (baseURL + q1ID + "=" + inputq1 + "&" + q2ID + "=" + inputq2 + submitRef);
                        console.log(submitURL);
                        $(this)[0].action = submitURL;
                        setTimeout(
                            function () {
                                window.location.href = 'rez6.html';
                            }, 2500);
                    });
                }


            },

            hideModal: function () {
                this.$overlay.hide();
                this.$modal.hide();
            },

            reset: function () {
                this.hideModal();
                this.shuffleCards(this.cardsArray);
                this.setup();
                this.$game.show("slow");
                pokusaj = 0;
                sec = 0;
                br = 1;
                $(".back").addClass("pozadina-zanimaje");
            },

            // Fisher--Yates Algorithm -- http://bost.ocks.org/mike/shuffle/
            shuffle: function (array) {
                var counter = array.length,
                    temp, index;
                // While there are elements in the array
                while (counter > 0) {
                    // Pick a random index
                    index = Math.floor(Math.random() * counter);
                    // Decrease counter by 1
                    counter--;
                    // And swap the last element with it
                    temp = array[counter];
                    array[counter] = array[index];
                    array[index] = temp;
                }
                return array;
            },

            buildHTML: function () {


                var frag = '';
                br = 1;
                var lista_slika = [];
                var lista_imena = [];
                this.$cards.each(function (k, v) {
                    if (Math.floor((Math.random() * 2) + 1) == 1) {
                        if ($.inArray(v.name, lista_imena) == -1) {

                            frag += '<div class="card" data-id="' + v.id + '"><div class="inside">\
				<div class="front"><img src="' + v.img + '"\
				alt="' + v.name + '" /></div>\
				<div class="back"><p class="brojevi">' + br + '</p></div></div>\
				</div>';
                            if (br < cards.length) {
                                br++;
                            };

                            lista_imena.push(v.name);


                        } else {
                            frag += '<div class="card" data-id="' + v.id + '"><div class="inside">\
				<div class="front"><img src="' + v.img2 + '"\
				alt="' + v.name2 + '" /></div>\
				<div class="back"><p class="brojevi">' + br + '</p></div></div>\
				</div>';
                            if (br < cards.length) {
                                br++;
                            };

                            lista_slika.push(v.img);

                        }
                    } else {
                        if ($.inArray(v.img, lista_slika) == -1) {

                            frag += '<div class="card" data-id="' + v.id + '"><div class="inside">\
				<div class="front"><img src="' + v.img2 + '"\
				alt="' + v.name2 + '" /></div>\
				<div class="back"><p class="brojevi">' + br + '</p></div></div>\
				</div>';
                            if (br < cards.length) {
                                br++;
                            };

                            lista_slika.push(v.img);


                        } else {
                            frag += '<div class="card" data-id="' + v.id + '"><div class="inside">\
				<div class="front"><img src="' + v.img + '"\
				alt="' + v.name + '" /></div>\
				<div class="back"><p class="brojevi">' + br + '</p></div></div>\
				</div>';
                            if (br < cards.length) {
                                br++;
                            };

                            lista_imena.push(v.name);

                        }
                    }
                });
                return frag;
            }
        };
        
        var cards = [{
            name: "a glagoljica",
            name2: "a latinica",
            img: "slike/boja/a.png",
            img2: "slike/boja/lat-a.png",
            id: 1,
        }, {
            name: "b glagoljica",
            name2: "b latinica",
            img: "slike/boja/b.png",
            img2: "slike/boja/lat-b.png",
            id: 2
        }, {
            name: "c glagoljica",
            name2: "c latinica",
            img: "slike/boja/c.png",
            img2: "slike/boja/lat-c.png",
            id: 3
        }, {
            name: "ć glagoljica",
            name2: "ć latinica",
            img: "slike/boja/cc.png",
            img2: "slike/boja/lat-cc.png",
            id: 4
        }, {
            name: "č glagoljica",
            name2: "č latinica",
            img: "slike/boja/ccc.png",
            img2: "slike/boja/lat-ccc.png",
            id: 5
        }, {
            name: "d glagoljica",
            name2: "d latinica",
            img: "slike/boja/d.png",
            img2: "slike/boja/lat-d.png",

            id: 6
        }, {
            name: "đ glagoljica",
            name2: "đ latinica",
            img: "slike/boja/dd.png",
            img2: "slike/boja/lat-dd.png",
            id: 7
        }, {
            name: "e glagoljica",
            name2: "e latinica",
            img: "slike/boja/e.png",
            img2: "slike/boja/lat-e.png",
            id: 8
        }, {
            name: "f glagoljica",
            name2: "f latinica",
            img: "slike/boja/f.png",
            img2: "slike/boja/lat-f.png",
            id: 9
        }, {
            name: "g glagoljica",
            name2: "g latinica",
            img: "slike/boja/g.png",
            img2: "slike/boja/lat-g.png",
            id: 10
        }, {
            name: "h glagoljica",
            name2: "h latinica",
            img: "slike/boja/h.png",
            img2: "slike/boja/lat-h.png",
            id: 11
        }, {
            name: "i glagoljica",
            name2: "i latinica",
            img: "slike/boja/i.png",
            img2: "slike/boja/lat-i.png",
            id: 12
        }, {
            name: "j glagoljica",
            name2: "j latinica",
            img: "slike/boja/j.png",
            img2: "slike/boja/lat-j.png",
            id: 13
        }, {
            name: "k glagoljica",
            name2: "k latinica",
            img: "slike/boja/k.png",
            img2: "slike/boja/lat-k.png",
            id: 14
        }, {
            name: "l glagoljica",
            name2: "l latinica",
            img: "slike/boja/l.png",
            img2: "slike/boja/lat-l.png",
            id: 15
        }, {
            name: "m glagoljica",
            name2: "m latinica",
            img: "slike/boja/m.png",
            img2: "slike/boja/lat-m.png",
            id: 16
        }, {
            name: "n glagoljica",
            name2: "n latinica",
            img: "slike/boja/n.png",
            img2: "slike/boja/lat-n.png",
            id: 17
        }, {
            name: "o glagoljica",
            name2: "o latinica",
            img: "slike/boja/o.png",
            img2: "slike/boja/lat-o.png",
            id: 18
        }, {
            name: "p glagoljica",
            name2: "p latinica",
            img: "slike/boja/p.png",
            img2: "slike/boja/lat-p.png",
            id: 19
        }, {
            name: "r glagoljica",
            name2: "r latinica",
            img: "slike/boja/r.png",
            img2: "slike/boja/lat-r.png",
            id: 20
        }, {
            name: "s glagoljica",
            name2: "s latinica",
            img: "slike/boja/s.png",
            img2: "slike/boja/lat-s.png",
            id: 21
        }, {
            name: "š glagoljica",
            name2: "š latinica",
            img: "slike/boja/ss.png",
            img2: "slike/boja/lat-ss.png",
            id: 22
        },  {
            name: "t glagoljica",
            name2: "t latinica",
            img: "slike/boja/t.png",
            img2: "slike/boja/lat-t.png",
            id: 23
        },{
            name: "u glagoljica",
            name2: "u latinica",
            img: "slike/boja/u.png",
            img2: "slike/boja/lat-u.png",
            id: 24
        }, {
            name: "v glagoljica",
            name2: "v latinica",
            img: "slike/boja/v.png",
            img2: "slike/boja/lat-v.png",
            id: 25
        }, {
            name: "z glagoljica",
            name2: "z latinica",
            img: "slike/boja/z.png",
            img2: "slike/boja/lat-z.png",
            id: 26
        }, {
            name: "zz glagoljica",
            name2: "zz latinica",
            img: "slike/boja/zz.png",
            img2: "slike/boja/lat-zz.png",
            id: 27
        }, {
            name: "jer glagoljica",
            name2: "jer latinica",
            img: "slike/boja/jer.png",
            img2: "slike/boja/lat-jer.png",
            id: 28
        }, {
            name: "ju glagoljica",
            name2: "ju latinica",
            img: "slike/boja/ju.png",
            img2: "slike/boja/lat-ju.png",
            id: 29
        },
         {
            name: "jat glagoljica",
            name2: "jat latinica",
            img: "slike/boja/jat.png",
            img2: "slike/boja/lat-jat.png",
            id: 30
        },
         {
            name: "jat glagoljica",
            name2: "jat latinica",
            img: "slike/boja/ii.png",
            img2: "slike/boja/lat-ii.png",
            id: 31
        },
         {
            name: "dz glagoljica",
            name2: "dz latinica",
            img: "slike/boja/dz.png",
            img2: "slike/boja/lat-dz.png",
            id: 32
        },
         {
            name: "Ō glagoljica",
            name2: "Ō latinica",
            img: "slike/boja/oo.png",
            img2: "slike/boja/lat-oo.png",
            id: 33
        }
        ,
         {
            name: "jor glagoljica",
            name2: "jor latinica",
            img: "slike/boja/jor.png",
            img2: "slike/boja/lat-jor.png",
            id: 33
        }
    ]



        function shuffle(array) {
            var currentIndex = array.length,
                temporaryValue, randomIndex;

            // While there remain elements to shuffle...
            while (0 !== currentIndex) {

                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                // And swap it with the current element.
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }

            return array;
        }

        cards = shuffle(cards);

        cards = cards.slice(0, broj_karata);

        Memory.init(cards);


        $(".back").addClass("pozadina-zanimaje");
        if (razina == 1) {
            $(".card").css({
                "width": "25%",
                "height": "50%"
            })
        } else if (razina == 2) {
            $(".card").css({
                "width": "25%",
                "height": "25%"
            })
        } else if (razina == 3) {
            $(".card").css({
                "width": "16.66666%",
                "height": "25%"
            })
        }
    }
});


