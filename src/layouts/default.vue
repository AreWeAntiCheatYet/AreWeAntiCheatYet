<template>
    <div>

        <section class="hero is-dark">
            <div class="hero-body">
                <div class="container has-text-centered">
                    <p class="title" style="font-size: 150%">
                        Are We Anti-Cheat Yet?
                    </p>
                    <p class="subtitle" style="font-size: 75%">
                        A comprehensive and crowd-sourced list of games using anti-cheats and their compatibility with GNU/Linux or Wine/Proton.
                    </p>
                </div>
            </div>
        </section>


        <section class="main-content columns is-marginless">
            <div class="container column is-10">
                <Nuxt />
            </div>
        </section>

    </div>
</template>

<style>
    body {
        font-size: 1.8rem;
    }

    @media only screen and (max-width: 600px) {
        body {
            font-size: 1.3rem;
        }
    }
</style>
