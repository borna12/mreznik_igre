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
    pogreske = [],
    randomslovo,
    nalog = 0, spanovi = [],
    rijeci,
    moze = 0,
    akcenti = ["ȁ", "à", "ȃ", "á", "ā", "ȅ", "è", "ȇ", "é", "ē", "ȍ", "ò", "ȏ", "ó", "ō", "ȕ", "ù", "ȗ", "ú", "ū", "ȑ", "r̀", "ȓ", "r̄", "ȉ", "ì", "ȋ", "í", "ī"],
    slova_akcenti = {
        "a": "ȁàȃáā",
        "e": "ȅèȇéē",
        "i": "ȉìȋíī",
        "o": "ȍòȏóō",
        "r": "ȑr̀ȓŕr̄",
        "u": "ȕùȗúū",
    }


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

function removeAccents(string) {
    const accents =
        "ÀÁÂÃÄÅàáȃâãäåāȁßÒÓÔÕÕÖØòóôõöøȏōȍÈÉÊËèéêȇëēȅÇçÐÌÍÎÏìíîïīȋȉÙÚÛÜùúûüūȕȗÑñŠšŸÿýŽžȑȓr̀r̂ŕr̄";
    const accentsOut =
        "AAAAAAaaaaaaaaaBOOOOOOOoooooooooEEEEeeeeeeeCcDIIIIiiiiiiiUUUUuuuuuuuNnSsYyyZzrrrrrr";
    return string
        .split("")
        .map((letter, index) => {
            const accentIndex = accents.indexOf(letter);
            return accentIndex !== -1 ? accentsOut[accentIndex] : letter;
        })
        .join("");
}

function ContainsAny(str, items) {
    for (var i in items) {
        var item = items[i];
        if (str.indexOf(item) > -1) {
            return true;
        }
    }
    return false;
}

