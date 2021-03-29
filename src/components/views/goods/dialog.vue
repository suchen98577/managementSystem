<template>
  <div>
    <el-dialog
      :title="isadd == true ? '添加商品' : '修改商品'"
      :visible.sync="isshow"
      center
      width="60%"
      :before-close="cancel"
      @opened="createEditor"
    >
      <el-form
        :model="info"
        :rules="rules"
        ref="info"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="一级分类" prop="first_cateid">
          <el-select
            v-model="info.first_cateid"
            placeholder="请选择"
            @change="getsecondcatelist(false)"
          >
            <el-option
              v-for="item in getcatelist"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
              >{{ item.catename }}</el-option
            >
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" prop="second_cateid">
          <el-select v-model="info.second_cateid" placeholder="请选择">
            <el-option
              v-for="item in secondcatelist"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
              >{{ item.catename }}
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称" prop="goodsname">
          <el-input v-model="info.goodsname"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model="info.price"></el-input>
        </el-form-item>
        <el-form-item label="市场价格" prop="market_price">
          <el-input v-model="info.market_price"></el-input>
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
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-form-item>
        <el-form-item label="商品规格" prop="specsid">
          <el-select
            v-model="info.specsid"
            placeholder="请选择"
            @change="getspecsattrs(false)"
          >
            <el-option
              v-for="item in getspecslist"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
              >{{ item.specsname }}</el-option
            >
          </el-select>
        </el-form-item>
        <el-form-item label="规格属性" prop="specsattr">
          <el-select v-model="info.specsattr" placeholder="请选择" multiple>
            <el-option
              v-for="item in specsattrs"
              :key="item"
              :label="item"
              :value="item"
              >{{ item }}
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否新品">
          <template>
            <el-radio v-model="info.isnew" :label="1">是</el-radio>
            <el-radio v-model="info.isnew" :label="2">否</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="是否热卖">
          <template>
            <el-radio v-model="info.ishot" :label="1">是</el-radio>
            <el-radio v-model="info.ishot" :label="2">否</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="商品描述">
          <div id="editer"></div>
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
import goods from "../../../utils/axios/goods";
import { mapActions, mapGetters } from "vuex";
import E from "wangeditor";
export default {
  data() {
    return {
      info: {
        goodsname: "", //商品名称
        first_cateid: "", //一级分类
        second_cateid: "", //二级分类
        price: "", //价格
        market_price: "", //市场价格
        img: "",
        specsid: "", //一级规格
        specsattr: "", //二级规格
        status: "", //1正常2禁用
        isnew: 1, //是否新品
        ishot: 1, //是否热卖
        description: "", //相关描述
      },
      secondcatelist: [],
      specsattrs: [],
      filelist: [],
      dialogVisible: false,
      dialogImageUrl: "",
      editor: null,
      rules: {
        goodsname: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          {
            min: 2,
            max: 15,
            message: "商品名称在2到15个字符",
            trigger: "blur",
          },
        ],
        first_cateid: [
          { required: true, message: "请选择一级分类", trigger: "blur" },
        ],
        second_cateid: [
          { required: true, message: "请选择二级分类", trigger: "blur" },
        ],
        specsid: [
          { required: true, message: "请选择一级规格", trigger: "blur" },
        ],
        specsattr: [
          { required: true, message: "请选择二级规格", trigger: "blur" },
        ],
        price: [{ required: true, message: "请输入价格", trigger: "blur" }],
        market_price: [
          { required: true, message: "请输入市场价格", trigger: "blur" },
        ],
      },
    };
  },
  props: ["isshow", "isadd"],
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.info.specsattr = this.info.specsattr.toString();
          this.info.description = this.editor.txt.html();
          //解决重复验证的问题
          let form = new FormData();
          for (let attr in this.info) {
            form.append(attr, this.info[attr]);
          }
          let url = this.isadd ? "add" : "edit";
          goods[url](form).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.changegoodslistSync();
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
        description: "",
      };
      //就得加上这个
      //清空info，避免下次出现数据
      this.$refs.info.resetFields();
      //清空验证规则，避免下次继续验证
      this.filelist = [];
    },
    search(id) {
      goods.info({ id }).then((res) => {
        if (res.data.code == 200) {
          this.info = res.data.list;
          this.filelist = [{ url: this.info.img }];
          this.info.specsattr = this.info.specsattr.split(",");
          this.info.id = id;
          this.getspecsattrs(true);
          this.getsecondcatelist(true);
          //不清空二级菜单，直接回显
        } else this.$message.error(res.data.msg);
      });
    },
    //富文本编辑器相关
    createEditor() {
      this.editor = new E("#editer");
      this.editor.create();
      this.editor.txt.html(this.info.description);
    },
    //图片相关
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
    //文件超出个数时的钩子函数
    onExceed(file, filelist) {
      this.$message.error("最多上传一张图片");
    },
    //获取二级分类
    //写箭头函数，要么就{return}，要么就不要加{}
    //非常多次
    getsecondcatelist(tag) {
      this.secondcatelist = this.getcatelist.find(
        (item) => item.id == this.info.first_cateid
      ).children;
      if (!tag) {
        this.info.second_cateid = "";
      }
    },
    //获取二级详情
    getspecsattrs(tag) {
      this.specsattrs = this.getspecslist.find(
        (item) => item.id == this.info.specsid
      ).attrs;
      if (!tag) {
        this.info.specsattr = [];
      }
    },
    ...mapActions("cate", ["changecatelistSync"]),
    ...mapActions("specs", ["changespecslistSync"]),
    ...mapActions("goods", ["changegoodslistSync"]),
  },
  created() {
    //如果本地存储有值的话，就不要调取接口了
    //避免性能浪费
    if (this.getcatelist.length == 0) {
      this.changecatelistSync();
    }
    if (this.getspecslist.length == 0) {
      this.changespecslistSync();
    }
    this.filelist = [];
  },
  computed: {
    ...mapGetters("cate", ["getcatelist"]),
    ...mapGetters("specs", ["getspecslist"]),
  },
};
</script>
