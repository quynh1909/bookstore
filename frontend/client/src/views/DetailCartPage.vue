<template>
  <div class="container-fluid">
    <!-- Title -->
    <div class="d-flex justify-content-between align-items-center py-3">
      <h2 class="h5 mb-0">
        <a href="#" class="text-muted"></a> ID # {{ bill._id }}
      </h2>
    </div>

    <!-- Main content -->
    <div class="row mb-2">
      <div class="col-lg-6">
        <!-- Details -->
        <div class="card mb-4">
          <div class="card-body">
            <div class="mb-3 d-flex justify-content-between">
              <div>
                <span class="me-3">{{ datetime(bill.billTime) }}</span>
                <span class="me-3">|Địa chỉ: {{ customerData.address }}</span>
                <span class="me-3">|SĐT: {{ customerData.phone }}</span>
              </div>
              <div class="d-flex">
                <button
                  class="btn btn-link p-0 me-3 d-none d-lg-block btn-icon-text"
                >
                  <i class="bi bi-download">{{ getStatusText(bill.status) }}</i>
                </button>
                <div class="dropdown">
                  <button
                    class="btn btn-link p-0 text-muted"
                    type="button"
                    data-bs-toggle="dropdown"
                  >
                    <i class="bi bi-three-dots-vertical"></i>
                  </button>
                  <ul class="dropdown-menu dropdown-menu-end">
                    <li>
                      <a class="dropdown-item" href="#"
                        ><i class="bi bi-pencil"></i> Edit</a
                      >
                    </li>
                    <li>
                      <a class="dropdown-item" href="#"
                        ><i class="bi bi-printer"></i> Print</a
                      >
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <table class="table table-borderless">
              <tbody>
                <tr v-for="(item, index) in detailBill" :key="item._id">
                  <td>
                    <div class="d-flex mb-2">
                      <div class="flex-shrink-0">
                        <img
                          :src="
                            'http://localhost:3000/uploads/' +
                            books[item.bookId].bookImg[0]
                          "
                          alt=""
                          width="35"
                          class="img-fluid"
                        />
                      </div>
                      <div class="flex-lg-grow-1 ms-3">
                        <h6 class="small mb-0">
                          <a href="#" class="text-reset">{{
                            books[item.bookId].bookName
                          }}</a>
                        </h6>
                        <span class="small"
                          >Giá:
                          {{
                            formatPriceVND(books[item.bookId].price)
                          }}</span
                        >
                      </div>
                    </div>
                  </td>
                  <td>{{ item.quantity }}</td>
                  <td class="text-end">{{ formatPriceVND(item.price) }}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="2">Tổng sản phẩm</td>
                  <td class="text-end">{{ bill.totalOrder }}</td>
                </tr>
                <tr>
                  <td colspan="2">Phí vận chuyển</td>
                  <td class="text-end">Free</td>
                </tr>

                <tr class="fw-bold">
                  <td colspan="2">Tổng tiền</td>
                  <td class="text-end">{{ formatPriceVND(bill.totalCost) }}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        <!-- Payment -->
      </div>
      <div class="col-lg-6">
        <div class="row d-flex justify-content-center align-items-center">
          <div class="col-12">
            <div
              class="card card-stepper text-black"
              style="border-radius: 16px"
            >
              <div class="card-body p-5">
                <div
                  class="d-flex justify-content-between align-items-center mb-5"
                >
                  <div>
                    <h5 class="mb-0" style="font-weight: 600">
                      Trạng thái đơn hàng
                    </h5>
                  </div>
                </div>

                <ul
                  id="progressbar-2"
                  class="d-flex justify-content-between mx-0 mt-0 mb-5 px-0 pt-0 pb-2"
                >
                  <li class="step0 active text-center" id="step1"></li>
                  <li
                    class="step0 text-center"
                    :class="{ active: bill.status === 2 || bill.status === 3 }"
                    id="step2"
                  ></li>
                  <li
                    style="width: 0px"
                    class="step0 text-center"
                    :class="{ active: bill.status === 3 }"
                    id="step3"
                  ></li>
                </ul>

                <div class="d-flex justify-content-between">
                  <div class="d-lg-flex align-items-center ms-2">
                    <i
                      class="fas fa-clipboard-list fa-3x me-lg-4 mb-3 mb-lg-0"
                    ></i>
                    <div>
                      <p class="fw-bold mb-1">Đã đặt</p>
                      <p class="fw-bold mb-0"></p>
                    </div>
                  </div>

                  <div class="d-lg-flex align-items-center ms-2">
                    <i
                      class="fas fa-shipping-fast fa-3x me-lg-4 mb-3 mb-lg-0"
                    ></i>
                    <div>
                      <p class="fw-bold mb-1 ms-1">Đang giao</p>
                    </div>
                  </div>
                  <div class="d-lg-flex align-items-center ms-2">
                    <i class="fas fa-home fa-3x me-lg-4 mb-3 mb-lg-0"></i>
                    <div>
                      <p class="fw-bold mb-1 ms-1">Đã nhận</p>
                    </div>
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
import { computed, onMounted, ref, reactive } from "vue";
import { useRoute } from "vue-router";
import billService from "@/services/bill.service.js";
import billDetailService from "@/services/billdetail.service.js";
import bookService from "@/services/book.service.js";
import { useAuthStore } from "../stores/auth";
import customerService from "@/services/customer.service.js";
export default {
  setup() {
    const bill = ref({});
    const detailBill = ref({});
    const route = useRoute();
    const books = reactive({});
    const customerData = ref({
      name: "",
      email: "",
      phone: "",
      address: "",
    });
    const authStore = useAuthStore();
    const userId = computed(() => authStore.userId);
    onMounted(async () => {
      try {
        const response = await customerService.get(userId.value);
        const { name, email, phone, address } = response;
        customerData.value = { name, email, phone, address };
        const billId = computed(() => route.params.id);
        bill.value = await billService.get(billId.value);
        detailBill.value = await billDetailService.getDetailByBillId(
          billId.value
        );
        console.log("My bill:", bill);
        console.log("My detail:", detailBill);
        for (const item of detailBill.value) {
          if (!books[item.bookId]) {
            // Kiểm tra xem sản phẩm đã được lấy chưa
            const bookInfo = await bookService.get(item.bookId);
            books[item.bookId] = bookInfo; // Lưu thông tin sản phẩm vào đối tượng reactive
          }
        }
      } catch (error) {
        console.log(error);
      }
    });
    const formatPriceVND = (price) => {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(price);
    };
    const datetime = (value) => {
      return new Date(value).toLocaleString("vi-VN");
    };

    const getStatusText = (status) => {
      switch (status) {
        case 1:
          return "Đã đặt";
        case 2:
          return "Đang giao";
        case 3:
          return "Đã nhận";
        default:
          return "Trạng thái không xác định";
      }
    };

    return {
      bill,
      books,
      detailBill,
      customerData,
      formatPriceVND,
      datetime,
      getStatusText,
    };
  },
};
</script>

