const report = document.getElementById("report");
const clearBtn = document.getElementById("clear");

chrome.storage.local.get(null, (data) => {

  let html = "";

  for (let site in data) {

    let mins = Math.round(data[site] / 60000);

    html += `<p>${site} : ${mins} min</p>`;
  }

  report.innerHTML = html || "No data yet";

});

clearBtn.addEventListener("click", () => {

  chrome.storage.local.clear(() => {
    report.innerHTML = "Data cleared";
  });

});
