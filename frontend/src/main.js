// ------------------------------------------------------------------------- //
// IMPORTS                                                                   //
// ------------------------------------------------------------------------- //

// Vue imports
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

// Components imports
import App from './App'
import Home from './components/Home'
import Shop from './components/Shop'
import History from './components/History'
import Stats from './components/Stats'

// Code imports
import store from './store'
import language from './language'

// ------------------------------------------------------------------------- //
// URLS                                                                      //
// ------------------------------------------------------------------------- //

// Check for prod/dev status
const production = process.env.NODE_ENV === 'production'

// DEV urls
var DEV_ROOT_URL = 'http://localhost:8080'
var DEV_ROOT_BACKEND_URL = 'http://localhost:8000'

// PROD urls
var PROD_ROOT_URL = 'http://raposfly.shop'
var PROD_ROOT_BACKEND_URL = 'http://backend.raposfly.shop'

// URLs
var ROOT_URL = production ? PROD_ROOT_URL : DEV_ROOT_URL
var ROOT_BACKEND_URL = production ? PROD_ROOT_BACKEND_URL : DEV_ROOT_BACKEND_URL
var ROOT_API_URL = ROOT_BACKEND_URL + '/api'

// ------------------------------------------------------------------------- //
// EXTERNAL LIBRARIES                                                        //
// ------------------------------------------------------------------------- //

// Load bootstrap
require('bootstrap')
import 'bootstrap/dist/css/bootstrap.css'
import 'chartist/dist/chartist.css'

// Load font-awesome
import 'font-awesome/css/font-awesome.css'

// ------------------------------------------------------------------------- //
// VUE CONFIGURATION                                                         //
// ------------------------------------------------------------------------- //

// vue-router
Vue.use(VueRouter)
const routes = [
    { path: '/', component: Home },
    { path: '/shop', component: Shop },
    { path: '/history', component: History },
    { path: '/stats', component: Stats }
]

const router = new VueRouter({
    mode: 'history',
    routes: routes
})

// vue-resource
Vue.use(VueResource)
Vue.url.options.root = ROOT_API_URL

// Create a bus for global events
var busVue = new Vue()

// vue properties
Object.defineProperties(Vue.prototype, {
    $bus: {
        get: function () {
            return busVue
        }
    },
    $root_url: {
        get: function () {
            return ROOT_URL
        }
    },
    $backend_url: {
        get: function () {
            return ROOT_BACKEND_URL
        }
    },
    $language: {
        get: function () {
            return language
        }
    }
})

// ------------------------------------------------------------------------- //
// EXPORT                                                                    //
// ------------------------------------------------------------------------- //

/* eslint-disable no-new */
new Vue({
    el: '#app',
    template: '<App/>',
    store,
    components: {
        App
    },
    router: router
})
