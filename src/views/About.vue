<template>
  <div class="about">
    <h1>This is beautiful girls</h1>
      <button @click="test">test</button>
      <div v-if="list.length === 0">Loading...</div>
      <div v-else>
          <ul>
              <li v-for="(item,i) in list" :key="i">
                  {{item.name}} - {{item.age}}
              </li>
          </ul>
      </div>

      <hello-world msg="I'm a component!"></hello-world>
  </div>
</template>

 <script>
     import HelloWorld from '@/components/HelloWorld';
     export default {
         metaInfo: {
             title: 'girls',
             htmlAttrs: {lang: 'zh'},
             meta: [
                 {name: 'referrer', content: 'never'},
                 {name: 'keywords', content: "girls"},
                 {name: 'description', content: "girls desc"}
             ]
         },
         data() {
             return {
                 loading: true,
                 msg: 'loading...'
             };
         },
         asyncData({store}) {
             return store.dispatch('getList');
         },
         components: {
             'hello-world': HelloWorld
         },
         mounted() {
             !this.$store.state.items.list.length && this.$options.asyncData({store: this.$store, route: this.$route}).then(() => this.loading = false);
         },
         methods: {
             test() {
                 alert(1);
             }
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