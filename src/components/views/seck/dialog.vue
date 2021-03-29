<template>
  <div>
    <el-dialog
      :title="isadd == true ? '添加活动' : '修改活动'"
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
        <el-form-item label="活动名称" prop="title">
          <el-input v-model="info.title"></el-input>
        </el-form-item>
        <el-form-item label="活动期限">
          <template>
            <div class="block">
              <el-date-picker
                v-model="timer"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </div>
          </template>
        </el-form-item>
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
          <el-select
            v-model="info.second_cateid"
            placeholder="请选择"
            @change="getCateGoods(false)"
          >
            <el-option
              v-for="item in secondcatelist"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
              >{{ item.catename }}
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品" prop="goodsid">
          <el-select v-model="info.goodsid" placeholder="请选择商品">
            <el-option
              v-for="item in goodsList"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
              >{{ item.goodsname }}</el-option
            >
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
import seck from "../../../utils/axios/seck";
import { mapActions, mapGetters } from "vuex";
import E from "wangeditor";
export default {
  data() {
    return {
      info: {
        title: "", //活动名称
        first_cateid: "", //一级分类
        second_cateid: "", //二级分类
        begintime: "",
        endtime: "",
        goodsid: "",
        status: "",
      },
      timer: "",
      secondcatelist: [],
      goodsList: [],
      rules: {
        title: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          {
            min: 2,
            max: 15,
            message: "活动名称在2到15个字符",
            trigger: "blur",
          },
        ],
        first_cateid: [
          { required: true, message: "请选择一级分类", trigger: "blur" },
        ],
        second_cateid: [
          { required: true, message: "请选择二级分类", trigger: "blur" },
        ],
      },
    };
  },
  props: ["isshow", "isadd"],
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.info.begintime = Date.parse(this.timer[0]);
          this.info.endtime = Date.parse(this.timer[1]);
          let url = this.isadd ? "add" : "edit";
          seck[url](this.info).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.changesecklistSync();
              this.cancel();
              this.timer="";
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
    search(id) {
      seck.info({ id }).then((res) => {
        if (res.data.code == 200) {
          this.info = res.data.list;
          this.timer = [
            new Date(this.info.begintime * 1),
            new Date(this.info.endtime * 1)
          ];
          this.info.id = id;
          this.getsecondcatelist(true);
          this.getCateGoods(true);
        } else this.$message.error(res.data.msg);
      });
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
    getCateGoods(tag) {
      seck
        .getcategoods({
          fid: this.info.first_cateid,
          sid: this.info.second_cateid,
        })
        .then((res) => {
          if (res.data.code == 200) {
            this.goodsList = res.data.list;
          } else this.message.error(res.data.msg);
        });
      if (!tag) {
        this.info.goodsid = "";
      }
    },
    ...mapActions("cate", ["changecatelistSync"]),
    ...mapActions("seck", ["changesecklistSync"]),
  },
  created() {
    //如果本地存储有值的话，就不要调取接口了
    //避免性能浪费
    if (this.getcatelist.length == 0) {
      this.changecatelistSync();
    }
  },
  computed: {
    ...mapGetters("cate", ["getcatelist"]),
  },
};
</script>
