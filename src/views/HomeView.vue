<script setup>
import { RouterLink, RouterView } from 'vue-router';

</script>

<template>
    <article>
        <div class="section-title">
            <h1>What do you wanna do today?</h1>
        </div>
        <div class="section-info">
            <RouterView />
        </div>
    </article>
    <article>
        <div class="section-title">
            <h1>Current tasks</h1>
        </div>
        <div class="section-info">
            <RouterView />
        </div>
    </article>
    <article>
        <div class="section-title">
            <h1>Completed tasks</h1>
        </div>
        <div class="section-info">
            <RouterView />
        </div>
    </article>
</template>

<style>
    article {
        margin: 1rem;
        
        .section-title {
            background-color: var(--medium-green);
            border-radius: 12px 12px 0 0;

            h1 {
                margin-left: 5px;
                padding: 5px;
                font-size: 1rem;
                color: white;
            }
        }

        .section-info {
            background-color: white;
        }
    }
</style>