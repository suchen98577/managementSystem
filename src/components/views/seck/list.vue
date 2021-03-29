<template>
  <div>
    <el-table
      :data="getsecklist"
      border
      stripe
      style="width: 100%"
    >
      <el-table-column prop="title" label="活动名称" min-width="120px"></el-table-column>
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
import seck from "../../../utils/axios/seck";
import { mapActions, mapGetters } from "Vuex";
export default {
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
          seck.delete({ id }).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.changesecklistSync();
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
    ...mapActions("seck", ["changesecklistSync"]),
  },
  created() {
    this.changesecklistSync();
  },
  computed: {
    ...mapGetters("seck", ["getsecklist"]),
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