<style>
body {
  background: #eee;
}
.card {
  box-shadow: 0 20px 27px 0 rgb(0 0 0 / 5%);
}
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 0 solid rgba(0, 0, 0, 0.125);
  border-radius: 1rem;
}
.text-reset {
  --bs-text-opacity: 1;
  color: inherit !important;
}
a {
  color: #5465ff;
  text-decoration: none;
}

.card-stepper {
  z-index: 0;
}

#progressbar-2 {
  color: #455a64;
}

#progressbar-2 li {
  list-style-type: none;
  font-size: 13px;
  width: 50.33%;
  float: left;
  position: relative;
}

#progressbar-2 #step1:before {
  content: "\f058";
  font-family: "Font Awesome 5 Free";
  color: #fff;
  width: 37px;
  margin-left: 0px;
  padding-left: 0px;
}

#progressbar-2 #step2:before {
  content: "\f058";
  font-family: "Font Awesome 5 Free";
  color: #fff;
  width: 37px;
}

#progressbar-2 #step3:before {
  content: "\f058";
  font-family: "Font Awesome 5 Free";
  color: #fff;
  width: 37px;
  margin-right: 0;
  text-align: center;
}

/* #progressbar-2 #step4:before {
  content: "\f111";
  font-family: "Font Awesome 5 Free";
  color: #fff;
  width: 37px;
  margin-right: 0;
  text-align: center;
} */

#progressbar-2 li:before {
  line-height: 37px;
  display: block;
  font-size: 12px;
  background: #c5cae9;
  border-radius: 50%;
}

#progressbar-2 li:after {
  content: "";
  width: 100%;
  height: 10px;
  background: #c5cae9;
  position: absolute;
  left: 0%;
  right: 0%;
  top: 15px;
  z-index: -1;
}

#progressbar-2 li:nth-child(1):after {
  left: 1%;
  width: 100%;
}

#progressbar-2 li:nth-child(2):after {
  left: 1%;
  width: 100%;
}

#progressbar-2 li:nth-child(3):after {
  left: 1%;
  width: 100%;
  background: #c5cae9 !important;
}

#progressbar-2 li:nth-child(4) {
  left: 0;
  width: 37px;
}

#progressbar-2 li:nth-child(4):after {
  left: 0;
  width: 0;
}

#progressbar-2 li.active:before,
#progressbar-2 li.active:after {
  background: #6520ff;
}
</style>
