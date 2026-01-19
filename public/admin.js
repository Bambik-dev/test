const loginSection = document.getElementById('login-section');
const adminSection = document.getElementById('admin-section');
const loginMsg = document.getElementById('login-msg');

async function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const res = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  const data = await res.json();
  if(data.success){
    loginSection.style.display = 'none';
    adminSection.style.display = 'block';
    loadData();
  } else {
    loginMsg.textContent = "Niepoprawne dane";
  }
}

async function loadData() {
  const res = await fetch('/api/data');
  const data = await res.json();

  const timersDiv = document.getElementById('timers-edit');
  timersDiv.innerHTML = '';
  data.timers.forEach((t, i) => {
    timersDiv.innerHTML += `<input id="timer-${i}" value="${t.time}"> ${t.name}<br>`;
  });

  const pricingDiv = document.getElementById('pricing-edit');
  pricingDiv.innerHTML = '';
  data.pricing.forEach((p, i) => {
    pricingDiv.innerHTML += `<input id="price-${i}" value="${p.price}"> ${p.name}<br>`;
  });

  const saveBtn = document.createElement('button');
  saveBtn.textContent = "Zapisz zmiany";
  saveBtn.onclick = saveData;
  adminSection.appendChild(saveBtn);
}

async function saveData() {
  const res = await fetch('/api/data');
  const data = await res.json();

  data.timers.forEach((t,i)=>{
    t.time = document.getElementById(`timer-${i}`).value;
  });
  data.pricing.forEach((p,i)=>{
    p.price = document.getElementById(`price-${i}`).value;
  });

  await fetch('/api/data', {
    method:'POST',
    headers:{ 'Content-Type':'application/json' },
    body: JSON.stringify(data)
  });
  alert("Zapisano!");
}

async function logout() {
  await fetch('/api/logout', { method:'POST' });
  loginSection.style.display = 'block';
  adminSection.style.display = 'none';
}
