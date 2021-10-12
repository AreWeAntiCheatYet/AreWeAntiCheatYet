<template>
    <section class="section">
        <div class="columns is-mobile is-centered">
            <b-table :data="table" :columns="formatting" :row-class="(row, index) => color(row, index)"></b-table>
        </div>

        <br/>
        <p class="has-text-centered">
            Don't see a game you're interested in on here yet? <a href="https://github.com/Starz0r/AreWeAntiCheatYet/issues/new?assignees=&labels=new-game%2Cstatus-change&template=0-new-game.yml&title=%3CGame+Name+Here%3E">Add it here!</a>
        </p>

        <br/>
        <p class="has-text-centered">
            Last Updated: {{new Date().toDateString()}}, {{new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}} ({{Intl.DateTimeFormat().resolvedOptions().timeZone}})
        </p>
    </section>
</template>

<script>
const gamesList = require("~/static/games.json");

const beLogo       = require("~/assets/battleye-logo.webp");
const eacLogo      = require("~/assets/easy-logo.webp");
const vanguardLogo = require("~/assets/vanguard-logo.webp");
const npggLogo     = require("~/assets/npgg-logo.webp");
const xc3Logo      = require("~/assets/xigncode3-logo.webp");
const equ8Logo     = require("~/assets/equ8-logo.webp");

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

                case "Vanguard":
                    game.acName = `<img src="` + vanguardLogo + `" width="32" height="32"/> Vanguard`;
                break;

                case "nProtect GameGuard":
                    game.acName = `<img src="` + npggLogo + `" width="32" height="32"/> nProtect GameGuard`;
                break;

                case "XIGNCODE3":
                    game.acName = `<img src="` + xc3Logo + `" width="32" height="32"/> XIGNCODE3`;
                break;

                case "EQU8":
                    game.acName = `<img src="` + equ8Logo + `" width="32" height="32"/> EQU8`;
                break;

                default:
                    break;
            }

            // Generate statSource property
            if (game.acStatusUrl !== '') {
                let buttonStyle = 'uk-button-primary';

                if (game.acStatus === '🎉 Confirmed')
                    buttonStyle = 'uk-button-default';

                game.statSource = '<a class="uk-button ' + buttonStyle + '" href="' + game.acStatusUrl + '" target="_blank">Source</a>';
            }

            else game.statSource = '';

            gamesList[i] = game;
        }

        return {
            table: gamesList,
            formatting: [
                { field: 'game', label: 'Game', numeric: false, sortable: true, searchable: true },
                { field: 'acName', label: 'Anti-Cheat' },
                { field: 'acStatus', label: 'Status', sortable: true },
                { field: 'statSource', label: 'Source' }
            ]
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
    tr.is-confirmed
    {
        background: #167df0;
        color: #fff;
    }

    tr.is-confirmed a
    {
        color: #fff;
    }

    tr.is-supported
    {
        background: #00B200;
        color: #fff;
    }

    tr.is-supported a
    {
        color: #fff;
    }

    td span
    {
        display: inline-flex;
        align-items: center;
    }

    td span img
    {
        margin: 0 8px;
    }

    /*
        UIKit primary button
        https://getuikit.com/docs/button
    */

    .uk-button
    {
        margin: 0;
        border: none;
        overflow: visible;
        font: inherit;
        color: inherit;
        -webkit-appearance: none;
        border-radius: 0;
        display: inline-block;
        box-sizing: border-box;
        padding: 0 30px;
        vertical-align: middle;
        font-size: 14px;
        line-height: 38px;
        text-align: center;
        text-decoration: none;
        text-transform: uppercase;
        transition: .1s ease-in-out;
        transition-property: color,background-color,border-color;
    }

    .uk-button:not(:disabled)
    {
        cursor: pointer;
    }

    .uk-button:hover
    {
        text-decoration: none;
    }

    .uk-button:focus
    {
        outline:none
    }

    /* Default button styles */

    .uk-button-default
    {
        background-color:transparent;
        color:#222;
        border:1px solid #e5e5e5;
    }

    .uk-button-default:hover,
    .uk-button-default:focus
    {
        background-color:transparent;
        color:#222;
        border-color:#b2b2b2;
    }

    .uk-button-default:active,
    .uk-button-default.uk-active
    {
        background-color:transparent;
        color:#222;
        border-color:#999;
    }

    /* Primary button styles */

    .uk-button-primary
    {
        background-color: #1e87f0;
        color: #fff;
        border: 1px solid transparent;
    }

    .uk-button-primary:hover,
    .uk-button-primary:focus
    {
        background-color: #0f7ae5;
        color: #fff;
    }

    .uk-button-primary:active,
    .uk-button-primary.uk-active
    {
        background-color: #0e6dcd;
        color: #fff;
    }
</style>
