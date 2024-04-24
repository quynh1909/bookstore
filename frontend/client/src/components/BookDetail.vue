<template>
  <div class="content-container">
    <div class="row">
      <aside class="col-lg-6">
        <div class="border rounded-4 mb-3 d-flex justify-content-center">
          <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img :src="'http://localhost:3000/uploads/' + book.bookImg[0]" class="d-block w-100" alt="..."
                  style="height: 350px" />
              </div>
              <div class="carousel-item">
                <img :src="'http://localhost:3000/uploads/' + book.bookImg[1]" class="d-block w-100" alt="..."
                  style="height: 350px" />
              </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls"
              data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls"
              data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        <!-- thumbs-wrap.// -->
        <!-- gallery-wrap .end// -->
      </aside>
      <main class="col-lg-6">
        <div class="ps-lg-3">
          <h4 class="title text-dark">
            {{ book.bookName }}
          </h4>

          <div class="mb-3">
            <span style="color: red; font-size: 28px" class="h5">
              {{ book.price ? formatPriceVND(book.price) : "Loading..." }}
            </span>
          </div>

          <p>
            {{ book.bookDes }}
          </p>

          <div class="row">
            <dt class="col-3">Thương hiệu:</dt>
            <dd class="col-9">{{ book.trademark }}</dd>

            <dt class="col-3">Xuất xứ:</dt>
            <dd class="col-9">{{ book.origin }}</dd>
          </div>

          <hr />
          <div class="row mb-2">
            <div class="col-md-4 col-6">
              <div class="row mt-4" style="margin-top: 32px !important">
                <a href="#" class="btn btn-dark shadow-0 icon-hover" @click="addToCart(book)">
                  <i class="me-1 fa fa-shopping-basket"></i> Thêm vào giỏ hàng
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { useCartStore } from "@/stores/cart";
export default {
  props: {
    book: {
      type: Object,
      required: true,
    },
    formatPriceVND: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const cart = useCartStore();

    const addToCart = (book) => {
      cart.addBook({ ...book, quantity: 1 }); // Thêm sách với số lượng là 1
      alert("Thêm sách vào giỏ hàng thành công!");
    };

    return {
      addToCart,
    };
  },
};
</script>

<style scoped>
.content-container {
  background-color: #f8f9fa; /* Màu nền của phần bao quanh */
  padding: 20px; /* Khoảng cách lề bên trong */
  border: 1px solid #dee2e6; /* Đường kẻ cho nền */
  border-radius: 10px; /* Border radius */
}

.icon-hover {
  transition: all 0.3s ease;
}

.icon-hover:hover {
  border-color: #3b71ca !important;
  background-color: white !important;
  color: #3b71ca !important;
}

.icon-hover:hover i {
  color: #3b71ca !important;
}
</style>
