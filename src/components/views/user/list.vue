<template>
  <div>
    <el-table :data="getuserlist" border stripe style="width: 100%">
      <el-table-column
        prop="id"
        label="管理员编号"
        width="80"
      ></el-table-column>
      <el-table-column prop="username" label="管理员名称"></el-table-column>
      <el-table-column prop="status" label="菜单状态">
        <template slot-scope="scope">
          <el-tag effect="plain" v-if="scope.row.status == 1" type="success">启用</el-tag>
          <el-tag effect="plain" v-else>禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="160px">
        <template slot-scope="scoped">
          <el-row>
            <el-button
              type="primary"
              @click="edit(scoped.row.uid)"
              icon="el-icon-edit"
              >编辑</el-button
            >
            <el-button
              type="danger"
              @click="del(scoped.row.uid)"
              icon="el-icon-delete"
              >删除</el-button
            >
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="getcount"
      :page-size="size"
      @current-change="(page) => pagechange(page)"
    >
    </el-pagination>
  </div>
</template>

<script>
import user from "../../../utils/axios/user";
import { mapActions, mapGetters } from "Vuex";
export default {
  data() {
    return {
      size: 5,
      page: 1,
    };
  },
  methods: {
    //删除事件
    del(uid) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //点击了确定再调用删除接口
          user.delete({ uid }).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.changecountSync();
              this.changeuserlistSync({
                page: this.page,
                size: this.size,
              });
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
    edit(uid) {
      this.$emit("edit", uid);
    },
    pagechange(page) {
      this.page = page;
      this.changecountSync();
      this.changeuserlistSync({
        page: this.page,
        size: this.size,
      });
    },
    ...mapActions("user", ["changeuserlistSync", "changecountSync"]),
  },
  created() {
    this.changecountSync();
    this.changeuserlistSync({
      page: this.page,
      size: this.size,
    });
  },
  computed: {
    ...mapGetters("user", ["getuserlist", "getcount"]),
  },
};
</script>
