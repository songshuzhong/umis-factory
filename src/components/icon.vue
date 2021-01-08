<template>
  <span
    class="umis-icon__container"
    :class="{ invert: invert }"
    :style="{
      '--color': color,
      '--bgColor': bgColor,
      borderRadius: `${borderRadius}px`,
    }"
    @click="handleClick"
  >
    <i
      :class="icon"
      :style="{
        fontSize: `${size}px`,
        verticalAlign: 'middle',
      }"
    />
  </span>
</template>

<script>
export default {
  name: 'MisIcon',
  props: {
    path: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: false,
      default: 'el-icon-user',
    },
    color: {
      type: String,
      required: false,
      default: '#606266',
    },
    bgColor: {
      type: String,
      required: false,
      default: '#fffff',
    },
    borderRadius: {
      type: Number,
      required: false,
      default: 10,
    },
    invert: {
      type: Boolean,
      required: false,
      default: false,
    },
    size: {
      type: Number,
      required: false,
      default: 14,
    },
    action: {
      type: Function,
      required: false,
    },
    actionType: {
      type: String,
      required: true,
    },
  },
  methods: {
    handleClick() {
      this.action &&
        this.action({
          actionType: this.actionType,
        });
    },
  },
};
</script>
