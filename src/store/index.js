import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
       incomeTagsData: {
           aligning: 'width',
           tags: [
               {
                   text: 'Tag text one'
               },
               {
                   text: 'Tag text two',
                   icon: 'mdi-domain',
               },
               {
                   text: 'Tag three',
                   icon: 'mdi-access-point',
               },
           ]
       } 
    },
    actions: {},
    mutations: {},
    getters: {
        getIncomeTagsData(state) {
            return state.incomeTagsData;
        }
    },
})