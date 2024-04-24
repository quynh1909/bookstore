<template>
  <div id="layoutSidenav_content">
    <main>
      <div class="container-fluid px-4">
        <h1 class="mt-4" style="font-weight: 600">Chi tiết đơn hàng</h1>
        <ol class="breadcrumb mb-2">
          <h4 style="font-weight: 600">Trạng thái:</h4>
          <span style="font-size: 20px; color: blue">
            {{ getStatusText(bill.status) }}</span
          >
        </ol>
        <h5>
          <span style="font-weight: 600">Tên khách hàng:</span>
          {{ customer.name }}
        </h5>
        <h5>
          <span style="font-weight: 600">Địa chỉ:</span> {{ customer.address }}
        </h5>
        <h5>
          <span style="font-weight: 600">Số điện thoại:</span>
          {{ customer.phone }}
        </h5>
        <form @submit="updateStatus" action="" class="mb-2">
          <select v-model="bill.status">
            <option v-for="s in statuses" :value="s.value">
              {{ s.text }}
            </option>
          </select>
          <br />
          <button>Cập nhật</button>
        </form>

        <div class="mb-4">
          <div class="">
            <div class="card mb-4">
              <div class="card-body">
                <div class="mb-3 d-flex justify-content-between">
                  <div>
                    <span class="me-3">{{ datetime(bill.billTime) }}</span>
                    <span class="me-3">#{{ bill._id }}</span>
                  </div>
                  <div class="d-flex">
                    <button
                      class="btn btn-link p-0 me-3 d-none d-lg-block btn-icon-text"
                    >
                      <i class="bi bi-download">{{
                        getStatusText(bill.status)
                      }}</i>
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
                              width="105"
                              class="img-fluid"
                            />
                          </div>
                          <div class="flex-lg-grow-1 ms-3">
                            <h6 class="small mb-0">
                              <a href="#" class="text-reset">{{
                                books[item.bookId].bookName
                              }}</a>
                            </h6>
                            <!-- <span class="small"
                              >Giá:
                              {{
                                formatPriceVND(books[item.bookId].price)
                              }}</span
                            > -->
                          </div>
                        </div>
                      </td>
                      <td>{{ item.quantity }}</td>
                      <!-- <td class="text-end">
                        {{ formatPriceVND(books[item.bookId].price) }}
                      </td> -->
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

                    <!-- <tr class="fw-bold">
                      <td colspan="2">Tổng tiền</td>
                      <td class="text-end">
                        {{ formatPriceVND(bill.totalCost) }}
                      </td>
                    </tr> -->
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { computed, onMounted, ref, reactive } from "vue";
import { useRoute } from "vue-router";
import billService from "@/services/bill.service.js";
import billDetailService from "@/services/billdetail.service.js";
import bookService from "@/services/book.service.js";
import customerService from "@/services/customer.service.js";
export default {
  setup() {
    const bill = ref({});
    const customer = ref({});
    const detailBill = ref({});
    const route = useRoute();
    const books = reactive({});
    const statuses = ref([
      { value: 1, text: "Đã tiếp nhận" },
      { value: 2, text: "Đang giao" },
      { value: 3, text: "Đã giao" },
    ]);
    onMounted(async () => {
      try {
        const billId = computed(() => route.params.id);
        bill.value = await billService.get(billId.value);
        detailBill.value = await billDetailService.getDetailByBillId(
          billId.value
        );
        // console.log("My bill:", bill.value.customerId);
        console.log("My detail:", detailBill);
        for (const item of detailBill.value) {
          if (!books[item.bookId]) {
            // Kiểm tra xem sản phẩm đã được lấy chưa
            const bookInfo = await bookService.get(item.bookId);
            books[item.bookId] = bookInfo; // Lưu thông tin sản phẩm vào đối tượng reactive
          }
        }

        customer.value = await customerService.get(bill.value.customerId);
        console.log(customer.value.name);
      } catch (error) {
        console.log(error);
      }
    });
    // const formatPriceVND = (price) => {
    //   return new Intl.NumberFormat("vi-VN", {
    //     style: "currency",
    //     currency: "VND",
    //   }).format(price);
    // };
    const datetime = (value) => {
      return new Date(value).toLocaleString("vi-VN");
    };

    const getStatusText = (status) => {
      switch (status) {
        case 1:
          return "Đã tiếp nhận";
        case 2:
          return "Đang giao";
        case 3:
          return "Đã giao";
        default:
          return "Trạng thái không xác định";
      }
    };
    const updateStatus = async (event) => {
      event.preventDefault();
      try {
        const billId = computed(() => route.params.id);
        await billService.update(billId.value, bill.value);
        // console.log(bill.value.status);
        alert("Cập nhật trạng thái thành công");
      } catch (error) {
        console.log(error);
      }
    };

    return {
      statuses,
      bill,
      customer,
      books, 
      detailBill,
      //formatPriceVND,
      datetime,
      getStatusText,
      updateStatus,
    };
  },
};
</script>

<style>
.router-css-2 {
  color: black;
}
</style>
