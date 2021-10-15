const beLogoPath = '/assets/battleye-logo.webp';
const eacLogoPath = '/assets/easy-logo.webp';
const vanguardLogoPath = '/assets/vanguard-logo.webp';
const nProtectLogoPath = '/assets/npgg-logo.webp';
const xc3LogoPath = 'assets/xigncode3-logo.webp';
const equ8LogoPath = 'assets/equ8-logo.webp';
const vacLogoPath = 'assets/vac-logo.webp';
let gamesList;

/* Show date of last update */
const lastUpdateEl = document.getElementById('last-update');
lastUpdateEl.innerHTML = 
    new Date().toDateString() + 
    ', ' + 
    new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }) + 
    ' ' + 
    Intl.DateTimeFormat().resolvedOptions().timeZone;

fetch("games.json")
    .then(response => response.json())
    .then(response => { 
        gamesList = response;
        loadTable();
    });

function loadTable(searchString = '') {
    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = '';
    for (let i = 0; i < gamesList.length; i++) {
        const game = gamesList[i];

        if (searchString && !game.game.toLowerCase().includes(searchString.toLocaleLowerCase())) {
            continue;
        }

        let highlight = '';
        if (game.acStatus.includes("🎉 Confirmed")) {
            highlight = 'class="is-confirmed"';
        } else if (game.acStatus.includes("⭐ Supported")) {
            highlight = 'class="is-supported"';
        }
    
        // template anti-cheats with a logo
        game.acLabel = '';
        for (let j = 0; j < game.acList.length; j++) {
            switch (game.acList[j]) {
                case "BattlEye":
                    game.acLabel += `<p><img src="${beLogoPath}" width="32" height="32" alt/> BattlEye</p>`;
                break;
        
                case "Easy Anti-Cheat":
                    game.acLabel += `<p><img src="${eacLogoPath}" width="32" height="32" alt/> Easy Anti-Cheat</p>`;
                break;

                case "Vanguard":
                    game.acLabel += `<p><img src="${vanguardLogoPath}" width="32" height="32" alt/> Vanguard</p>`;
                break;

                case "nProtect GameGuard":
                    game.acLabel += `<p><img src="${nProtectLogoPath}" width="32" height="32" alt/> nProtect GameGuard</p>`;
                break;
        
                case "XIGNCODE3":
                    game.acLabel += `<p><img src="${xc3LogoPath}" width="32" height="32" alt/> XIGNCODE3</p>`;
                break;
        
                case "EQU8":
                    game.acLabel += `<p><img src="${equ8LogoPath}" width="32" height="32" alt/> EQU8</p>`;
                break;

                case "VAC":
                    game.acLabel += `<p><img src="${vacLogoPath}" width="32" height="32" alt/> VAC</p>`;
                break;
        
                default:
                    game.acLabel += `<p>` + game.acList[j] + `</p>`;
                break;
            }
        }

        // link to the status url
        if (game.acStatusUrl !== "") {
            game.acStatus = game.acStatus.substring(0,2) + `<a href="` + game.acStatusUrl + `">` + game.acStatus.substring(2, game.acStatus.len) + `</a>`;
        }
    
        tableBody.innerHTML += `
            <tr draggable="false" ${highlight}>
                <td><span>${game.game}</span></td>
                <td><span>${game.acLabel}</span></td>
                <td><span>${game.acStatus}</span></td>
            </tr>
        `;
    };
}

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

function searchGame() {
    const searchGame = document.getElementById('search-game').value;
    loadTable(searchGame);
}
