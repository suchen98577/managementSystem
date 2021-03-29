<template>
  <div>
    <el-dialog
      :title="isadd == true ? '添加分类' : '修改分类'"
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
        <el-form-item label="分类名称" prop="catename">
          <el-input v-model="info.catename"></el-input>
        </el-form-item>
        <el-form-item label="上级分类" prop="pid">
          <el-select v-model="info.pid" placeholder="请选择上级分类">
            <el-option label="顶级分类" :value="0"></el-option>
            <el-option
              v-for="item in getcatelist"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
              >{{ item.catename }}</el-option
            >
          </el-select>
        </el-form-item>
        <el-form-item label="图片" prop="img" v-if="info.pid != 0">
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
import cate from "../../../utils/axios/cate";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      info: {
        pid: 0,
        catename: "",
        img: "",
        status: "", //1正常2禁用
      },
      filelist: [],
      dialogVisible: false,
      dialogImageUrl: "",
      rules: {
        pid: [{ required: true, message: "请选择上级分类", trigger: "blur" }],
        catename: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
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
          cate[url](form).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.changecatelistSync();
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
    },
    search(id) {
      cate.info({ id }).then((res) => {
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
    ...mapActions("cate", ["changecatelistSync"]),
  },
  created() {
    this.changecatelistSync();
    this.filelist = [];
  },
  computed: {
    ...mapGetters("cate", ["getcatelist"]),
  },
};
</script>
