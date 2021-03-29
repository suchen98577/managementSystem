<template>
  <div>
    <div id="container"></div>
  </div>
</template>

<script>
export default {
  mounted() {
    var map = new BMapGL.Map("container");
    var point = new BMapGL.Point(116.566956,39.875176);
    map.centerAndZoom(point, 15);
    map.enableScrollWheelZoom(true);
    map.setHeading(32.5); //设置地图旋转角度
    map.setTilt(25);
  },
};
</script>

<style scoped>
#container {
  height: 100vh;
}
</style>
