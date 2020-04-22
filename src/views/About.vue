<template>
  <div class="about">
    <h1>This is beautiful girls</h1>
      <div v-if="loading">{{msg}}</div>
      <div v-else>
          <ul>
              <li v-for="(item,i) in list" :key="i">
                  <img :src="item.url">
              </li>
          </ul>
      </div>

      <hello-world msg="I'm a component!"></hello-world>
  </div>
</template>

 <script>
     import HelloWorld from '@/components/HelloWorld';
     import titleMixin from '@/mixin/title';
     export default {
         mixins: [titleMixin],
         data() {
             return {
                 loading: true,
                 msg: 'loading...'
             };
         },
         asyncData({store}) {
             return store.dispatch('getList', {pageSize: 20, pageNum: 1, resType: '01'});
         },
         components: {
             'hello-world': HelloWorld
         },
         mounted() {
             this.dataPromise.then(() => {
                 this.loading = false;
             }).catch(() => {
                 this.msg = 'Get Data Error';
             });
         },
         computed: {
             list() {
                 return this.$store.state.items.list;
             }
         }
     }
 </script>

<style lang="scss">
    ul:after {
        content: '';
        display: block;
        clear: both;
    }
    li {
        list-style: none;
        float: left;
        margin: 0 5px 5px 5px;
    }
    .about {
        color: green;
    }
</style>