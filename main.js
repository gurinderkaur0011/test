Webcam.set({
  width: 320,
  height: 240,
  image_format: "png",
  png_quality: 90,
});
Webcam.attach("#webcam");
function identify() {
  model.classify(
    document.getElementById("result_image"),
    function (error, result) {
      if (error) {
        console.error(error);
      } else {
        console.log(result);
        var ac1 = result[0].confidence * 100;
        ac1 = ac1.toFixed(2) + "%";
        var ac2 = result[1].confidence * 100;
        ac2 = ac2.toFixed(2) + "%";
        var em = [];
        for (i = 0; i < 2; i++) {
          if (result[i].label == "Neutral") {
            em[i] = "&#128528;";
          } else if (result[i].label == "Happy") {
            em[i] = "&#128512;";
          } else if (result[i].label == "Angry") {
            em[i] = "&#128545;";
          } else if (result[i].label == "Sad") {
            em[i] = "&#128532;";
          } else {
            em[i] = "&#128546;";
          }
        }
        var prediction =
          result[0].label +
          "<span class='emoji'>" +
          em[0] +
          "</span>" +
          ", " +
          result[1].label +
          "<span class='emoji'>" +
          em[1] +
          "</span>";
        var accuracy = ac1 + ", " + ac2;
        document.getElementById("prediction").innerHTML = prediction;
        document.getElementById("accuracy").textContent = accuracy;
        var Emotion = [result[0].label, result[1].label];
        var Accuracy = [ac1, ac2];
        speak(Emotion, Accuracy);
      }
    }
  );
}
function speak(Emotion, Accuracy) {
  var speak_data = `The first prediction is ${Emotion[0]}, it's accuracy is ${Accuracy[0]} & the second prediction is ${Emotion[1]}, it's accuracy is ${Accuracy[1]}`;
  var voice = new SpeechSynthesisUtterance(speak_data);
  console.log(voice);
  window.speechSynthesis.speak(voice);
}
console.log(ml5.version);
var model = ml5.imageClassifier(
  "model.json",
  loaded
);
function loaded() {
  console.log("Model is loaded");
}
function capture() {
  Webcam.snap(function (data_uri) {
    document.getElementById("result").innerHTML =
      '<img id="result_image" src="' + data_uri + '"/>';
  });
}
//https://teachablemachine.withgoogle.com/models/KA16eL9uT/ it is the cloud link of the Teachable machine//
