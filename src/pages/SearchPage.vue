<template>
  <section class="main search-page">
    <v-header />
    <div class="container container__main">
      <div class="search-page">
        <div
          class="search-page__container"
          :class="[
            response.videos.length !== 0 && 'search-page__container--result',
          ]"
        >
          <SearchForm
            :query="queryParams.query"
            @search="onSubmit"
            :backendError="error.message"
            :isFilledFouriteButton="isSaved"
            :isShowSaveFafouriteButton="isShowSaveFafouriteButton"
            @showSaveFafouriteModal="showSaveFafouriteModal"
            :class="[
              'search-page__block',
              response.videos.length == 0
                ? 'search-page__block--no-results'
                : 'search-page__block--results',
            ]"
          />

          <template v-if="response.query && !response.total">
            <p>По ваше му запросу ничего не найдено</p>
          </template>
        </div>
        <template v-if="response.total">
          <search-result
            v-if="response.videos.length > 0"
            :videos="response.videos"
            :total="response.total"
            :request="response.query"
          />
        </template>
      </div>
    </div>
    <edit-faforite-dialog
      :visible="isModalVisible"
      :model="savedModel"
      @saveFavoutite="saveFavoutite"
      @close="closeModal"
    />
  </section>
</template>

<script>
import VHeader from "@/components/UI/VHeader.vue";
import SearchResult from "@/components/Search/SearchResult.vue";
import EditFaforiteDialog from "@/components/Favouretes/EditFavouriteDialog.vue";

import { DEFAULT_SORT_REQUEST_OPTION } from "@/constants/options";
import { fetchYoutubeVideos } from "@/api/youtube";
import SearchForm from "@/components/Search/SearchForm.vue";
import { createFavouiteQuery, getCurrentUser } from "@/api/users";
const DEFAULT_MAX_SIZE_ITEMS = 12;

const ERRORS_MAP = {
  403: "Ваш ключ не действителен",
};

export default {
  name: "SearchPage",
  emits: {},

  components: {
    VHeader,
    SearchResult,
    EditFaforiteDialog,
    SearchForm,
  },

  data() {
    return {
      dropdown: false,
      queryParams: {
        query: "",
        maxSizeItems: DEFAULT_MAX_SIZE_ITEMS,
        optionOfSort: DEFAULT_SORT_REQUEST_OPTION,
      },
      error: {
        status: null,
        message: "",
      },
      savedModel: {},
      isSaved: false,
      response: {
        query: "",
        total: 0,
        videos: [],
      },
      isModalVisible: false, // вызов модального окна
    };
  },

  computed: {
    isShowSaveFafouriteButton() {
      return Boolean(this.response.total);
    },
  },

  methods: {
    showSaveFafouriteModal() {
      this.savedModel = { ...this.queryParams };
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
      this.dropdown = true;
    },

    saveFavoutite(newFavouiteRequest) {
      this.isSaved = true;

      createFavouiteQuery(newFavouiteRequest).then(() => {
        this.closeModal();
      });
    },

    onSubmit(query) {
      this.queryParams.query = query;
      fetchYoutubeVideos({
        ...this.queryParams,
      })
        .then((response) => {
          this.response.videos = response.items;
          this.response.total = response.pageInfo.totalResults;

          this.response = {
            videos: response.items,
            total: response.pageInfo.totalResults,
            query: this.queryParams.query,
          };

          this.queryParams = {
            ...this.queryParams,
            maxSizeItems: DEFAULT_MAX_SIZE_ITEMS,
            optionOfSort: DEFAULT_SORT_REQUEST_OPTION,
          };
        })
        .catch((error) => {
          this.error.message = ERRORS_MAP[error.response.status];
          this.error.status = error.response.status;
        });
    },
  },

  created() {
    if (this.$route.query.queryId) {
      const queryId = Number(this.$route.query.queryId);

      getCurrentUser().then((user) => {
        const findQuery = user.favouriteList.find(
          (favourite) => favourite.id === queryId
        );

        this.queryParams = {
          query: findQuery.query,
          maxSizeItems: findQuery.maxSizeItems,
          optionOfSort: findQuery.optionOfSort,
        };

        this.onSubmit(this.queryParams.query);
      });
    }
  },
};
</script>

<style lang="scss">
@import "@/assets/style/vars.scss";
@import "@/assets/style/mixins.scss";

.input__prepend,
.input__append {
  display: flex;
  align-items: center;
  background: #fff;
}

.input__search {
  $this: &;

  display: flex;
  align-items: center;
  position: relative;
}

.input__search:focus {
  background: rgba(197, 228, 249, 0.3);
  border: 1px solid #1390e5;
  outline: none;
}

.input__elem {
  position: relative;

  align-items: center;
  // height: 52px;
  border: none;
  outline: none;
  width: 100%;
  height: 100%;
  padding: 0 15px;

  color: var(--Dark, #272727);
  font-family: Roboto;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  color: inherit;

  &::placeholder {
    color: var(--Dark, #272727);
    font-family: Roboto;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    opacity: 0.3;
  }

  &--error {
    border-color: red;
    color: red;

    .btn--search {
      background-color: red;
    }
  }
}

.v-popper {
  height: 24px;
}

.dropdown {
  width: 220px;
  height: 121px;
  padding: 15px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  font-family: PT Sans;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
}

.dropdown__title {
  color: #272727;
  opacity: 0.5;
}

.dropdown__link {
  color: var(--Siberian-blue, #1390e5);
}

.search-page {
  height: 100%;
  width: 100%;

  &:has(.search__container--result) {
    margin-top: 40px;
  }
}

.container__main {
  height: calc(100% - 100px);
}

.search-page__container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: all 1s ease-out;
  justify-content: center;
  margin-bottom: 40px;
}

.search-page__container--result {
  height: auto;
  transition: all 1s ease-out;
  justify-content: flex-start;
}

.search-page__block--no-results {
  width: 80%;
  margin: 0 auto;
  transition: all 0.5s ease-out;
  @include phones {
    width: 100%;
  }
}

.search-page__block--results {
  width: 100%;
  margin: 0 auto;
  transition: all 0.5s ease-out;
}

.search__block-input {
  box-sizing: border-box;
  width: 100%;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  padding: 14px 200px 15px 14px;
  flex-shrink: 0;
  opacity: 0.8;
  border-radius: 10px;
  border: 1px solid rgba(23, 23, 25, 0.2);

  @include phones {
    padding: 14px 105px 15px 14px;
    font-size: 16px;
  }
}

.search__block-input:focus {
  border: 1px solid #1390e5;
  background: rgba(197, 228, 249, 0.3);
  outline: none;
}

.btn--like {
  z-index: 1000;
  width: 24px;
  height: 24px;
  padding: 0;
  min-width: 24px;
  margin-right: 15px;
}

.btn--result {
  width: 24px;
  height: 24px;
  padding: 0;
  min-width: 24px;
  z-index: 100;
}

.v-icon {
  &--heart-fill {
    fill: #c5e4f9;
  }
}
</style>
