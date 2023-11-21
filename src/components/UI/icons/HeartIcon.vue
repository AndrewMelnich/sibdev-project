<template>
  <svg xmlns="http://www.w3.org/2000/svg" :fill="fillHeart">
    <path
      stroke="#1390E5"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.501 5.501 0 1 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78v0Z"
    />
  </svg>
</template>

<script>
export default {
  name: "HeartIcon",
  props: {
    fillHeart: { type: String, default: "none" },
    stroke: { type: String, default: "1390e5" },
  },
  data() {
    return {
      newFill: "#C5E4F9",
      newStroke: "#1390e5",
    };
  },
};
</script>
