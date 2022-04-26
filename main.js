prediction1 = "";

Webcam.set({
    width : 350,
    height : 350,
    image_format : 'png',
    png_quality : 90
});

camera = document.getElementById("camera");
Webcam.attach('#camera');

function take(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="cap" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version :',ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/EIZ8ITeLg/model.json',modelloaded);
function modelloaded(){
    console.log('modelloaded');
}

function speak(){
    var synth = window.speechSynthesis;
    speak1 = "The Hand Gesture Is "+prediction1;
    var utterthis = new SpeechSynthesisUtterance(speak1);
    synth.speak(utterthis);
}
function check(){
    img = document.getElementById("cap");
    classifier.classify(img, gotresult);
}

function gotresult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        prediction1 = results[0].label;
        speak();
        if(results[0].label == "HAPPY"){
            document.getElementById("update_emoji").innerHTML = "&#128522;";
        }
        if(results[0].label == "SAD"){
            document.getElementById("update_emoji").innerHTML = "&#128532;";
        }
        if(results[0].label == "ANGRY"){
            document.getElementById("update_emoji").innerHTML = "&#128548;";
        }
    }
}