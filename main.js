const beLogoPath = '/assets/battleye-logo.png';
const eacLogoPath = '/assets/easy-logo.png';

fetch("games.json")
    .then(response => response.json())
    .then(gamesList => {
        for (let i = 0; i < gamesList.length; i++) {
            const game = gamesList[i];
            const tableBody = document.getElementById('table-body');
            const highlight = game.acStatus.includes("🎉 Confirmed") ? 'class="is-confirmed"' : '';
        
            // template anti-cheats with a logo
            switch (game.acName) {
                case "BattlEye":
                    game.acName = `<img src="${beLogoPath}" width="32" height="32"/> BattlEye`;
                break;
        
                case "Easy Anti-Cheat":
                    game.acName = `<img src="${eacLogoPath}" width="32" height="32"/> Easy Anti-Cheat`;
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