<template>
    <section class="section">
        <div class="columns is-mobile is-centered">
            <b-table :data="table" :columns="formatting" :row-class="(row, index) => color(row, index)"></b-table>
        </div>

        <br/>
        <p class="has-text-centered">
            Don't see a game you're interested in on here yet? <a href="https://github.com/Starz0r/AreWeAntiCheatYet/issues/new?assignees=&labels=new-game%2Cstatus-change&template=0-new-game.yml&title=%3CGame+Name+Here%3E">Add it here!</a>
        </p>
    </section>
</template>

<script>
const gamesList = require("~/static/games.json");

const beLogo = require("~/assets/battleye-logo.png");
const eacLogo = require("~/assets/easy-logo.png");

export default {
    name: 'HomePage',

    data() {
        for (let i = 0; i < gamesList.length; i++) {
            const game = gamesList[i];

            // template anti-cheats with a logo
            switch (game.acName) {
                case "BattlEye":
                    game.acName = `<img src="` + beLogo + `" width="32" height="32"/> BattlEye`;
                break;

                case "Easy Anti-Cheat":
                    game.acName = `<img src="` + eacLogo + `" width="32" height="32"/> Easy Anti-Cheat`;
                break;

                default:
                    break;
            }

            // link to the status url
            if (game.acStatusUrl !== "") {
                game.acStatus = `<a href="` + game.acStatusUrl + `">` + game.acStatus + `</a>`;
            }

            gamesList[i] = game;
        }

        return {
            table: gamesList,
            formatting: [{field: 'game', label: 'Game', numeric: false, sortable: true, searchable: true}, {field: 'acName', label: 'Anti-Cheat'}, {field: 'acStatus', label: 'Status', sortable: true}]
        }
    },
    fetchOnServer: true,

    methods: {
        color(row, index) {
            if (row.acStatus.includes("🎉 Confirmed")) {
                return 'is-confirmed';
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
</style>
