<template>
<div class="container">
    <ul class="list-group">
        <div v-for="(todo, index) in todo" :key="index">
            <button type="button" class="list-group-item list-group-item-action" data-toggle="modal" :data-target="`#${index}`" :style="{'background-color': isDone(todo.status)}">
                {{ todo.title }}
            </button>

            <!-- Modal -->
            <div class="modal fade" :id="index" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">{{ todo.title }}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <label>Description</label>
                            <p>{{ todo.description }}</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-danger" v-if="todo.status" @click="deleteTodo(todo)" data-dismiss="modal">Delete</button>
                            <button type="button" class="btn btn-primary" @click="statusDone(todo)" data-dismiss="modal">Done</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </ul>
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#createmodal">Create Todo</button>
    <!-- Modal -->
    <div class="modal fade" id="createmodal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Create Todo</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="exampleInputEmail1">Title</label>
                        <input type="text" class="form-control" placeholder="Enter Title" v-model="title">                        
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Description</label>
                        <input type="text" class="form-control" placeholder="Enter Description" v-model="description">                        
                    </div>  
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" @click="saveTodo" data-dismiss="modal">Save changes</button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'todo',
    data: function(){
        return {
            title: '',
            description: ''
        }
    },
    methods: {
        isDone : function (status) {
            if(status){
                return 'rgba(36,54,255,0.5)'
            } else {
                return 'rgba(230,230,230,0.5)'
            }
        },

        saveTodo: function () {
            let todo = {
                title: this.title,
                description: this.description,                
            }

            let token = {token: localStorage.getItem('token')}

            this.title = ''
            this.description = ''

            this.$store.dispatch('saveTodo', {todo, token})
        },

        statusDone: function (todo) {
            let token = {token: localStorage.getItem('token')}

            this.$store.dispatch('updateTodo', {todo, token})
        },

        deleteTodo: function(todo){
            let token = {token: localStorage.getItem('token')}

            this.$store.dispatch('deleteTodo', {todo, token})
        }

    },
    computed: mapState([
        'todo'
    ])
}
</script>

<style>

</style>
