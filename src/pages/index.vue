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
        let noUnconfirmed,noSupported,noConfirmed;
        noUnconfirmed=noSupported=noConfirmed=0;

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