$(document).ready(function () {
    var Body = $('body');
    Body.addClass('preloader-site');
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
    setTimeout(
        function () {
            $('.preloader-wrapper').fadeOut();
            $('body').removeClass('preloader-site');
          
            pitanja = p1
            shuffle(pitanja)
            pitanja = pitanja.slice(0, 20)
        }, 1000);


    $('body').on('keydown', function (event) {
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
    $.fn.declasse = function (re) {
        return this.each(function () {
            var c = this.classList
            for (var i = c.length - 1; i >= 0; i--) {
                var classe = "" + c[i]
                if (classe.match(re)) c.remove(classe)
            }
        })
    }
    // Start the quiz
    newQuiz = function () {
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
    Array.prototype.multiIndexOf = function (el) {
        var idxs = [];
        for (var i = this.length - 1; i >= 0; i--) {
            if (this[i] === el) {
                idxs.unshift(i);
            }
        }
        return idxs;
    };
    index = 0;

    // Load the next question and set of answers
    generateQuestionAndAnswers = function () {
        moze = 1
        question.html("<span style='font-size: 1.3rem;'>" + (questionCounter + 1) + "/" + pitanja.length + ".</span> <br>");
        $("#odgovor").val('')
        $(".popuni").show();
        $(".questions-page__answer-list").hide()
        $("#opis").html("<em>" + 20 + "</em>")
        $(".vrijeme").html('<progress value="' + tajming + '" max="' + tajming + '" id="pageBeginCountdown"></progress><p><span id="pageBeginCountdownText">' + tajming + '</span></p>')
        //$("#osnova").text(pitanja[questionCounter].osnova)
        pitanja = pitanja.filter(function (element) {
            return element !== undefined;
        });
        rijec = pitanja[index]

        tocan_odg = rijec
        //slova = rijec.replace(/[\[\]&]+|-/g, '');
        if (rijec.length > 1) {
            rijeci = rijec.split("")
        }
        if (rijeci.includes("̀")) {
            pozicija = rijeci.indexOf("̀")
            rijeci[pozicija - 1] = "r̀"
            rijeci.splice(pozicija, 1)
        }
        else if(rijeci.includes("̄")) {
            pozicija = rijeci.indexOf("̄")
            rijeci[pozicija - 1] = "r̄"
            rijeci.splice(pozicija, 1)
        }
        rijeci = rijeci.filter(n => n);
        html = ""

        for (x = 0; x < rijeci.length; x++) {
            if (ContainsAny(rijeci[x], akcenti)) {
                if (rijeci[x] == "r̀") {
                    rijeci[x] = "r"
                }
                else if (rijeci[x] == "r̄") {
                    rijeci[x] = "r"
                }

                title = slova_akcenti[removeAccents(rijeci[x])].split("")
                if (title.includes("̀")) {
                    pozicija = title.indexOf("̀")
                    title[pozicija - 1] = "r̀"
                    title.splice(pozicija, 1)
                }
                if(title.includes("̄")) {
                    pozicija = title.indexOf("̄")
                    title[pozicija - 1] = "r̄"
                    title.splice(pozicija, 1)
                }
                odabir = ""
                for (y = 0; y < title.length; y++) {
                    odabir += '<a class="zamjena" href="#' + title[y] + '">' + title[y] + '</a>'
                }
                html += "<span class='oznaci tocno tooltip' title='" + odabir + "'>" + removeAccents(rijeci[x]) + "</span>"
            } else {
                html += "<span class='oznaci netocno tooltip' title='nema akcenta'>" + rijeci[x] + "</span>"
            }
        }
        $(window).on('hashchange', function () {
            hash = decodeURIComponent(window.location.hash).substr(1)
            if (window.location.hash.length > 0) { $(".oznaceno").html(hash) }

        });

        $(".rijec").html(html)
        $(".oznaci").on("click", function () {
            $(".oznaci").removeClass("oznaceno");
            if (moze == 1) {
                $(this).toggleClass("oznaceno")
            } else { }
        })

        $.getScript("js/tooltip.js", function (data, textStatus, jqxhr) {
        });

        if (nalog == 0) {
            moze = 1;
            if (iskljuci_v == 1) {
                return
            } else {
                ProgressCountdown(tajming, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => odgovor());
            }
            nalog = 1
        }
    };

    // Store the correct answer of a given question
    getCorrectAnswer = function () {
        correctAnswer = randomslovo;
    };

    // Store the user's selected (clicked) answer
    getUserAnswer = function (target) {
        userSelectedAnswer = $(target).find(answerSpan).text();
    };

    // Add the pointer to the clicked answer
    selectAnswer = function (target) {
        $(target).find(selectionDiv).addClass('ion-chevron-right');
        $(target).addClass("odabir")
    };

    // Remove the pointer from any answer that has it
    deselectAnswer = function () {
        if (selectionDiv.hasClass('ion-chevron-right')) {
            selectionDiv.removeClass('ion-chevron-right');
            selectionDiv.parent().removeClass("odabir")
        }
    };

    // Get the selected answer's div for highlighting purposes
    getSelectedAnswerDivs = function (target) {
        toBeHighlighted = $(target);
        toBeMarked = $(target).find(feedbackDiv);
    };

    // Make the correct answer green and add checkmark
    highlightCorrectAnswerGreen = function (target) {
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
    highlightIncorrectAnswerRed = function () {
        toBeHighlighted.addClass('questions-page--incorrect');
        toBeMarked.addClass('ion-close-round');
    };

    // Clear all highlighting and feedback
    clearHighlightsAndFeedback = function () {
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
    startBtn.on('click', function () {
        pogreske = []
        if ($(this).attr('id') == "bez") {
            iskljuci_v = 1;
            $(".vrijeme").hide()
            $('.jedan').attr('action', 'https://docs.google.com/forms/d/e/1FAIpQLSfSB1EfWvmjhYerFjy8o0EXqAjnZSPaNy8LZKMSqicJGw2Dyg/formResponse');
            r1 = 1
        } else if ($(this).attr('id') == "20") {
            tajming = 20;
            $('.jedan').attr('action', 'https://docs.google.com/forms/d/e/1FAIpQLSfV8gjGvevK-YPxhL5xn1wXI59xsGDH5xQFoAc8XOyc2m1eLA/formResponse');
            r1 = 2
        } 
        // Advance to questions page
        initPage.hide();
        questionsPage.show(300);
        // Load question and answers
        generateQuestionAndAnswers();
        // Store the correct answer in a variable
        getCorrectAnswer();
        // Hide the submit and continue buttons
        continueBtn.hide();
    });

    /* --- PAGE 2/3 --- */

    // Clicking on an answer:
    answerDiv.on('click', function () {
        // Make the submit button visible
        // Remove pointer from any answer that already has it
        deselectAnswer();
        // Put pointer on clicked answer
        selectAnswer(this);
        // Store current selection as user answer
        getUserAnswer(this);
        // Store current answer div for highlighting purposes
        getSelectedAnswerDivs(this);
    });
    moze = 1
    //$(".zvuk").on("click", function () {
    //  if (!playing) {
    // var element = $(this);
    // var elementID = event.target.id;
    /* if (randomslovo == "č") {
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
     audioElement.play();*/

    //}
    //})
    $('body').on("keyup", function () {
        if ($('.oznaceno').length > 0) {
            submitBtn.click()
        }
    })


    var playing = false;

    $('#izgovor').on('playing', function () {
        playing = true;
        $('.zvuk').attr("src", "slike/n_zvuk.png")
    });
    $('#izgovor').on('ended', function () {
        playing = false;
        $('.zvuk').attr("src", "slike/zvuk.png")
    });



    function odgovor() {
        $('.oznaci').each(function () {
            spanovi.push(this.innerHTML);
        });
        odg = spanovi.join("")
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
        if (document.getElementById("pageBeginCountdown").value == "0" && iskljuci_v == 0) {
            pogreske.push(tocan_odg)
            $(".rijec").find("span").removeClass("oznaceno")
            bodovi -= 10;
            $("#zvono")[0].play();
            swal({
                title: "Vrijeme je isteklo.",
                html: "<p class='dodatak'><strong>Točan je odgovor: <span class='nastavak'>" + tocan_odg + "</span><img src='slike/vrijeme.png'class='slikica2'/>",
                showCloseButton: true,
                confirmButtonText: ' dalje',
                backdrop: false,
                allowOutsideClick: false,
                allowEscapeKey: false,
            })
            $(".swal2-confirm").unbind("click").click(function () {
                $(".nastavak").empty()
                clearInterval(countdownTimer)
                nastavi()
            })
            $(".swal2-close").unbind("click").click(function () {
                $(".nastavak").empty()
                clearInterval(countdownTimer)
                nastavi()
            })
        } else {
            spanovi = []
            //nastavi rad
            if (tocan_odg.normalize() == odg.normalize()) {
                if (iskljuci_v == 1) {
                    vrijeme = 0;
                }
                correctAnswersCounter++;
                bodovi += 10;
                bodovi += vrijeme
                broj = 10 + vrijeme
                $("#tocno")[0].play();
                swal({
                    title: "<h2>Točno!<h2>",
                    html: "<p  class='dodatak'><span class='povrt'>+ <span class='tocno_bod'>" + broj + "</span></span></p><br><img src='slike/tocno.png' class='slikica2'/>",
                    showCloseButton: true,
                    confirmButtonText: ' dalje',
                    backdrop: false,
                    allowOutsideClick: false,
                    allowEscapeKey: false
                });
                $(".swal2-confirm").focus();

                $(".swal2-confirm").unbind("click").click(function () {
                    $(".nastavak").empty()
                    clearInterval(countdownTimer)
                    $(".swal2-modal").removeClass("swal-fix")
                    nastavi()
                })
                $(".swal2-close").unbind("click").click(function () {
                    $(".nastavak").empty()
                    clearInterval(countdownTimer)
                    $(".swal2-modal").removeClass("swal-fix")
                    nastavi()
                })
                continueBtn.show(300);
            } else {

                pogreske.push(tocan_odg)
                bodovi -= 10;
                $("#pogresno")[0].play();
                $(".rijec").find("span").removeClass("oznaceno")
                swal({
                    title: "<h2>Netočno!</h2>",
                    html: "<p class='dodatak'><strong>Točan je odgovor: <span class='nastavak'>" + tocan_odg + "</span></strong><br></p><br><img src='slike/krivo.png' class='slikica2'/>",
                    showCloseButton: true,
                    confirmButtonText: ' dalje',
                    backdrop: false,
                    allowOutsideClick: false,
                    allowEscapeKey: false
                });
                $(".swal2-confirm").unbind("click").click(function () {
                    $(".nastavak").empty()
                    clearInterval(countdownTimer)
                    nastavi()
                })
                $(".swal2-close").unbind("click").click(function () {
                    $(".nastavak").empty()
                    clearInterval(countdownTimer)
                    nastavi()
                })
                netocno = 0
                brojka = 0

            }

        } // Clicking on the submit button:
    }

    submitBtn.on('click', function () {
        odgovor();
    });


    function nastavi() {
        index++;
        // Increment question number until there are no more questions, then advance to the next page
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
            if (pogreske.length != 0) {
                $("#pogreske").show()
                $("#491430551").val(pogreske.join("\n"))
                $("#bootstrapFormP").submit();
                $("#bootstrapFormP").remove();
            }
            $("#pogreske").click(function () {
                swal({
                    title: "riječi koje ste pogriješili u igri:",
                    html: "" + pogreske.join(", "),
                    showCloseButton: true,
                    confirmButtonText: ' zatvori ',
                    backdrop: false,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                });
            })
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
        answerDiv.on('click', function () {
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
    continueBtn.on('click', function () {

    });

    $(".questions-page__answer-div").dblclick(function () {
        odgovor()
    })
    /* --- PAGE 3/3 --- */

    // Clicking on the retake button:
    retakeBtn.on('click', function () {
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
        continueBtn.hide();
    });
    // Clicking on the spanish button:
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
        false, false, false, 0 /*left*/, null);

    first.target.dispatchEvent(simulatedEvent);
    event.preventDefault();
}