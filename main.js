const beLogoPath = '/assets/battleye-logo.webp';
const eacLogoPath = '/assets/easy-logo.webp';
const vanguardLogoPath = '/assets/vanguard-logo.webp';
const nProtectLogoPath = '/assets/npgg-logo.webp';

/* Show date of last update */
const lastUpdateEl = document.getElementById('last-update');
lastUpdateEl.innerHTML = 
    new Date().toDateString() + 
    ', ' + 
    new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }) + 
    ' ' + 
    Intl.DateTimeFormat().resolvedOptions().timeZone;

/* load table */
fetch("games.json")
    .then(response => response.json())
    .then(gamesList => {
        for (let i = 0; i < gamesList.length; i++) {
            const game = gamesList[i];
            const tableBody = document.getElementById('table-body');

            let highlight = '';
            if (game.acStatus.includes("🎉 Confirmed")) {
                highlight = 'class="is-confirmed"';
            } else if (game.acStatus.includes("⭐ Supported")) {
                highlight = 'class="is-supported"';
            }
        
            // template anti-cheats with a logo
            switch (game.acName) {
                case "BattlEye":
                    game.acName = `<img src="${beLogoPath}" width="32" height="32"/> BattlEye`;
                break;
        
                case "Easy Anti-Cheat":
                    game.acName = `<img src="${eacLogoPath}" width="32" height="32"/> Easy Anti-Cheat`;
                break;

                case "Vanguard":
                    game.acName = `<img src="${vanguardLogoPath}" width="32" height="32"/> Vanguard`;
                break;

                case "nProtect GameGuard":
                    game.acName = `<img src="${nProtectLogoPath}" width="32" height="32"/> nProtect GameGuard`;
                break;
        
                default:
                    break;
            }
        
            // link to the status url
            if (game.acStatusUrl !== "") {
                game.acStatus = `<a href="` + game.acStatusUrl + `">` + game.acStatus + `</a>`;
            }
        
            tableBody.innerHTML += `
                <tr draggable="false" ${highlight}>
                    <td><span>${game.game}</span></td>
                    <td><span>${game.acName}</span></td>
                    <td><span>${game.acStatus}</span></td>
                </tr>
            `;
    };
});

function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("table-body");
    switching = true;
    dir = "asc";

    while (switching) {
        switching = false;
        rows = table.rows;

        for (i = 0; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            // Make sure to take the innerhtml of the link, if it has one
            x = x.querySelector('a') ? x.querySelector('a') : x;
            y = y.querySelector('a') ? y.querySelector('a') : y;

            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            /* If a switch has been marked, make the switch
            and mark that a switch has been done: */
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount ++;
        } else {
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}
