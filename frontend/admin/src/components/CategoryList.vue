<template>
  <div id="layoutSidenav_content">
    <main>
      <div class="container-fluid px-4">
        <h1 class="mt-4" style="font-weight: 600">Thể loại sách</h1>
        <ol class="breadcrumb mb-4">
          <button type="button" class="btn btn-dark">
            <router-link :to="{ name: 'add-category' }" class="router-css">
              Thêm (+)</router-link
            >
          </button>
        </ol>
        <div class="card mb-4"></div>
        <div class="card mb-4">
          <div class="card-header">
            <i class="fas fa-table me-1"></i>
          </div>
          <div class="card-body">
            <table class="table">
              <thead class="table-light">
                <tr>
                  <th>STT</th>
                  <th>Tên thể loại</th>
                  <th>Mô tả</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(category, index) in categories" :key="category._id">
                  <td>{{ index + 1 }}</td>
                  <td>{{ category.categoryName }}</td>
                  <td>{{ category.categoryDes }}</td>
                  <td>
                    <router-link
                      :to="{
                        name: 'edit-category',
                        params: { id: category._id },
                      }"
                      class="router-css-2"
                    >
                      <i class="fa-regular fa-pen-to-square"></i>
                    </router-link>
                    &ensp;|&ensp;
                    <a
                      style="color: black"
                      @click="
                        confirmDeleteCategory(
                          category._id,
                          category.categoryName
                        )
                      "
                      ><i class="fa-solid fa-trash"></i
                    ></a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
import { ref, onMounted } from "vue";
import CategoryService from "@/services/category.service.js"; // Đảm bảo bạn thay đổi đường dẫn dựa trên cấu trúc thư mục của bạn

export default {
  setup() {
    // Define a ref for categories
    const categories = ref([]);

    const confirmDeleteCategory = async (categoryId, categoryName) => {
      const shouldDelete = window.confirm(
        `Bạn có chắc muốn xóa thể loại "${categoryName}" không?`
      );
      if (shouldDelete) {
        try {
          const response = await CategoryService.delete(categoryId);
          alert("Xóa thể loại thành công");
          fetchCategories();
        } catch (error) {
          console.log(error);
        }
      }
    };

    // Create a function to fetch categories
    const fetchCategories = async () => {
      categories.value = await CategoryService.findAll();
    };

    // Fetch categories when the component is mounted
    onMounted(fetchCategories);

    // Return the reactive properties and methods
    return {
      categories,
      confirmDeleteCategory,
    };
  },
};
</script>

<style>
.router-css-2 {
  color: black;
}
</style>
