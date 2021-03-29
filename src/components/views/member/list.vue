<template>
  <div>
    <el-table :data="getmemberlist" border stripe style="width: 100%">
      <el-table-column prop="id" label="会员编号" width="80"></el-table-column>
      <el-table-column prop="nickname" label="昵称"></el-table-column>
      <el-table-column prop="phone" label="手机号"></el-table-column>
      <el-table-column prop="status" label="菜单状态">
        <template slot-scope="scope">
          <el-tag effect="plain" v-if="scope.row.status == 1" type="success"
            >启用</el-tag
          >
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
          </el-row>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import member from "../../../utils/axios/member";
import { mapActions, mapGetters } from "Vuex";
export default {
  methods: {
    //编辑事件
    //该组件没有权限，传递id给父组件，让父组件去执行
    edit(uid) {
      this.$emit("edit", uid);
    },
    ...mapActions("member", ["changememberlistSync"]),
  },
  computed: {
    ...mapGetters("member", ["getmemberlist"]),
  },
  mounted() {
    this.changememberlistSync()
  },
};
</script>
