<template>
  <section class="h-100 h-custom" style="background-color: #eee">
    <div class="container-fluid mt-2 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col">
          <div class="card">
            <div class="card-body p-4">
              <div class="row">
                <div class="col-lg-9">
                  <h5 class="mb-3">
                    <router-link :to="{ name: 'book' }" class="router-css">
                      <i class="fas fa-long-arrow-alt-left me-2"></i>Tiếp tục
                      mua sắm</router-link
                    >
                  </h5>
                  <hr />

                  <div
                    class="d-flex justify-content-between align-items-center mb-4"
                  >
                    <div>
                      <h4 style="font-weight: 600" class="mb-1">Giỏ hàng</h4>
                      <p class="mb-0">
                        Giỏ hàng của bạn có {{ totalQuantity }} sản phẩm
                      </p>
                    </div>
                    <div>
                      <p class="mb-0">
                        <span class="text-muted"></span>
                      </p>
                    </div>
                  </div>

                  <div
                    class="card mb-3"
                    v-for="(item, index) in cartBook"
                    :key="item._id"
                  >
                    <div class="card-body">
                      <div class="d-flex justify-content-between">
                        <div class="d-flex flex-row align-items-center">
                          <div>
                            <img
                              :src="
                                'http://localhost:3000/uploads/' +
                                item.bookImg[0]
                              "
                              class="img-fluid rounded-3"
                              alt="Shopping item"
                              style="width: 65px"
                            />
                          </div>
                          <div class="ms-3">
                            <p class="design-name">{{ item.bookName }}</p>
                            <p class="small mb-0" style="color: red">
                              {{ formatPriceVND(item.price) }}
                            </p>
                          </div>
                        </div>
                        <div class="d-flex flex-row align-items-center">
                          <div style="width: 50px" class="">
                            <h5 class="fw-normal mb-0 design-qty">
                              <button
                                @click="decrement(item._id)"
                                class="btn btn-sm btn-outline-primary"
                              >
                                -
                              </button>
                              {{ item.quantity }}
                              <button
                                @click="increment(item._id)"
                                class="btn btn-sm btn-outline-primary"
                              >
                                +
                              </button>
                            </h5>
                          </div>
                          <div style="width: 80px">
                            <h5 class="mb-0 design-money">
                              {{ formatPriceVND(item.price * item.quantity) }}
                            </h5>
                          </div>
                          <a
                            href="#!"
                            style="color: #cecece"
                            @click="removeBook(item._id)"
                            ><i class="fas fa-trash-alt"></i
                          ></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-3">
                  <div class="card bg-dark text-white rounded-3">
                    <div class="card-body">
                      <div
                        class="d-flex justify-content-between align-items-center mb-4"
                      >
                        <h5 class="mb-0">Chi tiết thanh toán</h5>
                        <img
                          src="https://png.pngtree.com/png-vector/20190728/ourlarge/pngtree-avatar-user-profile-flat-color-icon-vector-icon-banner-png-image_1619399.jpg"
                          class="img-fluid rounded-3"
                          style="width: 45px"
                          alt="Avatar"
                        />
                      </div>

                      <p class="small mb-2">Card type</p>
                      <a href="#!" type="submit" class="text-white"
                        ><i class="fab fa-cc-mastercard fa-2x me-2"></i
                      ></a>
                      <a href="#!" type="submit" class="text-white"
                        ><i class="fab fa-cc-visa fa-2x me-2"></i
                      ></a>
                      <a href="#!" type="submit" class="text-white"
                        ><i class="fab fa-cc-amex fa-2x me-2"></i
                      ></a>
                      <a href="#!" type="submit" class="text-white"
                        ><i class="fab fa-cc-paypal fa-2x"></i
                      ></a>

                      <form class="mt-4">
                        <div class="form-outline form-white mb-4">
                          <label class="form-label" for="typeName"
                            >Họ và tên: {{ customerData.name }}
                          </label>
                        </div>

                        <div class="form-outline form-white mb-4">
                          <label class="form-label" for="typeName"
                            >Số điện thoại: {{ customerData.phone }}
                          </label>
                        </div>

                        <div class="form-outline form-white mb-4">
                          <label class="form-label" for="typeName"
                            >Địa chỉ: {{ customerData.address }}
                          </label>
                        </div>

                        <div class="form-outline form-white mb-4">
                          <label class="form-label" for="typeName"
                            >Hình thức thanh toán: Thanh toán khi nhận hàng
                          </label>
                        </div>
                      </form>

                      <hr class="my-4" />

                      <div class="d-flex justify-content-between">
                        <p class="mb-2">Tổng số lượng</p>
                        <p class="mb-2">{{ totalQuantity }}</p>
                      </div>

                      <div class="d-flex justify-content-between">
                        <p class="mb-2">Phí vận chuyển</p>
                        <p class="mb-2">Free</p>
                      </div>

                      <div class="d-flex justify-content-between mb-4">
                        <p class="mb-2">Tổng tiền</p>
                        <p class="mb-2">{{ formatPriceVND(totalPrice) }}</p>
                      </div>

                      <button
                        type="button"
                        class="btn btn-info btn-block btn-lg"
                        @click="createBill"
                      >
                        <div class="d-flex justify-content-between">
                          <span
                            >Thanh Toán
                            <i class="fas fa-long-arrow-alt-right ms-2"></i
                          ></span>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { useCartStore } from "@/stores/cart";
