<template>
  <div class="page">
    <hr />
    <ListBook :books="books" :formatPriceVND="formatPriceVND" />
  </div>
</template>

<script>
import ListBook from "@/components/ListBook.vue";
import bookService from "@/services/book.service.js";
import { ref, onMounted } from "vue";

export default {
  components: {
    ListBook,
  },
  setup() {
    const books = ref([]);
    const fetchBooks = async () => {
      try {
        const response = await bookService.findAll();
        books.value = response;
        console.log(books);
      } catch (error) {
        console.log(error);
      }
    };

    onMounted(() => {
      fetchBooks();
    });

    const formatPriceVND = (price) => {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(price);
    };

    return {
      books,
      formatPriceVND,
    };
  },
};
</script>
