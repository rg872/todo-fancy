<template>
<div class="container">
    <div class="card" style="width: 18rem;">
        <img class="card-img-top" src="https://cdn2.iconfinder.com/data/icons/fantasy-characters/512/archer3-512.png" alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title">{{ user.name }}</h5>
            <p class="card-text">Level : {{ user.lvl }}</p>
            <p class="card-text">Title : {{ user.title }}</p>
            <br><br><br>
            <a class="btn btn-danger">BATTLE</a>
        </div>
    </div>
</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'profile',
    data: function(){
        return {

        }
    },
    methods: {

    },

    computed: mapState([
        'user'
    ])
}
</script>

<style>

</style>
