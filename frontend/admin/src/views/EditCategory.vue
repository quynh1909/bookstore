<!-- CategoryEditPage.vue -->
<template>
  <CategoryEditForm
    :currentCategory="currentCategory"
    @updateCategory="updateCategory"
  />
</template>

<script>
import { ref, onMounted, computed } from "vue";
import categoryService from "@/services/category.service.js";
import CategoryEditForm from "@/components/CategoryEditForm.vue";
import { useRoute, useRouter } from "vue-router";

export default {
  components: {
    CategoryEditForm,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const currentCategory = ref({
      categoryName: "",
      categoryDes: "",
    });

    const updateCategory = async (data) => {
      try {
        const categoryId = computed(() => route.params.id);
        const response = await categoryService.update(categoryId.value, data);
        alert("Cập nhật danh mục thành công");
        router.push({ name: "category-list" });
      } catch (error) {
        console.log(error);
      }
    };

    onMounted(async () => {
      const categoryId = computed(() => route.params.id);
      currentCategory.value = await categoryService.get(categoryId.value);
    });

    return { currentCategory, updateCategory };
  },
};
</script>
