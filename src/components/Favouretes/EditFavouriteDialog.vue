<template>
  <VDialog v-model:visible="localVisible">
    <template #title>{{ title }}</template>
    <template #content>
      <div class="edit-favourite-dialog">
        <div class="edit-favourite-dialog__window">
          <form class="edit-favourite-dialog__form">
            <div class="edit-favourite-dialog__form-field">
              <label for="" class="edit-favourite-dialog__form-label"
                >Запрос</label
              >
              <v-input
                v-model="savedRequest.query"
                :disabled="!isEdit"
                class="edit-favourite-dialog__form-input"
              />
            </div>
            <div class="edit-favourite-dialog__form-field">
              <label for="" class="edit-favourite-dialog__form-label"
                >Название</label
              >
              <v-input
                v-model="savedRequest.name"
                :isError="isError"
                placeholder="введите имя"
                class="edit-favourite-dialog__form-input"
              />
            </div>
            <div class="edit-favourite-dialog__form-field">
              <label for="" class="edit-favourite-dialog__form-label"
                >Сортировать по</label
              >

              <select
                v-model="savedRequest.optionOfSort"
                class="edit-favourite-dialog__form-selected"
              >
                <option
                  v-for="option in $options.SORT_REQUEST_YOUTOBE_OPTIONS"
                  :key="option.value"
                  :value="option.value"
                >
                  {{ option.title }}
                </option>
              </select>
            </div>

            <div class="slider">
              <div class="slider__block">
                <div class="slider__block-select">
                  <input
                    type="range"
                    v-model="savedRequest.maxSizeItems"
                    min="0"
                    max="50"
                    class="slider__block-select__range"
                  />
                </div>
                <div class="slider__block-input">
                  <input
                    min="0"
                    max="50"
                    type="number"
                    class="slider__block-input__number"
                    v-model="savedRequest.maxSizeItems"
                  />
                </div>
              </div>
            </div>
          </form>

          <div class="edit-favourite-dialog__buttons">
            <button
              class="btn btn--white btn--edit-favourite-dialog"
              type="button"
              @click="closeeditFavouriteDialog"
            >
              Не сохранять
            </button>
            <button
              class="btn btn--blue btn--edit-favourite-dialog"
              @click="saveNewFavourite"
            >
              Сохранить
            </button>
          </div>
        </div>
      </div>
    </template>
  </VDialog>
</template>

<script>
import VDialog from "../UI/VDialog.vue";
import VInput from "../UI/VInput.vue";
import { SORT_REQUEST_YOUTOBE_OPTIONS } from "@/constants/options.js";
import cloneDeep from "lodash.clonedeep";

