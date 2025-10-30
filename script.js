const items = [
  { name: "Schmobin", value: 320000 },
  { name: "PewDiePie", value: 111000000 },
  { name: "Minecraft", value: 1000000000 },
  { name: "Fortnite", value: 250000000 },
  { name: "Rezo", value: 3000000 },
  { name: "Kurzgesagt", value: 18000000 },
  { name: "Random Kanal", value: 12000 }
];

let score = 0;
let a = null, b = null;

const nameA = document.getElementById('nameA');
const valueA = document.getElementById('valueA');
const nameB = document.getElementById('nameB');
const valueB = document.getElementById('valueB');
const scoreEl = document.getElementById('score');
const higherBtn = document.getElementById('higherBtn');
const lowerBtn = document.getElementById('lowerBtn');
const gameOverEl = document.getElementById('gameOver');
const finalScore = document.getElementById('finalScore');
const retryBtn = document.getElementById('retryBtn');

function randItem(exclude=null){
  let idx;
  do {
    idx = Math.floor(Math.random()*items.length);
  } while (exclude !== null && items[idx].name === exclude.name);
  return items[idx];
}

function startRound(){
  if (a === null) a = randItem();
  b = randItem(a);
  render();
}

function render(){
  nameA.textContent = a.name;
  valueA.textContent = formatNumber(a.value);
  nameB.textContent = b.name;
  valueB.textContent = '?';
  scoreEl.textContent = `Score: ${score}`;
}

function formatNumber(n){
  if (n >= 1e9) return (n/1e9).toFixed(1)+'B';
  if (n >= 1e6) return (n/1e6).toFixed(1)+'M';
  if (n >= 1e3) return (n/1e3).toFixed(1)+'k';
  return n;
}

function checkGuess(isHigher){
  const correct = (b.value >= a.value);
  const guessCorrect = (isHigher && correct) || (!isHigher && !correct);
  valueB.textContent = formatNumber(b.value);
  if (guessCorrect){
    score++;
    a = b;
    setTimeout(()=> startRound(), 700);
  } else {
    finalScore.textContent = `Score: ${score}`;
    gameOverEl.classList.remove('hidden');
  }
  scoreEl.textContent = `Score: ${score}`;
}

higherBtn.addEventListener('click', ()=> checkGuess(true));
lowerBtn.addEventListener('click', ()=> checkGuess(false));
retryBtn.addEventListener('click', ()=> {
  score = 0;
  a = null;
  b = null;
  gameOverEl.classList.add('hidden');
  startRound();
});

startRound();
