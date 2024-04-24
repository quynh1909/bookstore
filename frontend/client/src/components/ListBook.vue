<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-3 d-none d-md-block" style="margin-left: 55px;">
        <div id="sidebar">
          <h3>Thể loại</h3>
          <div
            class="checklist categories"
            v-for="(category, index) in categories"
            :key="category._id"
          >
            <div class="form-check mt-2">
              <input
                class="form-check-input"
                type="checkbox"
                :value="category._id"
                id="flexCheckDefault"
                @click="toggleCategorySelection(category._id)"
              />
              <label class="form-check-label">
                {{ category.categoryName }}
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-sm-8" id="scroll-container-book">
        <div class="container">
          <div class="row mt-n5 ms-2">
            <div
              class="col-md-6 col-lg-3 mt-1 wow fadeInUp"
              data-wow-delay=".2s"
              style="
                visibility: visible;
                animation-delay: 0.2s;
                animation-name: fadeInUp;
              "
              v-for="(book, index) in filteredBooks"
              :key="book._id"
            >
              <div class="blog-grid">
                <router-link
                  :to="{
                    name: 'book-detail',
                    params: { id: book._id },
                  }"
                  class="router-css-2"
                >
                  <div class="blog-grid-img position-relative">
                    <img
                      alt="img"
                      :src="
                        'http://localhost:3000/uploads/' + book.bookImg[0]
                      "
                    />
                  </div>
                </router-link>

                <div class="blog-grid-text p-4">
                  <h3 class="h4 mb-3">
                    <p style="font-size: 18px; font-weight: 500">
                      {{ book.bookName }}
                    </p>
                  </h3>
                  <div class="row">
                    <!-- <p
                      class="col-8"
                      style="
                        font-weight: 600;
                        color: red;
                        font-size: 24px;
                        display: inline-block;
                      "
                    >
                      {{ formatPriceVND(book.price) }}
                    </p> -->
                    <!-- <a
                      class="col-4"
                      style="
                        font-size: 24px;
                        text-align: center;
                        margin-top: 0px;
                      "
                      data-mdb-toggle="tooltip"
                      title="Thêm vào giỏ hàng"
                      @click="addToCart(book)"
                      href="#"
                    >
                      <i class="fa-solid fa-cart-plus"></i>
                    </a> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useCartStore } from "@/stores/cart";
import { onMounted, ref, computed } from "vue";
import CategoryService from "@/services/category.service.js";
export default {
  props: {
    books: {
      type: Array,
      required: true,
    },
    formatPriceVND: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const categories = ref([]);
    const selectedCategories = ref([]);
    const cart = useCartStore();
    const fetchCategories = async () => {
      categories.value = await CategoryService.findAll();
    };
    const addToCart = (book) => {
      cart.addBook({ ...book, quantity: 1 }); // Thêm sản phẩm với số lượng là 1
      alert("Thêm sản phẩm vào giỏ hàng thành công!");
    };
    const toggleCategorySelection = (categoryId) => {
      if (selectedCategories.value.includes(categoryId)) {
        // Nếu categoryId đã tồn tại trong selectedCategories, loại bỏ nó
        selectedCategories.value = selectedCategories.value.filter(
          (id) => id !== categoryId
        );
      } else {
        // Ngược lại, thêm categoryId vào selectedCategories
        selectedCategories.value.push(categoryId);
      }
      console.log("Hi", selectedCategories);
    };

    const filteredBooks = computed(() => {
      if (selectedCategories.value.length === 0) {
        return props.books;
      } else {
        return props.books.filter((book) =>
          selectedCategories.value.includes(book.categoryId)
        );
      }
    });
    onMounted(fetchCategories);
    return {
      categories,
      filteredBooks,
      toggleCategorySelection,
      addToCart,
    };
  },
};
</script>
<style>
@import "../assets//book.css";

#wrapper {
  margin-bottom: 85px;
}
#scroll-container-book {
  padding: 0px;
  height: 1200px;
  overflow: auto;
}
#sidebar, #scroll-container-book {
  position: relative;
  z-index: 1; /* Đảm bảo cả hai ô nằm trên nền */
  background-color: rgba(255, 255, 255, 0.9); /* Màu nền trong suốt */
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1); /* Hiệu ứng bóng đổ */
  border-radius: 10px; /* Bo tròn góc của ô */
  border: 1px solid rgba(0, 0, 0, 0.5); /* Đường viền */
}

