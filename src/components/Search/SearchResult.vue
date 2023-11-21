<template>
  <div class="search__result">
    <div class="search__result-block">
      <div class="search__result-block__col">
        <div class="search__result__col-text">
          <h3 class="search__result__col-text__title">Видео по запросу</h3>
          <b class="search__result__col-text__request"> "{{ request }}" </b>
          <h4 class="search__result__col-text__result">
            {{ total }}
          </h4>
        </div>
      </div>
      <div class="search__result-block__col" @click="changeVisualResult">
        <button class="btn btn--result">
          <rows-icon :class="['v-icon', isRows && 'v-icon--fill']" />
        </button>
        <button class="btn btn--result">
          <colum-icon :class="['v-icon', !isRows && 'v-icon--fill']" />
        </button>
      </div>
    </div>
    <div class="videos">
      <ul
        class="videos__list"
        :class="[isRows ? 'videos__list--row' : 'videos__list--grid']"
      >
        <li class="video" v-for="video in videos" :key="video.id">
          <a
            :href="`https://www.youtube.com/watch?v=${video.id.videoId}`"
            class="video__link"
            target="_blank"
          >
            <div class="video__link-item__image">
              <img
                :src="video.snippet.thumbnails.medium.url"
                alt=""
                class="video__link-item__image-img"
              />
            </div>
            <div class="video__link-item__text">
              <div class="video__link-item__text-title">
                {{ video.snippet.title }}
              </div>
              <div class="video__link-item__text-description">
                {{ video.snippet.description }}
              </div>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ColumIcon from "../UI/icons/col and row/ColumIcon.vue";
import RowsIcon from "../UI/icons/col and row/RowsIcon.vue";

export default {
  props: {
    videos: { type: Array, default: () => [] },
    total: { type: Number, default: 0 },
    request: { type: String, default: "" },
  },
  components: {
    ColumIcon,
    RowsIcon,
  },
  data() {
    return {
      isRows: false, // строчный вариант просмотра рузультата
    };
  },
  methods: {
    changeVisualResult() {
      this.isRows = !this.isRows;
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/style/vars.scss";
@import "@/assets/style/mixins.scss";

.search__result {
  width: 100%;
}

.search__result-block {
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;

  &:last-child {
    gap: 15px;
  }

  @include phones {
    align-items: start;
    font-size: 12px;
  }
}

.search__result-block__col {
  display: flex;
  align-items: center;
  &:last-child {
    gap: 15px;
  }
}

.search__result__col-buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.search__result__col-text {
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #272727;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  column-gap: 10px;

  @include phones {
    font-size: 12px;
    width: 90%;
    flex-wrap: wrap;
    column-gap: 10px;
  }
}

.search__result__col-text__title {
  @include phones {
    font-size: 12px;
  }
}

.search__result__col-text__result {
  color: #272727;
  font-weight: 600;
  line-height: 24px;
}

///////////////////////////////// col result /////////////////////////////////
.videos {
  margin-bottom: 20px;
}

.videos__list--grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(23%, 1fr));
  gap: 20px;

  @include tablets {
    grid-template-columns: repeat(3, minmax(30%, 1fr));
  }

  @include phones {
    display: flex;
    flex-direction: column;
  }
}

.video__link {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.video__link-item__image {
  width: 100%;
  height: 138px;

  &-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }
}

.video__link-item__text {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.video__link-item__text-title {
  color: var(--color-mine-shaft, #272727);
  font-size: 14px;
  font-weight: 500;
  line-height: 16px;
  width: 100%;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.video__link-item__text-description {
  color: var(--Gray, rgba(23, 23, 25, 0.3));
  font-family: Roboto;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px; /* 114.286% */

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}

///////////////////////////////// row result /////////////////////////////////

.videos__list--row .video {
  max-width: 80%;

  @include tablets {
    max-width: 100%;
  }

  @include phones {
    max-width: 100%;
  }
}

.videos__list--row {
  display: flex;
  flex-direction: column;
  gap: 24px;
  transition: all 0.5s ease-out;

  @include phones {
    gap: 20px;
  }
}

.videos__list--row .video__link {
  display: flex;
  flex-direction: row;

  @include phones {
    word-break: break-all;
    overflow-wrap: break-word;
  }
}

.videos__list--row .video__link-item {
  display: flex;
  flex-direction: row;
}

.videos__list--row .video__link-item__image {
  max-width: 157px;
  height: 138px;
  margin-right: 20px;

  @include phones {
    min-width: 120px;
    height: 71px;
    margin-right: 15px;
  }
  &-img {
    width: 100%;
    height: 100%;
    border-radius: 8px;
  }
}

.videos__list--row .video__link-item__title {
  width: 100%;
  margin-bottom: 8px;
}

.videos__list--row .video__link-item__text-description {
  overflow: hidden;
}

.v-icon {
  > g {
    stroke: rgba(black, 0.3);

    > path {
      stroke: black;
    }
  }

  &--fill {
    > g {
      stroke: rgba(#272727, 0.3);

      > path {
        stroke: rgba(#272727, 0.3);
      }
    }
  }
}
</style>
