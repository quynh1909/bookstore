<template>
  <!-- Footer -->
  <footer class="text-center text-lg-start bg-light text-muted">
    <!-- Section: Social media -->
    <section class="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
      <!-- Left -->
    </section>
    <!-- Section: Social media -->

    <!-- Section: Links  -->
    <section class="">
      <div class="container text-center text-md-start mt-5">
        <!-- Grid row -->
        <div class="row mt-3">
          <!-- Grid column -->
          <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
            <!-- Content -->
            <h6 class="text-uppercase fw-bold mb-4">
              <i class="fas fa-bookmark me-3"></i>Tiệm sách của tôi
            </h6>
            <p>
              Bạn có thể tìm đọc những quyển sách hay ở đây.
            </p>
          </div>
          <!-- Grid column -->

          <!-- Grid column -->
          <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
            <!-- Links -->
            <router-link :to="{ name: 'book' }" class="router-css">
              <h6 class="text-uppercase fw-bold mb-4">
                <i class="fas fa-book"></i> Kho sách
              </h6>
            </router-link>
            <p>
              Được cập nhật mới liên tục
            </p>
          </div>
          <!-- Grid column -->

          <!-- Grid column -->
          <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
            <!-- Links -->
            <router-link :to="{ name: 'introduce' }" class="router-css">
              <h6 class="text-uppercase fw-bold mb-4">
                <i class="fas fa-info"></i> Giới thiệu
              </h6>
            </router-link>
            <p>
              Là một tiệm sách online nhỏ với một vài quyển sách thú vị bạn có thể tìm được ở đây.
            </p>
          </div>
          <!-- Grid column -->

          <!-- Grid column -->
          <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
            <!-- Links -->
            <router-link :to="{ name: 'contact' }" class="router-css">
              <h6 class="text-uppercase fw-bold mb-4">
                <i class="fas fa-address-card"></i> Liên hệ
              </h6>
            </router-link>
            <p>
              <i class="fas fa-home me-3"></i>3/2 Xuân Khánh - Ninh Kiều - Cần Thơ
            </p>
            <p>
              <i class="fas fa-inbox me-3"></i>
              quynhb2014603@student.ctu.edu.vn
            </p>
            <p><i class="fas fa-phone me-3"></i> +84 582459219</p>
            <!-- <p><i class="fas fa-print me-3"></i> +84 976146523</p> -->
          </div>
          <!-- Grid column -->
        </div>
        <!-- Grid row -->
      </div>
    </section>
    <!-- Section: Links  -->
  </footer>
  <!-- Footer -->
</template>

<style>
.router-css {
  color: #6c757d;
}
</style>
