<template>
  <CategoryFrom @submit:addcategory="submitAddCategory" />
</template>

<script>
import categoryService from "@/services/category.service.js";
import CategoryFrom from "@/components/CategoryForm.vue";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

export default {
  components: {
    CategoryFrom,
  },
  setup() {
    const router = useRouter();
    const submitAddCategory = async (data) => {
      try {
        const response = await categoryService.create(data);
        alert("Thêm danh mục thành công");
        router.push({ name: "category-list" });
      } catch (error) {
        console.log(error);
      }
    };
    return { submitAddCategory };
  },
};
</script>
