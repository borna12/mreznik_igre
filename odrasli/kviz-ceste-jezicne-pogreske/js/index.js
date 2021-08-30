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

  $(document).ready(function() {

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
          $(".questions-page__answer-list").show()
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
          $(".vrijeme").html('<progress value="10" max="10" id="pageBeginCountdown"></progress><p><span id="ostalo">ostalo</span> je još <span id="pageBeginCountdownText">10 </span> <span id="sekunde">sekunda</span> za odgovor</p>')
          $("body").css({
              "background-color": quiz[questionCounter].boja_pozadine
          })

          if (prekidac == 1) {
              ProgressCountdown(10, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => odgovor());
          }
          question.html(quiz[questionCounter].question)
          $(".questions-page__question").prepend("<span style='font-size: 1.3rem;'>" + (questionCounter + 1) + "/" + quiz.length + "</span> <br>")

      };

      // Store the correct answer of a given question
      getCorrectAnswer = function() {
          correctAnswer = quiz[questionCounter].correctAnswer;
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

      resultsPage.hide();

      submitBtn.hide();
      continueBtn.hide();


      if (localStorage.getItem("reset") == "da") {
        
        newQuiz();

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
        localStorage.setItem('reset', "ne")
      }


      // Clicking on start button:
      startBtn.on('click', function() {

          newQuiz();

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

          // Remove pointer from any answer that already has it
          deselectAnswer();

          // Put pointer on clicked answer
          selectAnswer(this);

          // Store current selection as user answer
          getUserAnswer(this);

          // Store current answer div for highlighting purposes
          getSelectedAnswerDivs(this);
          odgovor();

      });


      function odgovor() {

        
            $(".questions-page__answer-span").html("")
          vrijeme = parseInt($("#pageBeginCountdownText").text())
          bodovi += vrijeme

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
              $("#krivo")[0].play();

              bodovi -= 10;

              swal({
                  title: "Isteklo je vrijeme.",
                  html: "<p style='text-align:center'><strong>Točan odgovor: <br><br>" + quiz[questionCounter].question + "</strong></p><br>" + quiz[questionCounter].napomena,
                  showCloseButton: true,
                  confirmButtonText: ' dalje',
                  backdrop: false,
                  allowOutsideClick: false,
                  allowEscapeKey: false
              });

              $(".nadopuni").html(quiz[questionCounter].correctAnswer)
              $(".nadopuni").css({
                  "color": "#bb422a",
                  "text-decoration": "underline"
              })
              $(".swal2-confirm").click(function() {
                  clearInterval(countdownTimer)
                  if (ide == 1) {
                      ProgressCountdown(10, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => odgovor());
                  }
              })
              $(".swal2-close").click(function() {
                  clearInterval(countdownTimer)
                  if (ide == 1) {
                      ProgressCountdown(10, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => odgovor());
                  }
              })

          } else {
              // Evaluate if the user got the answer right or wrong
              if (userSelectedAnswer === correctAnswer) {

                  // Increment the total correct answers counter
                  correctAnswersCounter++;
                  bodovi += 10;
                  $("#tocno")[0].play();
                  broj = vrijeme + 10
                  swal({
                      title: "<span style='color:green'>Točno</span>",
                      html: "+ <span class='zeleno'>" + broj + "</span><br>" + quiz[questionCounter].napomena,
                      showCloseButton: true,
                      confirmButtonText: ' dalje',
                      backdrop: false,
                      allowOutsideClick: false,
                      allowEscapeKey: false

                  });

                  $(".swal2-confirm").click(function() {
                      clearInterval(countdownTimer)
                      if (ide == 1) {
                          ProgressCountdown(10, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => odgovor());
                      }


                  })
                  $(".swal2-close").click(function() {
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
                      title: " <span style='color:#bb422a' >Netočno</span>",
                      html: "<p style='text-align:center'><strong>Točan odgovor: <br><br>" + quiz[questionCounter].question + "</strong></p><br>" + quiz[questionCounter].napomena,
                      showCloseButton: true,
                      confirmButtonText: ' dalje',
                      backdrop: false,
                      allowOutsideClick: false,
                      allowEscapeKey: false
                  });

                  $(".swal2-confirm").click(function() {
                      clearInterval(countdownTimer)
                      if (ide == 1) {
                          ProgressCountdown(10, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => odgovor());
                      }
                  })
                  $(".swal2-close").click(function() {
                      clearInterval(countdownTimer)
                      if (ide == 1) {
                          ProgressCountdown(10, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => odgovor());
                      }
                  })
                  $(".nadopuni").html(quiz[questionCounter].correctAnswer)
                  $(".nadopuni").css({
                      "color": "#bb422a",
                      "text-decoration": "underline"
                  })

              }
          }

          // Substitute the submit button for the continue button:
          submitBtn.hide(300);
          nastavi()
      }
      // Clicking on the submit button:





      function nastavi() {
          // Increment question number until there are no more questions, then advance to the next page
          if (questionCounter < quiz.length - 1) {
              questionCounter++;
          } else {
document.getElementsByClassName('questions-page')[0].style.display = "none"

document.getElementsByClassName('sakri')[0].style.display = "block"
                  // Display user score as a percentage
              userScore.text(Math.floor((correctAnswersCounter / quiz.length) * 100) + " %");
              prikazBodova.text(bodovi);

            $("#60656686").attr("value", bodovi)

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
      // Link takes user to Duolingo

  });



  // QUIZ CONTENT ------

  function stvori(tekst, tekst2, tekst3) {
      do {
          predmet = cvijece[Math.floor(Math.random() * cvijece.length)];
      }
      while (predmet == tekst || predmet == tekst2 || predmet == tekst3);
      return predmet
  }

  function stvori2(tekst, tekst2, tekst3) {
      do {
          predmet = cvijece2[Math.floor(Math.random() * cvijece2.length)];
      }
      while (predmet == tekst || predmet == tekst2 || predmet == tekst3);
      return predmet
  }



  p1 = [{
      question: "<span class='nadopuni prvoslovo'>_______</span> bih ići u kino, ali prvo moram dovršiti zadaću.",
      answers: ["htjeo", "htio",""],
      correctAnswer: "htio",
      napomena: "<div class='odg_nap'><p>Kod glagola koji u infinitivu završavaju na <strong><em>-jeti</em></strong> (npr. <strong><em>voljeti</em></strong>) u obliku<u> glagolskoga pridjeva radnog</u> za <u>muški rod jednine</u> <strong><em>je</em></strong> se mijenja u <strong> <em>i</em></strong> ispred nastavka <strong><em>-o</em></strong>: <strong><em>vid-i-o</em></strong> &gt; <strong><em>vidio</em></strong>.</p><br><p>U svim ostalim licima i rodovima zadržava se <strong><em>je</em></strong>: <strong><em>vidjela</em></strong>, <strong><em>vidjelo</em></strong>,<strong><em>vidjeli</em></strong>, <strong><em>vidjele</em></strong>, <strong><em>vidjela</em></strong>.</p></div>",
      boja_pozadine: "#FCE4EC"
  }, {
      question: "Bila je u kazni, pa nije <span class='nadopuni'>_______</span> na rođendan.",
      answers: ["smjela", "smila",""],
      correctAnswer: "smjela",
      napomena: "<div class='odg_nap'><p>Kod glagola koji u infinitivu završavaju na <strong><em>-jeti</em></strong> (npr. <strong><em>voljeti</em></strong>) u obliku<u> glagolskoga pridjeva radnog</u> za <u>muški rod jednine</u> <strong><em>je</em></strong> se mijenja u <strong> <em>i</em></strong> ispred nastavka <strong><em>-o</em></strong>: <strong><em>vid-i-o</em></strong> &gt; <strong><em>vidio</em></strong>.</p><br><p>U svim ostalim licima i rodovima zadržava se <strong><em>je</em></strong>: <strong><em>vidjela</em></strong>, <strong><em>vidjelo</em></strong>,<strong><em>vidjeli</em></strong>, <strong><em>vidjele</em></strong>, <strong><em>vidjela</em></strong>.</p></div>",
      boja_pozadine: "#FCE4EC"
  }];
  shuffle(p1)
  p1=p1.slice(0,1)

  p2 = [{
    question: "Automobil se pokvario i <span class='nadopuni'>_______</span> je na popravak.",
    answers: ["odvežen", "odvezen",""],
    correctAnswer: "odvezen",
    napomena: "<div class='odg_nap'><p>Ako glagol može imati <u>više pridjeva trpnih</u>, prednost se uvijek daje <u>jednomu obliku</u>.</p><ol><li><p>Ako glagolski pridjev može završavati na <em><strong>-n</strong></em> i <em><strong>-t</strong></em>, prednost se daje obliku na <em><strong>-n</strong></em> (DA:<em><strong>iznesen</strong></em>, NE: <em><strong>iznijet</strong></em>).</p></li><li><p> Ako glagolski pridjev može završavati na<em><strong>-sen</strong></em> i <em><strong>-šen</strong></em> ili <em><strong>-zen</strong></em> i <em><strong>-žen</strong></em>, prednost se daje oblicima na <em><strong>-sen</strong></em>,<em><strong>-zen</strong></em> (DA:<em><strong>donesen</strong></em>,<em><strong>izgrizen</strong></em>, NE:<em><strong>donesen</strong></em>, <em><strong>izgrižen</strong></em>).</p></li></ol></div>",
    boja_pozadine: "#FCE4EC"
}, {
    question: "Pronađeni novčanik <span class='nadopuni'>_______</span> je u policijsku postaju.",
    answers: ["odnesen", "odnešen","odnijet",""],
    correctAnswer: "odnesen",
    napomena: "<div class='odg_nap'><p>Ako glagol može imati <u>više pridjeva trpnih</u>, prednost se uvijek daje <u>jednomu obliku</u>.</p><ol><li><p>Ako glagolski pridjev može završavati na <em><strong>-n</strong></em> i <em><strong>-t</strong></em>, prednost se daje obliku na <em><strong>-n</strong></em> (DA:<em><strong>iznesen</strong></em>, NE: <em><strong>iznijet</strong></em>).</p></li><li><p> Ako glagolski pridjev može završavati na<em><strong>-sen</strong></em> i <em><strong>-šen</strong></em> ili <em><strong>-zen</strong></em> i <em><strong>-žen</strong></em>, prednost se daje oblicima na <em><strong>-sen</strong></em>,<em><strong>-zen</strong></em> (DA:<em><strong>donesen</strong></em>,<em><strong>izgrizen</strong></em>, NE:<em><strong>donesen</strong></em>, <em><strong>izgrižen</strong></em>).</p></li></ol></div>",
    boja_pozadine: "#FCE4EC"
}, {
    question: "Marija je <span class='nadopuni'>_______</span> već pet godina.",
    answers: ["udata", "udana",""],
    correctAnswer: "udana",
    napomena: "<div class='odg_nap'><p>Ako glagol može imati <u>više pridjeva trpnih</u>, prednost se uvijek daje <u>jednomu obliku</u>.</p><ol><li><p>Ako glagolski pridjev može završavati na <em><strong>-n</strong></em> i <em><strong>-t</strong></em>, prednost se daje obliku na <em><strong>-n</strong></em> (DA:<em><strong>iznesen</strong></em>, NE: <em><strong>iznijet</strong></em>).</p></li><li><p> Ako glagolski pridjev može završavati na<em><strong>-sen</strong></em> i <em><strong>-šen</strong></em> ili <em><strong>-zen</strong></em> i <em><strong>-žen</strong></em>, prednost se daje oblicima na <em><strong>-sen</strong></em>,<em><strong>-zen</strong></em> (DA:<em><strong>donesen</strong></em>,<em><strong>izgrizen</strong></em>, NE:<em><strong>donesen</strong></em>, <em><strong>izgrižen</strong></em>).</p></li></ol></div>",
    boja_pozadine: "#FCE4EC"
}];

shuffle(p2)
p2=p2.slice(0,1)

p3 = [{
    question: "Kad odrastem, <span class='nadopuni'>_______</span> učitelj.",
    answers: ["biti ću", "bit ću",""],
    correctAnswer: "bit ću",
    napomena: "<div class='odg_nap'><p> Infinitiv glagola <u><strong>gubi</strong></u> završno <em>i</em> u futuru I. kad pomoćni glagol <em>htjeti</em> stoji <u><strong>iza</strong></u> njega: <em>čitat ću</em>.</p><p>Infinitiv glagola <u><strong>zadržava</strong></u> završno <em>i</em> u futuru I. kad pomoćni glagol <em>htjeti</em> stoji <u><strong>ispred</strong></u> njega: <em>ću čitati</em>.</p><p> Infinitiv <u><strong>glagola na -</strong></u> <em><u><strong>ći</strong></u></em> uvijek <u><strong>zadržava</strong></u> završno <em>i</em>: <em>doći ću</em> / <em>ću doć</em></p></div>",
    boja_pozadine: "#FCE4EC"
}, {
    question: "Djeca <span class='nadopuni'>_______</span> cijeli dan u prirodi.",
    answers: ["će provesti", "će provest",""],
    correctAnswer: "će provesti",
    napomena: "<div class='odg_nap'><p>Infinitiv glagola <u><strong>gubi</strong></u> završno <em>i</em> u futuru I. kad pomoćni glagol <em>htjeti</em> stoji <u><strong>iza</strong></u> njega: <em>čitat ću</em>.</p><p> Infinitiv glagola <u><strong>zadržava</strong></u> završno <em>i</em> u futuru I. kad pomoćni glagol <em>htjeti</em> stoji <u><strong>ispred</strong></u> njega: <em>ću čitati</em>.</p><p> Infinitiv <u><strong>glagola na -</strong></u> <em><u><strong>ći</strong></u></em> uvijek <u><strong>zadržava</strong></u> završno <em>i</em>: <em>doći ću</em> / <em>ću doć</em></p></div>",
    boja_pozadine: "#FCE4EC"
}, {
    question: "Kad ozdravi, <span class='nadopuni'>_______</span> u kino s prijateljicama.",
    answers: ["ići će", "ić će",""],
    correctAnswer: "ići će",
    napomena: "<div class='odg_nap'><p>Infinitiv glagola <u><strong>gubi</strong></u> završno <em>i</em> u futuru I. kad pomoćni glagol <em>htjeti</em> stoji <u><strong>iza</strong></u> njega: <em>čitat ću</em>.</p><p> Infinitiv glagola <u><strong>zadržava</strong></u> završno <em>i</em> u futuru I. kad pomoćni glagol <em>htjeti</em> stoji <u><strong>ispred</strong></u> njega: <em>ću čitati</em>.</p><p> Infinitiv <u><strong>glagola na -</strong></u> <em><u><strong>ći</strong></u></em> uvijek <u><strong>zadržava</strong></u> završno <em>i</em>: <em>doći ću</em> / <em>ću doć</em></p></div>",
    boja_pozadine: "#FCE4EC"
}];

shuffle(p3)
p3=p3.slice(0,1)

p4 = [{
    question: "Maja <span class='nadopuni'>_______</span> svako jutro.",
    answers: ["se češljala", "se je češljala", "je češljala"],
    correctAnswer: "se češljala",
    napomena: "<div class='odg_nap'><p>U <u>3. se licu jednine</u> povratnih glagola <u>zanaglasnica </u> <em><u>je</u></em><u> ispušta</u>.</p><p><strong>Pogrešno</strong> je <em>Djevojka </em><em>se je </em><em>smijala.</em>, a <strong>pravilno</strong> je<em> Djevojka </em><em>se </em><em>smijala</em>.</p></div>",
    boja_pozadine: "#FCE4EC"
}, {
    question: "Petar <span class='nadopuni'>_______</span> nakon škole.",
    answers: ["se je odmarao", "se odmarao","je odmarao"],
    correctAnswer: "se odmarao",
    napomena: "<div class='odg_nap'><p>U <u>3. se licu jednine</u> povratnih glagola <u>zanaglasnica </u> <em><u>je</u></em><u> ispušta</u>.</p><p><strong>Pogrešno</strong> je <em>Djevojka </em><em>se je </em><em>smijala.</em>, a <strong>pravilno</strong> je<em> Djevojka </em><em>se </em><em>smijala</em>.</p></div>",
    boja_pozadine: "#FCE4EC"
}, {
    question: "Mama <span class='nadopuni'>_______</span> na posao.",
    answers: ["se žurila", "se je žurila","je žurila"],
    correctAnswer: "se žurila",
    napomena: "<div class='odg_nap'><p>U <u>3. se licu jednine</u> povratnih glagola <u>zanaglasnica </u> <em><u>je</u></em><u> ispušta</u>.</p><p><strong>Pogrešno</strong> je <em>Djevojka </em><em>se je </em><em>smijala.</em>, a <strong>pravilno</strong> je<em> Djevojka </em><em>se </em><em>smijala</em>.</p></div>",
    boja_pozadine: "#FCE4EC"
}];

shuffle(p4)
p4=p4.slice(0,1)

p5 = [{
    question: "Rado <span class='nadopuni'>_______</span> te posjetila da ti čestitam rođendan.",
    answers: ["bi", "bih", "biste"],
    correctAnswer: "bih",
    napomena: "<div class='odg_nap'><p>Kondicional I.: često se griješi tako da se oblik <em><strong>bi</strong></em> upotrebljava u svim licima.</p><p> Treba upotrebljavati <u>sve oblike</u> aorista pomoćnoga glagola<em>biti</em>: <em>bih</em>,<em> bi</em>, <em>bi</em>, <em>bismo</em>, <em>biste</em>, <em>bi</em><em>.</em></p>/div>",
    boja_pozadine: "#FCE4EC"
}, {
    question: "Mi <span class='nadopuni'>_______</span> trebali biti zadovoljni rezultatom.",
    answers: ["biste", "bi","bismo"],
    correctAnswer: "bismo",
    napomena: "<div class='odg_nap'><p>Kondicional I.: često se griješi tako da se oblik <em><strong>bi</strong></em> upotrebljava u svim licima.</p><p> Treba upotrebljavati <u>sve oblike</u> aorista pomoćnoga glagola<em>biti</em>: <em>bih</em>,<em> bi</em>, <em>bi</em>, <em>bismo</em>, <em>biste</em>, <em>bi</em><em>.</em></p></div>",
    boja_pozadine: "#FCE4EC"
}, {
    question: "Vi <span class='nadopuni'>_______</span> se trebale požuriti da ne zakasnite na vlak.",
    answers: ["biste", "bih","bi"],
    correctAnswer: "biste",
    napomena: "<div class='odg_nap'><p>Kondicional I.: često se griješi tako da se oblik <em><strong>bi</strong></em> upotrebljava u svim licima.</p><p> Treba upotrebljavati <u>sve oblike</u> aorista pomoćnoga glagola<em>biti</em>: <em>bih</em>,<em> bi</em>, <em>bi</em>, <em>bismo</em>, <em>biste</em>, <em>bi</em><em>.</em></p></div>",
    boja_pozadine: "#FCE4EC"
}];

shuffle(p5)
p5=p5.slice(0,1)

p6 = [{
    question: "Molim te, <span class='nadopuni'>_______</span> mi malo vode!",
    answers: ["nalij", "nali",""],
    correctAnswer: "nali",
    napomena: "<div class='odg_nap'><p>Glagoli <em>dobiti</em>, <em>naliti</em>, <em>piti</em>, <em>popiti</em>, <em>razbiti</em> imaju u 2. licu jednine imperativa nastavak -<em>j</em>, pa ono glasi <em>dobij</em>,<em> nalij</em>,<em> pij</em>,<em> popij</em>, <em> razbij</em>.</p>/div>",
    boja_pozadine: "#FCE4EC"
}, {
    question: "<span class='nadopuni prvoslovo'>_______</span> puno vode!",
    answers: ["Pij", "Pi",""],
    correctAnswer: "Pij",
    napomena: "<div class='odg_nap'><p>Glagoli <em>dobiti</em>, <em>naliti</em>, <em>piti</em>, <em>popiti</em>, <em>razbiti</em> imaju u 2. licu jednine imperativa nastavak -<em>j</em>, pa ono glasi <em>dobij</em>,<em> nalij</em>,<em> pij</em>,<em> popij</em>, <em> razbij</em>.</p></div>",
    boja_pozadine: "#FCE4EC"
}, {
    question: "Sretno s odgovaranjem, <span class='nadopuni'>_______</span> peticu!",
    answers: ["dobij", "dobi",""],
    correctAnswer: "dobij",
    napomena: "<div class='odg_nap'><p>Glagoli <em>dobiti</em>, <em>naliti</em>, <em>piti</em>, <em>popiti</em>, <em>razbiti</em> imaju u 2. licu jednine imperativa nastavak -<em>j</em>, pa ono glasi <em>dobij</em>,<em> nalij</em>,<em> pij</em>,<em> popij</em>, <em> razbij</em>.</p></div>",
    boja_pozadine: "#FCE4EC"
}];

shuffle(p6)
p6=p6.slice(0,1)

p7 = [{
    question: "Ako <span class='nadopuni'>_______</span>, probudi me.",
    answers: ["zaspem", "zaspim",""],
    correctAnswer: "zaspim",
    napomena: "<div class='odg_nap'><p>Glagol ZASPATI u prezentu ima nastavke: <strong>-</strong><em><strong>im</strong></em><strong>, -</strong><em><strong>iš</strong></em><strong>, -</strong><em><strong>i</strong></em><strong>. -</strong><em><strong>imo</strong></em><strong>, -</strong><em><strong>ite</strong></em><strong>, -</strong> <em><strong>u</strong></em><strong>.</strong></p><p> &nbsp; &nbsp; → <em>zaspim</em>, <em>zaspiš</em>, <em>zaspi</em>, <em>zaspimo</em>, <em>zaspite</em>, <em>zaspu</em></p><p> Glagol ZASUTI u prezentu ima nastavke: <strong>-</strong><em><strong>em</strong></em><strong>, -</strong><em><strong>eš</strong></em><strong>, -</strong><em><strong>e</strong></em><strong>, -</strong><em><strong>emo</strong></em><strong>, -</strong><em><strong>ete</strong></em><strong>, -</strong> <em><strong>u</strong></em><strong>.</strong></p><p> &nbsp; &nbsp; → <em>zaspem</em>, <em>zaspeš</em>, <em>zaspe</em>, <em>zaspemo</em>, <em>zaspete</em>, <em>zaspu</em></p>/div>",
    boja_pozadine: "#FCE4EC"
}, {
    question: "Kad dobijem dobru ocjenu, sestra me <span class='nadopuni'>_______</span> pohvalama.",
    answers: ["zaspi", "zaspe",""],
    correctAnswer: "zaspe",
    napomena: "<div class='odg_nap'><p>Glagol ZASPATI u prezentu ima nastavke: <strong>-</strong><em><strong>im</strong></em><strong>, -</strong><em><strong>iš</strong></em><strong>, -</strong><em><strong>i</strong></em><strong>. -</strong><em><strong>imo</strong></em><strong>, -</strong><em><strong>ite</strong></em><strong>, -</strong> <em><strong>u</strong></em><strong>.</strong></p><p> &nbsp; &nbsp; → <em>zaspim</em>, <em>zaspiš</em>, <em>zaspi</em>, <em>zaspimo</em>, <em>zaspite</em>, <em>zaspu</em></p><p> Glagol ZASUTI u prezentu ima nastavke: <strong>-</strong><em><strong>em</strong></em><strong>, -</strong><em><strong>eš</strong></em><strong>, -</strong><em><strong>e</strong></em><strong>, -</strong><em><strong>emo</strong></em><strong>, -</strong><em><strong>ete</strong></em><strong>, -</strong> <em><strong>u</strong></em><strong>.</strong></p><p> &nbsp; &nbsp; → <em>zaspem</em>, <em>zaspeš</em>, <em>zaspe</em>, <em>zaspemo</em>, <em>zaspete</em>, <em>zaspu</em></p></div>",
    boja_pozadine: "#FCE4EC"
}, {
    question: "Što prije <span class='nadopuni'>_______</span>, duže ćete spavati.",
    answers: ["zaspete", "zaspite",""],
    correctAnswer: "zaspite",
    napomena: "<div class='odg_nap'><p>Glagol ZASPATI u prezentu ima nastavke: <strong>-</strong><em><strong>im</strong></em><strong>, -</strong><em><strong>iš</strong></em><strong>, -</strong><em><strong>i</strong></em><strong>. -</strong><em><strong>imo</strong></em><strong>, -</strong><em><strong>ite</strong></em><strong>, -</strong> <em><strong>u</strong></em><strong>.</strong></p><p> &nbsp; &nbsp; → <em>zaspim</em>, <em>zaspiš</em>, <em>zaspi</em>, <em>zaspimo</em>, <em>zaspite</em>, <em>zaspu</em></p><p> Glagol ZASUTI u prezentu ima nastavke: <strong>-</strong><em><strong>em</strong></em><strong>, -</strong><em><strong>eš</strong></em><strong>, -</strong><em><strong>e</strong></em><strong>, -</strong><em><strong>emo</strong></em><strong>, -</strong><em><strong>ete</strong></em><strong>, -</strong> <em><strong>u</strong></em><strong>.</strong></p><p> &nbsp; &nbsp; → <em>zaspem</em>, <em>zaspeš</em>, <em>zaspe</em>, <em>zaspemo</em>, <em>zaspete</em>, <em>zaspu</em></p></div>",
    boja_pozadine: "#FCE4EC"
}];

shuffle(p7)
p7=p7.slice(0,1)

quiz=p1.concat(p2,p3,p4,p5,p6,p7)
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