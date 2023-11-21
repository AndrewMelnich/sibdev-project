<template>
  <div class="v-input-wrapper">
    <div class="v-input" :class="classes">
      <input
        class="v-input__elem"
        ref="input"
        v-bind="$attrs"
        :type="inputType"
        :value="localValue"
        :disabled="disabled"
        @input="handleInput($event.target.value)"
        @focus="isFocused = true"
        @blur="isFocused = false"
      />
      <div class="v-input__append" v-if="$slots.append">
        <slot name="append"></slot>
      </div>
      <button
        v-if="type === 'password'"
        type="button"
        @click="togglePassword"
        class="v-input__toggle-password"
      >
        <icon-eye-on
          v-if="isPasswordVisible"
          :class="[isFocused && 'v-input__icon--fill-on', 'v-input__icon']"
        />
        <icon-eye-off
          v-else
          :class="[isFocused && 'v-input__icon--fill-off', 'v-input__icon']"
        />
      </button>
    </div>
    <div class="v-input__append-outside" v-if="$slots.append">
      <slot name="append-outside"></slot>
    </div>
  </div>
</template>

<script>
import IconEyeOff from "../UI/icons/eye/EyeOff.vue";
import IconEyeOn from "../UI/icons/eye/EyeOn.vue";

export default {
  components: { IconEyeOff, IconEyeOn },
  name: "VInput",

  inheritAttrs: false,

  props: {
    filled: { type: Boolean, default: false },
    type: { type: String, default: "text" },
    isError: { type: Boolean, default: false },
    modelValue: { type: [String, Number], default: "" },
    disabled: { type: Boolean, default: false },
  },

  emits: ["update:modelValue"],

  data() {
    return {
      localValue: "",
      isPasswordVisible: false,
      isFocused: false,
    };
  },

  computed: {
    inputType() {
      if (this.type === "password") {
        return this.isPasswordVisible ? "text" : "password";
      }
      return this.type;
    },
    textOfSwitch() {
      return this.isPasswordVisible ? "Скрыть" : "Показать";
    },

    classes() {
      return [
        {
          "v-input--error": this.isError,
          "v-input--disabled": this.disabled,
          "v-input--focused": this.isFocused,
        },
      ];
    },
  },

  watch: {
    modelValue: {
      immediate: true,
      handler(newValue) {
        this.localValue = newValue;
      },
    },
  },

  methods: {
    handleInput(value) {
      this.localValue = value;
      this.$emit("update:modelValue", this.localValue);
    },
    togglePassword() {
      this.isPasswordVisible = !this.isPasswordVisible;
    },

    focus() {
      this.$refs.input.focus();
    },
  },
};
</script>

<style lang="scss">
.v-input-wrapper {
  display: flex;
}

.v-input__prepend,
.v-input__append {
  display: flex;
  align-items: center;
}

.v-input {
  /* margin-bottom: 20px; */
  color: var(--Dark, #272727);
  display: flex;
  width: 100%;
  align-items: center;
  position: relative;
  padding: 12px 15px;
  background-color: #fff;
  border-radius: 10px;
  border: 1px solid rgba(23, 23, 25, 0.2);
  transition: border-color, 0.3;

  &--focused {
    border-color: #1390e5;
    background-color: rgba(197, 228, 249, 0.3);
  }

  &--error {
    border: 1px solid red;
  }
}

.v-input__elem {
  // @include transparent-autofill;

  border: none;
  outline: none;
  width: 100%;
  font-size: 20px;
  background: transparent;

  &::placeholder {
    color: black;
  }
}

button {
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.v-input__toggle-password {
  position: absolute;
  right: +5%;
  top: 53%;
  transform: translateY(-50%);

  fill: #1390e5;
}

.v-input__icon {
  width: 24px;
  height: 24px;
}

.v-input__icon--fill-off > g > path {
  stroke: #1390e5;
}

.v-input__icon--fill-on > path {
  stroke: #1390e5;
}
</style>
