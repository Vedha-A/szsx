song1 = "";
song2 = "";
leftWristX = 0;
rightWristX = 0;
leftWristY = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;
wirst = 0;

function preload() {
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet('video', modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('Pose Net is Initialized');
}

function draw() {
    image(video, 0, 0, 600, 500);

    if (scoreLeftWrist > 0.2) {
        wrist = 'Right';
        fill('red');
        stroke('red');
        circle(leftWristX , leftWristY , 20);
        document.getElementById('song_name').innerHTML = 'Song 1';
        song2.stop();
        song1.play();
        
    }
    if (scoreRightWrist > 0.2) {
        wrist = 'Left';
        fill('red');
        stroke('red');
        circle(leftWristX , leftWristY , 20);
        document.getElementById('song_name').innerHTML = 'Song 2';
        song1.stop();
        song2.play();
    }
  
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log('Right Wrist X is' + rightWristX + 'Right Wrist Y is' + rightWristY);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log('Left Wrist X is' + leftWristX + 'Left Wrist Y is' + leftWristY);

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log('Score of left wrist' + scoreLeftWrist + 'Score of right wrist' + scoreRightWrist);
    }
}