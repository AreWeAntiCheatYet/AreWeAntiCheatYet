<template>

    <div class="columns is-mobile is-centered" >
        
        <p class="pill isConfirmed">🎉 Confirmed {{noConfirmed}}</p>
        <p class="pill isSupported" >⭐ Supported: {{noSupported}}</p>
        <p class="pill isUnconfirmed">❔ Unconfirmed: {{noUnconfirmed}}</p>
        <p class="pill isTotal">📈 Total: {{noConfirmed+noSupported+noUnconfirmed}}</p>
    </div>
</template>

<script>


export default {
    props:['noUnconfirmed','noSupported','noConfirmed']
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

</style>

