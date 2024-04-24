<template>
  <div id="layoutSidenav_nav">
    <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
      <div class="sb-sidenav-menu">
        <div class="nav">
          <div class="sb-sidenav-menu-heading">Menu</div>
          <router-link :to="{ name: 'category-list' }" class="router-css">
            <a class="nav-link">
              <div class="sb-nav-link-icon">
                <i class="fa-solid fa-square-caret-down"></i>
              </div>
              Thể loại sách
            </a>
          </router-link>

          <router-link :to="{ name: 'home' }" class="router-css">
            <a class="nav-link">
              <div class="sb-nav-link-icon">
                <i class="fa-brands fa-product-hunt"></i>
              </div>
              Danh sách quyển sách
            </a>
          </router-link>

          <router-link :to="{ name: 'list-bill' }" class="router-css">
            <a class="nav-link">
              <div class="sb-nav-link-icon">
                <i class="fa-solid fa-file-invoice"></i>
              </div>
              Danh sách phiếu mượn trả
            </a>
          </router-link>

          <router-link :to="{ name: 'list-customer' }" class="router-css">
            <a class="nav-link">
              <div class="sb-nav-link-icon">
                <i class="fa-solid fa-user"></i>
              </div>
              Danh sách khách hàng
            </a>
          </router-link>
        </div>
      </div>
      <div class="sb-sidenav-footer">
        <div class="small">Trang quản lý</div>
      </div>
    </nav>
  </div>
</template>

<style>

#layoutSidenav_nav {
  background-color: #222;
}


.nav-link {
  color: #fff;
}


.sb-sidenav-menu-heading {
  color: #ccc;
}


.sb-sidenav-footer {
  color: #ccc;
}
</style>
