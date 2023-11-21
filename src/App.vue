<template>
  <router-view />
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style lang="scss">
@import "./assets/style/vars.scss";
@import "./assets/style/mixins.scss";

#app {
  background-color: #fff;
  height: 100%;
}

.container{
  width: 80%;
  margin: 0 auto;
  height: 100%;

  @include phones{
    width: 95%;
  }
}
</style>
