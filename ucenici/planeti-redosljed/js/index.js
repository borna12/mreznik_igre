// Init draggable
var planet = '.planet'; // Planet element
var holder = '.planet_holder'; // Holder element
var planets = 8;
var correct = 0;
var sekunde = 0;
var timer = 0;
var naziv_planeta = "";
var sunce=0;
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
      $(this).find('.planet_answer img').addClass('scale');
      $(this).find('.planet_answer').parent().css('border', 'none');
      naziv_planeta = $(this).attr("data-planet")
      $(ui.draggable).next().addClass('answered')
      correct++;
      pauza()
    } else {}
    if (correct == planets) {
      show_modal('winner')
      clearTimeout(timer)
      $('.t').html(time+".")
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
  $(".naslov").text(naziv_planeta)
  $(".slika_planeta").attr("src", "planeti/" + naziv_planeta + ".png");

  if (naziv_planeta == "zemlja") {
    $(".opis").html("Zemlja je unutrašnji planet Sunčeva sustava i treći po udaljenosti od Sunca.")
  } else if (naziv_planeta == "mars") {
    $(".opis").html("Mars je unutrašnji planet Sunčeva sustava i četvrti po udaljenosti od Sunca.")
  } else if (naziv_planeta == "jupiter") {
    $(".opis").html("Jupiter je vanjski planet Sunčeva sustava i peti po udaljenosti od Sunca.")
  } else if (naziv_planeta == "venera") {
    $(".opis").html("Venera je unutrašnji planet Sunčeva sustava i drugi po udaljenosti od Sunca.")
  } else if (naziv_planeta == "uran") {
    $(".opis").html("Uran je vanjski planet Sunčeva sustava i sedmi po udaljenosti od Sunca.")
  } else if (naziv_planeta == "neptun") {
    $(".opis").html("Neptun je vanjski planet Sunčeva sustava i osmi po udaljenosti od Sunca.")
  } else if (naziv_planeta == "pluton") {
    $(".opis").html("Pluton je patuljasti planet koji je do 2006. godine bio klasificiran kao planet.")
  } else if (naziv_planeta == "merkur") {
    $(".opis").html("Merkur je unutrašnji planet Sunčeva sustava i prvi po udaljenosti od Sunca.")
  } else if (naziv_planeta == "saturn") {
    $(".opis").html("Saturn je vanjski planet Sunčeva sustava i šesti po udaljenosti od Sunca.")
  }

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

$('.sunce').click(function () {
  clearInterval(timer);
  show_modal('intro');
  $(".naslov").text("Sunce")
  $(".slika_planeta").attr("src", "planeti/sunce.png");
  $(".opis").html("Sunce je najbliža zvijezda i središnje nebesko tijelo Sunčeva sustava.")
})


var shareUrl = 'https://codepen.io/jcoulterdesign/pen/eJGoOx';

function twShare(url, title, winWidth, winHeight) {
  var winTop = 100;
  var winLeft = 100;
  window.open('https://twitter.com/intent/tweet?text=' + title, 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight);
}


$('body').on('click', '.tw', function () {
  twShare('https://codepen.io/jcoulterdesign/pen/fe65b4a77c18330f405702ce4205824e', 'I just completed the Planet Quiz on @codepen in ' + time + ', can you beat it? https://bit.ly/20zZ7wq %23codepen %23planetQuiz', 520, 350);
});
adresa=window.location.href

$('.fb').click(function () {
  t = time;
  window.open('https://www.facebook.com/sharer/sharer.php?u='+adresa+'&picture='+adresa.replace('index.html', 'og_slika.jpg')+'&description=Poredaj planete točnim redoslijedom', 'targetWindow', 'toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=250');
})

$(function() {
  $('body').on('keypress',function(e) {
      if( e.keyCode === 13  && stanka!=1) {
        $('.intro').click()
        stanka=1
      }
  });
});