import { computed, onMounted, ref } from "vue";
import Profile from "@/components/Profile.vue";
import billService from "@/services/bill.service.js";
import customerService from "@/services/customer.service.js";
import billDetailService from "@/services/billDetail.service.js";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";
export default {
  setup() {
    const cart = useCartStore();
    const router = useRouter();
    const authStore = useAuthStore();
    const customerData = ref({
      name: "",
      email: "",
      phone: "",
      address: "",
    });
    const userId = computed(() => authStore.userId);
    const cartBook = computed(() => cart.books);
    console.log("Cart book", cartBook);
    const totalQuantity = computed(() => cart.totalQuantity);
    const totalPrice = computed(() => cart.totalPrice);
    const formatPriceVND = (price) => {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(price);
    };

    const increment = (bookId) => {
      cart.incrementBookQuantity(bookId);
    };

    const decrement = (bookId) => {
      cart.decrementBookQuantity(bookId);
    };

    const removeBook = (bookId) => {
      if (confirm("Bạn có chắc muốn xóa sách này không?")) {
        cart.removeBook(bookId);
      }
    };
    onMounted(async () => {
      try {
        const response = await customerService.get(userId.value);
        const { name, email, phone, address } = response;
        customerData.value = { name, email, phone, address };
      } catch (error) {
        console.error(error);
      }
    });

    const createBill = async () => {
      const isUserLoggedIn = computed(() => authStore.isUserLoggedIn);
      if (!isUserLoggedIn.value) {
        alert("Vui lòng đăng nhập để thanh toán");
        router.push({ name: "signin" });
        return;
      }
      const billData = {
        customerId: userId.value,
        totalCost: totalPrice.value,
        totalOrder: totalQuantity.value,
      };

      try {
        const billResponse = await billService.create(billData);
        const billId = billResponse._id;
        for (const book of cart.books) {
          const billDetailData = {
            bookId: book._id,
            billId: billId,
            quantity: book.quantity,
            price: book.price,
          };
          await billDetailService.create(billDetailData);
        }
        alert("Thanh toán thành công!");
        cart.clearCart();
        router.push({ name: "profile" });
      } catch (error) {
        console.error("Error creating bill:", error);
      }
    };

    return {
      cartBook,
      customerData,
      totalPrice,
      formatPriceVND,
      totalQuantity,
      increment,
      decrement,
      removeBook,
      createBill,
    };
  },
};
</script>

<style>
.design-qty {
  margin-left: -120px !important;
}

.router-css {
  color: black;
}

.design-money {
  margin-left: -60px;
}
@media only screen and (min-width: 1200px) {
}

@media only screen and (min-width: 600px) and (max-width: 767px) {
  .design-name {
    font-size: 12px !important;
  }
}

@media only screen and (max-width: 599px) {
  .design-name {
    font-size: 12px !important;
  }
}
</style>
