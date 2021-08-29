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
      toBeMarked,
      userScore,
      // quiz
      quiz,
      questionCounter,
      correctAnswer,
      correctAnswersCounter,
      userSelectedAnswer,
      // function names
      newQuiz,
      generateQuestionAndAnswers,
      getCorrectAnswer,
      getUserAnswer,
      selectAnswer,
      deselectAnswer,
      selectCorrectAnswer,
      deselectCorrectAnswer,
      getSelectedAnswerDivs,
      highlightCorrectAnswerGreen,
      highlightIncorrectAnswerRed,
      slikica,
      clearHighlightsAndFeedback,
      prekidac, countdownTimer, bodovi = 0,
      vrijeme = 0;

  function ProgressCountdown(timeleft, bar, text) {
      return new Promise((resolve, reject) => {
          countdownTimer = setInterval(() => {
              timeleft--;
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

  $(document).ready(function () {

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
      cvijece = ["ciklama", "đurđica", "ivančica", "jaglac", "jorgovan", "kukurijek", "lopoč", "ljiljan", "ljubica", "maćuhica", "magnolija", "maslačak", "ruža", "svib", "sunovrat", "šafran", "šumarica", "tratinčica", "visibaba"]
      // QUIZ CONTENT ------

      function stvori(tekst, tekst2, tekst3) {
          do {
              predmet = cvijece[Math.floor(Math.random() * cvijece.length)];
          }
          while (predmet == tekst || predmet == tekst2 || predmet == tekst3);
          return predmet
      }


     
      quiz = [{
        question: "",
        answers: ["ciklama", strava = stvori("ciklama"), strava2 = stvori("ciklama", strava), stvori("ciklama", strava, strava2)],
        correctAnswer: "ciklama",
        slika: "slike/ciklama.jpg",
        opis: "Ciklama je ljubičasti ili bijeli cvijet istoimene šumske ili ukrasne biljke.",
        boja_pozadine: "#FCE4EC"
    }, {
        question: "",
        answers: ["đurđica", strava = stvori("đurđica"), strava2 = stvori("đurđica", strava), stvori("đurđica", strava, strava2)],
        correctAnswer: "đurđica",
        slika: "slike/durdica.jpg",
        opis: "Đurđica je bijeli mirisni cvijet istoimene šumske i vrtne biljke koji ima oblik zvončića.",
        boja_pozadine: "#E8F5E9"
    }, {
        question: "",
        answers: ["ivančica", strava = stvori("ivančica"), strava2 = stvori("ivančica", strava), stvori("ivančica", strava, strava2)],
        correctAnswer: "ivančica",
        slika: "slike/ivancica.jpg",
        opis: "Ivančica je cvijet istoimene livadne i vrtne biljke koji ima bijele latice i žutu sredinu.",
        boja_pozadine: "#F1F8E9"
    }, {
        question: "",
        answers: ["jaglac", strava = stvori("jaglac"), strava2 = stvori("jaglac", strava), stvori("jaglac", strava, strava2)],
        correctAnswer: "jaglac",
        slika: "slike/jaglac.jpg",
        opis: "Jaglac je žuti cvijet istoimene šumske i livadne biljke koji ima srcolike latice.",
        boja_pozadine: "#F9FBE7"
    }, {
        question: "",
        answers: ["jorgovan", strava = stvori("jorgovan"), strava2 = stvori("jorgovan", strava), stvori("jorgovan", strava, strava2)],
        correctAnswer: "jorgovan",
        slika: "slike/jorgovan.jpg",
        opis: "Jorgovan je plavi, ljubičasti ili bijeli cvijet istoimenoga ukrasnog grma koji raste u cvjetnim grozdovima.",
        boja_pozadine: "#F3E5F5"
    }, {
        question: "",
        answers: ["kukurijek", strava = stvori("kukurijek"), strava2 = stvori("kukurijek", strava), stvori("kukurijek", strava, strava2)],
        correctAnswer: "kukurijek",
        slika: "slike/kukurijek.jpg",
        opis: "Kukurijek je veliki svijetli ružičasti cvijet istoimene otrovne šumske biljke.",
        boja_pozadine: "#F9FBE7"
    }, {
        question: "",
        answers: ["lopoč", strava = stvori("lopoč"), strava2 = stvori("lopoč", strava), stvori("lopoč", strava, strava2)],
        correctAnswer: "lopoč",
        slika: "slike/lopoc.jpg",
        opis: "Lopoč je bijeli cvijet istoimene biljke čiji listovi i cvjetovi plutaju na površini vode.",
        boja_pozadine: "#E0F2F1"
    }, {
        question: "",
        answers: ["ljiljan", strava = stvori("ljiljan"), strava2 = stvori("ljiljan", strava), stvori("ljiljan", strava, strava2)],
        correctAnswer: "ljiljan",
        slika: "slike/ljiljan.jpg",
        opis: "Ljiljan je cvijet istoimene ukrasne biljke koji ima jak miris.",
        boja_pozadine: "#FFFDE7"
    }, {
        question: "",
        answers: ["ljubica", strava = stvori("ljubica"), strava2 = stvori("ljubica", strava), stvori("ljubica", strava, strava2)],
        correctAnswer: "ljubica",
        slika: "slike/ljubica.jpg",
        opis: "Ljubica je mali mirisni ljubičasti, tamnoplavi ili bijeli cvijet istoimene rane proljetne biljke, vjesnika proljeća.",
        boja_pozadine: "#F3E5F5"
    }, {
        question: "",
        answers: ["maćuhica", strava = stvori("maćuhica"), strava2 = stvori("maćuhica", strava), stvori("maćuhica", strava, strava2)],
        correctAnswer: "maćuhica",
        slika: "slike/macuhica.jpg",
        opis: "Maćuhica je cvijet istoimene ukrasne biljke koji može biti različitih boja i nema mirisa.",
        boja_pozadine: "#FFFDE7"
    }, {
        question: "",
        answers: ["magnolija", strava = stvori("magnolija"), strava2 = stvori("magnolija", strava), stvori("magnolija", strava, strava2)],
        correctAnswer: "magnolija",
        slika: "slike/magnolija.jpg",
        opis: "Magnolija je bijeli ili ružičasti cvijet istoimene drvenaste ukrasne biljke koja cvjeta u rano proljeće.",
        boja_pozadine: "#F3E5F5"
    }, {
        question: "",
        answers: ["maslačak", strava = stvori("maslačak"), strava2 = stvori("maslačak", strava), stvori("maslačak", strava, strava2)],
        correctAnswer: "maslačak",
        slika: "slike/maslacak.jpg",
        opis: "Maslačak je žuti cvijet istoimene livadne biljke koji se pretvara u bijelu glavicu.",
        boja_pozadine: "#FFFDE7"
    }, {
        question: "",
        answers: ["ruža", strava = stvori("ruža"), strava2 = stvori("ruža", strava), stvori("ruža", strava, strava2)],
        correctAnswer: "ruža",
        slika: "slike/ruza.jpg",
        opis: "Ruža je raskošni mirisni cvijet istoimene ukrasne vrtne ili divlje šumske biljke koja ima trnje na granama.",
        boja_pozadine: "#FBE9E7"
    }, {
        question: "",
        answers: ["šafran", strava = stvori("safran"), strava2 = stvori("safran", strava), stvori("safran", strava, strava2)],
        correctAnswer: "šafran",
        slika: "slike/safran.jpg",
        opis: "Šafran je bijeli, žuti ili ljubičasti cvijet istoimene rane proljetne biljke, vjesnika proljeća.",
        boja_pozadine: "#F3E5F5"
    }, {
        question: "",
        answers: ["šumarica", strava = stvori("šumarica"), strava2 = stvori("šumarica", strava), stvori("šumarica", strava, strava2)],
        correctAnswer: "šumarica",
        slika: "slike/sumarica.jpg",
        opis: "Šumarica je bijeli, žuti, ljubičasti ili crveni zvjezdasti cvijet istoimene ljekovite biljke.",
        boja_pozadine: "#FFFDE7"
    }, {
        question: "",
        answers: ["sunovrat", strava = stvori("sunovrat"), strava2 = stvori("sunovrat", strava), stvori("sunovrat", strava, strava2)],
        correctAnswer: "sunovrat",
        slika: "slike/sunovrat.jpg",
        opis: "Sunovrat je žuti ili bijeli cvijet istoimene primorske proljetne biljke.",
        boja_pozadine: "#FFF8E1"
    }, {
        question: "",
        answers: ["tratinčica", strava = stvori("tratinčica"), strava2 = stvori("tratinčica", strava), stvori("tratinčica", strava, strava2)],
        correctAnswer: "tratinčica",
        slika: "slike/tratincica.jpg",
        opis: "Tratinčica je sitni bijeli cvijet istoimene livadne biljke.",
        boja_pozadine: "#FFFFFF"
    }, {
        question: "",
        answers: ["visibaba", strava = stvori("visibaba"), strava2 = stvori("visibaba", strava), stvori("visibaba", strava, strava2)],
        correctAnswer: "visibaba",
        slika: "slike/visibaba.jpg",
        opis: "Visibaba je bijeli cvijet u obliku zvončića istoimene rane proljetne biljke, vjesnika proljeća.",
        boja_pozadine: "#F1F8E9"
    }, {
      question: "",
      answers: ["kamilica", strava = stvori("kamilica"), strava2 = stvori("kamilica", strava), stvori("kamilica", strava, strava2)],
      correctAnswer: "kamilica",
      slika: "slike/kamilica.jpg",
      opis: "Kamilica je žuto-bijeli cvijet istoimene ljekovite biljke koji ima ugodan miris.",
      boja_pozadine: "#F9FBE7"
  }];


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

      shuffle(quiz)

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

      // Load the next question and set of answers
      generateQuestionAndAnswers = function () {
          question.html("<span style='font-size: 1.3rem;'>" + (questionCounter + 1) + "/" + quiz.length + "</span> <br>");
          shuffle(quiz[questionCounter].answers);
          answerA.text(quiz[questionCounter].answers[0]);
          if (answerA.html() == "" || null) {
              answerDivA.hide()
          } else {
              answerDivA.show()
          };
          answerB.text(quiz[questionCounter].answers[1]);
          if (answerB.html() == "" || null) {
              answerDivB.hide()
          } else {
              answerDivB.show()
          };
          answerC.text(quiz[questionCounter].answers[2]);
          if (answerC.html() == "" || null) {
              answerDivC.hide()
          } else {
              answerDivC.show()
          };
          answerD.text(quiz[questionCounter].answers[3]);
          if (answerD.html() == "" || null) {
              answerDivD.hide()
          } else {
              answerDivD.show()
          };


          slikica.attr("src", quiz[questionCounter].slika)
          slikica.attr("data-zoom-image", quiz[questionCounter].slika)
          $("#opis").html("<em>" + quiz[questionCounter].opis + "</em>")
          $(".vrijeme").html('<progress value="10" max="10" id="pageBeginCountdown"></progress><p><span id="ostalo">ostalo</span> je još <span id="pageBeginCountdownText">10 </span> <span id="sekunde">sekundi</span> za odgovor</p>')
          $("body").css({
              "background-color": quiz[questionCounter].boja_pozadine
          })
          if (prekidac == 1) {
              ProgressCountdown(10, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => odgovor());
          }
      };

      // Store the correct answer of a given question
      getCorrectAnswer = function () {
          correctAnswer = quiz[questionCounter].correctAnswer;
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
      answerDiv.on('click', function () {

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
          odgovor()

      });


      function odgovor() {

          vrijeme = parseInt($("#pageBeginCountdownText").text())
          bodovi+=vrijeme
          
          prekidac = 0;
          var ide = 0
          // Disable ability to select an answer
          answerDiv.off('click');
          if (questionCounter != quiz.length - 1) {
              ide = 1
          } else {
              ide = 0
          }

          // Make correct answer green and add a checkmark
          highlightCorrectAnswerGreen();
          clearInterval(countdownTimer);


          if (document.getElementById("pageBeginCountdown").value == "0") {
              bodovi -= 10;
              $("#krivo")[0].play();

              swal({
                  title: "Isteklo je vrijeme.",
                  html: "<p style='text-align:center'><strong>Točan odgovor: " + quiz[questionCounter].correctAnswer + "</strong></p><br><em>" + quiz[questionCounter].opis + "</em><br><br><img src='" + quiz[questionCounter].slika + " 'class='slikica2'/>",
                  showCloseButton: true,
                  confirmButtonText: ' dalje',
                  backdrop: false,
                  allowOutsideClick: false
              });
              $(".swal2-confirm").click(function () {
                  clearInterval(countdownTimer)
                  if (ide == 1) {
                      ProgressCountdown(10, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => odgovor());
                  }
              })
              $(".swal2-close").click(function () {
                  clearInterval(countdownTimer)
                  if (ide == 1) {
                      ProgressCountdown(10, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => odgovor());
                  }
              })

          } else {
              // Evaluate if the user got the answer right or wrong
              if (userSelectedAnswer === correctAnswer) {
                $("#tocno")[0].play();

                  // Increment the total correct answers counter
                  correctAnswersCounter++;
                  bodovi += 10;

                  swal({
                      title: "<span style='color:green'>Točno</span>",
                      html: "<em>" + quiz[questionCounter].opis + "</em><br><br><img src='" + quiz[questionCounter].slika + "'class='slikica2'/>",
                      showCloseButton: true,
                      confirmButtonText: ' dalje',
                      backdrop: false,
                      allowOutsideClick: false

                  });

                  $(".swal2-confirm").click(function () {
                      clearInterval(countdownTimer)
                      if (ide == 1) {
                          ProgressCountdown(10, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => odgovor());
                      }
                  })
                  $(".swal2-close").click(function () {
                      clearInterval(countdownTimer)
                      if (ide == 1) {
                          ProgressCountdown(10, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => odgovor());
                      }
                  })


              } else {
                  highlightIncorrectAnswerRed();
                  bodovi -= 10;
                  $("#krivo")[0].play();

                  swal({
                      title: "<span style='color:rgb(235, 73, 71)'>Netočno</span>",
                      html: "<p style='text-align:center'><strong>Točan odgovor: " + quiz[questionCounter].correctAnswer + "</strong></p><br><em>" + quiz[questionCounter].opis + "</em><br><br><img src='" + quiz[questionCounter].slika + " 'class='slikica2'/>",
                      showCloseButton: true,
                      confirmButtonText: ' dalje',
                      backdrop: false,
                      allowOutsideClick: false
                  });

                  $(".swal2-confirm").click(function () {
                      clearInterval(countdownTimer)
                      if (ide == 1) {
                          ProgressCountdown(10, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => odgovor());
                      }
                  })
                  $(".swal2-close").click(function () {
                      clearInterval(countdownTimer)
                      if (ide == 1) {
                          ProgressCountdown(10, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => odgovor());
                      }
                  })
              }
          }

          // Substitute the submit button for the continue button:
          submitBtn.hide(300);
          continueBtn.show(300);
          nastavi()
      }
      // Clicking on the submit button:
      submitBtn.on('click', function () {
          odgovor();
      });




      function nastavi() {
          // Increment question number until there are no more questions, then advance to the next page
          if (questionCounter < quiz.length - 1) {
              questionCounter++;
          } else {
              document.getElementsByClassName('questions-page')[0].style.display = "none"
              document.getElementsByClassName('results-page')[0].style.display = "block"

              // Display user score as a percentage
              userScore.text(Math.floor((correctAnswersCounter / quiz.length) * 100) + " %");
              prikazBodova.text(bodovi);

              $("#input-q2").attr("value",bodovi)

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
              odgovor()
          });

      }

      // Clicking on the continue button:
      continueBtn.on('click', function () {



      });

    
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
          submitBtn.hide();
          continueBtn.hide();
      });

      // Clicking on the spanish button:
      // Link takes user to Duolingo

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