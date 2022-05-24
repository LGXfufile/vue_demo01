import Vue from 'vue'
import Router from 'vue-router'

import Header from "../components/Header";
import Context from "../components/Context";
Vue.use(Router)
export default new Router({
    routes:[{
        path:'/',
        name:Header,
        component:Header
    },
        {
            path:'/context',
            name:"context",
            component:Context
        }]
})

