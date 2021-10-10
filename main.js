const beLogoPath = '/assets/battleye-logo.webp';
const eacLogoPath = '/assets/easy-logo.webp';
const vanguardLogoPath = '/assets/vanguard-logo.webp';

const lastUpdateEl = document.getElementById('last-update');
lastUpdateEl.innerHTML = new Date().toDateString(), new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

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