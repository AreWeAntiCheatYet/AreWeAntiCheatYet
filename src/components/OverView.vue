<template>
    <div class="rows is-mobile is-centered">

        <div class="row is-mobile is-centered">
            <div class="columns is-mobile is-centered" >
                <p class="pill isSupported" >⭐ Supported: {{noSupported}}</p>
                <p class="pill isConfirmed">🎉 Confirmed {{noConfirmed}}</p>
                <p class="pill isUnconfirmed">❔ Unconfirmed: {{noUnconfirmed}}</p>
                <p class="pill isTotal">📈 Total: {{total}}</p>
            </div>
        </div>

        <div class="row is-mobile is-centered">
            <div class="columns is-mobile is-centered" >

            <b-progress format="percent" :max="100" size="is-large">
            <template #bar>
                <b-progress-bar :value="supportedPercent" type="is-success" show-value></b-progress-bar>
                <b-progress-bar :value="conmfirmedPercent" type="is-info" show-value></b-progress-bar>
                <b-progress-bar :value="unconfirmedPercent" type="" show-value></b-progress-bar>
            </template>
            </b-progress>
            </div>

        </div>
    </div>
</template>

<script>


export default {
    props:['noUnconfirmed','noSupported','noConfirmed'],
    data(){
        const total=this.noUnconfirmed+this.noSupported+this.noConfirmed;
        
        return {
            total,
            conmfirmedPercent:this.noConfirmed/total*100,
            supportedPercent:this.noSupported/total*100,
            unconfirmedPercent:this.noUnconfirmed/total*100,
            };
    }
}
</script>
<style>

    .pill{
        padding: 0.3rem 1rem 0.2rem 1rem;
        font-size: 1.5rem;
        margin: 0 0.5rem 0 0.5rem;
        border-radius: 50rem;
        
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
    .row{
        margin: 1rem 0 5rem 0;
    }

</style>

