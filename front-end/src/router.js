import Vue from 'vue';
import Router from 'vue-router'; // Imports vue and the vue-router plugin to create routes.

import Words from './views/Words.vue';
import New from './views/New.vue';
import Show from './views/Show.vue';
import Edit from './views/Edit.vue';
import Test from './views/Test.vue'; // Import each view component and their paths.


Vue.use(Router); // Initializes the vue-router plugin, allows you to use plugin features like router-link and router-view in other files.

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    linkActiveClass: 'active',
    routes: [
        {
            path: '/',
            redirect: '/words'
        },

        {
            path: '/words',
            name: 'words',
            component: Words
        },

        {
            path: '/words/new',
            name: 'new_word',
            component: New
        },

        {
            path: '/words/:wordId',
            name: 'show',
            component: Show
        },

        {
            path: '/words/:wordId/edit',
            name: 'edit',
            component: Edit
        }, 

        {
            path: '/test',
            name: 'test',
            component: Test
        }

    ]


})
