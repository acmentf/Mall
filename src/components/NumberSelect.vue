<template>
  <div id="number-select" class="clearfix">
    <span @click="reduce" class="reduce fl" :class="{stop:!isClick}">-</span>
    <input type="text" :value="value"  class="fl input" disabled style="background:#fff"/>
    <span @click="add" class="add fl">+</span>
  </div>
</template>

<script>

export default {
  props:{
    value:{
      type: Number,
      default: 0
    },
    min:{
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      currentValue: this.value,
      isClick:true
    }
  },
  watch:{
    currentValue(newValue){
      if ( newValue > this.min) {
        this.isClick = true;
      }else{
         this.isClick = false;
      }
    }
  },
  methods: {
    reduce(){
      if ( this.min < this.value) {
        this.currentValue --;
        this.$emit('input', this.value -1)
      }
    },
    add(){
       this.currentValue ++;
      this.$emit('input', this.value +1)
    }
  }
}
</script>

<style lang="less">
  #number-select{
    box-sizing: border-box;
    text-align: center;
    color:#000;
    .reduce,.add{
      width:0.6rem;
      height:0.6rem;
      line-height: 0.5rem;
      border:1px solid #ddd;
    }
    .reduce{
      border-right:0;
      border-radius: 0.05rem 0 0 0.05rem;
      &.stop{
        background: rgb(235, 235, 228);
      }
    }
    .add{
      border-left:0;
      border-radius: 0 0.05rem 0.05rem 0;
    }
    .input{
      width:0.8rem;
      height:0.6rem;
      line-height: 0.6rem;
      text-align: center;
      border:1px solid #ddd;
      &:focus{
        outline:none;
        border:1px solid #FC4A26
      }
    }
  }
</style>
