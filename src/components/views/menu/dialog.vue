<template>
  <div>
    <el-dialog
      :title="isadd == true ? '添加菜单' : '修改菜单'"
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
        <el-form-item label="菜单名称" prop="title">
          <el-input v-model="info.title"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" prop="pid">
          <el-select v-model="info.pid" placeholder="请选择上级菜单">
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option
              v-for="item in getMenulist"
              :key="item.id"
              :label="item.title"
              :value="item.id"
              >{{ item.title }}</el-option
            >
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型">
          <el-radio v-model="info.type" :label="1">目录</el-radio>
          <el-radio v-model="info.type" :label="2">菜单</el-radio>
        </el-form-item>
        <el-form-item label="菜单地址" v-if="info.type == 2">
          <el-select v-model="info.url" placeholder="请选择菜单地址">
            <el-option
              v-for="item in menuArray"
              :key="item.path"
              :label="item.name"
              :value="item.path"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单图标" v-else>
          <el-select v-model="info.icon" placeholder="请选择菜单图标">
            <el-option
              v-for="item in iconList"
              :key="item"
              :label="item"
              :value="item"
            >
              <i :class="item"></i>
            </el-option>
          </el-select>
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
import menu from "../../../utils/axios/menu";
import { mapActions, mapGetters } from "vuex";
import { menuArray } from "../../../router";
export default {
  data() {
    return {
      info: {
        title: "",
        pid: 0,
        icon: "",
        type: 1, //1目录2菜单
        url: "",
        status: "", //1正常2禁用
      },
      rules: {
        title: [{ required: true, message: "请输入菜单名称", trigger: "blur" }],
        pid: [{ required: true, message: "请选择上级菜单", trigger: "change" }],
      },
      iconList: [
        "el-icon-s-tools",
        "el-icon-setting",
        "el-icon-s-goods",
        "el-icon-goods",
      ],
      menuArray: menuArray,
    };
  },
  props: ["isshow", "isadd"],
  methods: {
    //添加接口
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let url = this.isadd ? "add" : "edit";
          menu[url](this.info).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.changeMenulistSync();
              this.cancel();
            } else this.$message.error(res.data.msg);
          });
        } else {
          this.$message.error("验证失败");
        }
      });
    },
    //确定、提交、取消、x操作都要执行此操作
    cancel() {
      this.$emit("cancel");
      //关闭dialog
      this.info = {};
      //清空info，避免下次出现本次的数据
      this.$refs.info.resetFields();
      //清空验证规则，避免下次出现本次验证结果
    },
    //用来拿到edit编辑操作，数据库中的匹配的数据项
    search(id) {
      menu.info({ id }).then((res) => {
        if (res.data.code == 200) {
          this.info = res.data.list;
          //匹配成功的数据没有id，所以要加上id，再赋值给当前界面
          this.info.id = id;
        } else this.$message.error(res.data.msg);
      });
    },
    ...mapActions("menu", ["changeMenulistSync"]),
  },
  //页面挂载完成之前调用数据
  created() {
    this.changeMenulistSync();
  },
  //解析vuex中的菜单列表
  computed: {
    ...mapGetters("menu", ["getMenulist"]),
  },
};
</script>

<style>
</style>