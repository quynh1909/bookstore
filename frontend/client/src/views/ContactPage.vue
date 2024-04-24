<template>
  <div class="page">
    <section class="contact" id="contact">
      <div class="container">
        <div class="row">
          <!-- Chi tiết liên hệ -->
          <div class="col-md-5">
            <div class="contact-info">
              <div class="title">
                <h3>Chi tiết liên hệ</h3>
              </div>
              <div class="content">
                <!-- Info-1 -->
                <div class="info">
                  <i class="fas fa-mobile-alt"></i>
                  <h4 class="d-inline-block">
                    Số điện thoại :
                    <br />
                    <span>+84 582459219</span>
                  </h4>
                </div>
                <!-- Info-2 -->
                <div class="info">
                  <i class="far fa-envelope"></i>
                  <h4 class="d-inline-block">
                    Email :
                    <br />
                    <span>quynhb2014603@student.ctu.edu.vn</span>
                  </h4>
                </div>
                <!-- Info-3 -->
                <div class="info">
                  <i class="fas fa-map-marker-alt"></i>
                  <h4 class="d-inline-block">
                    Địa chỉ :<br />
                    <span>3/2 Xuân Khánh - Ninh Kiều - Cần Thơ</span>
                  </h4>
                </div>
              </div>
            </div>
          </div>

          <!-- Form liên hệ -->
          <div class="col-md-7">
            <div class="contact-form">
              <form>
                <div class="form-group">
                  <input type="text" class="form-control" placeholder="Tên" />
                </div>
                <div class="form-group">
                  <input type="email" class="form-control" placeholder="Email" />
                </div>
                <div class="form-group">
                  <textarea class="form-control" rows="5" placeholder="Nội dung"></textarea>
                </div>
                <button class="btn btn-primary btn-block" type="submit">Gửi ngay</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style>
.contact {
  padding: 50px 0;
}

.contact-info {
  background-color: #f9f9f9;
  padding: 30px;
  border-radius: 10px;
  border: 2px solid #e1e1e1;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.contact-info .title h3 {
  font-size: 24px;
  font-weight: 700;
  color: #333;
  margin-bottom: 20px;
  /* text-transform: uppercase; */
  text-align: center;
}

.contact-info .info {
  margin-bottom: 20px;
}

.contact-info .info i {
  font-size: 24px;
  color: #02434b;
  margin-right: 15px;
}

.contact-info .info h4 {
  font-size: 16px;
  color: #333;
  margin: 0;
}

.contact-info .info h4 span {
  font-size: 14px;
  color: #666;
}

.contact-form {
  border-radius: 10px;
  padding: 30px;
  background-color: #fff;
  border: 2px solid #e1e1e1;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.contact-form .form-group {
  margin-bottom: 20px;
}

.contact-form .form-control {
  border-radius: 10px;
  padding: 15px;
  font-size: 14px;
}

.contact-form .btn-primary {
  border-radius: 10px;
  padding: 15px;
  font-size: 16px;
  background-color: #ff9100;
  border-color: #ff9100;
}

.contact-form .btn-primary:hover {
  background-color: #ffab3a;
  border-color: #ffab3a;
}
</style>
