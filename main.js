noseX = 0;
noseY = 0;

diference = 0;

rightwristX = 0;
leftwristX = 0;

function setup() 
{
    video = createCapture(VIDEO);
    video.size(550, 412);

    canvas = createCanvas(520, 520);
    canvas.position(560, 125);

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function modelLoaded()
{
    console.log("PoseNet se está inicializando");
}

function gotPoses(results)
{
    if (results.length > 0)
    {
        console.log(results);

        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;

        console.log("Nariz en X: " + noseX + " Nariz en Y: " + noseY);

        rightwristX = results[0].pose.rightWrist.x;
        leftwristX = results[0].pose.leftWrist.x;

        diference = floor(leftwristX - rightwristX);

        console.log("Muñeca derecha en X: " + rightwristX + " Muñeca izquierda en X: " + leftwristX);

        document.getElementById("square_side").innerHTML = "El ancho y alto del cuadrado es: " + diference + " px";
    }
}

function draw()
{
background(rgb(255, 214, 148));

    fill("#00ff00");
    stroke("skyblue");
    square(noseX, noseY, diference);
}
