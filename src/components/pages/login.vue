<template>
  <div class="mask">
    <el-dialog
      title="小U后台管理系统"
      :modal="false"
      :visible="true"
      center
      width="40%"
      :show-close="false"
    >
      <el-form
        :model="info"
        :rules="rules"
        ref="info"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名称" prop="username">
          <el-input v-model="info.username" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="info.password"
            type="password"
            clearable
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submitForm('info')">登录 </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import user from "../../utils/axios/user";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      isshow: true,
      info: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "用户名称不能为空", trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          user.login(this.info).then((res) => {
            if (res.data.code == 200) {
              //将登陆好的用户信息存储到vuex
              this.setuserInfoSync(res.data.list);
              this.$router.push("/index");
              this.$message.success(res.data.msg);
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          this.$message.error("验证失败");
          return false;
        }
      });
    },
    cancel() {
      this.info = {};
      this.$refs.info.resetFields();
    },
    ...mapActions(["setuserInfoSync"]),
  },
};
</script>

<style lang="stylus" scoped>
.mask {
  width: 100vw;
  height: 100vh;
  background: -webkit-linear-gradient(bottom, #409EFF, #f5f5f5, #DCDFE6);
  position: fixed;
  left: 0;
  top: 0;
}
</style>