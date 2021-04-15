<template>
  <div>
    <input type="text" ref="target" v-bind="$attrs" @input="onInput" :value="value" :class="fudgeClass">
  </div>
</template>

<script>
/*
 Component example: <fudge fudge-class="form-control" options="::Please Select,1::One,Two,Three" data-add="true" v-model="fudgeValue"></fudge>

 Set the path below to the /src/fudge.js file
 As the plugin is not on packagist yet, it needs to be installed manually

 * Don't forget to include the styles as needed
 */
import Fudge from "./fudge.js";

export default {
  inheritAttrs: false,
  name: 'Fudge',
  data: function () {
    return {
    }
  },
  props: {
    value: String,
    fudgeClass: {type:String, default:""},
    options: {type:String, default:""}
  },
  mounted: function(){
    new Fudge(this.$refs.target, {options:this.options});
  },
  methods: {
    onInput: function() {
      this.$emit('input', this.$refs.target.value);
    }
  }
}
</script>

<style scoped>
</style>