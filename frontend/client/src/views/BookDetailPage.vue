<template>
  <div class="page">
    <section class="py-5">
      <div class="container">
        <div class="row gx-5">
          <BookDetail :book="book" :formatPriceVND="formatPriceVND" @addToCart="addToCart" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import bookService from "@/services/book.service.js";
import BookDetail from "@/components/BookDetail.vue";

export default {
  components: {
    BookDetail,
  },
  setup() {
    const book = ref({
      bookName: "",
      bookImg: [],
      price: null,
      bookDes: "",
      trademark: "",
      origin: "",
      quantity: 1 // Thêm số lượng mặc định
    });

    const route = useRoute();
    onMounted(async () => {
      try {
        const bookId = computed(() => route.params.id);
        book.value = await bookService.get(bookId.value);
        console.log(book);
      } catch (error) {
        console.log(error);
      }
    });

    function formatPriceVND(price) {
      return price.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });
    }

    const addToCart = () => {
      // Truyền book và số lượng vào hàm addToCart
      // Bạn có thể thực hiện việc lưu vào giỏ hàng ở đây
      // Ví dụ: cart.addBook(book.value);
      console.log("Adding to cart:", book.value);
    };

    return { book, formatPriceVND, addToCart };
  },
};
</script>
