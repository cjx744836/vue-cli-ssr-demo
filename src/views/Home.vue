<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
      <div>vue-cli-ssr-demo</div>
  </div>
</template>

<script>
export default {
  name: 'Tome',
    metaInfo(){
      return {
            title: this.title,
            meta: [
                {name: 'keywords', content: "Home"},
                {name: 'description', content: "Home desc"}
            ]
      }
    },
    data() {
      return {
          title: 'Home - Girls'
      }
    },
    mounted() {
      setTimeout(() => {
          this.title = '3 seconds change title';
      }, 3000);
    }
}
</script>
