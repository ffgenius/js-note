<template>
    <div class="demo">
        <!-- 组件的结构 -->
        <h2>学生名称：{{ studentlName }}</h2>
        <h2>年龄：{{ age }}</h2>
    </div>
</template>

<script>
    // 组件交互相关的代码(数据、方法)
    export default {
        name: 'School',
        data() {
            return {
                studentlName: '小爱同学',
                age: 19
            }
        },
    }
</script>

<style>
/* 组件样式 */
</style>