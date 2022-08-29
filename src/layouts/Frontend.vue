<template>
    <Nav />
    <Tab />
    <main>
        <router-view />
    </main>
</template>

<script>
    import Nav from '@/components/frontend/Nav.vue'
    import Tab from '@/components/frontend/Tab.vue'
    export default {
        name: 'FrontendLayout',
        components: {
            Nav,
            Tab
        }
    }
</script>

<style lang="scss" scoped>

</style>