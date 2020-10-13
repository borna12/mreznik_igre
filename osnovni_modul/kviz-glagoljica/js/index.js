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
      uglata, obla;

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
      cvijece = ["a", "b", "g", "v", "ć", "č", "d", "đ", "dz", "e", "f", "h", "i", "iže (ï)", "j", "k", "l", "m", "n", "o", "p", "r", "s", "t", "u", "g", "h", "Ō", "c", "š", "jer", "jat", "ju","jor"]
      cvijece2 = ["a", "b", "c", "č", "šta", "d", "đerv", "i","iže", "e", "f", "g", "h", "jat", "ju", "k", "l", "m", "n", "o", "p", "jer", "r", "s", "t", "u","dz","š","v","z","ž","ot","jor"]
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
          if (uglata == 1) {
              quiz = [{
                  question: "",
                  answers: ["a", strava = stvori("a"), strava2 = stvori("a", strava), stvori("a", strava, strava2)],
                  correctAnswer: "a",
                  slika: "slike/uglata/a.png",
                  opis: "",
                  boja_pozadine: "#FCE4EC"
              }, {
                  question: "",
                  answers: ["b", strava = stvori("b"), strava2 = stvori("b", strava), stvori("b", strava, strava2)],
                  correctAnswer: "b",
                  slika: "slike/uglata/b.png",
                  opis: "",
                  boja_pozadine: "#E8F5E9"
              }, {
                  question: "",
                  answers: ["c", strava = stvori("c"), strava2 = stvori("c", strava), stvori("c", strava, strava2)],
                  correctAnswer: "c",
                  slika: "slike/uglata/c.png",
                  opis: "",
                  boja_pozadine: "#F1F8E9"
              }, {
                  question: "",
                  answers: ["ć", strava = stvori("ć"), strava2 = stvori("ć", strava), stvori("ć", strava, strava2)],
                  correctAnswer: "ć",
                  slika: "slike/uglata/cc.png",
                  opis: "",
                  boja_pozadine: "#F9FBE7"
              }, {
                  question: "",
                  answers: ["č", strava = stvori("č"), strava2 = stvori("č", strava), stvori("č", strava, strava2)],
                  correctAnswer: "č",
                  slika: "slike/uglata/ccc.png",
                  opis: "",
                  boja_pozadine: "#F9FBE7"
              }, {
                  question: "",
                  answers: ["đ", strava = stvori("đ"), strava2 = stvori("đ", strava), stvori("đ", strava, strava2)],
                  correctAnswer: "đ",
                  slika: "slike/uglata/dd.png",
                  opis: "",
                  boja_pozadine: "#F9FBE7"
              }, {
                  question: "",
                  answers: ["d", strava = stvori("d"), strava2 = stvori("d", strava), stvori("d", strava, strava2)],
                  correctAnswer: "d",
                  slika: "slike/uglata/d.png",
                  opis: "",
                  boja_pozadine: "#F9FBE7"
              }, {
                  question: "",
                  answers: ["dz", strava = stvori("dz"), strava2 = stvori("dz", strava), stvori("dz", strava, strava2)],
                  correctAnswer: "dz",
                  slika: "slike/uglata/dz.png",
                  opis: "",
                  boja_pozadine: "#F9FBE7"
              }, {
                  question: "",
                  answers: ["e", strava = stvori("e"), strava2 = stvori("e", strava), stvori("e", strava, strava2)],
                  correctAnswer: "e",
                  slika: "slike/uglata/e.png",
                  opis: "",
                  boja_pozadine: "#F9FBE7"
              }, {
                  question: "",
                  answers: ["f", strava = stvori("f"), strava2 = stvori("f", strava), stvori("f", strava, strava2)],
                  correctAnswer: "f",
                  slika: "slike/uglata/f.png",
                  opis: "",
                  boja_pozadine: "#F9FBE7"
              }, {
                  question: "",
                  answers: ["g", strava = stvori("g"), strava2 = stvori("g", strava), stvori("g", strava, strava2)],
                  correctAnswer: "g",
                  slika: "slike/uglata/g.png",
                  opis: "",
                  boja_pozadine: "#F9FBE7"
              }, {
                  question: "",
                  answers: ["h", strava = stvori("h"), strava2 = stvori("h", strava), stvori("h", strava, strava2)],
                  correctAnswer: "h",
                  slika: "slike/uglata/h.png",
                  opis: "",
                  boja_pozadine: "#F9FBE7"
              }, {
                  question: "",
                  answers: ["i", strava = stvori("i"), strava2 = stvori("i", strava), stvori("i", strava, strava2)],
                  correctAnswer: "i",
                  slika: "slike/uglata/i.png",
                  opis: "",
                  boja_pozadine: "#F9FBE7"
              }, {
                  question: "",
                  answers: ["iže (ï)", strava = stvori("iže (ï)"), strava2 = stvori("iže (ï)", strava), stvori("iže (ï)", strava, strava2)],
                  correctAnswer: "iže (ï)",
                  slika: "slike/uglata/ii.png",
                  opis: "",
                  boja_pozadine: "#F9FBE7"
              }, {
                  question: "",
                  answers: ["j", strava = stvori("j"), strava2 = stvori("j", strava), stvori("j", strava, strava2)],
                  correctAnswer: "j",
                  slika: "slike/uglata/j.png",
                  opis: "",
                  boja_pozadine: "#F9FBE7"
              }, {
                  question: "",
                  answers: ["jat", strava = stvori("jat"), strava2 = stvori("jat", strava), stvori("jat", strava, strava2)],
                  correctAnswer: "jat",
                  slika: "slike/uglata/jat.png",
                  opis: "",
                  boja_pozadine: "#F9FBE7"
              }, {
                  question: "",
                  answers: ["jer", strava = stvori("jer"), strava2 = stvori("jer", strava), stvori("jer", strava, strava2)],
                  correctAnswer: "jer",
                  slika: "slike/uglata/jer.png",
                  opis: "",
                  boja_pozadine: "#F9FBE7"
              }, {
                  question: "",
                  answers: ["ju", strava = stvori("ju"), strava2 = stvori("ju", strava), stvori("ju", strava, strava2)],
                  correctAnswer: "ju",
                  slika: "slike/uglata/ju.png",
                  opis: "",
                  boja_pozadine: "#F9FBE7"
              }, {
                  question: "",
                  answers: ["k", strava = stvori("k"), strava2 = stvori("k", strava), stvori("k", strava, strava2)],
                  correctAnswer: "k",
                  slika: "slike/uglata/k.png",
                  opis: "",
                  boja_pozadine: "#F9FBE7"
              }, {
                  question: "",
                  answers: ["l", strava = stvori("l"), strava2 = stvori("l", strava), stvori("l", strava, strava2)],
                  correctAnswer: "l",
                  slika: "slike/uglata/l.png",
                  opis: "",
                  boja_pozadine: "#F9FBE7"
              }, {
                  question: "",
                  answers: ["m", strava = stvori("m"), strava2 = stvori("m", strava), stvori("m", strava, strava2)],
                  correctAnswer: "m",
                  slika: "slike/uglata/m.png",
                  opis: "",
                  boja_pozadine: "#F9FBE7"
              }, {
                  question: "",
                  answers: ["n", strava = stvori("n"), strava2 = stvori("n", strava), stvori("n", strava, strava2)],
                  correctAnswer: "n",
                  slika: "slike/uglata/n.png",
                  opis: "",
                  boja_pozadine: "#F9FBE7"
              }, {
                  question: "",
                  answers: ["o", strava = stvori("o"), strava2 = stvori("o", strava), stvori("o", strava, strava2)],
                  correctAnswer: "o",
                  slika: "slike/uglata/o.png",
                  opis: "",
                  boja_pozadine: "#F9FBE7"
              }, {
                  question: "",
                  answers: ["Ō", strava = stvori("Ō"), strava2 = stvori("Ō", strava), stvori("Ō", strava, strava2)],
                  correctAnswer: "Ō",
                  slika: "slike/uglata/oo.png",
                  opis: "",
                  boja_pozadine: "#F9FBE7"
              }, {
                  question: "",
                  answers: ["p", strava = stvori("p"), strava2 = stvori("p", strava), stvori("p", strava, strava2)],
                  correctAnswer: "p",
                  slika: "slike/uglata/p.png",
                  opis: "",
                  boja_pozadine: "#F9FBE7"
              }, {
                  question: "",
                  answers: ["r", strava = stvori("r"), strava2 = stvori("r", strava), stvori("r", strava, strava2)],
                  correctAnswer: "r",
                  slika: "slike/uglata/r.png",
                  opis: "",
                  boja_pozadine: "#F9FBE7"
              }, {
                  question: "",
                  answers: ["s", strava = stvori("s"), strava2 = stvori("s", strava), stvori("s", strava, strava2)],
                  correctAnswer: "s",
                  slika: "slike/uglata/s.png",
                  opis: "",
                  boja_pozadine: "#F9FBE7"
              }, {
                  question: "",
                  answers: ["š", strava = stvori("š"), strava2 = stvori("š", strava), stvori("š", strava, strava2)],
                  correctAnswer: "š",
                  slika: "slike/uglata/ss.png",
                  opis: "",
                  boja_pozadine: "#F9FBE7"
              }, {
                  question: "",
                  answers: ["t", strava = stvori("t"), strava2 = stvori("t", strava), stvori("t", strava, strava2)],
                  correctAnswer: "t",
                  slika: "slike/uglata/t.png",
                  opis: "",
                  boja_pozadine: "#F9FBE7"
              }, {
                  question: "",
                  answers: ["u", strava = stvori("u"), strava2 = stvori("u", strava), stvori("u", strava, strava2)],
                  correctAnswer: "u",
                  slika: "slike/uglata/u.png",
                  opis: "",
                  boja_pozadine: "#F9FBE7"
              }, {
                  question: "",
                  answers: ["v", strava = stvori("v"), strava2 = stvori("v", strava), stvori("v", strava, strava2)],
                  correctAnswer: "v",
                  slika: "slike/uglata/v.png",
                  opis: "",
                  boja_pozadine: "#F9FBE7"
              }, {
                  question: "",
                  answers: ["z", strava = stvori("z"), strava2 = stvori("z", strava), stvori("z", strava, strava2)],
                  correctAnswer: "z",
                  slika: "slike/uglata/z.png",
                  opis: "",
                  boja_pozadine: "#F9FBE7"
              }, {
                  question: "",
                  answers: ["ž", strava = stvori("ž"), strava2 = stvori("ž", strava), stvori("ž", strava, strava2)],
                  correctAnswer: "ž",
                  slika: "slike/uglata/zz.png",
                  opis: "",
                  boja_pozadine: "#F9FBE7"
              }, {
                question: "",
                answers: ["jor", strava = stvori("jor"), strava2 = stvori("jor", strava), stvori("jor", strava, strava2)],
                correctAnswer: "jor",
                slika: "slike/uglata/jor.png",
                opis: "",
                boja_pozadine: "#F9FBE7"
            }];
          } else {
              quiz = [{
                  question: "",
                  answers: ["a", strava = stvori2("a"), strava2 = stvori2("a", strava), stvori2("a", strava, strava2)],
                  correctAnswer: "a",
                  slika: "slike/obla/a.png",
                  opis: "",
                  boja_pozadine: "#FCE4EC"
              }, {
                  question: "",
                  answers: ["b", strava = stvori2("b"), strava2 = stvori2("b", strava), stvori2("b", strava, strava2)],
                  correctAnswer: "b",
                  slika: "slike/obla/b.png",
                  opis: "",
                  boja_pozadine: "#E8F5E9"
              }, {
                  question: "",
                  answers: ["c", strava = stvori2("c"), strava2 = stvori2("c", strava), stvori2("c", strava, strava2)],
                  correctAnswer: "c",
                  slika: "slike/obla/c.png",
                  opis: "",
                  boja_pozadine: "#F1F8E9"
              }, {
                  question: "",
                  answers: ["č", strava = stvori2("č"), strava2 = stvori2("č", strava), stvori2("č", strava, strava2)],
                  correctAnswer: "č",
                  slika: "slike/obla/cc.png",
                  opis: "",
                  boja_pozadine: "#F9FBE7"
              }, {
                  question: "",
                  answers: ["šta", strava = stvori2("šta"), strava2 = stvori2("šta", strava), stvori2("šta", strava, strava2)],
                  correctAnswer: "šta",
                  slika: "slike/obla/cs.png",
                  opis: "",
                  boja_pozadine: "#F9FBE7"
              }, {
                  question: "",
                  answers: ["đerv", strava = stvori2("đerv"), strava2 = stvori2("đerv", strava), stvori2("đerv", strava, strava2)],
                  correctAnswer: "đerv",
                  slika: "slike/obla/dd.png",
                  opis: "",
                  boja_pozadine: "#F9FBE7"
              }, {
                question: "",
                answers: ["d", strava = stvori2("d"), strava2 = stvori2("d", strava), stvori2("d", strava, strava2)],
                correctAnswer: "d",
                slika: "slike/obla/d.png",
                opis: "",
                boja_pozadine: "#F9FBE7"
            }, {
                question: "",
                answers: ["e", strava = stvori2("e"), strava2 = stvori2("e", strava), stvori2("e", strava, strava2)],
                correctAnswer: "e",
                slika: "slike/obla/e.png",
                opis: "",
                boja_pozadine: "#F9FBE7"
            }, {
                question: "",
                answers: ["f", strava = stvori2("f"), strava2 = stvori2("f", strava), stvori2("f", strava, strava2)],
                correctAnswer: "f",
                slika: "slike/obla/f.png",
                opis: "",
                boja_pozadine: "#F9FBE7"
            }, {
                question: "",
                answers: ["g", strava = stvori2("g"), strava2 = stvori2("g", strava), stvori2("g", strava, strava2)],
                correctAnswer: "g",
                slika: "slike/obla/g.png",
                opis: "",
                boja_pozadine: "#F9FBE7"
            }, {
                question: "",
                answers: ["h", strava = stvori2("h"), strava2 = stvori2("h", strava), stvori2("h", strava, strava2)],
                correctAnswer: "h",
                slika: "slike/obla/h.png",
                opis: "",
                boja_pozadine: "#F9FBE7"
            }, {
                question: "",
                answers: ["i", strava = stvori2("i"), strava2 = stvori2("i", strava), stvori2("i", strava, strava2)],
                correctAnswer: "i",
                slika: "slike/obla/i.png",
                opis: "",
                boja_pozadine: "#F9FBE7"
            }, {
                question: "",
                answers: ["jat", strava = stvori2("jat"), strava2 = stvori2("jat", strava), stvori2("jat", strava, strava2)],
                correctAnswer: "jat",
                slika: "slike/obla/je.png",
                opis: "",
                boja_pozadine: "#F9FBE7"
            }, {
                question: "",
                answers: ["ju", strava = stvori2("ju"), strava2 = stvori2("ju", strava), stvori2("ju", strava, strava2)],
                correctAnswer: "ju",
                slika: "slike/obla/ju.png",
                opis: "",
                boja_pozadine: "#F9FBE7"
            }, {
                question: "",
                answers: ["k", strava = stvori2("k"), strava2 = stvori2("k", strava), stvori2("k", strava, strava2)],
                correctAnswer: "k",
                slika: "slike/obla/k.png",
                opis: "",
                boja_pozadine: "#F9FBE7"
            }, {
                question: "",
                answers: ["l", strava = stvori2("l"), strava2 = stvori2("l", strava), stvori2("l", strava, strava2)],
                correctAnswer: "l",
                slika: "slike/obla/l.png",
                opis: "",
                boja_pozadine: "#F9FBE7"
            }, {
                question: "",
                answers: ["m", strava = stvori2("m"), strava2 = stvori2("m", strava), stvori2("m", strava, strava2)],
                correctAnswer: "m",
                slika: "slike/obla/m.png",
                opis: "",
                boja_pozadine: "#F9FBE7"
            }, {
                question: "",
                answers: ["n", strava = stvori2("n"), strava2 = stvori2("n", strava), stvori2("n", strava, strava2)],
                correctAnswer: "n",
                slika: "slike/obla/n.png",
                opis: "",
                boja_pozadine: "#F9FBE7"
            }, {
                question: "",
                answers: ["o", strava = stvori2("o"), strava2 = stvori2("o", strava), stvori2("o", strava, strava2)],
                correctAnswer: "o",
                slika: "slike/obla/o.png",
                opis: "",
                boja_pozadine: "#F9FBE7"
            }, {
                question: "",
                answers: ["p", strava = stvori2("p"), strava2 = stvori2("p", strava), stvori2("p", strava, strava2)],
                correctAnswer: "p",
                slika: "slike/obla/p.png",
                opis: "",
                boja_pozadine: "#F9FBE7"
            }, {
                question: "",
                answers: ["jer", strava = stvori2("jer"), strava2 = stvori2("jer", strava), stvori2("jer", strava, strava2)],
                correctAnswer: "jer",
                slika: "slike/obla/jer.png",
                opis: "",
                boja_pozadine: "#F9FBE7"
            }, {
                question: "",
                answers: ["r", strava = stvori2("r"), strava2 = stvori2("r", strava), stvori2("r", strava, strava2)],
                correctAnswer: "r",
                slika: "slike/obla/r.png",
                opis: "",
                boja_pozadine: "#F9FBE7"
            }, {
                question: "",
                answers: ["s", strava = stvori2("s"), strava2 = stvori2("s", strava), stvori2("s", strava, strava2)],
                correctAnswer: "s",
                slika: "slike/obla/s.png",
                opis: "",
                boja_pozadine: "#F9FBE7"
            }, {
                question: "",
                answers: ["t", strava = stvori2("t"), strava2 = stvori2("t", strava), stvori2("t", strava, strava2)],
                correctAnswer: "t",
                slika: "slike/obla/t.png",
                opis: "",
                boja_pozadine: "#F9FBE7"
            }, {
                question: "",
                answers: ["u", strava = stvori2("u"), strava2 = stvori2("u", strava), stvori2("u", strava, strava2)],
                correctAnswer: "u",
                slika: "slike/obla/u.png",
                opis: "",
                boja_pozadine: "#F9FBE7"
            }, {
                question: "iže",
                answers: ["iže", strava = stvori2("iže"), strava2 = stvori2("iže", strava), stvori2("iže", strava, strava2)],
                correctAnswer: "iže",
                slika: "slike/obla/ize.png",
                opis: "",
                boja_pozadine: "#F9FBE7"
            }, {
                question: "jor",
                answers: ["jor", strava = stvori2("jor"), strava2 = stvori2("jor", strava), stvori2("jor", strava, strava2)],
                correctAnswer: "jor",
                slika: "slike/obla/jor.png",
                opis: "",
                boja_pozadine: "#F9FBE7"
            }, {
                question: "dz",
                answers: ["dz", strava = stvori2("dz"), strava2 = stvori2("dz", strava), stvori2("dz", strava, strava2)],
                correctAnswer: "dz",
                slika: "slike/obla/dz.png",
                opis: "",
                boja_pozadine: "#F9FBE7"
            }, {
                question: "š",
                answers: ["š", strava = stvori2("š"), strava2 = stvori2("š", strava), stvori2("š", strava, strava2)],
                correctAnswer: "š",
                slika: "slike/obla/ss.png",
                opis: "",
                boja_pozadine: "#F9FBE7"
            }, {
                question: "v",
                answers: ["v", strava = stvori2("v"), strava2 = stvori2("v", strava), stvori2("v", strava, strava2)],
                correctAnswer: "v",
                slika: "slike/obla/v.png",
                opis: "",
                boja_pozadine: "#F9FBE7"
            }, {
                question: "z",
                answers: ["z", strava = stvori2("z"), strava2 = stvori2("z", strava), stvori2("š", strava, strava2)],
                correctAnswer: "z",
                slika: "slike/obla/z.png",
                opis: "",
                boja_pozadine: "#F9FBE7"
            }, {
                question: "ž",
                answers: ["ž", strava = stvori2("ž"), strava2 = stvori2("ž", strava), stvori2("ž", strava, strava2)],
                correctAnswer: "ž",
                slika: "slike/obla/zz.png",
                opis: "",
                boja_pozadine: "#F9FBE7"
            }, {
                question: "ot",
                answers: ["ot", strava = stvori2("ot"), strava2 = stvori2("ot", strava), stvori2("ot", strava, strava2)],
                correctAnswer: "ot",
                slika: "slike/obla/ot.png",
                opis: "",
                boja_pozadine: "#F9FBE7"
            }];
          }


          shuffle(quiz)


      };

      // Load the next question and set of answers
      generateQuestionAndAnswers = function () {
          $(".questions-page__answer-list").show()
          question.html("<span style='font-size: 1.3rem;'>" + (questionCounter + 1) + "/" + quiz.length + ".</span> <br>");
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

      resultsPage.hide();

      submitBtn.hide();
      continueBtn.hide();


      // Clicking on start button:
      startBtn.on('click', function () {

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
                                 allowOutsideClick: false, allowEscapeKey : false
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

                  // Increment the total correct answers counter
                  correctAnswersCounter++;
                  bodovi += 10;
                  $("#tocno")[0].play();
                broj=vrijeme+10
                  swal({
                      title: "<span style='color:green'>Točno</span>",
                      html: "+"+broj+"<br><em>" + quiz[questionCounter].opis + "</em><br><br><img src='" + quiz[questionCounter].slika + "'class='slikica2'/>",
                      showCloseButton: true,
                      confirmButtonText: ' dalje',
                      backdrop: false,
                                     allowOutsideClick: false, allowEscapeKey : false

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
                      title: " <span style='color:#bb422a' >Netočno</span>",
                      html: "<p style='text-align:center'><strong>Točan odgovor je <span style='color:#bb422a; font-size:34px' >" + quiz[questionCounter].correctAnswer + "</span></strong>.</p><br><em>" + quiz[questionCounter].opis + "</em><br><br><img src='" + quiz[questionCounter].slika + " 'class='slikica2'/>",
                      showCloseButton: true,
                      confirmButtonText: ' dalje',
                      backdrop: false,
                                     allowOutsideClick: false, allowEscapeKey : false
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

              $("#input-q2").attr("value", bodovi)

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