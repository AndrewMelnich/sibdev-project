<template>
  <section>
    <v-header />
    <div class="favorites">
      <div class="container">
        <div class="favorites__welcome">Избранное</div>
        <ul class="favorites__list">
          <li
            class="favorites__item"
            v-for="favorite in favouriteList"
            :key="favorite.id"
          >
            <router-link
              :to="{ name: 'search', query: { queryId: favorite.id } }"
              class="favorites__item-link"
            >
              <div class="favorites__item-title">
                {{ favorite.name }}
              </div>
            </router-link>
            <div class="favorites__item-buttons">
              <button class="btn btn--change" @click="openModal(favorite)">
                изменить
              </button>
              <button
                class="btn btn--delete"
                @click="deleteFavoriteItem(favorite.id)"
              >
                удалить
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <edit-faforite-dialog
      :visible="isModal"
      :model="currentFavourite"
      @saveFavoutite="changeFavoriteQuery"
      @close="closeModal"
    />
  </section>
</template>

<script>
import VHeader from "../components/UI/VHeader.vue";
import EditFaforiteDialog from "../components/Favouretes/EditFavouriteDialog.vue";

import {
  getCurrentUser,
  updateFavouiteQuery,
  deleteFavouiteQuery,
} from "@/api/users";
export default {
  components: { VHeader, EditFaforiteDialog },
  data() {
    return {
      favouriteList: [],
      isModal: false,
      currentFavourite: {},
    };
  },

  methods: {
    openModal(favourite) {
      this.currentFavourite = favourite;
      this.isModal = true;
    },
    closeModal() {
      this.isModal = false;
      this.currentFavourite = {};
    },

    changeFavoriteQuery(newFavourite) {
      updateFavouiteQuery(newFavourite).then(() => {
        this.closeModal();

        getCurrentUser().then(({ favouriteList }) => {
          this.favouriteList = favouriteList;
        });
      });
    },

    deleteFavoriteItem(id) {
      deleteFavouiteQuery(id).then(({ favouriteList }) => {
        this.favouriteList = favouriteList;
      });
    },
  },

  created() {
    getCurrentUser().then(({ favouriteList }) => {
      this.favouriteList = favouriteList;
    });
  },
};
</script>

<style lang="scss">
@import "../assets/style/vars.scss";
@import "../assets/style/mixins.scss";

.favorites {
  padding: 40px 0;
  background: #fafafa;
}

.favorites__welcome {
  color: #000;
  font-family: Roboto;
  font-size: 28px;
  font-style: normal;
  font-weight: 400;
  line-height: 40px;

  margin-bottom: 40px;
}

.favorites__item {
  $this: &;
  background-color: #fff;
  height: 47px;
  padding: 0 20px;
  box-sizing: border-box;
  align-items: center;
  display: flex;

  position: relative;
  margin-bottom: 3px;

  &:hover {
    #{$this}-buttons {
      visibility: visible;
    }
  }

  @include phones {
    padding: 0 10px;
  }
}

.favorites__item-link {
  overflow: hidden;
}

.favorites__item-title {
  // max-width: 90%;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  word-break: normal;
  overflow: hidden;
}

.favorites__item-buttons {
  z-index: 100;
  position: absolute;
  right: 20px;
  padding-left: 5px;
  background-color: #fff;
  display: flex;
  flex-direction: row;
  gap: 30px;
  visibility: hidden;

  @include phones {
    right: 0px;
    gap: 10px;
    opacity: 0.7;
    padding-left: 5px;
  }
  @include tablets {
    opacity: 0.7;
  }
}

.btn--change {
  background-color: transparent;
  color: var(--Siberian-blue, #1390e5);
  font-size: 14px;
  padding: 0;
}

.btn--delete {
  background-color: transparent;
  color: #f00;
  font-size: 14px;
  padding: 10px;
}
</style>
