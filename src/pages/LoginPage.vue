<template>
  <div class="login__container">
    <form class="login">
      <div class="login__logo">
        <icon-logo :height="88" :width="88" />
      </div>
      <div class="login__welcome">Вход</div>
      <form class="login__form">
        <div class="login__form-item">
          <label class="login__form-label" for="">Логин</label>
          <v-input type="text" :isError="Boolean(error)" v-model="login" />
          <p class="error">
            {{ error }}
          </p>
        </div>

        <div class="login__form-item">
          <label class="login__form-label" for="">Пароль</label>
          <v-input
            type="password"
            :isError="Boolean(error)"
            v-model="password"
          ></v-input>
          <p class="error">
            {{ error }}
          </p>
        </div>
      </form>

      <div class="login__btn">
        <router-link to="{ name: 'search' }">
          <button class="btn btn--login" @click.prevent="auth">Войти</button>
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import IconLogo from "../components/UI/icons/IconLogo.vue";
import VInput from "../components/UI/VInput.vue";
import { useAuthStore } from "@/stores/auth";
import { fetchUsers } from "@/api/users";
import { getUsers } from "@/stores/users";

export default {
  components: {
    IconLogo,
    VInput,
  },

  data() {
    return {
      login: "",
      password: "",
      user: {},
      error: "",
      isAuthSuccess: false,
    };
  },

  methods: {
    auth() {
      if (this.login && this.password) {
        const users = getUsers();
        const findUser = users.find((user) => {
          return user.login === this.login && user.password === this.password;
        });

        if (findUser) {
          fetchUsers().then((users) => {
            const currentUser = users.find((user) => {
              return user.id === findUser.id;
            });

            const authStore = useAuthStore();
            if (findUser.id !== null) {
              // eslint-disable-next-line no-unused-vars
              const { password, ...otherValues } = findUser;
              this.user = { ...otherValues, ...currentUser };

              authStore.login(this.user);
              this.$router.push({ name: "search" });
            } else {
              console.log("");
            }
          });
        } else {
          this.error = "Пользователь не найден";
        }
      } else {
        this.error = "это поле обязательно";
      }
    },
  },
};
</script>

<style lang="scss">
@import "../assets/style/vars.scss";
@import "../assets/style/mixins.scss";

.error {
  color: red;
}

.login__container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login {
  width: 300px;
  padding: 40px 88px 60px;
  margin: 0 auto;
  align-items: center;
  text-align: center;
  border: 1px solid #2727271a;
  border-radius: 10px;

  @include phones {
    padding: 40px 10px 60px;
  }
}

.login__logo {
  display: flex;
  justify-content: center;
  margin-bottom: 32px;
  height: 88px;
  width: 88px;
  margin: 0 auto 32px;
}

.login__welcome {
  margin-bottom: 20px;
  text-align: center;
  font-size: 18px;
  font-style: bold;
  font-weight: 500;
  line-height: 28px;
}

.login__form {
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-bottom: 40px;
}

.login__form-item {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}

.login__form-label {
  color: var(--Gray, rgba(23, 23, 25, 0.3));
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
}

.login__btn {
  display: flex;
  justify-content: center;
}

.btn--login {
  color: #fff;
  background-color: #1390e5;
  width: 176px;
}
</style>
