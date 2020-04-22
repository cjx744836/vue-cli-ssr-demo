<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
      <div>vue-cli-ssr-demo</div>
  </div>
</template>

<script>
import titleMixin from '@/mixin/title';
export default {
  name: 'Tome',
    mixins: [titleMixin]
}
</script>
