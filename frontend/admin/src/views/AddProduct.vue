<template>
  <BookForm
    :categories="listCategory"
    @submit:addbook="submitAddBook"
  />
</template>

<script>
import bookService from "@/services/book.service.js";
import categoryService from "@/services/category.service.js";
import BookForm from "@/components/BookForm.vue";
import { defineComponent, ref, onMounted } from "vue";
import { useRouter } from "vue-router";

export default {
  components: {
    BookForm,
  },
  setup() {
    const listCategory = ref([]); // Khởi tạo biến listCategory
    const router = useRouter();

    onMounted(async () => {
      try {
        listCategory.value = await categoryService.findAll(); // Lấy dữ liệu khi component được mount
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    });

    const submitAddBook = async (data) => {
      try {
        const formData = new FormData();
        // Thêm các trường dữ liệu vào formData
        for (const key in data) {
          if (key !== "bookImg") {
            formData.append(key, data[key]);
          } else if (data.bookImg) {
            formData.append("bookImg", data.bookImg[0]);
            formData.append("bookImg", data.bookImg[1]);
          }
        }
        
        const response = await bookService.create(formData);
        alert("Thêm sách thành công");
        router.push({ name: "home" });
      } catch (error) {
        console.log(error);
      }
    };

    return { submitAddBook, listCategory };
  },
};
</script>
