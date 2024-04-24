<!-- CategoryEditForm.vue -->
<template>
  <div id="layoutSidenav_content">
    <main>
      <div class="container-fluid px-4">
        <h2 style="font-weight: 600" class="mt-4">Cập nhật thể loại sách</h2>
        <div class="card mb-4"></div>
        <div class="container-fluid">
          <form @submit.prevent="submitUpdateCategory">
            <div class="row mb-4">
              <div class="col">
                <div class="form-outline">
                  <label class="form-label" for="form3Example1"
                    >Tên thể loại</label
                  >
                  <input
                    type="text"
                    v-model="currentCategory.categoryName"
                    id="form3Example1"
                    class="form-control"
                  />
                </div>
              </div>
              <div class="col">
                <div class="form-outline">
                  <label class="form-label" for="form3Example2">Mô tả</label>
                  <input
                    type="text"
                    v-model="currentCategory.categoryDes"
                    id="form3Example2"
                    class="form-control"
                  />
                </div>
              </div>
            </div>

            <!-- Submit button -->
            <button type="submit" class="btn btn-dark btn-block mb-4">
              Cập nhật
            </button>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { ref, toRefs, computed } from "vue";

export default {
  props: {
    currentCategory: Object,
  },
  setup(props, { emit }) {
    const { currentCategory } = toRefs(props);

    const submitUpdateCategory = (event) => {
      event.preventDefault();
      emit("updateCategory", currentCategory.value);
    };

    return {
      currentCategory,
      submitUpdateCategory,
    };
  },
};
</script>
