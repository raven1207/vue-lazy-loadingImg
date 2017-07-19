import 'babel-polyfill'
import Vue from 'vue'
import Vuex from 'vuex';
import App from './App.vue'

if (process.env.NODE_ENV === "production" && process.env.VUE_ENV === "server") {
    Vue.use(Vuex);
}

if (process.env.NODE_ENV === "development") {
    Vue.use(Vuex);
}

import createRouter from './router'
import createStore from './store'
import { sync } from 'vuex-router-sync'
import fnLoadImage from './components/common/fn-load-image'


//取消 Vue 所有的日志与警告。
//只有在开发环境才支持调试
//全局配置 勿动
const isDebug_mode = process.env.NODE_ENV !== 'production';
Vue.config.silent = isDebug_mode
Vue.config.debug = isDebug_mode;
Vue.config.devtools = isDebug_mode;
Vue.config.productionTip = isDebug_mode;


if (process.env.VUE_ENV === "client") {

    const fastclick = require("fastclick")
    if ('addEventListener' in document) {
        document.addEventListener('DOMContentLoaded', function() {
            fastclick.attach(document.body)
        }, false)
    }
    require("./util/zepto")
    require("./util/common")       //zepto 私有扩展
    
    const infiniteScroll = require('vue-infinite-scroll')
    const MessageBox = require("./components/common/fn-msgbox/index").default
    const Toast = require("./components/common/fn-toast/index").default


    Vue.use(infiniteScroll)
    Vue.use(require('vue-awesome-swiper/ssr'))  //swiper 插件
    Vue.component('lazy-background', fnLoadImage)
    Vue.prototype.$toast = $.toast = Toast
    Vue.prototype.$messageBox = $.messageBox = MessageBox

}

export function createApp () {

    const router = createRouter()
    const store = createStore()

    sync(store, router)


    const app = new Vue({
        router,
        store,
        render: (h) => h(App)
    })

    return { app, router, store }

}
