<template>
  <div class="login-container">
    <div class="login-box">
      <h1 class="login-heading">Đăng nhập</h1>
      <form @submit.prevent="submitSignIn" class="login-form">
        <div class="form-group">
          <label for="username" class="form-label">Tên đăng nhập:</label>
          <input
            type="text"
            name="username"
            id="username"
            class="form-control"
            v-model="dataSignIn.username"
            placeholder="Nhập tên đăng nhập"
          />
          <span class="text-danger">{{ usernameErrors }}</span>
        </div>

        <div class="form-group">
          <label for="password" class="form-label">Mật khẩu:</label>
          <input
            type="password"
            name="password"
            id="password"
            class="form-control"
            v-model="dataSignIn.password"
            placeholder="Nhập mật khẩu"
          />
          <span class="text-danger">{{ passwordErrors }}</span>
        </div>

        <button type="submit" class="btn btn-primary btn-block">Đăng nhập</button>
      </form>
    </div>
  </div>
</template>

<script>
import * as Yup from "yup";
import { ref, reactive } from "vue";

const schema = Yup.object().shape({
  username: Yup.string().required("Tên đăng nhập không được để trống!"),
  password: Yup.string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .required("Mật khẩu không được để trống"),
});

export default {
  setup(props, { emit }) {
    const dataSignIn = reactive({
      username: "",
      password: "",
    });

    const usernameErrors = ref("");
    const passwordErrors = ref("");

    const submitSignIn = () => {
      usernameErrors.value = null;
      passwordErrors.value = null;
      schema.validate(dataSignIn, { abortEarly: false })
        .then(() => {
          emit("submit:signin", dataSignIn);
        })
        .catch((errors) => {
          errors.inner.forEach((error) => {
            if (error.path === "username") {
              usernameErrors.value = error.message;
            }
            if (error.path === "password") {
              passwordErrors.value = error.message;
            }
          });
        });
    };

    return {
      dataSignIn,
      usernameErrors,
      passwordErrors,
      submitSignIn,
    };
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-box {
  width: 300px;
  padding: 20px;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.login-heading {
  text-align: center;
  margin-bottom: 20px;
}

.login-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  font-weight: bold;
}

.btn {
  background-color: #007bff;
  border-color: #007bff;
}

.btn:hover {
  background-color: #0056b3;
  border-color: #0056b3;
}
</style>
