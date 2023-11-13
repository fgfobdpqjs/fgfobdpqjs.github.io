const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
c.fillStyle = "hotpink";

function draw(x, y) {
  if (isDrawing) {
    c.beginPath();