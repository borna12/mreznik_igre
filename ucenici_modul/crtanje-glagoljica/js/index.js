  if (localStorage.getItem("ucitano") == 'undefined' || localStorage.getItem("ucitano") === null) {

  } else {

  }

  swal({
      title: '<strong>Pišem glagoljicom</strong>',

      html: '<a href="http://ihjj.hr/" target="_blank"><img src="slike/logo-ihjj.png" style="display:block; margin:auto; cursor:pointer" class="sivo"></a><p>Odaberi jedno slovo iz donjega izbornika te ga precrtaj koristeći se mišem ili dodirnim zaslonom. Precrtaj slovo prateći pomoćne strelice.</p>',
      focusConfirm: false,
      confirmButtonText: 'KRENI!',
      confirmButtonAriaLabel: 'Thumbs up, great!',
      cancelButtonText: '<i class="fa fa-thumbs-down"></i>',
  })

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


  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');



  var image = new Image();

  if (localStorage.getItem("slovo") == 'undefined' || localStorage.getItem("slovo") === null) {
      localStorage.setItem("oznaka", "a")
      localStorage.setItem("slovo", "a.png")
      sl = localStorage.getItem("slovo")
      oznaka = localStorage.getItem("oznaka")
      image.src = 'slike/' + sl;
      $("#" + oznaka).addClass("mujo")
  } else {
      sl = localStorage.getItem("slovo")
      image.src = 'slike/' + sl;
      oznaka = localStorage.getItem("oznaka")

      $("#" + oznaka).addClass("mujo")
  }


  image.onload = function() {
      var canvasContext = canvas.getContext('2d');
      var wrh = image.width / image.height;
      var newWidth = canvas.width / 2;
      var newHeight = newWidth / wrh;
      if (newHeight > canvas.height) {
          newHeight = canvas.height - 100;
          newWidth = newHeight * wrh;
      }
      var xOffset = newWidth < canvas.width ? ((canvas.width - newWidth) / 2) : 0;
      var yOffset = newHeight < canvas.height ? ((canvas.height - newHeight) / 2) : 0;
      canvasContext.globalAlpha = 0.5;
      canvasContext.drawImage(image, xOffset, yOffset, newWidth, newHeight);

  };



  var background = new Image();
  background.src = "slike/pozadina.jpg";

  // Make sure the image is loaded first otherwise nothing will draw.
  background.onload = function() {
      context.save();
      context.globalAlpha = 0.1
      context.drawImage(background, 0, 0, canvas.width, canvas.height);
      context.restore()
  }

  var radius = 10;
  var dragging = false;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  var CleanBtn = document.getElementById('clear');

  context.lineWidth = radius * 2;

  var putPoint = function(e) {
      if (dragging == true) {
          context.lineCap = 'square';
          context.lineTo(e.clientX, e.clientY);
          context.stroke();
          context.beginPath();
          context.arc(0, 0, radius, 0, 2 * Math.PI / 2 ^ 2 * 5);
          context.fill();
          context.beginPath();
          context.moveTo(e.clientX, e.clientY);
      }
  }

  var engage = function(e) {
      dragging = true;
      putPoint(e);
  }

  var disengage = function() {
      dragging = false;
      context.beginPath();
  }

  var CleanCanvas = function() {

      for (i = 0; i < 8; i++) {
          context.fillStyle = 'white';
          context.fillRect(0, 0, window.innerWidth, window.innerHeight);

      }
      var canvas = document.getElementById('canvas');
      var image = new Image();

      sl = localStorage.getItem("slovo")
      image.src = 'slike/' + sl;

      image.onload = function() {
          var canvasContext = canvas.getContext('2d');
          var wrh = image.width / image.height;
          var newWidth = canvas.width / 2;
          var newHeight = newWidth / wrh;
          if (newHeight > canvas.height) {
              newHeight = canvas.height - 100;
              newWidth = newHeight * wrh;
          }
          var xOffset = newWidth < canvas.width ? ((canvas.width - newWidth) / 2) : 0;
          var yOffset = newHeight < canvas.height ? ((canvas.height - newHeight) / 2) : 0;
          canvasContext.globalAlpha = 0.4;
          canvasContext.drawImage(image, xOffset, yOffset, newWidth, newHeight);

      };
      var background = new Image();
      background.src = "slike/pozadina.jpg";

      // Make sure the image is loaded first otherwise nothing will draw.
      background.onload = function() {

          context.save();
          context.globalAlpha = 0.1
          context.drawImage(background, 0, 0, canvas.width, canvas.height);
          context.restore()
      }

  }

  CleanBtn.addEventListener('click', CleanCanvas);
  canvas.addEventListener('mousedown', engage);
  canvas.addEventListener('mouseout', disengage);
  canvas.addEventListener('mousemove', putPoint);
  canvas.addEventListener('mouseup', disengage);

  var setRadius = function(newRadius) {
      if (newRadius < minRad) {
          newRadius = minRad;
      } else if (newRadius > maxRad) {
          newRadius = maxRad;
      }
      radius = newRadius;
      context.lineWidth = radius * 2;

      radSpan.innerHTML = radius;
  }





      if (jQuery(window).width() > 900) {
        var defaultRad = 20
      } else {
          defaultRad = 10
      }




  var minRad = 0.5,
      maxRad = 100,
      interval = 5,
      radSpan = document.getElementById('radval'),
      decRad = document.getElementById('decrad'),
      incRad = document.getElementById('incrad');
  decRad.addEventListener('click', function() {
      setRadius(radius - interval);
  })

  incRad.addEventListener('click', function() {
      setRadius(radius + interval);
  })

  setRadius(defaultRad);

  var colors = ['black', 'grey', 'white', 'red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

  for (var i = 0, n = colors.length; i < n; i++) {
      var swatch = document.createElement('div');
      swatch.className = "swatch";
      swatch.style.backgroundColor = colors[i];
      swatch.addEventListener('click', setSwatch);
      document.getElementById('colors').appendChild(swatch);
  }

  function setColor(color) {
      context.fillStyle = color;
      context.strokeStyle = color;
      var active = document.getElementsByClassName("active")[0];
      if (active) {
          active.className = "swatch";
      }
  }

  function setSwatch(e) {
      var swatch = e.target;
      setColor(swatch.style.backgroundColor);
      swatch.className += " active";
  }

  setSwatch({
      target: document.getElementsByClassName("swatch")[0]
  });

  document.getElementById('canvas').addEventListener("touchstart", touchHandler, true);
  document.getElementById('canvas').addEventListener("touchmove", touchHandler, true);
  document.getElementById('canvas').addEventListener("touchend", touchHandler, true);
  document.getElementById('canvas').addEventListener("touchcancel", touchHandler, true);

  function slova(e) {
      localStorage.setItem("oznaka", e)
      $("div.scrollmenu a").removeClass("mujo")
      if (e == "a") {
          localStorage.setItem("slovo", e + ".png")
          CleanCanvas();
          $("#" + e).addClass("mujo")

      } else if (e == "b") {
          localStorage.setItem("slovo", e + ".png")
          CleanCanvas();
          $("#" + e).addClass("mujo")
      } else if (e == "b") {
          localStorage.setItem("slovo", e + ".png")
          CleanCanvas();
          $("#" + e).addClass("mujo")
      } else if (e == "c") {
          localStorage.setItem("slovo", e + ".png")
          CleanCanvas();
          $("#" + e).addClass("mujo")
      } else if (e == "č") {
          localStorage.setItem("slovo", "ccc.png")
          CleanCanvas();
          $("#" + e).addClass("mujo")
      } else if (e == "ć") {
          localStorage.setItem("slovo", "cc.png")
          CleanCanvas();
          $("#" + e).addClass("mujo")
      } else if (e == "d") {
          localStorage.setItem("slovo", e + ".png")
          CleanCanvas();
          $("#" + e).addClass("mujo")
      } else if (e == "đ") {
          localStorage.setItem("slovo", "dd.png")
          CleanCanvas();
          $("#" + e).addClass("mujo")
      } else if (e == "dz") {
          localStorage.setItem("slovo", "dz.png")
          CleanCanvas();
          $("#" + e).addClass("mujo")
      } else if (e == "e") {
          localStorage.setItem("slovo", e + ".png")
          CleanCanvas();
          $("#" + e).addClass("mujo")
      } else if (e == "f") {
          localStorage.setItem("slovo", e + ".png")
          CleanCanvas();
          $("#" + e).addClass("mujo")
      } else if (e == "g") {
          localStorage.setItem("slovo", e + ".png")
          CleanCanvas();
          $("#" + e).addClass("mujo")
      } else if (e == "h") {
          localStorage.setItem("slovo", e + ".png")
          CleanCanvas();
          $("#" + e).addClass("mujo")
      } else if (e == "i") {
          localStorage.setItem("slovo", e + ".png")
          CleanCanvas();
          $("#" + e).addClass("mujo")
      } else if (e == "iže") {
          localStorage.setItem("slovo", "ii.png")
          CleanCanvas();
          $("#" + e).addClass("mujo")
      } else if (e == "j") {
          localStorage.setItem("slovo", e + ".png")
          CleanCanvas();
          $("#" + e).addClass("mujo")
      } else if (e == "jat") {
          localStorage.setItem("slovo", e + ".png")
          CleanCanvas();
          $("#" + e).addClass("mujo")
      } else if (e == "jer") {
          localStorage.setItem("slovo", e + ".png")
          CleanCanvas();
          $("#" + e).addClass("mujo")
      } else if (e == "ju") {
          localStorage.setItem("slovo", e + ".png")
          CleanCanvas();
          $("#" + e).addClass("mujo")
      } else if (e == "k") {
          localStorage.setItem("slovo", e + ".png")
          CleanCanvas();
          $("#" + e).addClass("mujo")
      } else if (e == "l") {
          localStorage.setItem("slovo", e + ".png")
          CleanCanvas();
          $("#" + e).addClass("mujo")
      } else if (e == "m") {
          localStorage.setItem("slovo", e + ".png")
          CleanCanvas();
          $("#" + e).addClass("mujo")
      } else if (e == "n") {
          localStorage.setItem("slovo", e + ".png")
          CleanCanvas();
          $("#" + e).addClass("mujo")
      } else if (e == "o") {
          localStorage.setItem("slovo", e + ".png")
          CleanCanvas();
          $("#" + e).addClass("mujo")
      } else if (e == "Ō") {
          localStorage.setItem("slovo", "oo.png")
          CleanCanvas();
          $("#" + e).addClass("mujo")
      } else if (e == "p") {
          localStorage.setItem("slovo", e + ".png")
          CleanCanvas();
          $("#" + e).addClass("mujo")
      } else if (e == "r") {
          localStorage.setItem("slovo", e + ".png")
          CleanCanvas();
          $("#" + e).addClass("mujo")
      } else if (e == "s") {
          localStorage.setItem("slovo", e + ".png")
          CleanCanvas();
          $("#" + e).addClass("mujo")
      } else if (e == "š") {
          localStorage.setItem("slovo", "ss.png")
          CleanCanvas();
          $("#" + e).addClass("mujo")
      } else if (e == "t") {
          localStorage.setItem("slovo", e + ".png")
          CleanCanvas();
          $("#" + e).addClass("mujo")
      } else if (e == "u") {
          localStorage.setItem("slovo", e + ".png")
          CleanCanvas();
          $("#" + e).addClass("mujo")
      } else if (e == "v") {
          localStorage.setItem("slovo", e + ".png")
          CleanCanvas();
          $("#" + e).addClass("mujo")
      } else if (e == "z") {
          localStorage.setItem("slovo", e + ".png")
          CleanCanvas();
          $("#" + e).addClass("mujo")
      } else if (e == "ž") {
          localStorage.setItem("slovo", "zz.png")
          CleanCanvas();
          $("#" + e).addClass("mujo")
      }
  }


  (function($) {
      $(window).on("load", function() {
          $(".mcs-horizontal-example").mCustomScrollbar({
              axis: "x",
              theme: "dark-3"
          });
      });
  })(jQuery);

  $(".mcs-horizontal-example").mCustomScrollbar({
      axis: "x",
      theme: "dark-3",
      advanced: {
          autoExpandHorizontalScroll: true
      }
  });