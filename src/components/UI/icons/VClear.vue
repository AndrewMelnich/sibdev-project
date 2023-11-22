<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="clear">
    <path
      d="M7.5 1A6.505 6.505 0 0 0 1 7.5C1 11.086 3.914 14 7.5 14S14 11.086 14 7.5 11.086 1 7.5 1Zm2.707 8.5-.707.707-2-2-2 2-.707-.707 2-2-2-2 .707-.707 2 2 2-2 .707.707-2 2Z"
    />
  </svg>
</template>

<script>
export default {
  name: "VClear",
};
</script>

<style lang="scss">

.clear > path{
  fill: #1390E5;

  &:hover{
    fill: red;
  }
}
</style>
