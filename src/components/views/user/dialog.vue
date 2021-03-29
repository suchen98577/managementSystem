<template>
  <div>
    <el-dialog
      :title="isadd == true ? '添加管理员' : '修改管理员'"
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
        <el-form-item label="所属角色" prop="pid">
          <el-select v-model="info.roleid" placeholder="请选择所属角色">
            <el-option
              v-for="item in getrolelist"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
              >{{ item.rolename }}</el-option
            >
          </el-select>
        </el-form-item>
        <el-form-item label="名称" prop="username">
          <el-input v-model="info.username"></el-input>
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
        <el-button type="primary" @click="submitForm('info')"
          >{{ isadd ? "添加" : "修改" }}
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import user from "../../../utils/axios/user";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      info: {
        roleid: "",
        username: "",
        password: "",
        status: "", //1正常2禁用
      },
      rules: {
        roleid: [
          { required: true, message: "请选择所属角色", trigger: "blur" },
        ],
        username: [
          { required: true, message: "请输入管理员名称", trigger: "blur" },
        ],
      },
    };
  },
  props: ["isshow", "isadd"],
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let url = this.isadd ? "add" : "edit";
          user[url](this.info).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.changecountSync();
              this.changeuserlistSync({
                page: Math.ceil((this.getcount + 1) / 5),
                size: 5,
              });
              this.$parent.$children[2].page = Math.ceil(
                (this.getcount + 1) / 5
              );
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
      user.info({ uid }).then((res) => {
        if (res.data.code == 200) {
          this.info = res.data.list;
          this.info.uid = uid;
          this.info.password = "";
        } else this.$message.error(res.data.msg);
      });
    },
    ...mapActions("role", ["changerolelistSync"]),
    ...mapActions("user", ["changeuserlistSync", "changecountSync"]),
  },
  created() {
    if (this.getrolelist.length == 0) {
      this.changerolelistSync();
    }
  },
  computed: {
    ...mapGetters("role", ["getrolelist"]),
    ...mapGetters("user", ["getcount"]),
  },
};
</script>
