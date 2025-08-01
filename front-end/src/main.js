import Vue from 'vue' // Imports the Vue framework
import App from './App.vue' // Imports the main component, App.vue. This displays the application website.
import router from './router' // Imports router.js, controls which component is displayed based on the URL.
import 'semantic-ui-css/semantic.min.css' // Imports Semantic UI.
import './custom.css' 

Vue.config.productionTip = false // Disables Vue notifications in the Console, keeping it clean.

//Launching a new Vue app instance, 
new Vue({
  router, //Injects router into the app so user can navigate between pages.
  render: h => h(App) // Looks for a file called App.vue and renders the content in the file.
}).$mount('#app') // Mounts the vue app onto an instance with ID "app", found in index.html.
