// VARIABLE DECLARATIONS ------
// pages
var initPage,
    questionsPage,
    resultsPage,
    // buttons
    startBtn,
    submitBtn,
    continueBtn,
    retakeBtn,
    spanishBtn,
    // question and answers
    question,
    answerList,
    answerSpan,
    answerA,
    answerB,
    answerC,
    answerD,
    // event listeners
    answerDiv,
    answerDivA,
    answerDivB,
    answerDivC,
    answerDivD,
    feedbackDiv,
    selectionDiv,
    toBeHighlighted,
    toBeMarked, iskljuci_v = 0,
    userScore,
    // quiz
    pitanja,
    questionCounter,
    correctAnswer,
    correctAnswersCounter,
    userSelectedAnswer,
    // function names
    newQuiz,
    generateQuestionAndAnswers,
    getCorrectAnswer,
    getUserAnswer, tajming,
    selectAnswer,
    deselectAnswer,
    selectCorrectAnswer,
    deselectCorrectAnswer,
    getSelectedAnswerDivs,
    highlightCorrectAnswerGreen,
    highlightIncorrectAnswerRed,
    slikica, brb,
    clearHighlightsAndFeedback, r1,
    prekidac, countdownTimer, bodovi = 0,
    vrijeme = 0,
    randomslovo,
    nalog = 0,
    moze = 0;

function ProgressCountdown(timeleft, bar, text) {
    $(".begin-countdown").show(300)
    return new Promise((resolve, reject) => {
        countdownTimer = setInterval(() => {
            timeleft--;
            document.getElementById(bar).value = timeleft;
            document.getElementById(text).textContent = timeleft;
            if (timeleft <= 0) {
                clearInterval(countdownTimer);
                resolve(true);
            }

        }, 1000);
    });

}

