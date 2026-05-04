const pages = document.querySelectorAll(".page");
const navButtons = document.querySelectorAll(".nav");
const title = document.getElementById("pageTitle");
const leadModal = document.getElementById("leadModal");
const leadsTable = document.querySelector("#leadsTable tbody");

const demoLeads = [
  {name:"David Cohen", city:"Netanya", power:"20.4 kWc", source:"REMAX", status:"Nouveau"},
  {name:"Miriam Azulay", city:"Haifa", power:"15 kWc", source:"Facebook", status:"Contacté"},
  {name:"Avi Peretz", city:"Ramat Poleg", power:"25 kWc", source:"Referral", status:"Visite toit"}
];

function showPage(id){
  pages.forEach(p => p.classList.remove("active"));
  navButtons.forEach(b => b.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  document.querySelector(`[data-page="${id}"]`).classList.add("active");
  title.textContent = document.querySelector(`[data-page="${id}"]`).textContent;
}

navButtons.forEach(btn => btn.addEventListener("click", () => showPage(btn.dataset.page)));

function renderLeads(){
  leadsTable.innerHTML = "";
  demoLeads.forEach((lead, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${lead.name}</td>
      <td>${lead.city}</td>
      <td>${lead.power}</td>
      <td>${lead.source}</td>
      <td><span class="pill blue">${lead.status}</span></td>
      <td><button class="secondary small" onclick="alert('Fiche lead: ${lead.name}')">Ouvrir</button></td>
    `;
    leadsTable.appendChild(tr);
  });
}

document.getElementById("newLeadBtn").onclick = () => leadModal.classList.add("active");
document.getElementById("addLeadInline").onclick = () => leadModal.classList.add("active");
document.getElementById("closeModal").onclick = () => leadModal.classList.remove("active");

document.getElementById("saveLead").onclick = async () => {
  const lead = {
    name: document.getElementById("leadName").value || "Sans nom",
    city: document.getElementById("leadCity").value || "-",
    power: document.getElementById("leadPower").value || "-",
    source: document.getElementById("leadSource").value || "-",
    status: "Nouveau"
  };

  demoLeads.unshift(lead);
  renderLeads();
  leadModal.classList.remove("active");

  // Quand Supabase est branché, active cette ligne :
  // await saveLeadToSupabase(lead);
};

document.getElementById("calcBtn").onclick = () => {
  const kwc = Number(document.getElementById("kwc").value);
  const priceTTC = Number(document.getElementById("price").value);
  const commission = Number(document.getElementById("commission").value);
  const posePerKwc = Number(document.getElementById("pose").value);

  const vatRate = 0.17;
  const priceHT = priceTTC / (1 + vatRate);
  const poseCost = kwc * posePerKwc;
  const estimatedMaterial = 39000;
  const margin = priceHT - poseCost - estimatedMaterial - commission;

  document.getElementById("quoteResult").innerHTML = `
    <b>Résultat estimatif</b><br>
    Prix HT : ₪ ${priceHT.toFixed(0)}<br>
    Coût pose HT : ₪ ${poseCost.toFixed(0)}<br>
    Matériel estimé HT : ₪ ${estimatedMaterial.toFixed(0)}<br>
    Commission : ₪ ${commission.toFixed(0)}<br>
    <b>Marge Ami Solar : ₪ ${margin.toFixed(0)}</b>
  `;
  document.getElementById("amiMargin").textContent = "₪ " + margin.toFixed(0);
};

document.getElementById("exportBtn").onclick = () => {
  const data = JSON.stringify(demoLeads, null, 2);
  const blob = new Blob([data], {type:"application/json"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "ami-solar-leads.json";
  a.click();
  URL.revokeObjectURL(url);
};

renderLeads();
