<template>
    <div class="rows is-mobile is-centered">

        <div class="pillRow row is-mobile is-centered">
                <p class="pill isSupported" >⭐ Supported: {{noSupported}}</p>
                <p class="pill isConfirmed">🎉 Confirmed {{noConfirmed}}</p>
                <p class="pill isUnconfirmed">❔ Unconfirmed: {{noUnconfirmed}}</p>
                <p class="pill isTotal">📈 Total: {{total}}</p>
                <p v-on:click="breakdownVisible = !breakdownVisible" class="pill breakdown" v-text="breakdownVisible ? '⬆️ Hide Breakdown' : '⬇️ Show Breakdown'"></p>
        </div>

        <div class="row is-mobile is-centered">
            <div class="columns is-mobile is-centered" >

            <b-progress format="percent" size="is-large">
            <template #bar>
                <b-progress-bar :value="supportedPercent" type="is-success" show-value></b-progress-bar>
                <b-progress-bar :value="conmfirmedPercent" type="is-info" show-value></b-progress-bar>
                <b-progress-bar :value="unconfirmedPercent"  show-value></b-progress-bar>
            </template>
            </b-progress>
            </div>

        <table v-show="breakdownVisible" class="row is-mobile is-centered" >
        <tr v-for="(item,key) in gametotal"  :key="key" class="pill" >
        <td v-if="item.no>0"><img v-if="item.logo" :src="item.logo" width="32" height="32" />{{key}}({{item.no}})</td>
        <td v-if="item.no>0" class="breakdownPill"><b-progress :max="item.no" size="is-large" >
        <template #bar>
            <b-progress-bar v-if="item.Supported>0" :value="item.Supported" type="is-success" show-value></b-progress-bar>
            <b-progress-bar v-if="item.Confirmed>0" :value="item.Confirmed" type="is-info" show-value></b-progress-bar>
            <b-progress-bar v-if="item.Unconfirmed>0" :value="item.Unconfirmed"  show-value></b-progress-bar>
        </template>
        </b-progress>
         </td>
        </tr>
        </table>
        </div>
    </div>
</template>

<script>


export default {
    props: {
    noUnconfirmed:{
        type:Number,
        default:0
    },
    noSupported:{
        type:Number,
        default:0
    },
    noConfirmed:{
        type:Number,
        default:0
    },
    gamecount:{
        type:Object,
        default(){}
    },
  },
  
    data(){
        const total=this.noUnconfirmed+this.noSupported+this.noConfirmed;
        
        const gametotal = {};
        for (const key in this.gamecount){
            const sum = this.gamecount[key]['❔ Unconfirmed']+this.gamecount[key]['⭐ Supported']+this.gamecount[key]['🎉 Confirmed'];
            gametotal[key] = {
            logo:this.gamecount[key].logo,
            no:sum,
            Unconfirmed:this.gamecount[key]['❔ Unconfirmed'],
            Supported:this.gamecount[key]['⭐ Supported'],
            Confirmed:this.gamecount[key]['🎉 Confirmed']
            };
        }

        return {
            total,
            conmfirmedPercent:this.noConfirmed/total*100,
            supportedPercent:this.noSupported/total*100,
            unconfirmedPercent:this.noUnconfirmed/total*100,
            gametotal,
            breakdownVisible:false,
            };
    }
}
</script>
<style>

    .pill{
        padding: 0.3rem 1rem 0.2rem 1rem;
        font-size: 1.5rem;

        /* margin: 0 0.5rem 0 0.5rem; */
        border-radius: 50rem;
        min-width: fit-content;
        
    }

    .isSupported{
        background: #00B200;
        color: white;
    }

    .isConfirmed{
        background: #167df0;
        color: white;
    }

    .isUnconfirmed{
        padding: 0.2rem 1rem 0.2rem 1rem;
        border: 0.12rem solid black;
    }

    .isTotal{
        background: rgb(255, 174, 0);
    }

    .breakdown{
        padding: 0.2rem 1rem 0.2rem 1rem;
        border: 0.12rem solid black;
    }
    .breakdown:hover{
        background: #167df0;
        color: white;
    }

    .breakdownPill{
        width:80%;
        vertical-align:middle;
    }

    .row{
        margin: 1rem 0 5rem 0;
    }

    .pillRow{
        display: flex;
        flex-flow: row wrap;
        gap: 1rem;
    }


</style>

