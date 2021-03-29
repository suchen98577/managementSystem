<template>
  <div>
    <el-table
      :data="getMenulist"
      border
      stripe
      style="width: 100%"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      row-key="id"
    >
      <el-table-column prop="id" label="菜单编号" width="80"></el-table-column>
      <el-table-column prop="title" label="菜单名称"></el-table-column>
      <el-table-column prop="pid" label="上级菜单" width="80">
      </el-table-column>
      <el-table-column prop="icon" label="菜单图标" width="80">
        <template slot-scope="scope">
          <i :class="scope.row.icon"></i>
        </template>
      </el-table-column>
      <el-table-column prop="url" label="菜单地址"> </el-table-column>
      <el-table-column prop="status" label="菜单状态">
        <template slot-scope="scope">
          <el-tag effect="plain" v-if="scope.row.status == 1" type="success">启用</el-tag>
          <el-tag effect="plain" v-else>禁用</el-tag>
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
import menu from "../../../utils/axios/menu";
import { mapActions, mapGetters } from "vuex";
export default {
  methods: {
    ...mapActions("menu", ["changeMenulistSync"]),
    //删除事件
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //点击了确定再调用删除接口
          menu.delete({ id }).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.changeMenulistSync();
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
    this.changeMenulistSync();
  },
  computed: {
    ...mapGetters("menu", ["getMenulist"]),
  },
};
</script>
