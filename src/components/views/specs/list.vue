<template>
  <div>
    <el-table
      :data="getspecslist"
      border
      stripe
      style="width: 100%"
    >
      <el-table-column prop="id" label="规格编号" width="80"></el-table-column>
      <el-table-column prop="specsname" label="规格名称"></el-table-column>
      <el-table-column prop="attrs" label="规格属性" width="400">
        <template slot-scope="scope">
          <div >
            <el-tag 
            v-for="(item,index) in scope.row.attrs" 
            :key="index"
            type="info"
            >{{item}}</el-tag>
          </div>
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
            <el-button type="primary" @click="edit(scoped.row.id)" icon="el-icon-edit"
              >编辑</el-button
            >
            <el-button type="danger" @click="del(scoped.row.id)" icon="el-icon-delete"
              >删除</el-button
            >
          </el-row>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import specs from "../../../utils/axios/specs";
import { mapActions, mapGetters } from "vuex";
export default {
  methods: {
    ...mapActions("specs", ["changespecslistSync"]),
    //删除事件
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //点击了确定再调用删除接口
          specs.delete({ id }).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.changespecslistSync();
            } else this.$message.error(res.data.msg);
          })
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
      this.$emit("edit",id)
    },
  },
  created() {
    this.changespecslistSync();
  },
  computed: {
    ...mapGetters("specs", ["getspecslist"]),
  },
};
</script>
<style scoped>
.el-tag{
  margin:0 5px ;
}
</style>
