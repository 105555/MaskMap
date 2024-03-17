<template>
  <div id="app">
    <asideMenu></asideMenu>
    <maskMap></maskMap>
    <lightBox></lightBox>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import asideMenu from "./components/asideMenu.vue";
import lightBox from '@/components/lightBox'
import maskMap from '@/components/maskMap'
export default {
  name: "App",
  components: {
    asideMenu,
    lightBox,
    maskMap,
  },
  methods: {
    fetchData() {
      this.fetchLocations();
      this.fetchPharmacies();
    },
    ...mapActions(['fetchLocations', 'fetchPharmacies'])
  },
  mounted() {
    this.fetchData();
  }
};
</script>

<style lang="scss" src="./style.scss"></style>
