<template>
  <div>
    <el-table
      :data="getgoodslist"
      border
      stripe
      style="width: 100%"
    >
      <el-table-column prop="id" label="商品编号" width="80"></el-table-column>
      <el-table-column prop="goodsname" label="商品名称" min-width="120px"></el-table-column>
      <el-table-column prop="price" label="商品价格"></el-table-column>
      <el-table-column prop="market_price" label="商品价格"></el-table-column>
      <el-table-column prop="img" label="图片" min-width="120px">
        <template slot-scope="scope">
          <img 
          :src="scope.row.img?scope.row.img:imgdefault"
          />
        </template>
      </el-table-column>
      <el-table-column prop="isnew" label="是否新品">
        <template slot-scope="scope">
          <el-tag effect="plain" v-if="scope.row.isnew == 1" type="success">是</el-tag>
          <el-tag effect="plain" v-else type="danger">否</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="ishot" label="是否热卖">
        <template slot-scope="scope">
          <el-tag effect="plain" v-if="scope.row.ishot == 1" type="success">是</el-tag>
          <el-tag effect="plain" v-else type="danger">否</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-tag effect="plain" v-if="scope.row.status == 1" type="success">启用</el-tag>
          <el-tag effect="plain" v-else type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="160px">
        <template slot-scope="scoped">
          <el-row>
            <el-button
              type="primary"
              @click="edit(scoped.row.id)"
              icon="el-icon-edit"
              >编辑</el-button
            >
            <el-button
              type="danger"
              @click="del(scoped.row.id)"
              icon="el-icon-delete"
              >删除</el-button
            >
          </el-row>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import goods from "../../../utils/axios/goods";
import { mapActions, mapGetters } from "Vuex";
export default {
  data() {
    return {
      imgdefault:require("../../../assets/img/dafault.jpg")
    }
  },
  methods: {
    //删除事件
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //点击了确定再调用删除接口
          goods.delete({ id }).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.changegoodslistSync();
            } else this.$message.error(res.data.msg);
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //编辑事件
    //该组件没有权限，传递id给父组件，让父组件去执行
    edit(id) {
      this.$emit("edit", id);
    },
    ...mapActions("goods", ["changegoodslistSync"]),
  },
  created() {
    this.changegoodslistSync();
  },
  computed: {
    ...mapGetters("goods", ["getgoodslist"]),
  },
};
</script>
<style scoped>
img{
  width: 120px;
  height: 100px;
  margin: auto;
}
</style>