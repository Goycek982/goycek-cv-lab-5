let profilData = {};
const profilDiv = document.getElementById("profil");


fetch("data.json")
  .then(response => response.json())
  .then(data => {
    const saved = localStorage.getItem("profil");
    profilData = saved ? JSON.parse(saved) : data;
    renderProfil(profilData);
  });


function renderProfil(data) {
  profilDiv.innerHTML = "";

  Object.entries(data).forEach(([key, value]) => {
    const field = document.createElement("div");

    const label = document.createElement("strong");
    label.textContent = `${key}: `;
    field.appendChild(label);

    const valueSpan = document.createElement("span");
    valueSpan.textContent = Array.isArray(value) ? value.join(", ") : value;
    field.appendChild(valueSpan);

    const editBtn = document.createElement("button");
    editBtn.textContent = "Düzəliş et";
    editBtn.onclick = () => redakteEt(key);
    field.appendChild(editBtn);

    profilDiv.appendChild(field);
  });
}


function redakteEt(key) {
  const yeniDeyer = prompt(`${key} üçün yeni dəyər daxil edin:`, profilData[key]);
  if (yeniDeyer !== null) {
    profilData[key] = yeniDeyer.includes(",") ? yeniDeyer.split(",").map(v => v.trim()) : yeniDeyer;
    localStorage.setItem("profil", JSON.stringify(profilData));
    renderProfil(profilData);
  }
}


document.getElementById("hamisiniSifirla").addEventListener("click", () => {
  localStorage.removeItem("profil");
  location.reload();
});
