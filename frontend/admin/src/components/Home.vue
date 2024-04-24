<template>
  <div id="layoutSidenav_content">
    <main>
      <div class="container-fluid px-4">
        <h1 class="mt-4" style="font-weight: 600">Danh sách quyển sách</h1>
        <ol class="breadcrumb mb-4">
          <button type="button" class="btn btn-dark">
            <router-link :to="{ name: 'add-book' }" class="router-css">
              Thêm (+)
            </router-link>
          </button>
        </ol>
        <div class="card mb-4"></div>
        <div class="card mb-4">
          <div class="card-header">
            <i class="fas fa-table me-1"></i>
          </div>
          <div class="card-body" id="scroll-container">
            <table class="table">
              <thead class="table-light">
                <tr>
                  <th>STT</th>
                  <th>Tên sách</th>
                  <th>Hình ảnh</th>
                  <th>Giá</th>
                  <th>Số lượng</th>
                  <th>Nhà xuất bản</th>
                  <th>Đơn vị phát hành</th>
                  <th>Trạng thái</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(book, index) in books" :key="book._id">
                  <td>&ensp;{{ index + 1 }}</td>
                  <td>{{ book.bookName }}</td>
                  <td>
                    <img
                      :src="'http://localhost:3000/uploads/' + book.bookImg[0]"
                      alt="Hình ảnh"
                      width="50"
                      height="50"
                    />
                  </td>
                  <td>{{ formatPriceVND(book.price) }}</td>
                  <td>{{ book.quantity }}</td>
                  <td>{{ book.trademark }}</td>
                  <td>{{ book.origin }}</td>
                  <td>{{ book.soldOut ? "Hết" : "Còn" }}</td>
                  <td>
                    <router-link
                      :to="{ name: 'edit-book', params: { id: book._id } }"
                      class="router-css-2"
                    >
                      <i class="fa-regular fa-pen-to-square"></i>
                    </router-link>
                    &ensp;|&ensp;
                    <a
                      style="color: black"
                      @click="confirmDeleteBook(book._id, book.bookName)"
                    >
                      <i class="fa-solid fa-trash"></i>
                    </a>
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
import { useRouter } from "vue-router";
import bookService from "@/services/book.service.js";
import { useAuthStore } from "@/stores/auth.js";

export default {
  setup() {
    const books = ref([]);
    const router = useRouter();
    const authStore = useAuthStore();

    const fetchBooks = async () => {
      try {
        const response = await bookService.findAll();
        books.value = response;
      } catch (error) {
        console.error("Lỗi khi lấy danh sách sách:", error);
      }
    };

    const confirmDeleteBook = async (bookId, bookName) => {
      const shouldDelete = window.confirm(
        `Bạn có chắc muốn xóa sách "${bookName}" không?`
      );

      if (shouldDelete) {
        try {
          const response = await bookService.delete(bookId);
          alert("Xóa sách thành công!");
          const responseB = await bookService.findAll();
          books.value = responseB;
        } catch (error) {
          console.log(error);
        }
      }
    };

    onMounted(() => {
      fetchBooks();
    });

    function formatPriceVND(price) {
      return price.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });
    }

    return {
      books,
      confirmDeleteBook,
      formatPriceVND,
    };
  },
};
</script>

<style>
#scroll-container {
  padding: 0px;
  height: 800px;
  overflow: auto;
}
table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background-color: #000;
  color: #fff;
  position: sticky;
  top: 0;
}

th {
  text-align: left;
  padding: 8px 10px;
}

tbody {
  height: 200px;
  overflow: auto;
}
.router-css {
  text-decoration: none;
  color: #fff;
}
.router-css-2 {
  color: black;
}
</style>
