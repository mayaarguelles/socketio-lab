const socket = io();

function main() {

  socket.on('populate', (arr) => {
    console.log(arr);
    updatePos('top', arr['racerPosTop']);
    updatePos('bot', arr['racerPosBot']);
  });

  socket.on('win', (winner) => {
    console.log("WINNER:", winner);
    document.getElementById('winnerModal').innerHTML+= "<p id = \"win\">"+"Congratultions"+winner+"has won"+"</p>";
    document.getElementById('winnerModal').style.backgroundColor = "cyan";
    document.getElementById('win').style.backgroundColor = "green";
    document.getElementById('win').style.fontFamily = "fantasy";
    document.getElementById('winnerModal').classList.add('open');
  });

  socket.on('connectionChange', (num) => {
    console.log("Connected:", num);
    document.getElementById('connectedUsers').textContent = num;
  })

  const btnTop = document.querySelector('#moveTop');
  const btnBot = document.querySelector('#moveBot');

  btnTop.addEventListener('click', handleClick);
  btnBot.addEventListener('click', handleClick);

}

function updatePos(key, pos) {
  const racer = document.querySelector('#' + key);
  racer.style.left = pos + 'px';
}

  var imageOffset = 0
function handleClick(event) {
const s = this.id;
if(s === "moveTop"){
socket.emit('moveTop');
}
if(s === "moveBot"){
  socket.emit('moveBot');

}
  // emit to --
  // moveBot
  // moveTop (no arguments for both)



}

document.addEventListener('DOMContentLoaded', main);
