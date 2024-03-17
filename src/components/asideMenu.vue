<template>
  <!-- aside-menu 左側欄 -->
  <div class="aside-menu">
   

    <div class="wraps">
      <label>
        縣市：<select v-model="currCity"><option v-for="c in cityList" :key="c">{{ c }}</option></select>
      </label>
      <label>
        行政區：<select v-model="currDistrict"><option  v-for="d in districtList" :key="d"> {{ d }}</option></select>
      </label>
    </div>

    <div class="wraps">
      <label>
        <i class="fas fa-search-location"></i> 關鍵字搜尋：
        <input type="text" placeholder="請輸入關鍵字" v-model="keywords">
      </label>
    </div>

    <ul class="store-lists">
      <li class="store-info wraps" v-for="s in filteredStores" :key="s.id">
        <h1 v-html="keywordColor(s.name)"></h1>

        <div class="mask-info">
          <i class="fas fa-head-side-mask"></i>
          <span>大人口罩: {{ s.mask_adult }} 個</span>
        </div>

        <div class="mask-info">
          <i class="fas fa-baby"></i>
          <span>兒童口罩:  {{ s.child }} 個</span>
        </div>

        <div class="mask-info">
          最後更新時間: {{ s.updated }}
        </div>

        <button class="btn-store-detail" @click="openInfoBox(s.id)">
          <i class="fas fa-info-circle"></i>
          看詳細資訊
        </button>
      </li>
    </ul>

  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'asideMenu',
  computed: {
    currCity: {
      get() {
        return this.$store.state.currCity;
      },
      set(value) {
        this.$store.commit('setcurrCity', value);
      }
    },
    currDistrict: {
      get() {
        return this.$store.state.currDistrict;
      },
      set(value) {
        this.$store.commit('setcurrDistrict', value);
      }
    },
    keywords:{
      get() {
        return this.$store.state.keywords;
      },
      set(value) {
        this.$store.commit('setKeywords', value);
      }
    },
    showModal:{
      get() {
        return this.$store.state.showModal;
      },
      set(value) {
        this.$store.commit('setshowModal', value);
      }
    },
    infoBoxSid:{
      get() {
        return this.$store.state.infoBoxSid;
      },
      set(value) {
        this.$store.commit('setInfoBoxSid', value);
      }
    },
    ...mapGetters(['cityList', 'districtList','filteredStores']),
  },
  methods:{
    keywordColor(val){
      return val.replace(new RegExp(this.keywords, 'g'),`<span class="colorChange">${this.keywords}</span>`)
    },
    openInfoBox(sid){
      this.showModal = true;
      this.infoBoxSid = sid;
    }
  }
}
</script>

<style >
.colorChange{
  color:rgb(199, 145, 108)
}
</style>