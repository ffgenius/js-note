import App from './App'

// 导入需要被全局注册的组件
import School from "./School";

Vue.component('School', School)
new Vue({
    el: '#root',
    components: {
        App
    }
})