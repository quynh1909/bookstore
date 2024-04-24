<template>
  <div id="layoutSidenav_content">
    <main>
      <div class="container-fluid px-4">
        <h1 class="mt-4" style="font-weight: 600">Danh sách phiếu trả mượn</h1>
        <ol class="breadcrumb mb-4">
          Tổng phiếu:
          {{
            billCount
          }}
        </ol>
        <div class="card mb-4"></div>
        <div class="card mb-4">
          <div class="card-header">
            <i class="fas fa-table me-1"></i>
          </div>
          <div class="card-body">
            <table class="table">
              <thead class="table-light">
                <tr>
                  <th>STT</th>
                  <th>Mã phiếu</th>
                  <th>Tổng tiền</th>
                  <th>Trạng thái</th>
                  <th>Thời gian</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(bill, index) in reverseBills" :key="bill._id">
                  <th>{{ index + 1 }}</th>
                  <td>{{ bill._id }}</td>
                  <!-- <td>{{ formatPriceVND(bill.totalCost) }}</td> -->
                  <td>{{ getStatusText(bill.status) }}</td>
                  <td>{{ datetime(bill.billTime) }}</td>
                  <td>
                    <router-link
                      :to="{
                        name: 'detail-bill',
                        params: { id: bill._id },
                      }"
                      >Chi tiết</router-link
                    >
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
import billService from "@/services/bill.service.js";
import { ref, onMounted, computed } from "vue";
export default {
  setup() {
    const bills = ref([]);
    const billCount = computed(() => {
      return bills.value.length;
    });
    const reverseBills = computed(() => {
      return [...bills.value].reverse();
    });
    const fetchBill = async () => {
      try {
        const response = await billService.findAll();
        bills.value = response;
      } catch (error) {
        console.log(error);
      }
    };

    onMounted(() => {
      fetchBill();
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
          return "Đang xử lý";
        case 2:
          return "Đang giao";
        case 3:
          return "Đã nhận";
        default:
          return "Trạng thái không xác định";
      }
    };

    return {
      bills,
      billCount,
      reverseBills,
      //formatPriceVND,
      datetime,
      getStatusText,
    };
  },
};
</script>

<style>
.router-css-2 {
  color: black;
}
</style>
