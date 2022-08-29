<template>
  <router-view/>
</template>

<script>
let brand = " | ระบบแจกของ Premium";
export default ({
  name : 'App',
  watch:{
    $route(to){
      document.title = to.meta.title + brand
    }
  }
})
</script>


