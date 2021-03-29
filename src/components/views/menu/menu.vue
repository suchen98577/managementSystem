<template>
  <div>
    <!-- 面包屑导航 -->
    <bread></bread>
    <!-- 添加菜单按钮 -->
    <el-row>
      <el-button type="primary" plain @click="add">添加</el-button>
    </el-row>
    <!-- 菜单列表 -->
    <list @edit="edit"></list>
    <!-- 弹出框用于编辑还有新增 -->
    <Dialog 
    :isshow="isshow" 
    :isadd="isadd"
    @cancel="cancel"
     ref="dialog"
    ></Dialog>
  </div>
</template>

<script>
import Dialog from "./dialog.vue";
import list from "./list.vue";
export default {
  components: { list, Dialog },
  data() {
    return {
      isshow: false,
      //isshow用于控制dialog的显示隐藏，在父组件上面拿数据
      isadd: true,
      //isadd用于判断添加还是修改
    };
  },
  methods: {
    add() {
      this.isshow = true;
      this.isadd = true;
    },
    cancel() {
      this.isshow = false;
    },
    edit(id) {
      this.isshow = true;
      this.isadd = false;
      this.$refs.dialog.search(id);
    },
  },
};
</script>

<style scoped>
.el-button {
  margin: 20px 5px;
}
</style>