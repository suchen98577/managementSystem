<template>
  <div>
    <!-- 面包屑导航 -->
    <bread style="margin:20px 0"></bread>
    <!-- 角色列表 -->
    <list @edit="edit"></list>
    <!-- 弹出框用于编辑还有新增 -->
    <Dialog 
    :isshow="isshow" 
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
    };
  },
  methods: {
    add() {
      this.isshow = true;
    },
    cancel() {
      this.isshow = false;
    },
    edit(uid) {
      this.isshow = true;
      this.$refs.dialog.search(uid);
    },
  },
};
</script>

<style scoped>
.el-button {
  margin: 20px 5px;
}
</style>