export default {
  SORT_REQUEST_YOUTOBE_OPTIONS,
  name: "EditFaforiteDialog",
  components: {
    VDialog,
    VInput,
  },
  props: {
    visible: { type: Boolean, required: true },
    model: {
      type: Object,
      default: () => {
        return {};
      },
    },
    request: { type: String, default: "text" },
    maxSizeItems: { type: Number, default: 12 },
    titleEditFavouriteDialog: { type: String, default: "Сохранить" },
  },
  emits: ["close", "saveFavoutite"],
  watch: {
    model: {
      handler(newModel) {
        this.resetLocalState(newModel);
      },
    },
  },

  data() {
    return {
      savedRequest: {
        id: null,
        name: "",
        query: "",
        maxSizeItems: "",
        optionOfSort: "relevance",
      },
      isError: false,
    };
  },

  computed: {
    title() {
      const text = this.isEdit ? "Изменить" : "Сохранить";
      return `${text} запрос`;
    },
    isEdit() {
      return Boolean(this.savedRequest.id);
    },
    localVisible: {
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit("update:visible", val);
      },
    },
  },

  methods: {
    resetLocalState(newModel) {
      const emptyFavourite = {
        name: "",
        query: "",
        maxSizeItems: "",
        optionOfSort: "relevance",
      };
      this.savedRequest = { ...emptyFavourite, ...cloneDeep(newModel) };
    },

    closeeditFavouriteDialog() {
      this.$emit("close");
    },

    saveNewFavourite() {
      if (this.savedRequest.name) {
        this.$emit("saveFavoutite", this.savedRequest);
        this.closeeditFavouriteDialog();
      } else {
        this.isError = true;
      }
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/style/vars.scss";
@import "@/assets/style/mixins.scss";

.edit-favourite-dialog__window {
  width: 100%;
  height: 100%;
  overflow: auto;
}
.edit-favourite-dialog-overlay {
  z-index: 900;

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  opacity: 0.8;
  background: #75c7ff;
}

.edit-favourite-dialog__form {
  box-sizing: border-box;
}

.edit-favourite-dialog__form-field {
  margin-bottom: 24px;
}

.edit-favourite-dialog__form-input {
  width: 100%;
}

.edit-favourite-dialog__form-input--error {
  border: 1px solid rgba(#b81414, 0.9);
}

.edit-favourite-dialog__form-label {
  color: var(--Dark, #272727);
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
}

.edit-favourite-dialog__form-selected {
  width: 100%;
  padding: 12px 15px;

  color: var(--Dark, #272727);
  font-size: 20px;
  font-weight: 400;
  line-height: 24px;
  border-radius: 10px;
  border: 1px solid var(--Gray, rgba(23, 23, 25, 0.3));
}

.slider {
  margin-bottom: 36px;

  @include phones {
    margin-bottom: 30px;
  }
}

.slider__block {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.slider__block-select {
  width: 80%;
}

.slider__block-select__range {
  width: 100%;
}

.slider__block-input {
  padding: 12px 15px;
  border-radius: 10px;
  border: 1px solid rgba(23, 23, 25, 0.2);
  width: 100px;
  box-sizing: border-box;

  & input {
    outline: 0;
    border: none;
    appearance: none;
    width: 100%;
    color: #272727;
    font-family: Roboto;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    text-align: center;
    padding: 0;
  }
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}

.edit-favourite-dialog__buttons {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.btn--edit-favourite-dialog {
  flex: 1;

  @include phones {
    font-size: 16px;
    padding: 14px 15px;
  }
}

input[type="range"] {
  height: 10px;
  -webkit-appearance: none;
  margin: 10px 0;
  width: 100%;
}
input[type="range"]:focus {
  outline: none;
}
input[type="range"]::-webkit-slider-runnable-track {
  width: 100%;
  height: 10px;
  cursor: pointer;
  animate: 0.2s;
  box-shadow: 2px 2px 1px #ffffff;
  background: #1693e9;
  border-radius: 10px;
  border: 1px solid #ffffff;
}
input[type="range"]::-webkit-slider-thumb {
  box-shadow: 0px 0px 0px #ffffff;
  border: 2px solid #3a90ca;
  height: 15px;
  width: 15px;
  border-radius: 15px;
  background: #ffffff;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -3px;
}
input[type="range"]:focus::-webkit-slider-runnable-track {
  background: #1693e9;
}
input[type="range"]::-moz-range-track {
  width: 100%;
  height: 10px;
  cursor: pointer;
  animate: 0.2s;
  box-shadow: 2px 2px 1px #ffffff;
  background: #1693e9;
  border-radius: 10px;
  border: 1px solid #ffffff;
}
input[type="range"]::-moz-range-thumb {
  box-shadow: 0px 0px 0px #ffffff;
  border: 2px solid #3a90ca;
  height: 15px;
  width: 15px;
  border-radius: 15px;
  background: #ffffff;
  cursor: pointer;
}
input[type="range"]::-ms-track {
  width: 100%;
  height: 10px;
  cursor: pointer;
  animate: 0.2s;
  background: transparent;
  border-color: transparent;
  color: transparent;
}
input[type="range"]::-ms-fill-lower {
  background: #1693e9;
  border: 1px solid #ffffff;
  border-radius: 15px;
  box-shadow: 2px 2px 1px #ffffff;
}
input[type="range"]::-ms-fill-upper {
  background: #1693e9;
  border: 1px solid #ffffff;
  border-radius: 15px;
  box-shadow: 2px 2px 1px #ffffff;
}
input[type="range"]::-ms-thumb {
  margin-top: 1px;
  box-shadow: 0px 0px 0px #ffffff;
  border: 2px solid #3a90ca;
  height: 15px;
  width: 15px;
  border-radius: 15px;
  background: #ffffff;
  cursor: pointer;
}
input[type="range"]:focus::-ms-fill-lower {
  background: #1693e9;
}
input[type="range"]:focus::-ms-fill-upper {
  background: #1693e9;
}
</style>
