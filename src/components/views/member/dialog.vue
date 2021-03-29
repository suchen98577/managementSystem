<template>
  <div>
    <el-dialog
      title="修改会员"
      :visible.sync="isshow"
      center
      width="60%"
      :before-close="cancel"
    >
      <el-form
        :model="info"
        :rules="rules"
        ref="info"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="昵称">
          <el-input v-model="info.nickname"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="info.phone"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="info.password"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch
            v-model="info.status"
            active-color="#13ce66"
            inactive-color="#ccc"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submitForm('info')">修改 </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import member from "../../../utils/axios/member";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      info: {
        uid: "",
        nickname: "",
        phone: "",
        password: "",
        status: "", //1正常2禁用
      },
      rules: {
        phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
      },
    };
  },
  props: ["isshow"],
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          member.edit(this.info).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.changememberlistSync();
              this.cancel();
            } else this.$message.error(res.data.msg);
          });
        } else {
          this.$message.error("验证失败");
        }
      });
    },
    cancel() {
      this.$emit("cancel");
      //关闭dialog
      this.info = {};
      //清空info，避免下次出现数据
      this.$refs.info.resetFields();
      //清空验证规则，避免下次继续验证
    },
    search(uid) {
      member.info({ uid }).then((res) => {
        if (res.data.code == 200) {
          this.info = res.data.list;
          this.info.uid = uid;
          this.info.password = "";
        } else this.$message.error(res.data.msg);
      });
    },
    ...mapActions("member", ["changememberlistSync"]),
  },
};
</script>

0.20