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
      vrijeme = 0,
      jedna, dvije;

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
      jedno = ["a", "b", "c", "ć", "č", "d", "đ", "dž", "e", "f", , "g", "h", "i", "j", "k", "l", , "lj", "m", "n", "nj", "o", "p", "q", "r", "s", "š", "t", "u", "v", "w", "x", "y", "z", "ž"]
      dvo = ["a", "b", "c", "ć", "č", "d", "đ", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "r", "s", "š", "t", "u", "v", "z", "ž"]
          // QUIZ CONTENT ------

      function stvori(tekst, tekst2, tekst3) {
          do {
              predmet = jedno[Math.floor(Math.random() * jedno.length)];
          }
          while (predmet == tekst || predmet == tekst2 || predmet == tekst3);
          return predmet
      }

      function stvori2(tekst, tekst2, tekst3) {
          do {
              predmet = dvo[Math.floor(Math.random() * dvo.length)];
          }
          while (predmet == tekst || predmet == tekst2 || predmet == tekst3);
          return predmet
      }


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
          if (jedna == 1) {
              $('#bootstrapForm').attr('action', 'https://docs.google.com/forms/d/e/1FAIpQLSdI6MyApiJvA2aUHEubQvzwaMX1dDaD7llOlrraeaYSXF5lJQ/formResponse');

              quiz = [{
                      question: "",
                      answers: ["a", strava = stvori("a"), strava2 = stvori("a", strava), stvori("a", strava, strava2)],
                      correctAnswer: "a",
                      slika: "slike/jedna/a.jpg",
                      opis: "",
                      boja_pozadine: "#FCE4EC"
                  }, {
                      question: "",
                      answers: ["b", strava = stvori("b"), strava2 = stvori("b", strava), stvori("b", strava, strava2)],
                      correctAnswer: "b",
                      slika: "slike/jedna/b.jpg",
                      opis: "",
                      boja_pozadine: "#E8F5E9"
                  }, {
                      question: "",
                      answers: ["c", strava = stvori("c"), strava2 = stvori("c", strava), stvori("c", strava, strava2)],
                      correctAnswer: "c",
                      slika: "slike/jedna/c.jpg",
                      opis: "",
                      boja_pozadine: "#F1F8E9"
                  }, {
                      question: "",
                      answers: ["ć", strava = stvori("ć"), strava2 = stvori("ć", strava), stvori("ć", strava, strava2)],
                      correctAnswer: "ć",
                      slika: "slike/jedna/ccc.jpg",
                      opis: "",
                      boja_pozadine: "#F9FBE7"
                  }, {
                      question: "",
                      answers: ["č", strava = stvori("č"), strava2 = stvori("č", strava), stvori("č", strava, strava2)],
                      correctAnswer: "č",
                      slika: "slike/jedna/cc.jpg",
                      opis: "",
                      boja_pozadine: "#F9FBE7"
                  }, {
                      question: "",
                      answers: ["đ", strava = stvori("đ"), strava2 = stvori("đ", strava), stvori("đ", strava, strava2)],
                      correctAnswer: "đ",
                      slika: "slike/jedna/dd.jpg",
                      opis: "",
                      boja_pozadine: "#F9FBE7"
                  }, {
                      question: "",
                      answers: ["d", strava = stvori("d"), strava2 = stvori("d", strava), stvori("d", strava, strava2)],
                      correctAnswer: "d",
                      slika: "slike/jedna/d.jpg",
                      opis: "",
                      boja_pozadine: "#F9FBE7"
                  }, {
                      question: "",
                      answers: ["dž", strava = stvori("dž"), strava2 = stvori("dž", strava), stvori("dž", strava, strava2)],
                      correctAnswer: "dž",
                      slika: "slike/jedna/dz.jpg",
                      opis: "",
                      boja_pozadine: "#F9FBE7"
                  }, {
                      question: "",
                      answers: ["e", strava = stvori("e"), strava2 = stvori("e", strava), stvori("e", strava, strava2)],
                      correctAnswer: "e",
                      slika: "slike/jedna/e.jpg",
                      opis: "",
                      boja_pozadine: "#F9FBE7"
                  }, {
                      question: "",
                      answers: ["f", strava = stvori("f"), strava2 = stvori("f", strava), stvori("f", strava, strava2)],
                      correctAnswer: "f",
                      slika: "slike/jedna/f.jpg",
                      opis: "",
                      boja_pozadine: "#F9FBE7"
                  }, {
                      question: "",
                      answers: ["g", strava = stvori("g"), strava2 = stvori("g", strava), stvori("g", strava, strava2)],
                      correctAnswer: "g",
                      slika: "slike/jedna/g.jpg",
                      opis: "",
                      boja_pozadine: "#F9FBE7"
                  }, {
                      question: "",
                      answers: ["h", strava = stvori("h"), strava2 = stvori("h", strava), stvori("h", strava, strava2)],
                      correctAnswer: "h",
                      slika: "slike/jedna/h.jpg",
                      opis: "",
                      boja_pozadine: "#F9FBE7"
                  }, {
                      question: "",
                      answers: ["i", strava = stvori("i"), strava2 = stvori("i", strava), stvori("i", strava, strava2)],
                      correctAnswer: "i",
                      slika: "slike/jedna/i.jpg",
                      opis: "",
                      boja_pozadine: "#F9FBE7"
                  }, {
                      question: "",
                      answers: ["j", strava = stvori("j"), strava2 = stvori("j", strava), stvori("j", strava, strava2)],
                      correctAnswer: "j",
                      slika: "slike/jedna/j.jpg",
                      opis: "",
                      boja_pozadine: "#F9FBE7"
                  }, {
                      question: "",
                      answers: ["k", strava = stvori("k"), strava2 = stvori("k", strava), stvori("k", strava, strava2)],
                      correctAnswer: "k",
                      slika: "slike/jedna/k.jpg",
                      opis: "",
                      boja_pozadine: "#F9FBE7"
                  }, {
                      question: "",
                      answers: ["l", strava = stvori("l"), strava2 = stvori("l", strava), stvori("l", strava, strava2)],
                      correctAnswer: "l",
                      slika: "slike/jedna/l.jpg",
                      opis: "",
                      boja_pozadine: "#F9FBE7"
                  }, {
                      question: "",
                      answers: ["lj", strava = stvori("lj"), strava2 = stvori("lj", strava), stvori("lj", strava, strava2)],
                      correctAnswer: "lj",
                      slika: "slike/jedna/lj.jpg",
                      opis: "",
                      boja_pozadine: "#F9FBE7"
                  }, {
                      question: "",
                      answers: ["m", strava = stvori("m"), strava2 = stvori("m", strava), stvori("m", strava, strava2)],
                      correctAnswer: "m",
                      slika: "slike/jedna/m.jpg",
                      opis: "",
                      boja_pozadine: "#F9FBE7"
                  }, {
                      question: "",
                      answers: ["n", strava = stvori("n"), strava2 = stvori("n", strava), stvori("n", strava, strava2)],
                      correctAnswer: "n",
                      slika: "slike/jedna/n.jpg",
                      opis: "",
                      boja_pozadine: "#F9FBE7"
                  }, {
                      question: "",
                      answers: ["nj", strava = stvori("nj"), strava2 = stvori("nj", strava), stvori("nj", strava, strava2)],
                      correctAnswer: "nj",
                      slika: "slike/jedna/nj.jpg",
                      opis: "",
                      boja_pozadine: "#F9FBE7"
                  }, {
                      question: "",
                      answers: ["o", strava = stvori("o"), strava2 = stvori("o", strava), stvori("o", strava, strava2)],
                      correctAnswer: "o",
                      slika: "slike/jedna/o.jpg",
                      opis: "",
                      boja_pozadine: "#F9FBE7"
                  },
                  {
                      question: "",
                      answers: ["q", strava = stvori("q"), strava2 = stvori("q", strava), stvori("q", strava, strava2)],
                      correctAnswer: "q",
                      slika: "slike/jedna/q.jpg",
                      opis: "",
                      boja_pozadine: "#F9FBE7"
                  },

                  {
                      question: "",
                      answers: ["p", strava = stvori("p"), strava2 = stvori("p", strava), stvori("p", strava, strava2)],
                      correctAnswer: "p",
                      slika: "slike/jedna/p.jpg",
                      opis: "",
                      boja_pozadine: "#F9FBE7"
                  }, {
                      question: "",
                      answers: ["r", strava = stvori("r"), strava2 = stvori("r", strava), stvori("r", strava, strava2)],
                      correctAnswer: "r",
                      slika: "slike/jedna/r.jpg",
                      opis: "",
                      boja_pozadine: "#F9FBE7"
                  }, {
                      question: "",
                      answers: ["s", strava = stvori("s"), strava2 = stvori("s", strava), stvori("s", strava, strava2)],
                      correctAnswer: "s",
                      slika: "slike/jedna/s.jpg",
                      opis: "",
                      boja_pozadine: "#F9FBE7"
                  }, {
                      question: "",
                      answers: ["š", strava = stvori("š"), strava2 = stvori("š", strava), stvori("š", strava, strava2)],
                      correctAnswer: "š",
                      slika: "slike/jedna/ss.jpg",
                      opis: "",
                      boja_pozadine: "#F9FBE7"
                  }, {
                      question: "",
                      answers: ["t", strava = stvori("t"), strava2 = stvori("t", strava), stvori("t", strava, strava2)],
                      correctAnswer: "t",
                      slika: "slike/jedna/t.jpg",
                      opis: "",
                      boja_pozadine: "#F9FBE7"
                  }, {
                      question: "",
                      answers: ["u", strava = stvori("u"), strava2 = stvori("u", strava), stvori("u", strava, strava2)],
                      correctAnswer: "u",
                      slika: "slike/jedna/u.jpg",
                      opis: "",
                      boja_pozadine: "#F9FBE7"
                  }, {
                      question: "",
                      answers: ["v", strava = stvori("v"), strava2 = stvori("v", strava), stvori("v", strava, strava2)],
                      correctAnswer: "v",
                      slika: "slike/jedna/v.jpg",
                      opis: "",
                      boja_pozadine: "#F9FBE7"
                  }, {
                      question: "",
                      answers: ["w", strava = stvori("w"), strava2 = stvori("w", strava), stvori("w", strava, strava2)],
                      correctAnswer: "w",
                      slika: "slike/jedna/w.jpg",
                      opis: "",
                      boja_pozadine: "#F9FBE7"
                  }, {
                      question: "",
                      answers: ["z", strava = stvori("z"), strava2 = stvori("z", strava), stvori("z", strava, strava2)],
                      correctAnswer: "z",
                      slika: "slike/jedna/z.jpg",
                      opis: "",
                      boja_pozadine: "#F9FBE7"
                  }, {
                      question: "",
                      answers: ["ž", strava = stvori("ž"), strava2 = stvori("ž", strava), stvori("ž", strava, strava2)],
                      correctAnswer: "ž",
                      slika: "slike/jedna/zz.jpg",
                      opis: "",
                      boja_pozadine: "#F9FBE7"
                  }, {
                      question: "",
                      answers: ["x", strava = stvori("x"), strava2 = stvori("x", strava), stvori("x", strava, strava2)],
                      correctAnswer: "x",
                      slika: "slike/jedna/x.jpg",
                      opis: "",
                      boja_pozadine: "#F9FBE7"
                  },
                  {
                      question: "",
                      answers: ["y", strava = stvori("y"), strava2 = stvori("y", strava), stvori("y", strava, strava2)],
                      correctAnswer: "y",
                      slika: "slike/jedna/y.jpg",
                      opis: "",
                      boja_pozadine: "#F9FBE7"
                  }
              ];
          } else {
              $('#bootstrapForm').attr('action', 'https://docs.google.com/forms/d/e/1FAIpQLSeftdMfVFXsKShk0Ps7j22LW3upNNv90UERjQDSuDbVrjzVvA/formResponse');
              quiz = [{
                      question: "",
                      answers: ["a", strava = stvori2("a"), strava2 = stvori2("a", strava), stvori2("a", strava, strava2)],
                      correctAnswer: "a",
                      slika: "slike/dvije/a.jpg",
                      opis: "",
                      boja_pozadine: "#FCE4EC"
                  }, {
                      question: "",
                      answers: ["b", strava = stvori2("b"), strava2 = stvori2("b", strava), stvori2("b", strava, strava2)],
                      correctAnswer: "b",
                      slika: "slike/dvije/b.jpg",
                      opis: "",
                      boja_pozadine: "#E8F5E9"
                  }, {
                      question: "",
                      answers: ["c", strava = stvori2("c"), strava2 = stvori2("c", strava), stvori2("c", strava, strava2)],
                      correctAnswer: "c",
                      slika: "slike/dvije/c.jpg",
                      opis: "",
                      boja_pozadine: "#F1F8E9"
                  },
                  {
                      question: "",
                      answers: ["ć", strava = stvori2("ć"), strava2 = stvori2("ć", strava), stvori2("ć", strava, strava2)],
                      correctAnswer: "ć",
                      slika: "slike/dvije/ccc.jpg",
                      opis: "",
                      boja_pozadine: "#F9FBE7"
                  },
                  {
                      question: "",
                      answers: ["č", strava = stvori2("č"), strava2 = stvori2("č", strava), stvori2("č", strava, strava2)],
                      correctAnswer: "č",
                      slika: "slike/dvije/cc.jpg",
                      opis: "",
                      boja_pozadine: "#F9FBE7"
                  }, {
                      question: "",
                      answers: ["d", strava = stvori2("d"), strava2 = stvori2("d", strava), stvori2("d", strava, strava2)],
                      correctAnswer: "d",
                      slika: "slike/dvije/d.jpg",
                      opis: "",
                      boja_pozadine: "#F9FBE7"
                  }, {
                      question: "",
                      answers: ["đ", strava = stvori2("đ"), strava2 = stvori2("đ", strava), stvori2("đ", strava, strava2)],
                      correctAnswer: "đ",
                      slika: "slike/dvije/dd.jpg",
                      opis: "",
                      boja_pozadine: "#F9FBE7"
                  }, {
                      question: "",
                      answers: ["e", strava = stvori2("e"), strava2 = stvori2("e", strava), stvori2("e", strava, strava2)],
                      correctAnswer: "e",
                      slika: "slike/dvije/e.jpg",
                      opis: "",
                      boja_pozadine: "#F9FBE7"
                  }, {
                      question: "",
                      answers: ["f", strava = stvori2("f"), strava2 = stvori2("f", strava), stvori2("f", strava, strava2)],
                      correctAnswer: "f",
                      slika: "slike/dvije/f.jpg",
                      opis: "",
                      boja_pozadine: "#F9FBE7"
                  }, {
                      question: "",
                      answers: ["g", strava = stvori2("g"), strava2 = stvori2("g", strava), stvori2("g", strava, strava2)],
                      correctAnswer: "g",
                      slika: "slike/dvije/g.jpg",
                      opis: "",
                      boja_pozadine: "#F9FBE7"
                  }, {
                      question: "",
                      answers: ["h", strava = stvori2("h"), strava2 = stvori2("h", strava), stvori2("h", strava, strava2)],
                      correctAnswer: "h",
                      slika: "slike/dvije/h.jpg",
                      opis: "",
                      boja_pozadine: "#F9FBE7"
                  }, {
                      question: "",
                      answers: ["j", strava = stvori2("j"), strava2 = stvori2("j", strava), stvori2("j", strava, strava2)],
                      correctAnswer: "j",
                      slika: "slike/dvije/j.jpg",
                      opis: "",
                      boja_pozadine: "#F9FBE7"
                  }, {
                      question: "",
                      answers: ["i", strava = stvori2("i"), strava2 = stvori2("i", strava), stvori2("i", strava, strava2)],
                      correctAnswer: "i",
                      slika: "slike/dvije/i.jpg",
                      opis: "",
                      boja_pozadine: "#F9FBE7"
                  }, {
                      question: "",
                      answers: ["k", strava = stvori2("k"), strava2 = stvori2("k", strava), stvori2("k", strava, strava2)],
                      correctAnswer: "k",
                      slika: "slike/dvije/k.jpg",
                      opis: "",
                      boja_pozadine: "#F9FBE7"
                  }, {
                      question: "",
                      answers: ["l", strava = stvori2("l"), strava2 = stvori2("l", strava), stvori2("l", strava, strava2)],
                      correctAnswer: "l",
                      slika: "slike/dvije/l.jpg",
                      opis: "",
                      boja_pozadine: "#F9FBE7"
                  }, {
                      question: "",
                      answers: ["m", strava = stvori2("m"), strava2 = stvori2("m", strava), stvori2("m", strava, strava2)],
                      correctAnswer: "m",
                      slika: "slike/dvije/m.jpg",
                      opis: "",
                      boja_pozadine: "#F9FBE7"
                  }, {
                      question: "",
                      answers: ["n", strava = stvori2("n"), strava2 = stvori2("n", strava), stvori2("n", strava, strava2)],
                      correctAnswer: "n",
                      slika: "slike/dvije/n.jpg",
                      opis: "",
                      boja_pozadine: "#F9FBE7"
                  }, {
                      question: "",
                      answers: ["o", strava = stvori2("o"), strava2 = stvori2("o", strava), stvori2("o", strava, strava2)],
                      correctAnswer: "o",
                      slika: "slike/dvije/o.jpg",
                      opis: "",
                      boja_pozadine: "#F9FBE7"
                  }, {
                      question: "",
                      answers: ["p", strava = stvori2("p"), strava2 = stvori2("p", strava), stvori2("p", strava, strava2)],
                      correctAnswer: "p",
                      slika: "slike/dvije/p.jpg",
                      opis: "",
                      boja_pozadine: "#F9FBE7"
                  }, {
                      question: "",
                      answers: ["r", strava = stvori2("r"), strava2 = stvori2("r", strava), stvori2("r", strava, strava2)],
                      correctAnswer: "r",
                      slika: "slike/dvije/r.jpg",
                      opis: "",
                      boja_pozadine: "#F9FBE7"
                  }, {
                      question: "",
                      answers: ["s", strava = stvori2("s"), strava2 = stvori2("s", strava), stvori2("s", strava, strava2)],
                      correctAnswer: "s",
                      slika: "slike/dvije/s.jpg",
                      opis: "",
                      boja_pozadine: "#F9FBE7"
                  }, {
                      question: "",
                      answers: ["š", strava = stvori2("š"), strava2 = stvori2("š", strava), stvori2("š", strava, strava2)],
                      correctAnswer: "š",
                      slika: "slike/dvije/ss.jpg",
                      opis: "",
                      boja_pozadine: "#F9FBE7"
                  }, {
                      question: "",
                      answers: ["t", strava = stvori2("t"), strava2 = stvori2("t", strava), stvori2("t", strava, strava2)],
                      correctAnswer: "t",
                      slika: "slike/dvije/t.jpg",
                      opis: "",
                      boja_pozadine: "#F9FBE7"
                  }, {
                      question: "",
                      answers: ["u", strava = stvori2("u"), strava2 = stvori2("u", strava), stvori2("u", strava, strava2)],
                      correctAnswer: "u",
                      slika: "slike/dvije/u.jpg",
                      opis: "",
                      boja_pozadine: "#F9FBE7"
                  }, {
                      question: "v",
                      answers: ["v", strava = stvori2("v"), strava2 = stvori2("v", strava), stvori2("v", strava, strava2)],
                      correctAnswer: "v",
                      slika: "slike/dvije/v.jpg",
                      opis: "",
                      boja_pozadine: "#F9FBE7"
                  }, {
                      question: "z",
                      answers: ["z", strava = stvori2("z"), strava2 = stvori2("z", strava), stvori2("z", strava, strava2)],
                      correctAnswer: "z",
                      slika: "slike/dvije/z.jpg",
                      opis: "",
                      boja_pozadine: "#F9FBE7"
                  }, {
                      question: "ž",
                      answers: ["ž", strava = stvori2("ž"), strava2 = stvori2("ž", strava), stvori2("ž", strava, strava2)],
                      correctAnswer: "ž",
                      slika: "slike/dvije/zz.jpg",
                      opis: "",
                      boja_pozadine: "#F9FBE7"
                  }
              ];
          }


          shuffle(quiz)


      };

      // Load the next question and set of answers
      generateQuestionAndAnswers = function() {
          $(".questions-page__answer-list").show()
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
          $(".vrijeme").html('<progress value="10" max="10" id="pageBeginCountdown"></progress><p><span id="ostalo">ostalo</span> je još <span id="pageBeginCountdownText">10 </span> <span id="sekunde">sekunda</span> za odgovor</p>')
          $("body").css({
              "background-color": quiz[questionCounter].boja_pozadine
          })
          if (prekidac == 1) {
              ProgressCountdown(10, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => odgovor());
          }
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


      // Clicking on start button:
       $(".uglata").click(function(e){
jedna=1;dvije=0; 
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
      $(".init-page").css({"z-index":100})
            $(".obla").css({"z-index":100})

       $(".obla").click(function(e){
           jedna=0; dvije=1;
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
                  html: "<p style='text-align:center'><strong>Točan odgovor je <span style='color:#bb422a; font-size:34px' >" + quiz[questionCounter].correctAnswer + "</span></strong>.</p><br><em>" + quiz[questionCounter].opis + "</em><br><br><img src='" + quiz[questionCounter].slika + " 'class='slikica2'/>",
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
              // Evaluate if the user got the answer right or wrong
              if (userSelectedAnswer === correctAnswer) {

                  // Increment the total correct answers counter
                  correctAnswersCounter++;
                  bodovi += 10;
                  $("#tocno")[0].play();
                  broj = vrijeme + 10
                  swal({
                      title: "<span style='color:green'>Točno</span>",
                      html: "+" + broj + "<br><em>" + quiz[questionCounter].opis + "</em><br><br><img src='" + quiz[questionCounter].slika + "'class='slikica2'/>",
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
                      html: "<p style='text-align:center'><strong>Točan odgovor je <span style='color:#bb422a; font-size:34px' >" + quiz[questionCounter].correctAnswer + "</span></strong>.</p><br><em>" + quiz[questionCounter].opis + "</em><br><br><img src='" + quiz[questionCounter].slika + " 'class='slikica2'/>",
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
              $(".results-page").show()

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