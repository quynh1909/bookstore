<template>
  <section>
    <div class="container-fluid">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
          <div class="login-box">
            <p class="text-center h1 fw-bold mb-5">ĐĂNG KÝ</p>
            <form @submit.prevent="submitSignUp">
              <!-- Form fields -->
              <div class="mb-4">
                <div class="input-group">
                  <span class="input-group-text"><i class="fas fa-user fa-lg fa-fw"></i></span>
                  <input type="text" class="form-control" name="name" placeholder="Vui lòng nhập họ và tên" v-model="dataSignUp.name">
                </div>
                <span class="text-danger">{{ nameErrors }}</span>
              </div>

              <div class="mb-4">
                <div class="input-group">
                  <span class="input-group-text"><i class="fas fa-envelope fa-lg fa-fw"></i></span>
                  <input type="email" class="form-control" name="email" placeholder="Vui lòng nhập email" v-model="dataSignUp.email">
                </div>
                <span class="text-danger">{{ emailErrors }}</span>
              </div>

              <div class="mb-4">
                <div class="input-group">
                  <span class="input-group-text"><i class="fas fa-lock fa-lg fa-fw"></i></span>
                  <input type="password" class="form-control" name="password" placeholder="Vui lòng nhập mật khẩu" v-model="dataSignUp.password">
                </div>
                <span class="text-danger">{{ passwordErrors }}</span>
              </div>

              <div class="mb-4">
                <div class="input-group">
                  <span class="input-group-text"><i class="fas fa-key fa-lg fa-fw"></i></span>
                  <input type="password" class="form-control" name="co-password" placeholder="Vui lòng nhập lại mật khẩu" v-model="dataSignUp.co_password">
                </div>
                <span class="text-danger">{{ copasswordErrors }}</span>
              </div>

              <div class="mb-4">
                <div class="input-group">
                  <span class="input-group-text"><i class="fas fa-phone fa-lg fa-fw"></i></span>
                  <input type="text" class="form-control" name="phone" placeholder="Vui lòng nhập số điện thoại" v-model="dataSignUp.phone">
                </div>
                <span class="text-danger">{{ phoneErrors }}</span>
              </div>

              <div class="mb-4">
                <div class="input-group">
                  <span class="input-group-text"><i class="fas fa-address-card fa-lg fa-fw"></i></span>
                  <input type="text" class="form-control" name="address" placeholder="Vui lòng nhập địa chỉ" v-model="dataSignUp.address">
                </div>
                <span class="text-danger">{{ addressErrors }}</span>
              </div>

              <!-- Submit button -->
              <div class="mb-4 text-center">
                <button type="submit" class="btn btn-dark btn-lg">Đăng ký</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import * as Yup from "yup";
import { ref, reactive } from "vue";

const schema = Yup.object().shape({
  name: Yup.string().required("Họ và tên không được để trống"),
  email: Yup.string().email("Email phải đúng định dạng").required("Email không được để trống"),
  password: Yup.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự").matches(/[a-z]/, "Mật khẩu phải có ít nhất một chữ cái thường").required("Mật khẩu không được để trống"),
  co_password: Yup.string().oneOf([Yup.ref("password")], "Mật khẩu nhập lại chưa khớp").required("Mật khẩu nhập lại không được để trống"),
  phone: Yup.string().required("Số điện thoại không được để trống"),
  address: Yup.string().required("Địa chỉ không được để trống"),
});

export default {
  setup(props, context) {
    const dataSignUp = reactive({
      name: "",
      email: "",
      password: "",
      co_password: "",
      phone: "",
      address: "",
    });

    const nameErrors = ref(null);
    const emailErrors = ref(null);
    const passwordErrors = ref(null);
    const copasswordErrors = ref(null);
    const phoneErrors = ref(null);
    const addressErrors = ref(null);

    const submitSignUp = (event) => {
      event.preventDefault();
      nameErrors.value = null;
      emailErrors.value = null;
      passwordErrors.value = null;
      copasswordErrors.value = null;
      phoneErrors.value = null;
      addressErrors.value = null;
      schema.validate(dataSignUp, { abortEarly: false }).then(() => {
        nameErrors.value = null;
        emailErrors.value = null;
        passwordErrors.value = null;
        copasswordErrors.value = null;
        phoneErrors.value = null;
        addressErrors.value = null;

        delete dataSignUp.co_password;

        context.emit("submit:signup", dataSignUp);
      }).catch((errors) => {
        errors.inner.forEach((error) => {
          if (error.path === "name") {
            nameErrors.value = error.message;
          }
          if (error.path === "email") {
            emailErrors.value = error.message;
          }
          if (error.path === "password") {
            passwordErrors.value = error.message;
          }
          if (error.path === "co_password") {
            copasswordErrors.value = error.message;
          }
          if (error.path === "phone") {
            phoneErrors.value = error.message;
          }
          if (error.path === "address") {
            addressErrors.value = error.message;
          }
        });
      });
    };

    return {
      dataSignUp,
      nameErrors,
      emailErrors,
      passwordErrors,
      copasswordErrors,
      phoneErrors,
      addressErrors,
      submitSignUp,
    };
  },
};
</script>

<style>
.login-box {
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  padding: 40px;
  margin: 30px;
}

/* Additional CSS styles for form fields if needed */
</style>
