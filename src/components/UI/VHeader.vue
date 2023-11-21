<template>
  <div class="header">
    <div class="container header__container">
      <ul class="header__col">
        <li class="header__item">
          <div class="header__item-logo">
            <icon-logo :height="44" :width="44" />
          </div>
        </li>
        <li class="header__item">
          <router-link :to="{ name: 'search' }" class="header__item-link">
            <div>Поиск</div>
          </router-link>
        </li>
        <li class="header__item">
          <router-link :to="{ name: 'favourites' }" class="header__item-link">
            <div>Избранное</div>
          </router-link>
        </li>
      </ul>
      <ul class="header__col">
        <li class="header__item">
          <router-link :to="{ name: 'login' }">
            <button class="header__item-exit" @click="exit">Выйти</button>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "@/stores/auth";
import IconLogo from "../UI/icons/IconLogo.vue";

export default {
  components: { IconLogo },
  methods: {
    exit() {
      const authStore = useAuthStore();
      authStore.logout();
    },
  },
};
</script>

<style lang="scss">
@import "../../assets/style/vars.scss";
@import "../../assets/style/mixins.scss";

.active {
  color: var(--Siberian-blue, #1390e5);
}

.header__container {
  display: flex;
  justify-content: space-between;
}

.header {
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  // padding: 16px 0;
  height: 80px;
  background-color: #f1f1f1;
}

.header__col {
  display: flex;
  flex-direction: row;
  align-items: center;

  :has(.active){
    border-bottom: 2px solid #1390e5;
  }
}



.header__item {
  margin-right: 40px;
  color: rgba(39, 39, 39, 0.3);
  font-size: 18px;
  display: flex;
  align-items: center;
  height: 100%;
  

  @include phones {
    margin-right: 20px;
    font-size: 14px;

    &:first-child {
      margin-right: 7px;
    }
  }
}

.header__item {
  @include phones {
    &:first {
      margin-right: 7px;
    }
    font-size: 14px;
  }
}

.header__item-logo {
  width: 48px;
  height: 48px;
  box-sizing: border-box;
}

.header__item-exit {
  color: var(--Siberian-blue, #1390e5);
  text-align: center;
  font-family: Roboto;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px;

  @include phones {
    font-size: 14px;
  }
}
</style>
