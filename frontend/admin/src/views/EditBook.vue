<template>
  <BookEditForm
    :currentBook="currentBook"
    :categories="listCategory"
    @updateBook="submitUpdateBook"
  />
</template>

<script>
import bookService from "@/services/book.service.js";
import categoryService from "@/services/category.service.js";
import BookEditForm from "@/components/BookEditForm.vue";
import { defineComponent, ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
export default {
  components: {
    BookEditForm,
  },
  // Rest of the script
  setup() {
    const listCategory = ref([]); // Khởi tạo biến listCategory
    const currentBook = ref({}); // Add this for the current book
    const route = useRoute();
    const router = useRouter();
    onMounted(async () => {
      try {
        listCategory.value = await categoryService.findAll(); // Lấy dữ liệu khi component được mount
        const bookId = computed(() => route.params.id);
        currentBook.value = await bookService.get(bookId.value);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    });
    // Existing setup code
    // Rest of the setup code

    const submitUpdateBook = async (data) => {
      try {
        const formData = new FormData();
        for (const key in data) {
          if (key !== "bookImg") {
            formData.append(key, data[key]);
          } else if (data.bookImg) {
            formData.append("bookImg", data.bookImg[0]);
            formData.append("bookImg", data.bookImg[1]);
          }
        }

        // for (let [key, value] of formData.entries()) {
        //   console.log(`${key}:`, value);
        // }
        const bookId = computed(() => route.params.id);
        // console.log("My book needed update: ", formData);
        const response = await bookService.update(bookId, formData);
        alert("Cập nhật sách thành công");
        router.push({ name: "home" });
      } catch (error) {
        console.log(error);
      }
    };

    return { submitUpdateBook, listCategory, currentBook }; // Add bookToEdit
  },
};
</script>
