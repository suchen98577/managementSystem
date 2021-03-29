<template>
  <div>
    <el-dialog
      :title="isadd == true ? '添加轮播图' : '修改轮播图'"
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
        <el-form-item label="轮播图标题" prop="title">
          <el-input v-model="info.title"></el-input>
        </el-form-item>
        <el-form-item label="图片" prop="img">
          <el-upload
            action="#"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :auto-upload="false"
            :on-change="filechange"
            :file-list="filelist"
            :limit="1"
            :on-exceed="onExceed"
          >
            <!-- 
            on-preview 预览时执行
            on-remove 删除时执行
            auto-upload 是否选择好文件自动上传
            on-change 文件选择好之后/上传完成/失败自动触发
            file-list 图片显示，用来设置图片列表信息，格式是一个数组
         -->
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
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
import banner from "../../../utils/axios/banner";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      info: {
        title: "",
        img: "",
        status: "", //1正常2禁用
      },
      filelist: [],
      dialogVisible: false,
      dialogImageUrl: "",
      rules: {
        title: [
          { required: true, message: "请输入轮播图名称", trigger: "blur" },
        ],
      },
    };
  },
  props: ["isshow", "isadd"],
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let form = new FormData();
          for (let attr in this.info) {
            form.append(attr, this.info[attr]);
          }
          let url = this.isadd ? "add" : "edit";
          banner[url](form).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.changebannerlistSync();
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
      this.filelist = [];
      //清空图片列表
    },
    search(id) {
      banner.info({ id }).then((res) => {
        console.log(res);
        if (res.data.code == 200) {
          this.info = res.data.list;
          this.info.id = id;
          this.filelist = [{ url: this.info.img }];
        } else this.$message.error(res.data.msg);
      });
    },
    //图片预览
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //删除图片
    handleRemove() {},
    filechange(file) {
      this.info.img = file.raw;
    },
    onExceed(file, filelist) {
      this.$message.error("最多上传一张图片");
    },
    ...mapActions("banner", ["changebannerlistSync"]),
  },
  created() {
    this.changebannerlistSync();
    this.filelist = [];
  },
  computed: {
    ...mapGetters("banner", ["getbannerlist"]),
  },
};
</script>
