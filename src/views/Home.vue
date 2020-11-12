<template>
  <my-header />
  <div class="container">
    <div class="btn-group btn-group-sm" role="group" aria-label="Basic mixed styles example">
      <button type="button" class="btn btn-danger">Left</button>
      <button type="button" class="btn btn-warning">Middle</button>
      <button type="button" class="btn btn-success">Right</button>
    </div>
  </div>
</template>
<script>
import { Accordion } from 'bootstrap'
import MyHeader from '../components/Header/Index.vue'

export default {
  components: {
    MyHeader
  }
}
</script>