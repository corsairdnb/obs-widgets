$(function () {
  var counter = 0
  var start = $("#label").width() * 1.15
  var end = $("#record").width() * 0.96
  var increment = 6
  var variance = 3
  var tracks = [0.1, 0.33, 0.42, 0.56, 0.78, 0.94]

  var $grooves = $("#grooves")

  function random(n) {
    return Math.round(Math.random() * n)
  }

  // Add random grooving
  for (counter = start; counter < end; counter += (increment + random(variance))) {
    $("<div />")
      .addClass("groove round centered")
      .width(counter)
      .height(counter)
      .appendTo($grooves)
  }

  // Add wider grooving for track breaks
  for (var track in tracks) {
    var size = start + ((end - start) * tracks[track])

    $("<div />")
      .addClass("groove round centered trackGroove")
      .width(size)
      .height(size)
      .appendTo($grooves)
  }

})