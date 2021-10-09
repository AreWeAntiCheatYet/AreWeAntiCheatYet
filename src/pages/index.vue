<template>
    <section class="section">
        <div class="columns is-mobile is-centered">
            <b-table :data="table" :columns="formatting" :row-class="(row, index) => color(row, index)"></b-table>
        </div>
    </section>
</template>

<script>
import axios from 'axios';

const beLogo = require("~/assets/battleye-logo.png");
const eacLogo = require("~/assets/easy-logo.png");

export default {
    name: 'HomePage',

    data: () => ({
        table: [],
        formatting: [{field: 'game', label: 'Game', numeric: false}, {field: 'acName', label: 'Anti-Cheat'}, {field: 'acStatus', label: 'Status'}],
    }),

    async fetch() {
        const req = await axios.get('http://localhost:3000/games.json');
        const gamesList = req.data;

        for (let i = 0; i < gamesList.length; i++) {
            // template anti-cheats with a logo
            const game = gamesList[i];
            switch (game.acName) {
                case "BattlEye":
                    game.acName = `<img src="` + beLogo + `" width="24" height="24"/> BattlEye`;
                break;

                case "Easy Anti-Cheat":
                    game.acName = `<img src="` + eacLogo + `" width="24" height="24"/> Easy Anti-Cheat`;
                break;

                default:
                    break;
            }
        }

        this.table = gamesList;
    },
    fetchOnServer: true,

    methods: {
        color(row, index) {
            switch (row.acStatus) {
                case "✔ Confirmed":
                    return 'is-confirmed';

                default:
                    break;
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
