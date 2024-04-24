  <template>
    <section class="vh-100">
      <div class="container-fluid h-custom">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <!-- Removed image column -->
          <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <div class="login-box">
              <form @submit.prevent="submitSignIn">            
                <div class="divider d-flex align-items-center my-4">
                  <p class="text-center fw-bold mx-3 mb-0" style="font-size: 24px;">Đăng nhập</p>
                </div>
                <!-- Email input -->
                <div class="form-outline mb-4">
                  <input
                    type="email"
                    name="email"
                    id="form3Example3"
                    v-model="dataSignIn.email"
                    class="form-control form-control-lg"
                    placeholder="Nhập địa chỉ email"
                  />
                  <span class="text-danger">{{ emailErrors }}</span>
                </div>

                <!-- Password input -->
                <div class="form-outline mb-3">
                  <input
                    name="password"
                    type="password"
                    id="form3Example4"
                    v-model="dataSignIn.password"
                    class="form-control form-control-lg"
                    placeholder="Nhập mật khẩu"
                  />
                  <span class="text-danger">{{ passwordErrors }}</span>
                </div>

                <div class="d-flex justify-content-between align-items-center">
                  <!-- Checkbox -->
                  <div class="form-check mb-0">
                    <input
                      name="remember-me"
                      class="form-check-input me-2"
                      type="checkbox"
                      value=""
                      id="form2Example3"
                    />
                    <label class="form-check-label" for="form2Example3">
                      Ghi nhớ đăng nhập
                    </label>
                  </div>
                  <a href="#!" class="text-body">Quên mật khẩu?</a>
                </div>

                <div class="text-center text-lg-start mt-4 pt-2">
                  <button type="submit" class="btn btn-dark">Đăng nhập</button>
                  <p class="small fw-bold mt-2 pt-1 mb-0">
                    Bạn chưa có tài khoản?
                    <router-link :to="{ name: 'signup' }" class="router-css">
                      <a href="#!" class="link-danger">Đăng ký</a>
                    </router-link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>

  <style>
  .h-custom {
    height: calc(100% - 73px);
  }
  .login-box {
    background-color: #ffffff;
    border-radius: 15px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    padding: 40px;
  }
  </style>


  <script>
  import * as Yup from "yup";
  import { ref, reactive } from "vue";
  // Đặt ngôn ngữ mặc định là tiếng Anh

  const schema = Yup.object().shape({
    email: Yup.string().email().required("Email không được để trống"),
    password: Yup.string()
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
      .matches(/[a-z]/, "Mật khẩu phải có ít nhất một chữ cái thường")
      .required("Mật khẩu không được để trống"),
  });
  export default {
    setup(props, context) {
      // Sử dụng ref để tạo biến cho email và password
      // const email = ref("");
      // const password = ref("");
      const dataSignIn = reactive({
        email: "",
        password: "",
      });

      // Hàm xử lý đăng nhập
      const emailErrors = ref(null);
      const passwordErrors = ref(null);

      const submitSignIn = (event) => {
        event.preventDefault();
        emailErrors.value = null;
        passwordErrors.value = null;
        schema
          .validate(dataSignIn, { abortEarly: false })
          .then(() => {
            emailErrors.value = null;
            passwordErrors.value = null;
            // Dữ liệu hợp lệ, thực hiện xử lý đăng nhập ở đây
            console.log("Email:", dataSignIn.email);
            console.log("Password:", dataSignIn.password);
            context.emit("submit:signin", dataSignIn);
          })
          .catch((errors) => {
            // Có lỗi xảy ra, hiển thị các lỗi cho từng trường dữ liệu
            errors.inner.forEach((error) => {
              if (error.path === "email") {
                emailErrors.value = error.message;
              }
              if (error.path === "password") {
                passwordErrors.value = error.message;
              }
            });
          });
      };

      // Trả về các biến và hàm để sử dụng trong template
      return {
        dataSignIn,
        emailErrors,
        passwordErrors,
        submitSignIn,
      };
    },
  };
  </script>
