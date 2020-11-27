// Init draggable
var planet = '.planet'; // Planet element
var holder = '.planet_holder'; // Holder element
var planets = zivotinje.length;
var correct = 0;
var sekunde = 0;
var timer = 0;
var naziv_planeta = ""
var adresa_slike = ""
var naziv = ""
var definicija = ""
var stanka=0;


$(planet).draggable({
  revert: true
})


function RecurringTimer(callback, delay) {
  var timerId, start, remaining = delay;
  this.pause = function () {
    window.clearTimeout(timerId);
    remaining -= new Date() - start;
  };
  var resume = function () {
    start = new Date();
    timerId = window.setTimeout(function () {
      remaining = delay;
      resume();
      callback();
    }, remaining);
  };

  this.resume = resume;
  this.resume();
}


// Init droppable

$(holder).droppable({
  hoverClass: "ui-state-hover",
  drop: function (event, ui) {
    var dropped = $(this).data('planet')
    if ($(ui.draggable).data('planet') == dropped) {
      setTimeout(function () {
        $(ui.draggable).append('<div class="tick"><i class="icon ion-checkmark-round"></i></div>')
      }, 500)
      $(ui.draggable).find('img').css('opacity', '.12')
      naziv_planeta = $(this).attr("data-planet")
      adresa_slike=$(ui.draggable).attr("data-adresa")
      naziv=$(ui.draggable).attr("data-naziv")
      definicija=$(ui.draggable).attr("data-definicija")
      $(this).find('.planet_answer img').attr("src", "slike/" +adresa_slike + ".png");
      $(this).find('.planet_answer img').addClass('scale');
      $(this).find('.planet_answer').parent().css('border', 'none');
      $(this).find('span').css({"display":"none"})
      $(ui.draggable).next().addClass('answered')
      correct++;
      pauza()
    } else {}
    if (correct == planets) {
      show_modal('winner')
      clearTimeout(timer)
      $('.t').html(time)
      $('.timer').hide()
    }
  }
})

function show_modal(modal) {
  $('.' + modal).fadeIn();
  $('.overlay').show();
}

function hide_modal(modal) {
  $('.intro').fadeOut();
  $('.overlay').hide();
}

function start_timer() {
    $(".objasnjenje").hide()
    $(".slika_planeta").show()
  var start = new Date;
  timer = setInterval(function () {
    sekunde += 1
    time = sekunde;
    $('.timer').html(time)
    console.log(time)
  }, 1000);
}

function pauza() {
  stanka=0;
  $("#zvuk")[0].play()
  clearInterval(timer);
  show_modal('intro');
  $(".naslov").text(naziv)
  $(".opis").text(definicija)
  $(".slika_planeta").attr("src", "slike/" + adresa_slike + ".jpg");
}

// Show intro modal
$('.st').click(function () {
  start_timer()
})
$(document).ready(function () {
  show_modal('intro');
})

$('.c_modal').click(function () {
  hide_modal('intro')
  $(".igraj").text("NASTAVI")
})

$('.ta').click(function () {
  hide_modal('intro');
  start_timer();
  correct = 0;
  $(planet).css('opacity', '1')
  $('.planet_answer').hide()
  $('.answered').removeClass('answered')
  $('.planet_holder').css('border', '2px dashed rgba(255, 255, 255, 0.22)')
})



$('body').on('click', '.tw', function () {
  twShare('https://codepen.io/jcoulterdesign/pen/fe65b4a77c18330f405702ce4205824e', 'I just completed the Planet Quiz on @codepen in ' + time + ', can you beat it? https://bit.ly/20zZ7wq %23codepen %23planetQuiz', 520, 350);
});

adresa=window.location.href

$('.fb').click(function () {
  t = time;
  window.open('https://www.facebook.com/sharer/sharer.php?u='+adresa+'&picture='+adresa.replace('index.html', 'og_slika.jpg')+'&description=Igra u kojoj trebate razvrstati životinje na domaće i divlje. O svakoj ćete životinji dobiti informacije nakon što je pravilno razvrstate.', 'targetWindow', 'toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=250');
})


$(function() {
  $('body').on('keypress',function(e) {
      if( e.keyCode === 13  && stanka!=1) {
        $('.intro').click()
        stanka=1
      }
  });
});