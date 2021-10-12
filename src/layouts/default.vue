<template>
    <div>

        <section class="hero is-dark">
            <div class="hero-body">
                <div class="container has-text-centered">
                    <p class="title">
                        Are We Anti-Cheat Yet?
                    </p>
                    <p class="subtitle">
                        A comprehensive and crowd-sourced list of games using anti-cheats and their compatibility with GNU/Linux or Wine.
                    </p>
                </div>
            </div>
        </section>


        <section class="main-content columns">
            <div class="container column is-10">
                <Nuxt />
            </div>
        </section>

    </div>
</template>

<style>
    body
    {
        font-size: 24px;
    }

    .hero
    {
        padding: 32px 0;
    }

    .hero .title
    {
        font-size: 150%;
        margin-bottom: 48px;
    }

    .hero .subtitle
    {
        font-size: 75%;
    }
</style>
