<template>
  <div class="header">
    <h2>小U后台管理系统</h2>
    <div class="info">
      <span>{{ userInfo.username?userInfo.username:null }}</span>
      <el-button type="danger" round @click="exit">退出登录</el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {
    ...mapActions(["setuserInfoSync"]),
    exit() {
      this.$confirm("您确定要退出码?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.setuserInfoSync(null)
          this.$router.push("/login");
          this.$message({
            type: "success",
            message: "退出成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
  },
};
</script>

<style scoped>
h2 {
  height: 100%;
  line-height: 60px;
}
.header {
  display: flex;
  justify-content: space-between;
  align-self: center;
}
.info {
  height: 100%;
  line-height: 60px;
  color: goldenrod;
  font-size: 18px;
}
img {
  display: inline;
  width: 30px;
  height: 30px;
}
</style>>