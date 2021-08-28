<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <title>TODO supply a title</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <!--java scripts-->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script> 

        <script src="https://cdnjs.cloudflare.com/ajax/libs/fabric.js/1.7.22/fabric.min.js"></script>
    </head>
    <body>
        <div>
            <img id="image" src="assets/images/MicrosoftTeams-image.png" alt=""/>

            <div>Canvas operations</div>
            <div>
                <canvas id="canvas" style="border: 1px solid red;">     </canvas>
            </div>
        </div>
    </body>
    <script>

        var canvas = new fabric.Canvas('canvas');
        fabric.Image.fromURL('http://fabricjs.com/assets/pug_small.jpg', function (myImg) {
            myImg = document.getElementById('image');
            myImg = new fabric.Image(myImg);
            document.getElementById("image").style.display = "none";
            canvas.setDimensions({width: myImg.width, height: myImg.height});
            canvas.setBackgroundImage(myImg, canvas.renderAll.bind(canvas));

            //loop over all the clusters
            //for each cluster loop over all the boxes
            coordinates = '{"x1":832, "y1":80, "x2":880, "y2":110}';
            var x = drawRectangle(canvas, coordinates, 'red');

            var rect, isDown, origX, origY;

            canvas.on('mouse:down', function (o) {
                isDown = true;
                var pointer = canvas.getPointer(o.e);
                origX = pointer.x;
                origY = pointer.y;
                var pointer = canvas.getPointer(o.e);
                rect = new fabric.Rect({
                    left: origX,
                    top: origY,
                    originX: 'left',
                    originY: 'top',
                    width: pointer.x - origX,
                    height: pointer.y - origY,
                    angle: 0,
                    fill: 'rgba(0,0,0,0)',
                    stroke: 'green',
                    strokeWidth: 2,
                    
//                    borderColor: 'red',
//                    cornerColor: 'green',
//                    cornerSize: 5,
//                    transparentCorners: false
                });
                rect.hasControls = false;
                canvas.add(rect);
            });

            canvas.on('mouse:move', function (o) {
                if (!isDown)
                    return;
                var pointer = canvas.getPointer(o.e);

                if (origX > pointer.x) {
                    rect.set({left: Math.abs(pointer.x)});
                }
                if (origY > pointer.y) {
                    rect.set({top: Math.abs(pointer.y)});
                }

                rect.set({width: Math.abs(origX - pointer.x)});
                rect.set({height: Math.abs(origY - pointer.y)});


                canvas.renderAll();
            });

            canvas.on('mouse:up', function (o) {
                console.log(rect.aCoords);
                console.log(rect.oCoords);

//                console.log(rect.originX);
//                console.log(rect.originY);
//                console.log(rect.width);
//                console.log(rect.height);
                isDown = false;
            });

            function drawRectangle(canvas, coordinates, stroke) {
                console.log('dfasf')
                const coordinate_json = JSON.parse(coordinates);
                console.log((coordinate_json));
                x1 = coordinate_json.x1
                y1 = coordinate_json.y1
                width = coordinate_json['x2'] - x1
                height = coordinate_json['y2'] - y1
                console.log(x1);
                console.log(y1);
                console.log(width);
                console.log(height);

                var rect = new fabric.Rect({
                    left: x1,
                    top: y1,
                    fill: 'rgba(0,0,0,0)',
                    width: width,
                    height: height,
                    stroke: stroke,
                    strokeWidth: 2
                });

// "add" rectangle onto canvas
                canvas.add(rect);
            }

        });

    </script>
</html>
