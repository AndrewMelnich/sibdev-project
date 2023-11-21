<template>
  <Teleport to="#dialog-root">
    <template v-if="visible">
      <div class="dialog-overlay" @click="close"></div>
      <div class="dialog">
        <div class="dialog__title">
          <slot name="title"></slot>
        </div>
        <slot name="content"></slot>
      </div>
    </template>
  </Teleport>
</template>

<script>
export default {
  name: "VDialog",
  props: {
    visible: { type: Boolean, required: true },
  },
  methods: {
    close() {
      this.$emit("update:visible", false);
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/style/vars.scss";
@import "@/assets/style/mixins.scss";

.dialog {
  z-index: 1010;
  background-color: #fff;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 510px;
  max-width: 100%;
  height: 585px;
  max-height: 100%;

  padding: 36px 40px;

  border-radius: 10px;
  box-shadow: 0px 10px 50px 0px rgba(19, 144, 229, 0.8);

  @include tablets {
    max-width: 80%;
    max-height: 95%;
  }

  @include phones {
    max-width: 88%;
    max-height: 95%;
    padding: 22px 10px;
  }
}

.dialog__title {
  color: #000;
  text-align: center;
  font-size: 18px;
  font-weight: 700;
  line-height: 28px;

  margin-bottom: 36px;

  @include phones {
    margin-bottom: 30px;
  }
}

.dialog-overlay {
  z-index: 900;

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  opacity: 0.8;
  background: #75c7ff;
}
</style>
