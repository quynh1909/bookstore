<template>
  <div class="container mt-2">
    <div class="row gutters">
      <div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
        <div class="card h-100">
          <div class="card-body">
            <div class="account-settings">
              <div class="user-profile">
                <h3 style="font-weight: 600" class="text-center">KHÁCH HÀNG</h3>
                <h5 style="font-weight: 600" class="user-name mt-2 text-center">
                  {{ customerData.name }}
                </h5>

                <div class="user-avatar text-center">
                  <img
                    src="https://cdn.pixabay.com/photo/2023/05/02/10/32/avatar-7964941_1280.png"
                    alt="User Avatar"
                    height="250"
                    width="250"
                  />
                </div>
                <div class="text-center">
                  <button class="btn btn-dark text-center" @click="logout">
                    Đăng xuất
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
        <div class="card h-100">
          <div class="card-body">
            <div class="row gutters">
              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <h5 style="font-weight: 600" class="mb-2 text-dark">
                  Thông tin khách hàng
                </h5>
              </div>
              <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                <div class="form-group">
                  <label style="font-weight: 600" for="fullName"
                    >Họ và tên</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="fullName"
                    name="name"
                    placeholder="Enter full name"
                    v-model="customerData.name"
                  />
                </div>
              </div>
              <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                <div class="form-group">
                  <label style="font-weight: 600" for="eMail">Email</label>
                  <input
                    type="email"
                    class="form-control"
                    id="eMail"
                    name="email"
                    placeholder="Enter email ID"
                    v-model="customerData.email"
                  />
                </div>
              </div>
              <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                <div class="form-group">
                  <label style="font-weight: 600" for="phone"
                    >Số điện thoại</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="phone"
                    name="phone"
                    placeholder="Enter phone number"
                    v-model="customerData.phone"
                  />
                </div>
              </div>
              <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                <div class="form-group">
                  <label style="font-weight: 600" for="address">Địa chỉ</label>
                  <input
                    type="url"
                    class="form-control"
                    id="address"
                    name="address"
                    placeholder=""
                    v-model="customerData.address"
                  />
                </div>
              </div>
            </div>

            <div class="row gutters mt-1">
              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div class="text-right">
                  <button
                    type="button"
                    id="submit"
                    name="submit"
                    class="btn btn-dark"
                    @click="updateCustomer"
                  >
                    Cập nhật
                  </button>
                </div>
              </div>
            </div>
          </div>

          <h2 style="font-weight: 600">Đơn hàng</h2>
          <div id="scroll-container" class="card-body">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Mã phiếu mượn</th>
                  <th scope="col">Ngày mượn</th>
                  <th scope="col">Ngày trả</th>
                  <th scope="col">Trạng thái</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(bill, index) in reversedBills" :key="bill._id">
                  <th>{{ index + 1 }}</th>
                  <td>{{ bill._id }}</td>
                  <td>{{ formatPriceVND(bill.totalCost) }}</td>
                  <td>{{ getStatusText(bill.status) }}</td>
                  <td>{{ datetime(bill.billTime) }}</td>
                  <td>
                    <router-link
                      :to="{
                        name: 'cart-detail',
                        params: { id: bill._id },
                      }"
                      >Chi tiết</router-link
                    >
                  </td>
                  <td>
                    <i
                      v-show="bill.status === 1"
                      @click="cancel(bill._id)"
                      class="text-danger fa-solid fa-xmark"
                    ></i>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, toRefs, ref, onMounted, computed } from "vue";
import billService from "@/services/bill.service.js";
import billDetailService from "@/services/billdetail.service.js";
import { useAuthStore } from "@/stores/auth.js";
export default {
  props: {
    customerData: {
      type: Object,
      required: true,
    },
    updateCustomer: {
      type: Function,
      required: true,
    },
  },

  setup(props, context) {
    // Sử dụng toRefs để giữ reactivity của props khi destructuring
    const { customerData } = toRefs(props);
    const bills = ref([]);
    const reversedBills = computed(() => {
      return [...bills.value].reverse();
    });
    const authStore = useAuthStore();
    const userId = computed(() => authStore.userId);
    const logout = () => {
      context.emit("logout"); // Phát một sự kiện 'logout' để ProfilePage.vue có thể xử lý
    };
    onMounted(async () => {
      try {
        bills.value = await billService.getBillByUserId(userId.value);
        // console.log(bills);
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
          return "Đang xử lý";
        case 2:
          return "Đang giao";
        case 3:
          return "Đã nhận";
        default:
          return "Trạng thái không xác định";
      }
    };

    const cancel = async (id) => {
      const shouldCancel = window.confirm("Bạn có muốn hủy đơn hàng không?");
      if (!shouldCancel) {
        return; // Người dùng không muốn hủy đơn hàng, thoát khỏi hàm
      }
      try {
        const response = await billService.delete(id);
        const deleteDetail = await billDetailService.deleteDetailByBillId(
          response
        );
        bills.value = bills.value.filter((bill) => bill._id !== id);
        alert("Hủy đơn hàng thành công");
      } catch (error) {
        console.log(error);
      }
    };
    return {
      customerData,
      reversedBills,
      logout,
      formatPriceVND,
      datetime,
      getStatusText,
      cancel,
      userId,
      bills,
    };
  },
};
</script>
<style>
#scroll-container {
  padding: 0px;
  height: 300px;
  overflow: auto;
}
table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background-color: #000;
  /* Màu nền của phần head */
  color: #fff;
  position: sticky;
  top: 0;
}

th {
  text-align: left;
  padding: 8px 10px;
  /* Các thuộc tính CSS khác cho phần đầu bảng */
}

tbody {
  height: 200px;
  /* Đặt chiều cao cho phần body để tạo thanh cuộn */
  overflow: auto;
}

</style>
