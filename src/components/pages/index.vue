<template>
  <div>
    <el-container id="contain">
      <el-header>
          <Header></Header>
      </el-header>
      <el-container>
        <el-aside>
            <Aside></Aside>
        </el-aside>
        <el-main>
            <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Aside from "../views/aside"
import Header from '../views/header.vue';
export default {
  data() {
    return {};
  },
  components:{
      Aside,
    Header,
  }, 
};
</script>

<style scoped>
#contain{
    display: flex;
    width: 100vw;
    height: 100vh;
    background-color: #f5f5f5;
}
.el-header{
    background-color: #ccc;
}
.el-header h2{
    color: #DCDFE6;
    line-height: 60px;
    font-size: 20px;
}
.el-aside{
    width: 200px !important;
    overflow: hidden;
    background-color:rgb(84, 92, 100);
}
</style>