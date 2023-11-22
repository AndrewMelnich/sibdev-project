<template>
  <div class="search-form">
    <div class="search-form__title">Поиск видео</div>
    <form @submit.prevent="onSubmit">
      <div class="search-form__field">
        <VInput
          type="text"
          v-model="localQuery"
          placeholder="Что хотите посмотреть?"
          :isError="Boolean(errorMessage)"
          :class="[
            'search-form__input',
            Boolean(errorMessage) && 'search-form__input--error',
          ]"
        >
          <template #append>
            <div class="search-form__input-clear">
              <button
                v-if="localQuery"
                type="button"
                @click="resetValue"
                class="btn btn--clear"
              >
                <v-clear />
              </button>
            </div>

            <VDropdown
              v-if="isShowSaveFafouriteButton"
              class="wrapper__input-dropdown"
              @apply-hide="closeDropdown"
              :triggers="[]"
              :shown="isShowDropdown"
              :hideTriggers="['click']"
            >
              <button
                class="btn btn--like"
                type="button"
                @click="showSaveFafouriteModal"
              >
                <heart-icon
                  :class="[
                    'v-icon',
                    isFilledFouriteButton && 'v-icon--heart-fill',
                  ]"
                />
              </button>
              <template #popper>
                <div class="dropdown">
                  <div class="dropdown__title">
                    Поиск сохранён в разделе «Избранное»
                  </div>
                  <div class="dropdown__link">
                    <router-link :to="{ name: 'favourites' }"
                      >Перейти в избранное</router-link
                    >
                  </div>
                </div>
              </template>
            </VDropdown>
          </template>
          <template #append-outside>
            <button type="submit" class="btn btn--search">Найти</button>
          </template>
        </VInput>
      </div>
      <p class="error-message">
        {{ errorMessage }}
      </p>
    </form>
  </div>
</template>

<script>
import { DEFAULT_SORT_REQUEST_OPTION } from "@/constants/options";
import HeartIcon from "@/components/UI/icons/HeartIcon.vue";
import VInput from "@/components/UI/VInput.vue";
import VClear from "../UI/icons/VClear.vue";

const DEFAULT_MAX_SIZE_ITEMS = 12;

export default {
  name: "SearchForm",
  props: {
    query: {
      type: String,
      default: "",
    },
    isShowSaveFafouriteButton: {
      type: Boolean,
      default: false,
    },
    isFilledFouriteButton: {
      type: Boolean,
      default: false,
    },
    backendError: {
      type: String,
      default: "",
    },
  },
  components: {
    HeartIcon,
    VInput,
    VClear,
  },
  data() {
    return {
      queryParams: {
        query: "",
        maxSizeItems: DEFAULT_MAX_SIZE_ITEMS,
        optionOfSort: DEFAULT_SORT_REQUEST_OPTION,
      },
      error: {
        status: null,
        message: "",
      },
      localQuery: "",
      foo: "",
      isShowDropdown: false,
    };
  },
  watch: {
    query: {
      deep: true,
      immediat: true,
      handler(newQuery) {
        this.foo = newQuery;
        this.localQuery = newQuery;
      },
    },
    localQuery: {
      handler(newValue) {
        if (newValue) {
          this.error.message = "";
        }
      },
    },
    isFilledFouriteButton(value) {
      if (value) {
        this.isShowDropdown = true;
      }
    },
  },
  computed: {
    errorMessage() {
      return this.backendError || this.error.message;
    },
  },

  methods: {
    closeDropdown() {
      this.isShowDropdown = false;
    },
    resetValue() {
      this.localQuery = "";
    },
    showSaveFafouriteModal() {
      this.$emit("showSaveFafouriteModal");
    },
    onSubmit() {
      if (this.localQuery) {
        this.$emit("search", this.localQuery);
      } else {
        this.error.message = "Введите запрос";
      }
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/style/vars.scss";
@import "@/assets/style/mixins.scss";

.error-message {
  color: red;
}

.search-form {
  .v-input {
    padding: 0 0 0 15px;
    border-right: none;
    border-radius: 10px 0 0 10px;
  }
}

.search-form__title {
  text-align: center;
  color: #000;
  font-family: Roboto;
  font-size: 36px;
  font-weight: 400;
  line-height: 52px;
  margin-bottom: 40px;
}

.search-form__input {
  &::placeholder {
    color: rgba(39, 39, 39, 0.3);
  }
}

.search-form__field {
  width: 100%;
}

.btn--search {
  height: 100%;
  border-radius: 0 10px 10px 0;
  background: var(--Siberian-blue, #1390e5);
  width: 150px;

  @include phones {
    padding: 14px;
    min-width: 90px;
    width: 90px;
    font-size: 16px;
  }
}

.search-form__input-clear {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}

.btn--clear {
  width: 100%;
  height: 100%;
  padding: 0;
}
</style>
