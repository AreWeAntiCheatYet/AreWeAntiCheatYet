<template>
    <div class="rows is-mobile is-centered">

        <div class="pillRow row is-mobile is-centered">
                <p class="pill isSupported" >⭐ Supported: {{noSupported}}</p>
                <p class="pill isConfirmed">🎉 Confirmed: {{noConfirmed}}</p>
                <p class="pill isUnconfirmed">❔ Unconfirmed: {{noUnconfirmed}}</p>
                <p class="pill isDenied">🚫 Denied: {{noDenied}}</p>
                <p class="pill isTotal">📈 Total: {{total}}</p>
                <button class="pill breakdownBtn" @click="breakdownVisible = !breakdownVisible" v-text="breakdownVisible ? '⬆️ Hide Breakdown' : '⬇️ Show Breakdown'"></button>
        </div>

        <div class="row is-mobile is-centered">
            <div class="columns is-mobile is-centered" >

            <b-progress format="percent" size="is-large">
            <template #bar>
                <b-progress-bar :value="supportedPercent"    type="is-success" show-value></b-progress-bar>
                <b-progress-bar :value="conmfirmedPercent"   type="is-info" show-value></b-progress-bar>
                <b-progress-bar :value="unconfirmedPercent"  show-value></b-progress-bar>
				<b-progress-bar :value="deniedPercent"       type="is-danger" show-value></b-progress-bar>
            </template>
            </b-progress>
            </div>

        <table v-show="breakdownVisible" class="row is-mobile is-centered breakdownTable" >
            <tr v-for="(item,key) in gametotal"  :key="key" class="pill gameEntry">
                <td v-if="item.no>0" class="gamePill">
                    <img v-if="item.logo" :src="item.logo" width="32" height="32" />
                    {{key}}({{item.no}})
                </td>
                <td v-if="item.no>0" class="breakdownPill"><b-progress :max="item.no" size="is-large" >
                <template #bar>
                    <b-progress-bar v-if="item.Supported>0" :value="item.Supported" type="is-success" show-value></b-progress-bar>
                    <b-progress-bar v-if="item.Confirmed>0" :value="item.Confirmed" type="is-info" show-value></b-progress-bar>
                    <b-progress-bar v-if="item.Unconfirmed>0" :value="item.Unconfirmed"  show-value></b-progress-bar>
		        	<b-progress-bar v-if="item.Denied>0" :value="item.Denied" type="is-danger" show-value></b-progress-bar>
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
    noDenied:{
        type:Number,
        default:0
    },
    gamecount:{
        type:Object,
        default(){}
    },
  },
  
    data(){
        const total=this.noUnconfirmed+this.noSupported+this.noConfirmed+this.noDenied;
        
        const gametotal = {};
        for (const key in this.gamecount){
            const sum = this.gamecount[key]['❔ Unconfirmed']+this.gamecount[key]['⭐ Supported']+this.gamecount[key]['🎉 Confirmed']+this.gamecount[key]['🚫 Denied'];
            gametotal[key] = {
            logo:this.gamecount[key].logo,
            no:sum,
            Unconfirmed:this.gamecount[key]['❔ Unconfirmed'],
            Supported:this.gamecount[key]['⭐ Supported'],
            Confirmed:this.gamecount[key]['🎉 Confirmed'],
            Denied:this.gamecount[key]['🚫 Denied'],
            };
        }

        return {
            total,
            conmfirmedPercent:this.noConfirmed/total*100,
            supportedPercent:this.noSupported/total*100,
            unconfirmedPercent:this.noUnconfirmed/total*100,
			deniedPercent:this.noDenied/total*100,
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

    .gameEntry {
        width: 100%;
        display: flex;
        flex-flow: column wrap;
        gap: 0.5rem;
        border-radius: 1rem;
        background-color: #f5f5f5;
    }

    .gamePill {
        display: flex;
        flex-direction: row;
        gap: 0.5rem;
        align-items: center;
    }


    .gameEntry > td {
        width: 100%;
    }

    .breakdownTable {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .progress-wrapper {
        display: flex!important;
        flex-direction: row;
        gap: 0.5rem;
        align-items: center;
    }

    .progress-bar {
        width: 100%;
        border-radius: 0.5rem;
        /* 
          This is so progress labels
          don't go out of bounds, it 
          might not be as accurate, but
          it looks much better.
        */
        min-width: 4%;
    }

    @media only screen and (max-width: 600px) {
        .progress-bar {
            min-width: 14%;
        }
    }

    .isSupported{
        background: #93c54b !important;
        color: white;
    }

    .isConfirmed{
        background: #3298dc !important;
        color: white;
    }
	
    .isDenied{
        background: #d9534f !important;
        color: white;
    }

    .isUnconfirmed{
        padding: 0.2rem 1rem 0.2rem 1rem;
        border: 0.12rem solid black;
    }

    .isTotal{
        background: rgb(255, 174, 0);
    }

    .breakdownBtn{
        cursor: pointer;
        padding: 0.2rem 1rem 0.2rem 1rem;
        border: 0.12rem solid black;
    }
    .breakdownBtn:hover{
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
        justify-content: center;
    }


</style>

