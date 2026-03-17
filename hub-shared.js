function shuffle(arr){
  const a = [...arr];
  for(let i = a.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function uid(){
  return 'id' + Math.random().toString(36).slice(2,10);
}

function formatTime(s){
  const m = Math.floor(s / 60).toString().padStart(2,'0');
  const sec = (s % 60).toString().padStart(2,'0');
  return `${m}:${sec}`;
}

function startTimer(el){
  let sec = 0;
  el.textContent = '00:00';
  return setInterval(() => {
    sec++;
    el.textContent = formatTime(sec);
  }, 1000);
}

function calcAccuracy(correct,total){
  return total ? Math.round((correct / total) * 100) : 0;
}

function makeKeypad(targetResolver, mode='basic'){
  const shell = document.createElement('div');
  shell.className = 'keypad-shell';

  const left = document.createElement('div');
  left.className = 'keypad-core';

  const right = document.createElement('div');
  right.className = 'keypad-ext';

  const core = ['1','2','3','4','5','6','7','8','9','0','.','⌫'];

  core.forEach(v => {
    const b = document.createElement('button');
    b.className = 'kbtn';
    b.type = 'button';
    b.textContent = v;
    b.onclick = () => press(v);
    left.appendChild(b);
  });

  let extras = [];
  if(mode === 'basic') extras = ['←','→','clear'];
  if(mode === 'algebra') extras = ['x','+','-','×','÷','=','<','>','≤','≥','(',')','clear'];
  if(mode === 'equation') extras = ['x','y','+','-','×','÷','=','<','>','≤','≥','(',')','^','/','clear'];

  extras.forEach(v => {
    const b = document.createElement('button');
    b.className = 'kbtn dark';
    b.type = 'button';
    b.textContent = v;
    b.onclick = () => press(v);
    right.appendChild(b);
  });

  shell.append(left, right);

  function press(v){
    const el = targetResolver();
    if(!el) return;

    if(v === '⌫'){
      el.value = el.value.slice(0,-1);
      return;
    }

    if(v === 'clear'){
      el.value = '';
      return;
    }

    if(v === '×') v = '*';
    if(v === '÷') v = '/';
    if(v === '←' || v === '→') return;

    el.value += v;
    el.dispatchEvent(new Event('input'));
  }

  return shell;
}

function buildHeader(title, sub){
  return `
    <div class="panel header">
      <div class="brand">
        <div class="brand-badge">∑</div>
        <div>
          <h1>${title}</h1>
          <div class="sub">${sub}</div>
        </div>
      </div>
      <div class="statusbar">
        <div class="pill">Student: <span id="studentNameOut">Guest</span></div>
        <div class="pill">Progress: <span id="progressOut">0/0</span></div>
        <div class="pill">Accuracy: <span id="accuracyOut">0%</span></div>
        <div class="pill">Timer: <span id="timerOut">00:00</span></div>
        <div class="pill">Started: <span id="startedOut">—</span></div>
      </div>
    </div>
  `;
}

function todayStamp(){
  return new Date().toLocaleString();
}
