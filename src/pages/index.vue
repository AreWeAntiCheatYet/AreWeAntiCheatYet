<template>
    <section class="section">

        <OverView
            :noUnconfirmed="noUnconfirmed"
            :noSupported="noSupported"
            :noConfirmed="noConfirmed"/>

        <div class="columns is-mobile is-centered">
            <b-table :data="table" :columns="formatting" :row-class="(row, index) => color(row, index)"></b-table>
        </div>

        <br/>
        <p class="has-text-centered">
            Don’t see a game you’re interested in on here yet? <a href="https://github.com/Starz0r/AreWeAntiCheatYet/issues/new?assignees=&labels=new-game%2Cstatus-change&template=0-new-game.yml&title=%3CGame+Name+Here%3E">Add it here!</a>
        </p>

        <br/>
        <p class="has-text-centered">
            Last Updated: {{pageUpdatedDate}}
        </p>
    </section>
</template>

<script>
import preval from 'preval.macro';

const gamesList = require("~/static/games.json");

const beLogo = require("~/assets/battleye-logo.webp");
const eacLogo = require("~/assets/easy-logo.webp");
const vanguardLogo = require("~/assets/vanguard-logo.webp");
const npggLogo = require("~/assets/npgg-logo.webp");
const xc3Logo = require("~/assets/xigncode3-logo.webp");
const equ8Logo = require("~/assets/equ8-logo.webp");
const vacLogo = require("~/assets/vac-logo.webp");
const ffLogo = require("~/assets/fairfight-logo.webp")
const pbLogo = require("~/assets/punkbuster-logo.webp")
const tacLogo = require("~/assets/tac-logo.webp")
const arbiterLogo = require("~/assets/arbiter-placeholder.webp")

export default {
    name: 'HomePage',

    data() {
        let noUnconfirmed,noSupported,noConfirmed;
        noUnconfirmed=noSupported=noConfirmed=0;

        for (let i = 0; i < gamesList.length; i++) {
            const game = gamesList[i];

            // template games with a source URL
            if (game.gameUrl.length !== 0) {
                game.game = `<a class="is-underlined has-text-grey-darker" href="` + game.gameUrl + `">` + game.game + `</a>`;
            }
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

                    case "FairFight":
                        game.acLabel += `<p><img src="` + ffLogo + `" width="32" height="32" alt/> FairFight</p>`;
                    break;

                    case "PunkBuster":
                        game.acLabel += `<p><img src="` + pbLogo + `" width="32" height="32" alt/> PunkBuster</p>`;
                    break;
					
                    case "Treyarch Anti-Cheat":
                        game.acLabel += `<p><img src="` + tacLogo + `" width="32" height="32" alt/> Treyarch Anti-Cheat</p>`;
                    break;
					
                    case "Arbiter":
                        game.acLabel += `<p><img src="` + arbiterLogo + `" width="32" height="32" alt/> Arbiter</p>`;
                    break;

                    default:
                        game.acLabel += `<p>` + game.acList[j] + `</p>`;
                    break;
                }
            }

            // getting the stats
            switch(game.acStatus){
                case "❔ Unconfirmed":
                    noUnconfirmed++;
                break;

                case "⭐ Supported":
                    noSupported++;
                break;

                case "🎉 Confirmed":
                    noConfirmed++;
                break;
            }

            // link to the status url
            if (game.acStatusUrl !== "") {
                game.acStatus = game.acStatus.substring(0,2) + `<a class="is-underlined has-text-grey-darker" href="` + game.acStatusUrl + `">` + game.acStatus.substring(2, game.acStatus.len) + `</a>`;
            }

            gamesList[i] = game;
        }

        return {
            table: gamesList,
            noUnconfirmed,
            noSupported,
            noConfirmed,
            formatting: [{field: 'game', label: 'Game', numeric: false, sortable: true, searchable: true}, {field: 'acLabel', label: 'Anti-Cheat'}, {field: 'acStatus', label: 'Status', sortable: true}]
        }
    },
    fetchOnServer: true,

    computed: {
        pageUpdatedDate() {
            let lastUpdated = preval`module.exports = new Date().toDateString() + ", "`;
            lastUpdated += preval`module.exports = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })`
            lastUpdated += preval`module.exports = " (" + Intl.DateTimeFormat().resolvedOptions().timeZone + ")"`

            return lastUpdated;
        }
    },

    methods: {
        color(row, index) {
            if (row.acStatus.includes("🎉")) {
                return 'has-background-info';
            } else if (row.acStatus.includes("⭐")) {
                return 'has-background-success';
            }
        }
    },
}
</script>
