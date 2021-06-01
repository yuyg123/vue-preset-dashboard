<template>
  <div class="topNav">
    <div class="index-receive-title">
      <span>重要资料实时接收情况</span>
    </div>
    <label class="text">
      <span v-text="time"></span>
    </label>
  </div>
</template>

<script>
export default {
  name: 'TopNav',
  computed: {
    time() {
      return '';
    }
  }

};
</script>

<style scoped>
.topNav {
  position: relative;
  height: 84px;
  color: #FFF;
  background: url(../../assets/image/topNav.png) no-repeat;
  background-size: 100% 84px;
  text-align: center;
}

.index-receive-title {
  position: absolute;
  left: 50%;
  margin-left: -240px;
  width: 480px;
  height: 84px;
  line-height: 84px;
  background-image: -webkit-linear-gradient(rgba(0, 237, 255, 1), rgba(0, 220, 255, 1));
  -webkit-background-clip: text; /*必需加前缀 -webkit- 才支持这个text值 */
  -webkit-text-fill-color: transparent;
  font-weight: bold;
  letter-spacing: 10px;
  text-align: center;
}

.index-receive-title span {
  font-size: 36px;
}

.text {
  position: absolute;
  left: 1224px;
  height: 84px;
  line-height: 84px;
  color: #FFF;
}

.text span {
  font-size: 18px;
}
</style>
