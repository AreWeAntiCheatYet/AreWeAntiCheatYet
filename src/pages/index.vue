<template>
    <section class="section">

        <OverView
            :noUnconfirmed="noUnconfirmed"
            :noSupported="noSupported"
            :noConfirmed="noConfirmed"
			:noDenied="noDenied"
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

export default {
    name: 'HomePage',

    data() {
        let noUnconfirmed,noSupported,noConfirmed,noDenied;
        noUnconfirmed=noSupported=noConfirmed=noDenied=0;
        const gamecount = {
            BattlEye:{logo:beLogo,'❔ Unconfirmed':0,'⭐ Supported':0,'🎉 Confirmed':0,'🚫 Denied':0},
            'Easy Anti-Cheat':{logo:eacLogo,'❔ Unconfirmed':0,'⭐ Supported':0,'🎉 Confirmed':0,'🚫 Denied':0},
            Vanguard:{logo:vanguardLogo,'❔ Unconfirmed':0,'⭐ Supported':0,'🎉 Confirmed':0,'🚫 Denied':0},
            'nProtect GameGuard':{logo:npggLogo,'❔ Unconfirmed':0,'⭐ Supported':0,'🎉 Confirmed':0,'🚫 Denied':0},
            XIGNCODE3:{logo:xc3Logo,'❔ Unconfirmed':0,'⭐ Supported':0,'🎉 Confirmed':0,'🚫 Denied':0},
            EQU8:{logo:equ8Logo,'❔ Unconfirmed':0,'⭐ Supported':0,'🎉 Confirmed':0,'🚫 Denied':0},
            VAC:{logo:vacLogo,'❔ Unconfirmed':0,'⭐ Supported':0,'🎉 Confirmed':0,'🚫 Denied':0},
            FairFight:{logo:ffLogo,'❔ Unconfirmed':0,'⭐ Supported':0,'🎉 Confirmed':0,'🚫 Denied':0},
            PunkBuster:{logo:pbLogo,'❔ Unconfirmed':0,'⭐ Supported':0,'🎉 Confirmed':0,'🚫 Denied':0},
            'Treyarch Anti-Cheat':{logo:tacLogo,'❔ Unconfirmed':0,'⭐ Supported':0,'🎉 Confirmed':0,'🚫 Denied':0},
            Arbiter:{logo:arbiterLogo,'❔ Unconfirmed':0,'⭐ Supported':0,'🎉 Confirmed':0,'🚫 Denied':0},
            'NEAC Protect':{'❔ Unconfirmed':0,'⭐ Supported':0,'🎉 Confirmed':0,'🚫 Denied':0},
            'miHoYo Protect 2':{'❔ Unconfirmed':0,'⭐ Supported':0,'🎉 Confirmed':0,'🚫 Denied':0},
            RICOCHET:{'❔ Unconfirmed':0,'⭐ Supported':0,'🎉 Confirmed':0,'🚫 Denied':0},
            'Nexon Game Security':{'❔ Unconfirmed':0,'⭐ Supported':0,'🎉 Confirmed':0,'🚫 Denied':0},
            Sabreclaw:{'❔ Unconfirmed':0,'⭐ Supported':0,'🎉 Confirmed':0,'🚫 Denied':0},
            Internal:{'❔ Unconfirmed':0,'⭐ Supported':0,'🎉 Confirmed':0,'🚫 Denied':0},
            Other:{'❔ Unconfirmed':0,'⭐ Supported':0,'🎉 Confirmed':0,'🚫 Denied':0},
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
                switch (game.acList[j]) {
                    case "BattlEye":
                        game.acLabel += `<p><img src="` + beLogo + `" width="32" height="32" alt/> BattlEye</p>`;
                        gamecount.BattlEye[game.acStatus]++;
                    break;

                    case "Easy Anti-Cheat":
                        game.acLabel += `<p><img src="` + eacLogo + `" width="32" height="32" alt/> Easy Anti-Cheat</p>`;
                        gamecount['Easy Anti-Cheat'][game.acStatus]++;
                    break;

                    case "Vanguard":
                        game.acLabel += `<p><img src="` + vanguardLogo + `" width="32" height="32" alt> Vanguard</p>`;
                        gamecount.Vanguard[game.acStatus]++;
                    break;

                    case "nProtect GameGuard":
                        game.acLabel += `<p><img src="` + npggLogo + `" width="32" height="32" alt/> nProtect GameGuard</p>`;
                        gamecount['nProtect GameGuard'][game.acStatus]++;
                    break;

                    case "XIGNCODE3":
                        game.acLabel += `<p><img src="` + xc3Logo + `" width="32" height="32" alt/> XIGNCODE3</p>`;
                        gamecount.XIGNCODE3[game.acStatus]++;
                    break;

                    case "EQU8":
                        game.acLabel += `<p><img src="` + equ8Logo + `" width="32" height="32" alt/> EQU8</p>`;
                        gamecount.EQU8[game.acStatus]++;
                    break;

                    case "VAC":
                        game.acLabel += `<p><img src="` + vacLogo + `" width="32" height="32" alt/> VAC</p>`;
                        gamecount.VAC[game.acStatus]++;
                    break;

                    case "FairFight":
                        game.acLabel += `<p><img src="` + ffLogo + `" width="32" height="32" alt/> FairFight</p>`;
                        gamecount.FairFight[game.acStatus]++;
                    break;

                    case "PunkBuster":
                        game.acLabel += `<p><img src="` + pbLogo + `" width="32" height="32" alt/> PunkBuster</p>`;
                        gamecount.PunkBuster[game.acStatus]++;
                    break;
					
                    case "Treyarch Anti-Cheat":
                        game.acLabel += `<p><img src="` + tacLogo + `" width="32" height="32" alt/> Treyarch Anti-Cheat</p>`;
                        gamecount['Treyarch Anti-Cheat'][game.acStatus]++;
                    break;
					
                    case "Arbiter":
                        game.acLabel += `<p><img src="` + arbiterLogo + `" width="32" height="32" alt/> Arbiter</p>`;
                        gamecount.Arbiter[game.acStatus]++;
                    break;

                    case "NEAC Protect":
                        game.acLabel += `<p>NEAC Protect</p>`;
                        gamecount['NEAC Protect'][game.acStatus]++;
                    break;

                    case "miHoYo Protect 2":
                        game.acLabel += `<p>miHoYo Protect 2</p>`;
                        gamecount['miHoYo Protect 2'][game.acStatus]++;
                    break;

                    case "RICOCHET":
                        game.acLabel += `<p>RICOCHET</p>`;
                        gamecount.RICOCHET[game.acStatus]++;
                    break;

                    case "Nexon Game Security":
                        game.acLabel += `<p>Nexon Game Security</p>`;
                        gamecount['Nexon Game Security'][game.acStatus]++;
                    break;

                    case "Sabreclaw":
                        game.acLabel += `<p>Sabreclaw</p>`;
                        gamecount.Sabreclaw[game.acStatus]++;
                    break;

                    case "❔ Internal":
                        game.acLabel += `<p>Internal</p>`;
                        gamecount.Internal[game.acStatus]++;
                    break;

                    default:
                        game.acLabel += `<p>` + game.acList[j] + `</p>`;
                        gamecount.Other[game.acStatus]++;
                    break;
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
				
                case "🚫 Denied":
                    noDenied++;
                    game.statusSortvalue = "4";
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
			noDenied,
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
            } else if (row.acStatus.includes("🚫")) {
				return 'has-background-danger';
			}
        }
    },
}
</script>
