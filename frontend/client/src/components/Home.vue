<template>
  <!-- <div
    id="carouselExampleCaptions"
    class="carousel slide"
    data-bs-ride="carousel"
  >
    <div class="carousel-indicators">
      <button
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide-to="0"
        class="active"
        aria-current="true"
        aria-label="Slide 1"
      ></button>
      <button
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide-to="1"
        aria-label="Slide 2"
      ></button>
      <button
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide-to="2"
        aria-label="Slide 3"
      ></button>
    </div>
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img
          style="height: 380px"
          src="https://th.bing.com/th/id/R.09277db50a234a1d67359fe461f24128?rik=NX7AdNO0ICtXqA&pid=ImgRaw&r=0"
          class="d-block w-100"
          alt="..."
        />
        <div class="carousel-caption d-none d-md-block"></div>
      </div>
      <div class="carousel-item">
        <img
          style="height: 380px"
          src="https://th.bing.com/th/id/R.6356aa1bd6dc7022906eec3959b79f16?rik=hgN07PrDsqXt2w&pid=ImgRaw&r=0"
          class="d-block w-100"
          alt="..."
        />
        <div class="carousel-caption d-none d-md-block"></div>
      </div>
      <div class="carousel-item">
        <img
          style="height: 380px"
          src="https://limbd.org/wp-content/uploads/2020/12/Digital-Library-1024x614.png"
          class="d-block w-100"
          alt="..."
        />
        <div class="carousel-caption d-none d-md-block"></div>
      </div>
    </div>
    <button
      class="carousel-control-prev"
      type="button"
      data-bs-target="#carouselExampleCaptions"
      data-bs-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button
      class="carousel-control-next"
      type="button"
      data-bs-target="#carouselExampleCaptions"
      data-bs-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div> -->
  <div class="container">
    <div class="col-12 col-sm-10 contain-book">
      <h1 class="text-center mt-2" style="font-weight: 600">
        Sách nổi bật
      </h1>
      <div class="container">
        <div class="row mt-n5">
          <div
            class="col-md-6 col-lg-3 mt-1 wow fadeInUp"
            data-wow-delay=".2s"
            style="
              visibility: visible;
              animation-delay: 0.2s;
              animation-name: fadeInUp;
            "
            v-for="(book, index) in books"
            :key="book._id"
          >
            <div v-if="index < 4" class="blog-grid">
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
                <h3 class="h5 mb-3">
                  <p style="font-size: 18px; font-weight: 600">
                    {{ book.bookName }}
                  </p>
                </h3>
                <div class="row">
                  <p
                    class="col-8"
                    style="
                      font-weight: 600;
                      color: red;
                      font-size: 24px;
                      display: inline-block;
                    "
                  >
                    {{ formatPriceVND(book.price) }}
                  </p>
                  <a
                    class="col-4"
                    style="font-size: 24px; text-align: center; margin-top: 0px"
                    data-mdb-toggle="tooltip"
                    title="Thêm vào giỏ hàng"
                    @click="addToCart(book)"
                    href="#"
                  >
                    <i class="fa-solid fa-cart-plus"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="col-12 col-sm-10 contain-book">
      <h1 class="text-center mt-2" style="font-weight: 600">Sách mới</h1>
      <div class="container">
        <div class="row mt-n5">
          <div
            class="col-md-6 col-lg-3 mt-1 wow fadeInUp"
            data-wow-delay=".2s"
            style="
              visibility: visible;
              animation-delay: 0.2s;
              animation-name: fadeInUp;
            "
            v-for="(book, index) in books"
            :key="book._id"
          >
            <div v-if="index > 19 && index < 24" class="blog-grid">
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
                <h3 class="h5 mb-3">
                  <p style="font-size: 18px; font-weight: 600">
                    {{ book.bookName }}
                  </p>
                </h3>
                <div class="row">
                  <p
                    class="col-8"
                    style="
                      font-weight: 600;
                      color: red;
                      font-size: 24px;
                      display: inline-block;
                    "
                  >
                    {{ formatPriceVND(book.price) }}
                  </p>
                  <a
                    class="col-4"
                    style="font-size: 24px; text-align: center; margin-top: 0px"
                    data-mdb-toggle="tooltip"
                    title="Thêm vào giỏ hàng"
                    @click="addToCart(book)"
                    href="#"
                  >
                    <i class="fa-solid fa-cart-plus"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import bookService from "@/services/book.service.js";
import { ref, onMounted } from "vue";
export default {
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
    return { books, formatPriceVND };
  },
};
</script>

<style>
@import "../assets//book.css";
body {
  background-image: url("https://1.bp.blogspot.com/-n-Cdtb7aEo8/XtCXAOaRK9I/AAAAAAAAOHY/rU61dKE-0Ro3X6qSlOZzQQtssalkpqWjQCLcBGAsYHQ/s1600/tu-sach-mien-phi.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-blend-mode: hard-light;
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
#wrapper {
  margin-bottom: 85px;
}
/* Điện thoại di động nhỏ (small phones) */
@media only screen and (max-width: 599px) {
  .carousel-inner {
    display: none;
  }
}

/* Điện thoại di động lớn đến máy tính bảng nhỏ (large phones to small tablets) */
@media only screen and (min-width: 600px) and (max-width: 767px) {
  .carousel-inner {
    display: none;
  }
}
.contain-book {
  margin-top: 55px;
  margin-left: 82px;
  position: relative;
  z-index: 1; /* Đảm bảo ô sách nổi bật và thẻ sách nổi bật nằm trên nền */
  background-color: rgba(255, 255, 255, 0.9); /* Màu nền trong suốt */
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1); /* Hiệu ứng bóng đổ */
}
</style>
