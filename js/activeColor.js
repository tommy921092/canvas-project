
// $('#drawing-star').on('click', function(){
//     currentFunction = new DrawingPolygon(contextReal,contextDraft);
//     });
$('#colorLine').on('input', function() {
    contextReal.strokeStyle = $(this).val();
});

$('#colorFill').on('input', function() {
    contextReal.fillStyle = $(this).val();
});

$('#colorLine').on('input', function() {
    contextDraft.strokeStyle = $(this).val();
});

$('#colorFill').on('input', function() {
    contextDraft.fillStyle = $(this).val();
});
// function change(e){
//     color = this.value;
// }

// document.getElementById("colorLine").onchange = change;


// init.js

// color-picker
// currentColor = "rgb(60, 116, 239)";
// $("#color-picker").spectrum({
//     preferredFormat: "rgb",
//     color: currentColor,
//     showAlpha: true,
//     showPalette: true,
//     showSelectionPalette: true,
//     palette: [
//         ["#000", "#444", "#666", "#999", "#ccc", "#eee", "#f3f3f3", "#fff"],
//         ["#f00", "#f90", "#ff0", "#0f0", "#0ff", "#00f", "#90f", "#f0f"]
//     ],
//     change: function (color) {
//         currentColor = color;
//         $('.textInput').css('color', color);
//     }
// });



// style
// function styleSet() {
//     contextDraft.strokeStyle = currentStrokeColor;
//     contextReal.strokeStyle = currentStrokeColor;
//     contextDraft.lineWidth = currentStrokeSize;
//     contextReal.lineWidth = currentStrokeSize;
//     contextDraft.fillStyle = currentColor;
//     contextReal.fillStyle = currentColor;
//     contextDraft.lineJoin = 'miter';
//     contextReal.lineJoin = 'miter';
//     contextDraft.shadowBlur = 0;
//     contextReal.shadowBlur = 0;