$(document).ready(function() {
    $('body').on('keydown', function(event) {
        var x = event.which;
        if (x === 13) {
            event.preventDefault();
        }
    });
    // DOM SELECTION ------

    // App pages
    // Page 1 - Initial
    initPage = $('.init-page');
    // Page 2 - Questions/answers
    questionsPage = $('.questions-page');
    // Page 3 - Results
    resultsPage = $('.results-page');
    slikica = $('.slikica');

    // Buttons
    startBtn = $('.init-page__btn, .results-page__retake-btn');
    submitBtn = $('.mrzim');
    continueBtn = $('.questions-page__continue-btn');
    retakeBtn = $('.results-page__retake-btn');
    spanishBtn = $('.results-page__spanish-btn');

    // Answer block divs
    answerDiv = $('.questions-page__answer-div');
    answerDivA = $('.questions-page__answer-div-a');
    answerDivB = $('.questions-page__answer-div-b');
    answerDivC = $('.questions-page__answer-div-c');
    answerDivD = $('.questions-page__answer-div-d');

    // Selection div (for the pointer, on the left)
    selectionDiv = $('.questions-page__selection-div');

    // Feedback div (for the checkmark or X, on the right)
    feedbackDiv = $('.questions-page__feedback-div');

    // Questions and answers
    question = $('.questions-page__question');
    answerList = $('.questions-page__answer-list');
    answerSpan = $('.questions-page__answer-span');
    answerA = $('.questions-page__answer-A');
    answerB = $('.questions-page__answer-B');
    answerC = $('.questions-page__answer-C');
    answerD = $('.questions-page__answer-D');


    // User final score
    userScore = $('.results-page__score');
    prikazBodova = $('.results-page__bodovi');
    // QUIZ CONTENT ------

    function stvori(tekst, tekst2, tekst3) {
        do {
            predmet = cvijece[Math.floor(Math.random() * cvijece.length)];
        }
        while (predmet == tekst || predmet == tekst2 || predmet == tekst3);
        return predmet
    }



    // shuffle(pitanja)

    // FUNCTION DECLARATIONS ------
    $.fn.declasse = function(re) {
            return this.each(function() {
                var c = this.classList
                for (var i = c.length - 1; i >= 0; i--) {
                    var classe = "" + c[i]
                    if (classe.match(re)) c.remove(classe)
                }
            })
        }
        // Start the quiz
    newQuiz = function() {
        prekidac = 1;
        bodovi = 0;
        // Set the question counter to 0
        questionCounter = 0;
        // Set the total correct answers counter to 0
        correctAnswersCounter = 0;

        // Hide other pages of the app
        questionsPage.hide();
        resultsPage.hide();

    };

    // Load the next question and set of answers
    generateQuestionAndAnswers = function() {
        $(".begin-countdown").hide(300)

        question.html("<span style='font-size: 1.3rem;'>" + (questionCounter + 1) + "/" + pitanja.length + ".</span> <br>");
        $("#odgovor").val('')
        $(".popuni").show();
        $(".questions-page__answer-list").hide()
        $("#opis").html("<em>" + pitanja[questionCounter].vrijeme + "</em>")
        $(".vrijeme").html('<progress value="' + tajming + '" max="' + tajming + '" id="pageBeginCountdown"></progress><p><span id="pageBeginCountdownText">' + tajming + '</span></p>')
        $("body").css({
            "background-color": pitanja[questionCounter].boja_pozadine
        })
        $("#osnova").text(pitanja[questionCounter].osnova)
        lista = pitanja[questionCounter].pitanja
        slike = pitanja[questionCounter].slika
        random_br = Math.floor(Math.random() * lista.length)
        rijec = lista[random_br]
        slika = slike[random_br]
        slova=rijec.split(" ");
        randomslovo = slova[Math.floor(Math.random() * slova.length)];
        randomslovo = randomslovo.toLowerCase()

        html = ""
        for (x = 0; x < slova.length; x++) {
            if (slova[x].toLowerCase() == randomslovo) {
                html += "<span class='oznaci tocno'>" + slova[x] + "</span>"
            } else {
                html += "<span class='oznaci netocno'>" + slova[x] + "</span>"
            }
        }
        $(".rijec").html(html)
        $(".slicica").attr("src", "../slike/" + slika)
        $(".oznaci").on("click", function() {
            if (moze == 1) {
                $(this).toggleClass("oznaceno")
                if ($('.oznaceno').length > 0) {
                    submitBtn.show(300)
                } else {
                    submitBtn.hide(300)
                }
            } else {

            }
        })


    };

    // Store the correct answer of a given question
    getCorrectAnswer = function() {
        correctAnswer = randomslovo;
    };

    // Store the user's selected (clicked) answer
    getUserAnswer = function(target) {
        userSelectedAnswer = $(target).find(answerSpan).text();
    };

    // Add the pointer to the clicked answer
    selectAnswer = function(target) {
        $(target).find(selectionDiv).addClass('ion-chevron-right');
        $(target).addClass("odabir")
    };

    // Remove the pointer from any answer that has it
    deselectAnswer = function() {
        if (selectionDiv.hasClass('ion-chevron-right')) {
            selectionDiv.removeClass('ion-chevron-right');
            selectionDiv.parent().removeClass("odabir")
        }
    };

    // Get the selected answer's div for highlighting purposes
    getSelectedAnswerDivs = function(target) {
        toBeHighlighted = $(target);
        toBeMarked = $(target).find(feedbackDiv);
    };

    // Make the correct answer green and add checkmark
    highlightCorrectAnswerGreen = function(target) {
        if (correctAnswer === answerA.text()) {
            answerDivA.addClass('questions-page--correct');
            answerDivA.find(feedbackDiv).addClass('ion-checkmark-round');
        }
        if (correctAnswer === answerB.text()) {
            answerDivB.addClass('questions-page--correct');
            answerDivB.find(feedbackDiv).addClass('ion-checkmark-round');
        }
        if (correctAnswer === answerC.text()) {
            answerDivC.addClass('questions-page--correct');
            answerDivC.find(feedbackDiv).addClass('ion-checkmark-round');
        }
        if (correctAnswer === answerD.text()) {
            answerDivD.addClass('questions-page--correct');
            answerDivD.find(feedbackDiv).addClass('ion-checkmark-round');
        }
    };

    // Make the incorrect answer red and add X
    highlightIncorrectAnswerRed = function() {
        toBeHighlighted.addClass('questions-page--incorrect');
        toBeMarked.addClass('ion-close-round');
    };

    // Clear all highlighting and feedback
    clearHighlightsAndFeedback = function() {
        answerDiv.removeClass('questions-page--correct');
        answerDiv.removeClass('questions-page--incorrect');
        feedbackDiv.removeClass('ion-checkmark-round');
        feedbackDiv.removeClass('ion-close-round');
    };

    // APP FUNCTIONALITY ------

    /* --- PAGE 1/3 --- */

    // Start the quiz:
    newQuiz();

    // Clicking on start button:
    startBtn.on('click', function() {
        if ($(this).attr('id') == "bez") {
            iskljuci_v = 1;
            tajming = 10;
            $(".vrijeme").hide()
            $('form').attr('action', 'https://docs.google.com/forms/d/e/1FAIpQLSe3V_eHV3E_sqUqCUlKMUbJ1E1HLu1QdcJiB-rtgIe8MPApSw/formResponse');
            r1 = 1
   
        } else if ($(this).attr('id') == "20") {
            tajming = 10;
            $('form').attr('action', 'https://docs.google.com/forms/d/e/1FAIpQLSefk6kGZKlELaNR3FmctUePAGPTF3w803oq69TnSgUnqOdz2Q/formResponse');
            r1 = 2
        } else if ($(this).attr('id') == "40") {
            tajming = 20;
            $('form').attr('action', 'https://docs.google.com/forms/d/e/1FAIpQLSfqRcPON2jVXDYxCNrJs4WBxRavQB-KExciQK51hBwQflSf2w/formResponse');
            r1 = 3
        }
        // Advance to questions page
        initPage.hide();
        questionsPage.show(300);

        // Load question and answers
        generateQuestionAndAnswers();

        // Store the correct answer in a variable
        getCorrectAnswer();

        // Hide the submit and continue buttons
        submitBtn.hide();
        continueBtn.hide();

    });

    /* --- PAGE 2/3 --- */

    // Clicking on an answer:
    answerDiv.on('click', function() {
        // Make the submit button visible
        submitBtn.show(300);
        // Remove pointer from any answer that already has it
        deselectAnswer();
        // Put pointer on clicked answer
        selectAnswer(this);
        // Store current selection as user answer
        getUserAnswer(this);
        // Store current answer div for highlighting purposes
        getSelectedAnswerDivs(this);
    });
    $(".zvuk").on("click", function() {
        if (!playing) {
            var element = $(this);
            var elementID = event.target.id;
            if (randomslovo == "č") {
                var oggVar = ("../audio/cc.mp3");
            } else if (randomslovo == "ć") {
                var oggVar = ("../audio/ccc.mp3");
            } else if (randomslovo == "š") {
                var oggVar = ("../audio/ss.mp3");
            } else if (randomslovo == "đ") {
                var oggVar = ("../audio/dd.mp3");
            } else if (randomslovo == "ž") {
                var oggVar = ("../audio/zz.mp3");
            } else { var oggVar = ("../audio/" + randomslovo + ".mp3"); }

            var audioElement = $('#izgovor')[0];
            audioElement.setAttribute('src', oggVar);
            audioElement.play();
            if (nalog == 0) {
                moze = 1;
                if(iskljuci_v==1){return}
                else{
                ProgressCountdown(tajming, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => odgovor());}
                nalog = 1
            }
        }
    })
    $('body').on("keyup", function() {

        if ($('.oznaceno').length > 0) {
            submitBtn.click()
        }
    })


    var playing = false;

    $('#izgovor').on('playing', function() {
        playing = true;
        $('.zvuk').attr("src", "slike/n_zvuk.png")
    });
    $('#izgovor').on('ended', function() {
        playing = false;
        $('.zvuk').attr("src", "slike/zvuk.png")
    });



    function odgovor() {
        moze = 0;
        nalog = 0;
        vrijeme = parseInt($("#pageBeginCountdownText").text())
        brojka = 0
        netocno = 0
        prekidac = 0;
        var ide = 0
            // Disable ability to select an answer
        answerDiv.off('click');
        if (questionCounter != pitanja.length - 1) {
            ide = 1
        } else {
            ide = 0
        }
        clearInterval(countdownTimer);


        if (document.getElementById("pageBeginCountdown").value == "0") {
            $(".rijec").find("span").removeClass("oznaceno")
            $(".tocno").css({ "color": "#388E3C" })
            bodovi -= 10;
            $("#zvono")[0].play();
            swal({
                title: "Vrijeme je isteklo.",
                html: "<p class='dodatak'><strong>Točan odgovor je: <span class='nastavak'>" + $(".rijec").html() + "</span><img src='slike/vrijeme.png'class='slikica2'/>",
                showCloseButton: true,
                confirmButtonText: ' dalje',
                backdrop: false,
                allowOutsideClick: false,
                allowEscapeKey: false,
            })

            $(".swal2-confirm").unbind("click").click(function() {
                $(".nastavak").empty()
                clearInterval(countdownTimer)
                nastavi()

            })
            $(".swal2-close").unbind("click").click(function() {
                $(".nastavak").empty()

                clearInterval(countdownTimer)
                nastavi()

            })
        } else {
            var testimonialElements = $(".oznaceno");
            for (var i = 0; i < testimonialElements.length; i++) {
                var element = testimonialElements.eq(i);
                //do something with element
                if (element.text().toLowerCase() == randomslovo) {
                    brojka++
                } else {
                    netocno = 1;
                    break
                }
            }

            if (netocno != 1 && $(".tocno").length == brojka) {
                correctAnswersCounter++;
                bodovi += 10;
                bodovi += vrijeme
                broj = 10 + vrijeme

                $("#tocno")[0].play();
                swal({
                    title: "<h2>Točno!<h2> <h2 dir='ltr'>صحيح</h2>",
                    html: "<p  class='dodatak'><span class='povrt'>+ <span class='tocno_bod'>" + broj + "</span></span></p><br><img src='slike/tocno.png' class='slikica2'/>",
                    showCloseButton: true,
                    confirmButtonText: ' dalje',
                    backdrop: false,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                });

                $(".swal2-confirm").unbind("click").click(function() {
                    $(".nastavak").empty()

                    clearInterval(countdownTimer)
                    $(".swal2-modal").removeClass("swal-fix")
                    nastavi()

                })
                $(".swal2-close").unbind("click").click(function() {
                    $(".nastavak").empty()

                    clearInterval(countdownTimer)
                    $(".swal2-modal").removeClass("swal-fix")

                    nastavi()


                })


                submitBtn.hide(300);
                continueBtn.show(300);
            } else {
                if (netocno == 1) {
                    bodovi -= 10;
                    $("#pogresno")[0].play();
                    $(".rijec").find("span").removeClass("oznaceno")
                    $(".tocno").css({ "color": "#388E3C" })

                    swal({
                        title: "<h2>Netočno!<h2><h2 dir='rtl'>خطأ</h2>",
                        html: "<p class='dodatak'><strong>Točan odgovor je: <span class='nastavak'>" + $(".rijec").html() + "</span></strong><br></p><br><img src='slike/krivo.png' class='slikica2'/>",
                        showCloseButton: true,
                        confirmButtonText: ' dalje',
                        backdrop: false,
                        allowOutsideClick: false,
                        allowEscapeKey: false,

                    });


                    $(".swal2-confirm").unbind("click").click(function() {
                        $(".nastavak").empty()

                        clearInterval(countdownTimer)
                        nastavi()


                    })
                    $(".swal2-close").unbind("click").click(function() {
                        $(".nastavak").empty()

                        clearInterval(countdownTimer)
                        nastavi()


                    })
                    netocno = 0
                    brojka = 0
                } else {
                    $(".rijec").find("span").removeClass("oznaceno")
                    $("#pogresno")[0].play();

                    $(".tocno").css({ "color": "#388E3C" })
                    swal({
                        title: "<h2>Niste označili sve odgovore!</h2><h2 dir='rtl'>لم تحدد جميع الإجابات</h2>",
                        html: "<p class='dodatak'><strong>Točan odgovor je: <span class='nastavak'>" + $(".rijec").html() + "</span></strong><br></p><br><img src='slike/krivo.png' class='slikica2'/>",
                        showCloseButton: true,
                        confirmButtonText: ' dalje',
                        backdrop: false,
                        allowOutsideClick: false,
                        allowEscapeKey: false,

                    });


                    $(".swal2-confirm").unbind("click").click(function() {
                        $(".nastavak").empty()
                        clearInterval(countdownTimer)
                        nastavi()


                    })
                    $(".swal2-close").unbind("click").click(function() {
                        $(".nastavak").empty()

                        clearInterval(countdownTimer)
                        nastavi()


                    })
                    netocno = 0
                    brojka = 0
                }
            }

        } // Clicking on the submit button:
    }

    submitBtn.on('click', function() {
        odgovor();
    });


    function nastavi() {
        // Increment question number until there are no more questions, then advance to the next page
        $(".mrzim").hide()
        if (questionCounter < pitanja.length - 1) {
            questionCounter++;
        } else {
            questionsPage.hide();
            resultsPage.show(300);
            // Display user score as a percentage
            postotak = Math.floor((correctAnswersCounter / pitanja.length) * 100)
            userScore.text(postotak + " %");
            prikazBodova.text(bodovi);

            $("#60656686").attr("value", bodovi)

            if (postotak >= 90) {
                ocjena = 5
            } else if (postotak >= 80) {
                ocjena = 4
            } else if (postotak >= 70) {
                ocjena = 3
            } else if (postotak >= 60) {
                ocjena = 2
            } else {
                ocjena = 1
            }
            $("#1487903547").attr("value", ocjena)

        }

        // Load the next question and set of answers
        generateQuestionAndAnswers();

        // Store the correct answer in a variable
        getCorrectAnswer();

        // Remove all selections, highlighting, and feedback
        deselectAnswer();
        clearHighlightsAndFeedback();


        // Hide the continue button
        continueBtn.hide(300);

        // Enable ability to select an answer
        answerDiv.on('click', function() {
            // Make the submit button visible
            submitBtn.show(300);
            // Remove pointer from any answer that already has it
            deselectAnswer();
            // Put pointer on clicked answer
            selectAnswer(this);
            // Store current answer div for highlighting purposes
            getSelectedAnswerDivs(this);
            // Store current selection as user answer
            getUserAnswer(this);
        });

    }

    // Clicking on the continue button:
    continueBtn.on('click', function() {

    });

    $(".questions-page__answer-div").dblclick(function() {
            odgovor()
        })
        /* --- PAGE 3/3 --- */

    // Clicking on the retake button:
    retakeBtn.on('click', function() {
        // Go to the first page
        // Start the quiz over
        newQuiz();
        resultsPage.hide();
        questionsPage.show(300);
        // Load question and answers
        generateQuestionAndAnswers();
        // Store the correct answer in a variable
        getCorrectAnswer();
        // Hide the submit and continue buttons
        submitBtn.hide();
        continueBtn.hide();
    });

    // Clicking on the spanish button:
    p1 = [{
            vrijeme: "pitanja",
            pitanja: ["m a m a", "t a t a", "k a v a", "m a č k a", "b a k a"],
            slika: ["mama.png", "tata.png", "kava.png", "macka.jpg", "baka.png"],
            boja_pozadine: "#FCE4EC",
            time: 20,
        },
        {
            vrijeme: "pitanja",
            pitanja: ["E n g l e s k a", "e k r a n", "E u r o p a", "k r e m a", "j e l e n"],
            slika: ["engleska.jpg", "ekran.png", "europa.png", "krema.jpg", "jelen.jpg"],
            boja_pozadine: "#FCE4EC",
            time: 20,
        },
        {
            vrijeme: "pitanja",
            pitanja: ["v i l i c a", "k i k i r i k i", "s i r", "S i r i j a", "m i š"],
            slika: ["vilica.png", "kikiriki.png", "sir.png", "sirija.png", "mis.png"],
            boja_pozadine: "#FCE4EC",
            time: 20,
        }, {
            vrijeme: "pitanja",
            pitanja: ["o k o", "n o s", "o b i t e lj", "n o g a", "o b l a k"],
            slika: ["oko.png", "nos.png", "obitelj.png", "noga.png", "oblak.png"],
            boja_pozadine: "#FCE4EC",
            time: 20,
        }, {
            vrijeme: "pitanja",
            pitanja: ["u h o", "u s t a", "š u m a", "r u k a", "m u h a"],
            slika: ["uho.png", "usta.png", "suma.png", "ruka.png", "muha.png"],
            boja_pozadine: "#FCE4EC",
            time: 20,
        }, {
            vrijeme: "pitanja",
            pitanja: ["k o k o š", "o b l a k", "m r k v a", "D a m a s k"],
            slika: ["kokos.png", "oblak.png", "mrkva.png", "Damask.png"],
            boja_pozadine: "#FCE4EC",
            time: 20,
        }, {
            vrijeme: "pitanja",
            pitanja: ["g l a v a", "g o l u b", "g r a d", "i g r a", "Z a g r e b"],
            slika: ["glava.png", "golub.png", "grad.png", "igra.png", "zagreb.jpg"],
            boja_pozadine: "#FCE4EC",
            time: 20,
        }, {
            vrijeme: "pitanja",
            pitanja: ["h v a l a", "k r u h", "g r a h", "H r v a t s k a", "T e h e r a n"],
            slika: ["hvala.png", "kruh.png", "grah.png", "hrvatska.gif", "Teheran.jpg"],
            boja_pozadine: "#FCE4EC",
            time: 20,
        }, {
            vrijeme: "pitanja",
            pitanja: ["t a t a", "b r a t", "m o s t", "t r b u h", "t r g o v i n a"],
            slika: ["tata.png", "brat.png", "most.png", "trbuh.png", "trgovina.jpg"],
            boja_pozadine: "#FCE4EC",
            time: 20,
        }, {
            vrijeme: "pitanja",
            pitanja: ["d j e d", "v o d a", "d u g a", "d r v o", "b r o d"],
            slika: ["djed.png", "voda.png", "duga.png", "drvo.png", "brod.jpg"],
            boja_pozadine: "#FCE4EC",
            time: 20,
        }, {
            vrijeme: "pitanja",
            pitanja: ["l a k", "l u b e n i c a", "l u l a", "s t o l i c a", "s t o l"],
            slika: ["lak.png", "lubenica.png", "lula.png", "stolica.png", "stol.png"],
            boja_pozadine: "#FCE4EC",
            time: 20,
        }, {
            vrijeme: "pitanja",
            pitanja: ["j a j e", "j a j a", "j a b u k a", "S i r i j a", "n o j"],
            slika: ["jaje.png", "jaja.png", "jabuka.png", "sirija.png", "noj.png"],
            boja_pozadine: "#FCE4EC",
            time: 20,
        }, {
            vrijeme: "pitanja",
            pitanja: ["lj u lj a č k a", "lj u b a v", "p r i j a t e lj", "p r i j a t e lj i ca", "k r a lj"],
            slika: ["ljuljacka.png", "ljubav.png", "prijatelj.png", "prijateljica.png", "kralj.png"],
            boja_pozadine: "#FCE4EC",
            time: 20,
        }, {
            vrijeme: "pitanja",
            pitanja: ["m a r a m a", "m a j m u n", "m i š", "l i m u n", "n o s"],
            slika: ["marama.png", "majmun.png", "mis.png", "limun.png", "nos.png"],
            boja_pozadine: "#FCE4EC",
            time: 20,
        }, {
            vrijeme: "pitanja",
            pitanja: ["I r a n", "s l o n", "n a r a n č a", "k a m i o n", "nj u š k a"],
            slika: ["iran.png", "slon.png", "naranca.png", "kamion.png", "njuska.png"],
            boja_pozadine: "#FCE4EC",
            time: 20,
        }, {
            vrijeme: "pitanja",
            pitanja: ["k nj i g a", "A nj a", "t a nj u r", "m u nj a", "b r z o"],
            slika: ["knjiga.png", "anja.png", "tanjur.png", "munja.png", "brzo.png"],
            boja_pozadine: "#FCE4EC",
            time: 20,
        }, {
            vrijeme: "pitanja",
            pitanja: ["r i b a", "s o b a", "d o b r o", "p a s", "p o s a o"],
            slika: ["riba.png", "soba.png", "dobro.png", "pas.png", "posao.png"],
            boja_pozadine: "#FCE4EC",
            time: 20,
        }, {
            vrijeme: "pitanja",
            pitanja: ["p u s t i nj a", "S p l i t", "s a p u n", "s u p e r"],
            slika: ["pustinja.png", "split.jpg", "sapun.png", "super.png"],
            boja_pozadine: "#FCE4EC",
            time: 20,
        }, {
            vrijeme: "pitanja",
            pitanja: ["z u b", "g o l u b", "l i j e p", "J o s i p", "s t o p"],
            slika: ["zub.png", "golub.jpg", "lijep.png", "Josip.jpg", "stop.png"],
            boja_pozadine: "#FCE4EC",
            time: 20,
        }, {
            vrijeme: "pitanja",
            pitanja: ["v j e t a r", "v l a k", "t a v a", "m r a v", "F r a n c u s k a"],
            slika: ["vjetar.png", "vlak.jpg", "tava.png", "mrav.png", "Francuska.png"],
            boja_pozadine: "#FCE4EC",
            time: 20,
        }, {
            vrijeme: "pitanja",
            pitanja: ["A f g a n i s t a n", "f r i z u r a", "n a f t a", "š e f", "r u k a"],
            slika: ["afganistan.jpg", "frizura.png", "nafta.png", "sef.png", "ruka.png"],
            boja_pozadine: "#FCE4EC",
            time: 20,
        }, {
            vrijeme: "pitanja",
            pitanja: ["r u č a k", "I r a k", "s t a r", "s e s t r a", "s i n"],
            slika: ["rucak.jpg", "irak.jpg", "star.jpg","sestra.jpg", "sin.jpg"],
            boja_pozadine: "#FCE4EC",
            time: 20,
        }, {
            vrijeme: "pitanja",
            pitanja: ["t e s t", "š e š i r", "š a h", "k i š a", "č a š a"],
            slika: ["test.png", "sesir.png", "sah.jpg", "kisa.png", "casa.png"],
            boja_pozadine: "#FCE4EC",
            time: 20,
        }, {
            vrijeme: "pitanja",
            pitanja: ["z i m a", "j e z i k", "z a r e z", "ž e n a", "ž i r a f a"],
            slika: ["zima.jpg", "jezik.png", "zarez.png", "zena.jpg", "zirafa.jpg"],
            boja_pozadine: "#FCE4EC",
            time: 20,
        }, {
            vrijeme: "pitanja",
            pitanja: ["r i ž a", "k o ž a", "m u ž", "c v i j e t", "c i p e l a"],
            slika: ["riza.jpg", "koza.jpg", "muz.jpg", "cvijet.png", "cipela.png"],
            boja_pozadine: "#FCE4EC",
            time: 20,
        }, {
            vrijeme: "pitanja",
            pitanja: ["b o c a", "k o c k a", "n o v a c", "č a š a", "č i s t"],
            slika: ["boca.png", "koza.png", "novac.jpg", "casa.png", "cist.png"],
            boja_pozadine: "#FCE4EC",
            time: 20,
        }, {
            vrijeme: "pitanja",
            pitanja: ["m a č k a", "d j e č a k", "m a č", "ć e v a p i", "k u ć a"],
            slika: ["macka.png", "djecak.png", "mac.png", "cevapi.png", "kuca.png"],
            boja_pozadine: "#FCE4EC",
            time: 20,
        }, {
            vrijeme: "pitanja",
            pitanja: ["d u ć a n", "M o d r i ć", "R a k i t i ć", "đ a k", "l e đ a"],
            slika: ["ducan.jpg", "modric.jpg", "rakitic.jpg", "dak.png", "leda.png"],
            boja_pozadine: "#FCE4EC",
            time: 20,
        }, {
            vrijeme: "pitanja",
            pitanja: ["p o s u đ e", "s m e đ", "dž e m", "dž a m i j a", "dž e z v a", "b e dž"],
            slika: ["posude.jpg", "smeda.jpg", "dzem.jpg", "dzamija.jpg", "dzezva.jpg", "bedz.png"],
            boja_pozadine: "#FCE4EC",
            time: 20,
        }, {
            vrijeme: "pitanja",
            pitanja: ["p r lj a v", "c r k v a", "g r a š a k", "t o p a o"],
            slika: ["prljav.jpg", "crkva.jpg", "grasak.jpg", "topao.jpg"],
            boja_pozadine: "#FCE4EC",
            time: 20,
        }, {
            vrijeme: "pitanja",
            pitanja: ["d j e v o j č i c a", "Nj e m a č k a", "m a h u n a", "k r u š k a"],
            slika: ["djevojcica.jpg", "njemacka.png", "mahuna.jpg", "krusak.jpg"],
            boja_pozadine: "#FCE4EC",
            time: 20,
        }, {
            vrijeme: "pitanja",
            pitanja: ["l o š e", "s e l o", "v r u ć", "č a j"],
            slika: ["lose.png", "selo.jpg", "vruc.gif", "caj.jpg"],
            boja_pozadine: "#FCE4EC",
            time: 20,
        }, {
            vrijeme: "pitanja",
            pitanja: ["snijeg", "koza", "stan", "ružan"],
            slika: ["snijeg.jpg", "koza_2.jpg", "stan.jpg", "ruzan.jpg"],
            boja_pozadine: "#FCE4EC",
            time: 20,
        }, {
            vrijeme: "pitanja",
            pitanja: ["k r u m p i r", "k u p u s", "l e p t i r", "k u g l a"],
            slika: ["krumpir.png", "kupus.png", "leptir.png", "kugla.jpg"],
            boja_pozadine: "#FCE4EC",
            time: 20,
        }, {
            vrijeme: "pitanja",
            pitanja: ["k r a v a", "p a r f e m", "c i g a r e t a", "l u k"],
            slika: ["krava.png", "parfem.png", "cigareta.png", "luk.png"],
            boja_pozadine: "#FCE4EC",
            time: 20,
        }, {
            vrijeme: "pitanja",
            pitanja: ["k r a s t a v a c", "t r e š nj a", "l o p t a", "k r a lj i c a"],
            slika: ["krastavac.png", "tresnja.jpg", "lopta.png", "kraljica.jpg"],
            boja_pozadine: "#FCE4EC",
            time: 20,
        }, {
            vrijeme: "pitanja",
            pitanja: ["t o r b a", "r i j e k a", "r a j č i c a", "b a d e m"],
            slika: ["torba.png", "rijeka.jpg", "rajcica.png", "badem.png"],
            boja_pozadine: "#FCE4EC",
            time: 20,
        }, {
            vrijeme: "pitanja",
            pitanja: ["j a g o d a", "b a n a n a", "a n a n a s", "b r e s k v a"],
            slika: ["jagoda.png", "banana.png", "ananas.png", "breskva.png"],
            boja_pozadine: "#FCE4EC",
            time: 20,
        }, {
            vrijeme: "pitanja",
            pitanja: ["v e č e r a", "d o r u č a k", "š e f i c a", "k ć e r k a"],
            slika: ["vecera.jpg", "dorucak.png", "sefica.jpg", "kcerka.jpg"],
            boja_pozadine: "#FCE4EC",
            time: 20,
        }, {
            vrijeme: "pitanja",
            pitanja: ["p l a v a", "b i j e l a", "c r n a", "n a r a n č a s t a"],
            slika: ["plava.jpg", "bijela.jpg", "crna.jpg", "narancasta.jpg"],
            boja_pozadine: "#FCE4EC",
            time: 20,
        }, {
            vrijeme: "pitanja",
            pitanja: ["z e l e n a", "ž u t a", "s i v a", "c r v e n a"],
            slika: ["zelena.jpg", "zuta.jpg", "siva.jpg", "crvena.jpg"],
            boja_pozadine: "#FCE4EC",
            time: 20,
        }, {
            vrijeme: "pitanja",
            pitanja: ["r u ž i č a s t a", "lj u b i č a s t a", "k u p a o n i c a", "k u h i nj a"],
            slika: ["ruzicasta.jpg", "ljubicasta.png", "kupaonica.jpg", "kuhinja.jpg"],
            boja_pozadine: "#FCE4EC",
            time: 20,
        }, {
            vrijeme: "pitanja",
            pitanja: ["m l a d", "l o n a c", "š a l i c a", "n o ž"],
            slika: ["mlad.jpg", "lonac.png", "salica.jpg", "noz.jpg"],
            boja_pozadine: "#FCE4EC",
            time: 20,
        }, {
            vrijeme: "pitanja",
            pitanja: ["ž l i c a", "a u t o b u s", "s o k", "p i v o"],
            slika: ["zlica.jpg", "autobus.png", "sok.jpg", "pivo.jpg"],
            boja_pozadine: "#FCE4EC",
            time: 20,
        }, {
            vrijeme: "pitanja",
            pitanja: ["v i n o", "t o č k a", "lj e t o", "p r o lj e ć e", "j e s e n", "n o k a t", ],
            slika: ["vino.jpg", "tocka.png", "ljeto.jpg", "proljece.jpg", "jesen.jpg", "nokat.jpg"],
            boja_pozadine: "#FCE4EC",
            time: 20,
        }
    ]

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

    pitanja = p1
    shuffle(pitanja)
    pitanja = pitanja.slice(0, 20)
});

function touchHandler(event) {
    var touches = event.changedTouches,
        first = touches[0],
        type = "";
    switch (event.type) {
        case "touchstart":
            type = "mousedown";
            break;
        case "touchmove":
            type = "mousemove";
            break;
        case "touchend":
            type = "mouseup";
            break;
        default:
            return;
    }


    // initMouseEvent(type, canBubble, cancelable, view, clickCount, 
    //                screenX, screenY, clientX, clientY, ctrlKey, 
    //                altKey, shiftKey, metaKey, button, relatedTarget);

    var simulatedEvent = document.createEvent("MouseEvent");
    simulatedEvent.initMouseEvent(type, true, true, window, 1,
        first.screenX, first.screenY,
        first.clientX, first.clientY, false,
        false, false, false, 0 /*left*/ , null);

    first.target.dispatchEvent(simulatedEvent);
    event.preventDefault();
}