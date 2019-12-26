<template>
  <div class="home">
  </div>
</template>

<script>
import apis from '../apis/apis';

export default {
  name: 'home',
  created() {
    this.menuV1();
  },
  methods: {
    menuV1() {
      apis.menuV1().then((res) => {
        console.log(res);
      });
    },
  },
};
</script>
<style lang="scss">
@import '../assets/style/views/home.scss';
</style>
