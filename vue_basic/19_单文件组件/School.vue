<template>
    <div class="demo">
        <!-- 组件的结构 -->
        <h2>学校名称：{{ schoolName }}</h2>
        <button @click="showName">点我提示学校名</button>
        <h2>学校地址：{{ address }}</h2>
    </div>
</template>

<script>
    // 组件交互相关的代码(数据、方法)
    export default {
        name: 'School',
        data() {
            return {
                schoolName: 'lyun',
                address: '福建'
            }
        },
        methods: {
            showName() {
                alert(11)
            }
        }
    }
</script>

<style>
/* 组件样式 */
    .demo{
        background-color: orange
    }
</style>