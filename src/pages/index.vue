<template>
    <section class="section">
        <div class="columns is-mobile is-centered">
            <b-table :data="table" :columns="formatting" :row-class="(row, index) => color(row, index)"></b-table>
        </div>

        <br/>
        <p class="has-text-centered">
            Don’t see a game you’re interested in on here yet? <a href="https://github.com/Starz0r/AreWeAntiCheatYet/issues/new?assignees=&labels=new-game%2Cstatus-change&template=0-new-game.yml&title=%3CGame+Name+Here%3E">Add it here!</a>
        </p>

        <br/>
        <p class="has-text-centered">
            Last Updated: {{new Date().toDateString()}}, {{new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}} ({{Intl.DateTimeFormat().resolvedOptions().timeZone}})
        </p>
    </section>
</template>

<script>
const gamesList = require("~/static/games.json");

const beLogo = require("~/assets/battleye-logo.webp");
const eacLogo = require("~/assets/easy-logo.webp");
const vanguardLogo = require("~/assets/vanguard-logo.webp");
const npggLogo = require("~/assets/npgg-logo.webp");
const xc3Logo = require("~/assets/xigncode3-logo.webp");
const equ8Logo = require("~/assets/equ8-logo.webp");
const vacLogo = require("~/assets/vac-logo.webp");

export default {
    name: 'HomePage',

    data() {
        for (let i = 0; i < gamesList.length; i++) {
            const game = gamesList[i];

            // template anti-cheats with a logo
            game.acLabel = '';
            for (let j = 0; j < game.acList.length; j++) {
                switch (game.acList[j]) {
                    case "BattlEye":
                        game.acLabel += `<p><img src="` + beLogo + `" width="32" height="32" alt/> BattlEye</p>`;
                        break;

                    case "Easy Anti-Cheat":
                        game.acLabel += `<p><img src="` + eacLogo + `" width="32" height="32" alt/> Easy Anti-Cheat</p>`;
                        break;

                    case "Vanguard":
                        game.acLabel += `<p><img src="` + vanguardLogo + `" width="32" height="32" alt> Vanguard</p>`;
                        break;

                    case "nProtect GameGuard":
                        game.acLabel += `<p><img src="` + npggLogo + `" width="32" height="32" alt/> nProtect GameGuard</p>`;
                        break;

                    case "XIGNCODE3":
                        game.acLabel += `<p><img src="` + xc3Logo + `" width="32" height="32" alt/> XIGNCODE3</p>`;
                        break;

                    case "EQU8":
                        game.acLabel += `<p><img src="` + equ8Logo + `" width="32" height="32" alt/> EQU8</p>`;
                        break;

                    case "VAC":
                        game.acLabel += `<p><img src="` + vacLogo + `" width="32" height="32" alt/> VAC</p>`;
                        break;

                    default:
                        game.acLabel += `<p>` + game.acList[j] + `</p>`;
                        break;
                }
            }

            // link to the status url
            if (game.acStatusUrl !== "") {
                game.acStatus = `<a href="` + game.acStatusUrl + `">` + game.acStatus + `</a>`;
            }

            gamesList[i] = game;
        }

        return {
            table: gamesList,
            formatting: [{field: 'game', label: 'Game', numeric: false, sortable: true, searchable: true}, {field: 'acLabel', label: 'Anti-Cheat'}, {field: 'acStatus', label: 'Status', sortable: true}]
        }
    },
    fetchOnServer: true,

    methods: {
        color(row, index) {
            if (row.acStatus.includes("🎉 Confirmed")) {
                return 'is-confirmed';
            } else if (row.acStatus.includes("⭐ Supported")) {
                return 'is-supported';
            }
        }
    },
}
</script>

<style>
tr.is-confirmed {
    background: #167df0;
    color: #fff;
}

tr.is-supported {
    background: #00B200;
    color: #fff;
}
</style>
