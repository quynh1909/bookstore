<template>
  <div id="layoutSidenav_content">
    <main>
      <div class="container-fluid px-4">
        <h2 style="font-weight: 600" class="mt-4">Thêm thể loại sách</h2>

        <div class="card mb-4"></div>
        <div class="container-fluid">
          <form @submit="submitAddCategory">
            <div class="row mb-4">
              <div class="col">
                <div class="form-outline">
                  <label class="form-label" for="form3Example1"
                    >Tên thể loại</label
                  >
                  <input
                    type="text"
                    name="categoryName"
                    id="form3Example1"
                    class="form-control"
                    v-model="dataCategory.categoryName"
                  />
                  <span class="text-danger">{{ categoryNameError }}</span>
                </div>
              </div>
              <div class="col">
                <div class="form-outline">
                  <label class="form-label" for="form3Example2">Mô tả</label>
                  <input
                    type="text"
                    name="categoryDes"
                    id="form3Example2"
                    class="form-control"
                    v-model="dataCategory.categoryDes"
                  />
                  <span class="text-danger">{{ categoryDesError }}</span>
                </div>
              </div>
            </div>

            <!-- Submit button -->
            <button type="submit" class="btn btn-dark btn-block mb-4">
              Thêm
            </button>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import * as Yup from "yup";
import { ref, reactive } from "vue";

const schema = Yup.object().shape({
  categoryName: Yup.string().required("Tên thể loại không được để trống"),
  categoryDes: Yup.string().required("Mô tả không được để trống"),
});

export default {
  setup(props, context) {
    const dataCategory = reactive({
      categoryName: "",
      categoryDes: "",
    });

    const categoryNameError = ref(null);
    const categoryDesError = ref(null);
    const submitAddCategory = (event) => {
      event.preventDefault();
      categoryNameError.value = null;
      categoryDesError.value = null;
      schema
        .validate(dataCategory, { abortEarly: false })
        .then(() => {
          categoryNameError.value = null;
          categoryDesError.value = null;

          console.log("CategoryName:", dataCategory.categoryName);
          console.log("CategoryDes:", dataCategory.categoryDes);
          context.emit("submit:addcategory", dataCategory);
        })
        .catch((errors) => {
          errors.inner.forEach((error) => {
            if (error.path === "categoryName") {
              categoryNameError.value = error.message;
            }

            if (error.path === "categoryDes") {
              categoryDesError.value = error.message;
            }
          });
        });
    };

    return {
      dataCategory,
      categoryDesError,
      categoryNameError,
      submitAddCategory,
    };
  },
};
</script>
