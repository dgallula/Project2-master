function myFunction(x) {
    if (!x.matches) { // If media query matches
        $('#Home').text("Home");
        $('#LiveReports').text("Live Reports");
        $('#About').text("About");
        $("header h1").show();
    }
    else {
        $('#Home').text("H");
        $('#LiveReports').text("LR");
        $('#About').text("A");
        $("header h1").hide();
    }
  }
  
  var x = window.matchMedia("(max-width: 791px)")
  myFunction(x) // Call listener function at run time
  x.addListener(myFunction) // Attach listener function on state changes