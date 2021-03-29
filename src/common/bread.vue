<template>
  <nav>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item
        >
      </el-breadcrumb>
    </nav>
</template>

<script>
export default {

}
</script>

<style>

</style>