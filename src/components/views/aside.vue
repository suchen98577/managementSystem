<template>
  <div>
    <el-row class="tac">
      <el-col :span="12">
        <el-menu
          router
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          unique-opened
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          style="width: 200px"
        >
          <el-menu-item index="/index">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>

          <el-submenu
            v-for="item in userInfo.menus"
            :index="item.id.toString()"
            :key="item.id"
          >
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{ item.title }}</span>
            </template>
            <el-menu-item-group
              v-for="subitem in item.children"
              :key="subitem.id"
            >
              <el-menu-item :index="subitem.url">
                {{ subitem.title }}
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="/map">
            <i class="el-icon-s-promotion"></i>
            <span slot="title">地图</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
export default {
  computed: {
    ...mapGetters(["userInfo"]),
  }
};
</script>

<style scoped>
</style>