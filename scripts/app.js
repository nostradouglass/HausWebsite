$(document).ready(function () {

    var browser = navigator.appName;
    var code = navigator.appCodeName;


  if (browser != "Netscape" || code !== "Mozilla") {

  $("#science").mouseover(function () {
    $("#science").effect("bounce", {
      times: 3,
      distance: 15
    }, 1000);
  });

  $("#nature").mouseover(function () {
    $("#nature").effect("bounce", {
      times: 3,
      distance: 15
    }, 1000);
  });

  $("#squareLogo").mouseover(function () {
    $("#squareLogo").effect("bounce", {
      times: 3,
      distance: 15
    }, 1000);
  });


};

  });
