async function loadData() {
  const res = await fetch('/api/data');
  const data = await res.json();

  const timersList = document.getElementById('timers-list');
  timersList.innerHTML = '';
  data.timers.forEach(t => {
    timersList.innerHTML += `<li>${t.name}: ${t.time}</li>`;
  });

  const pricingList = document.getElementById('pricing-list');
  pricingList.innerHTML = '';
  data.pricing.forEach(p => {
    pricingList.innerHTML += `<li>${p.name} - ${p.price}</li>`;
  });
}

function openStream() {
  window.open("https://kick.com/exampleChannel", "_blank");
}

loadData();