body {
  margin-top: 20px;
}
.blog-grid {
  position: relative;
  z-index: 2; /* Đảm bảo thẻ sách nổi bật nằm trên nền */
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1); /* Hiệu ứng bóng đổ */
  height: 100%;
  border: 0.0625rem solid rgba(220, 224, 229, 0.6);
  border-radius: 0.25rem;
  transition: all 0.2s ease-in-out;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  margin-top: 10px;
}

.blog-grid span {
  color: #292dc2;
}

.blog-grid img {
  width: 100%;
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
}

.blog-grid-text {
  position: relative;
}

.blog-grid-text > span {
  color: #292dc2;
  font-size: 13px;
  padding-right: 5px;
}

.blog-grid-text h4 {
  line-height: normal;
  margin-bottom: 15px;
}

.blog-grid-text .meta-style2 {
  border-top: 1px dashed #cee1f8;
  padding-top: 15px;
}

.blog-grid-text .meta-style2 ul li {
  margin-bottom: 0;
  font-weight: 500;
}

.blog-grid-text .meta-style2 ul li:last-child {
  margin-right: 0;
}

.blog-grid-text ul {
  margin: 0;
  padding: 0;
}

.blog-grid-text ul li {
  display: inline-block;
  font-size: 14px;
  font-weight: 500;
  margin: 5px 10px 5px 0;
}

.blog-grid-text ul li:last-child {
  margin-right: 0;
}

.blog-grid-text ul li i {
  font-size: 14px;
  font-weight: 600;
  margin-right: 5px;
}

.blog-grid-text p {
  font-weight: 400;
  padding: 0;
}

.blog-list-left-heading:after,
.blog-title-box:after {
  content: "";
  height: 2px;
}

.blog-grid-simple-content a:hover {
  color: #1d184a;
}

.blog-grid-simple-content a:hover:after {
  color: #1d184a;
}
.blog-grid-text {
  position: relative;
}

.blog-grid-text > span {
  color: #292dc2;
  font-size: 13px;
  padding-right: 5px;
}

.blog-grid-text h4 {
  line-height: normal;
  margin-bottom: 15px;
}

.blog-grid-text .meta-style2 {
  border-top: 1px dashed #cee1f8 !important;
  padding-top: 15px;
}

.blog-grid-text .meta-style2 ul li {
  margin-bottom: 0;
  font-weight: 500;
}

.blog-grid-text .meta-style2 ul li:last-child {
  margin-right: 0;
}

.blog-grid-text ul {
  margin: 0;
  padding: 0;
}

.blog-grid-text ul li {
  display: inline-block;
  font-size: 14px;
  font-weight: 500;
  margin: 5px 10px 5px 0;
}

.blog-grid-text ul li:last-child {
  margin-right: 0;
}

.blog-grid-text ul li i {
  font-size: 14px;
  font-weight: 600;
  margin-right: 5px;
}

.blog-grid-text p {
  font-weight: 400;
  padding: 0;
}

a,
a:active,
a:focus {
  color: #575a7b;
  text-decoration: none;
  transition-timing-function: ease-in-out;
  -ms-transition-timing-function: ease-in-out;
  -moz-transition-timing-function: ease-in-out;
  -webkit-transition-timing-function: ease-in-out;
  -o-transition-timing-function: ease-in-out;
  transition-duration: 0.2s;
  -ms-transition-duration: 0.2s;
  -moz-transition-duration: 0.2s;
  -webkit-transition-duration: 0.2s;
  -o-transition-duration: 0.2s;
}

.pagination {
  border-radius: 0;
  padding: 0;
  margin: 0;
}

.pagination ul {
  display: inline-block;
  display: inline;
  zoom: 1;
  margin: 0 auto;
  padding: 0;
}

.pagination li {
  display: inline;
}

.pagination a {
  float: left;
  padding: 0 18px;
  line-height: 40px;
  text-decoration: none;
  border: 1px solid #dbdbdb;
  border-left-width: 0;
  background: #fff;
}

.pagination a:hover {
  background-color: #1d184a;
  color: #fff;
}

.pagination .active a {
  background-color: #f7f7f7;
  color: #999;
  cursor: default;
}

.pagination .disabled span {
  color: #999;
  background-color: transparent;
  cursor: default;
}

.pagination .disabled a {
  color: #999;
  background-color: transparent;
  cursor: default;
}

.pagination .disabled a:hover {
  color: #999;
  background-color: transparent;
  cursor: default;
}

.pagination li:first-child a {
  border-left-width: 1px;
}

.mt-6,
.my-6 {
  margin-top: 3.5rem;
}
</style>
