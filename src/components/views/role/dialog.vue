<template>
  <div>
    <el-dialog
      :title="isadd == true ? '添加角色' : '修改角色'"
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
        <el-form-item label="角色名称" prop="rolename">
          <el-input v-model="info.rolename"></el-input>
        </el-form-item>
        <el-form-item label="角色权限">
          <el-tree
            :data="getMenulist"
            show-checkbox
            default-expand-all
            node-key="id"
            ref="tree"
            :props="defaultProps"
            :default-checked-keys="info.menus.split(',')"
          >
          </el-tree>
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
import role from "../../../utils/axios/role";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      info: {
        rolename: "",
        menus: "",
        status: "", //1正常2禁用
      },
      rules: {
        rolename: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
        ],
      },
      defaultProps: {
        children: "children",
        label: "title",
      },
    };
  },
  props: ["isshow", "isadd"],
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.info.menus = this.$refs.tree.getCheckedKeys().toString();
          let url = this.isadd ? "add" : "edit";
          role[url](this.info).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.changerolelistSync();
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
      this.info = {
        menus: "",
      };
      //清空info，避免下次出现数据
      this.$refs.info.resetFields();
      //清空验证规则，避免下次继续验证
      this.$refs.tree.setCheckedKeys([]);
      //清空树结点的选择
    },
    search(id) {
      role.info({ id }).then((res) => {
        if (res.data.code == 200) {
          this.info = res.data.list;
          this.info.id = id;
        } else this.$message.error(res.data.msg);
      });
    },
    ...mapActions("menu", ["changeMenulistSync"]),
    ...mapActions("role", ["changerolelistSync"]),
  },
  created() {
    if (this.getMenulist.length == 0) {
      this.changeMenulistSync();
    }
  },
  computed: {
    ...mapGetters("menu", ["getMenulist"]),
  },
};
</script>

<style>
</style>