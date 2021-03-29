<template>
  <div>
    <el-dialog
      :title="isadd == true ? '添加商品规格' : '修改商品规格'"
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
        <el-form-item label="规格名称" prop="title">
          <el-input v-model="info.specsname"></el-input>
        </el-form-item>
        <el-form-item label="规格属性">
          <div
            style="display: flex; margin: 10px"
            v-for="(item, index) in specsAttrs"
            :key="index"
          >
            <el-input v-model="item.value"></el-input>
            <el-button @click="addAttr" v-if="index == 0" type="primary"
              >新增属性</el-button
            >
            <el-button @click="removeAttr(index)" v-else type="danger"
              >删除</el-button
            >
          </div>
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
import specs from "../../../utils/axios/specs";
import { mapActions, mapGetters } from "vuex";
import menu from "../../../utils/axios/menu";
export default {
  data() {
    return {
      info: {
        specsname: "",
        attrs: "",
        status: 1,
      },
      specsAttrs: [{ value: "" }],
      rules: {
        specsname: [
          { required: true, message: "请输入商品规格名称", trigger: "blur" },
        ],
      },
    };
  },
  props: ["isshow", "isadd"],
  methods: {
    //添加接口
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let url = this.isadd ? "add" : "edit";
          let menus = this.specsAttrs.reduce((menus, item) => {
            // return menus.push(item.value);
            //错误写法，因为数组.push的返回值是数组长度，不能这么写的
            menus.push(item.value);
            return menus;
          }, []);
          this.info.attrs = menus.toString();
          specs[url](this.info).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.changespecslistSync();
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
      this.specsAttrs = [{ value: "" }];
    },
    //用来拿到edit编辑操作，数据库中的匹配的数据项
    search(id) {
      specs.info({ id }).then((res) => {
        if (res.data.code == 200) {
          this.info = res.data.list[0];
          //匹配成功的数据没有id，所以要加上id，再赋值给当前界面
          this.info.id = id;
          this.specsAttrs = this.info.attrs.reduce((attrs, item) => {
            attrs.push({ value: item });
            return attrs;
          }, []);
        } else this.$message.error(res.data.msg);
      });
    },
    addAttr() {
      if (this.specsAttrs.length <= 5) {
        this.specsAttrs.push({ value: "" });
      } else {
        this.$message.error("规格属性最多添加5个");
      }
    },
    removeAttr(i) {
      this.specsAttrs.splice(i, 1);
    },
    ...mapActions("specs", ["changespecslistSync"]),
  },
  //页面挂载完成之前调用数据
  created() {
    this.changespecslistSync();
  },
  //解析vuex中的商品规格列表
  computed: {
    ...mapGetters("specs", ["getspecslist"]),
  },
};
</script>

<style>
</style>