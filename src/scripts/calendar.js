async function fetchCSV(url) {
    const response = await fetch(url);
    const text = await response.text();
    return text.trim().split("\n").map(row => row.split(","));
}

function renderCalendarTable(data, containerId, title) {
    const container = document.getElementById(containerId);

    // Aggiungi titolo
    const titleElement = document.createElement("h1");
    titleElement.textContent = title;
    titleElement.style.textAlign = "center";
    titleElement.style.color = "#ff8400";
    titleElement.style.borderRadius = "10px";
    container.appendChild(titleElement);

    // Crea tabella
    const table = document.createElement("table");

    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    for (let i = 0; i < 3; i++) {
        const th = document.createElement("th");
        th.textContent = data[0][i];
        headerRow.appendChild(th);
    }
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    data.slice(1).forEach(row => {
        const tr = document.createElement("tr");

        const td0 = document.createElement("td");
        td0.textContent = row[0];
        td0.style.backgroundColor = "#fffbcc";
        tr.appendChild(td0);

        const td1 = document.createElement("td");
        td1.textContent = row[1];
        if (row[3]) td1.style.backgroundColor = row[3];
        if (row[5] && row[5].toUpperCase().includes("IN CORSO")) {
            td1.classList.add("live-cell");
        }
        tr.appendChild(td1);

        const td2 = document.createElement("td");
        td2.textContent = row[2];
        if (row[4]) td2.style.backgroundColor = row[4];
        if (row[6] && row[6].toUpperCase().includes("IN CORSO")) {
            td2.classList.add("live-cell");
        }
        tr.appendChild(td2);

        tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    container.appendChild(table); // NON svuotiamo il container!
}

const calendario_DAY1_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRRDEiXWct3GxRhLnruPZ85qqCQw03mMqjMopHlfh4oUS1DE_oBlJbAFIFoD90lAi7uAVxHizkpewS0/pub?gid=0&single=true&output=csv";
const calendario_DAY2_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRRDEiXWct3GxRhLnruPZ85qqCQw03mMqjMopHlfh4oUS1DE_oBlJbAFIFoD90lAi7uAVxHizkpewS0/pub?gid=227217869&single=true&output=csv";
const calendario_DAY3_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRRDEiXWct3GxRhLnruPZ85qqCQw03mMqjMopHlfh4oUS1DE_oBlJbAFIFoD90lAi7uAVxHizkpewS0/pub?gid=745816722&single=true&output=csv";

window.addEventListener("DOMContentLoaded", async () => {
    const calendarioData1 = await fetchCSV(calendario_DAY1_URL);
    const calendarioData2 = await fetchCSV(calendario_DAY2_URL);
    const calendarioData3 = await fetchCSV(calendario_DAY3_URL);

    const container = document.getElementById("calendar-content");
    container.innerHTML = ""; // svuota una sola volta all’inizio

    renderCalendarTable(calendarioData1, "calendar-content", "Giorno 1");
    renderCalendarTable(calendarioData2, "calendar-content", "Giorno 2");
    renderCalendarTable(calendarioData3, "calendar-content", "Giorno 3");
});

document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.getElementById('hamburger');
    const menu = document.getElementById('menu');
    if (hamburger && menu) {
        hamburger.addEventListener('click', function () {
            menu.classList.toggle('open');
        });
        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('open');
            });
        });
    }
});
