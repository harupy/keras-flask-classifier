
$(function(){

  var getImageSuccess = function(data){
    $("#imageID").attr("src", "/currentimage");

  };

  var getImageFailure = function(data){
    console.log("no image data.  sorry!!!");
  };

  var successResult = function(data){
    $("#prediction").text("Prediction: " + data.pred)
    $("#confidence").text("Confidence: " + data.confidence)
    var req = {
      url: "/currentimage",
      method: "get"
    };

    var promise = $.ajax(req)
    promise.then(getImageSuccess, getImageFailure);
  };
  var failureResult = function(data){
    alert("that didn't work  so good");
  };

  var fileChange = function(evt){
    var fileOb = $("#fileField")[0].files[0];
    var formData = new FormData();
    formData.append("picfile", fileOb);
    var req = {
      url: "/predict",
      method: "post",
      processData: false,
      contentType: false,
      data: formData
    };

    var promise = $.ajax(req);
    promise.then(successResult, failureResult);
  };

  $("#fileField").change(fileChange);
});
