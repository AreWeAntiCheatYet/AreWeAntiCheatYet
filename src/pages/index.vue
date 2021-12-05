<template>
    <section class="section">

        <OverView
            :noUnconfirmed="noUnconfirmed"
            :noSupported="noSupported"
            :noConfirmed="noConfirmed"
            :gamecount="gamecount"
            />

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
const neteaseLogo = require("~/assets/netease-logo.webp")
const mihoyoLogo = require("~/assets/mihoyo-logo.webp")
const ricochetLogo = require("~/assets/ricochet-logo.webp")
const nexonLogo = require("~/assets/nexon-logo.webp")
const absolutsoftLogo = require("~/assets/absolutsoft-logo.webp")

export default {
    name: 'HomePage',

    data() {
        let noUnconfirmed,noSupported,noConfirmed;
        noUnconfirmed=noSupported=noConfirmed=0;
        const gamecount = {
            BattlEye:{logo:beLogo,'❔ Unconfirmed':0,'⭐ Supported':0,'🎉 Confirmed':0},
            'Easy Anti-Cheat':{logo:eacLogo,'❔ Unconfirmed':0,'⭐ Supported':0,'🎉 Confirmed':0},
            Vanguard:{logo:vanguardLogo,'❔ Unconfirmed':0,'⭐ Supported':0,'🎉 Confirmed':0},
            'nProtect GameGuard':{logo:npggLogo,'❔ Unconfirmed':0,'⭐ Supported':0,'🎉 Confirmed':0},
            XIGNCODE3:{logo:xc3Logo,'❔ Unconfirmed':0,'⭐ Supported':0,'🎉 Confirmed':0},
            EQU8:{logo:equ8Logo,'❔ Unconfirmed':0,'⭐ Supported':0,'🎉 Confirmed':0},
            VAC:{logo:vacLogo,'❔ Unconfirmed':0,'⭐ Supported':0,'🎉 Confirmed':0},
            FairFight:{logo:ffLogo,'❔ Unconfirmed':0,'⭐ Supported':0,'🎉 Confirmed':0},
            PunkBuster:{logo:pbLogo,'❔ Unconfirmed':0,'⭐ Supported':0,'🎉 Confirmed':0},
            'Treyarch Anti-Cheat':{logo:tacLogo,'❔ Unconfirmed':0,'⭐ Supported':0,'🎉 Confirmed':0},
            Arbiter:{logo:arbiterLogo,'❔ Unconfirmed':0,'⭐ Supported':0,'🎉 Confirmed':0},
            'NEAC Protect':{logo:neteaseLogo,'❔ Unconfirmed':0,'⭐ Supported':0,'🎉 Confirmed':0},
            'miHoYo Protect 2':{logo:mihoyoLogo,'❔ Unconfirmed':0,'⭐ Supported':0,'🎉 Confirmed':0},
            RICOCHET:{logo:ricochetLogo,'❔ Unconfirmed':0,'⭐ Supported':0,'🎉 Confirmed':0},
            'Nexon Game Security':{logo:nexonLogo,'❔ Unconfirmed':0,'⭐ Supported':0,'🎉 Confirmed':0},
            Sabreclaw:{logo:absolutsoftLogo,'❔ Unconfirmed':0,'⭐ Supported':0,'🎉 Confirmed':0},
            '❔ Internal':{'❔ Unconfirmed':0,'⭐ Supported':0,'🎉 Confirmed':0},
            Other:{'❔ Unconfirmed':0,'⭐ Supported':0,'🎉 Confirmed':0},
        }

        for (let i = 0; i < gamesList.length; i++) {
            const game = gamesList[i];

            game.gameSortvalue = game.game;
            // template games with a source URL
            if (game.gameUrl.length !== 0) {
                game.game = `<a class="is-underlined has-text-grey-darker" href="` + game.gameUrl + `">` + game.game + `</a>`;
            }
            // template anti-cheats with a logo
            game.acLabel = '';
            for (let j = 0; j < game.acList.length; j++) {
                if (game.acList[j] in gamecount){
                    if ('logo' in gamecount[game.acList[j]] ){
                        game.acLabel += `<p><img src="` +  gamecount[game.acList[j]].logo + `" width="32" height="32" alt/>` + game.acList[j] + `</p>`;
                    } else {
                        game.acLabel += `<p>` + game.acList[j] + `</p>`;
                    }
                    gamecount[game.acList[j]][game.acStatus]++;
                } else {
                    game.acLabel += `<p>` + game.acList[j] + `</p>`;
                    gamecount.Other[game.acStatus]++;
                }
            }

            // getting the stats
            switch(game.acStatus){
                case "❔ Unconfirmed":
                    noUnconfirmed++;
                    game.statusSortvalue = "3";
                break;

                case "⭐ Supported":
                    noSupported++;
                    game.statusSortvalue = "1";
                break;

                case "🎉 Confirmed":
                    noConfirmed++;
                    game.statusSortvalue = "2";
                break;
            }

            // link to the status url
            if (game.acStatusUrl !== "") {
                game.acStatus = game.acStatus.substring(0,2) + `<a class="is-underlined has-text-grey-darker" href="` + game.acStatusUrl + `">` + game.acStatus.substring(2, game.acStatus.len) + `</a>`;
            }

            gamesList[i] = game;
        }

        const customSort = (key) => {
            return (a, b, isAsc) => {
                return isAsc ? a[key].localeCompare(b[key]) : b[key].localeCompare(a[key]);
            };
        };

        return {
            table: gamesList,
            noUnconfirmed,
            noSupported,
            noConfirmed,
            gamecount,
            formatting: [{field: 'game', label: 'Game', numeric: false, sortable: true, customSort: customSort('gameSortvalue'), searchable: true}, {field: 'acLabel', label: 'Anti-Cheat'}, {field: 'acStatus', label: 'Status', sortable: true, customSort: customSort('statusSortvalue')}]
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
