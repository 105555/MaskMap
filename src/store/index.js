import { createStore } from 'vuex'

export default createStore({
  state: {
    //目前所選城市 , 預設為台北市
    currCity:'台北市',
    //所選行政區
    currDistrict:'大安區',
    //放API回傳縣市/行政區
    location:[],
    //放API回傳藥局資訊
    stores:[],
    keywords:'',
    showModal:false,
    infoBoxSid: null
  },
  getters: {
    cityList(state){
      //城市
      return state.location.map(v => v.name)
    },
    districtList(state) {
      //根據城市來分類行政區
      const city = state.location.find(d => d.name === state.currCity);
      return city ? city.districts.map(district => district.name) : [];
    },
    filteredStores(state){
      //縣市行政區分類
      const { stores } = state;
      return state.keywords
      ?stores.filter((d) => d.name.includes(state.keywords))
      :stores.filter((d) => d.county === state.currCity && d.town === state.currDistrict)
    },
    currDistrictInfo(state ,getters){
      return getters.districtList.find((v) => v.name === state.currDistrict) || {}
    }
  },
  mutations: {
    setcurrCity(state, payload){
      state.currCity = payload
    },
    setcurrDistrict(state, payload){
      state.currDistrict = payload
    },
    setLocation(state, payload){
      state.location = payload
    },
    setStores(state, payload){
      state.stores = payload
    },
    setKeywords(state, payload){
      state.keywords = payload
    },
    setshowModal(state, payload){
      state.showModal = payload
    },
    setInfoBoxSid(state, payload){
      state.infoBoxSid = payload
    },
  },
  actions: {
    async fetchLocations({commit}){
      const json = await fetch('https://raw.githubusercontent.com/kurotanshi/mask-map/master/raw/area-location.json')
      .then((res) => res.json());
      console.log(json);
      commit('setLocation',json)
    },
    async fetchPharmacies({commit}){
      const json = await fetch('https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json')
      .then((res) => res.json());

      const data = json.features.map(d => ({
        ...d.properties,
        latitude: d.geometry.coordinates[0],
        longitude:  d.geometry.coordinates[1]
       
      }));
      console.log(data);
      commit('setStores',data)
    }
  },
  modules: {
  }
})
