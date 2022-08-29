<template>
  <section>
    <div class="container">
      <div>
        <h5 class="text-start text-primary mb-4">บันทึก/แก้ไข เงื่อนไขการจัดรายการโปรโมชัน</h5>
        <div class="row justify-content-center">
          <div class="col-6 row">
            <label for="Promotion" class="col-5 col-form-label text-end">ชื่อโปรโมชัน</label>
            <div class="col-7">
               <v-select :reduce="(option) => option.id" :options="PromotionOption" :disabled="Process == 'EDIT'"
                                            label="text" placeholder="เลือกชื่อโปรโมชัน" v-model="Promotion"></v-select>
              <!-- <Select2 v-model="Promotion" :options="PromotionOption" key="Id"  :disabled="Process == 'EDIT'"
                :settings="{ allowClear: true, placeholder: 'เลือกชื่อโปรโมชัน'}" id="Promotion">
              </Select2> -->
              <div v-if="v$.Promotion.$error" class="text-danger">
                {{ v$.Promotion.$errors[0].$message }}
              </div>
            </div>
          </div>
          <div class="col-6 row">
            <label for="MinPremium" class="col-3 col-form-label text-end">เบี้ยประกันต่ำสุด</label>
            <div class="col-7">
              <input type="number" class="form-control" id="MinPremium" v-model="MinPremium">
              <div v-if="v$.MinPremium.$error" class="text-danger">
                {{ v$.MinPremium.$errors[0].$message }}
              </div>
            </div>
          </div>
        </div>
        <div class="row justify-content-center mt-2">
          <div class="col-6 row">
            <label for="Product" class="col-5 col-form-label text-end">ชื่อสินค้า</label>
            <div class="col-7">
              <v-select :reduce="(option) => option.id" :options="ProductOption" :disabled="Process == 'EDIT'"
                                            label="text" placeholder="เลือกชื่อสินค้า" v-model="Product"></v-select>
              <!-- <Select2 v-model="Product" :options="ProductOption" key="Id" :disabled="Process == 'EDIT'"
                :settings="{ allowClear: true, placeholder: 'เลือกชื่อสินค้า'}" id="Product">
              </Select2> -->
              <div v-if="v$.Product.$error" class="text-danger">
                {{ v$.Product.$errors[0].$message }}
              </div>
            </div>
          </div>
          <div class="col-6 row">
            <label for="MaxPremium" class="col-3 col-form-label text-end">เบี้ยประกันสูงสุด</label>
            <div class="col-7">
              <input type="number" class="form-control" id="MaxPremium" v-model="MaxPremium">
              <div v-if="v$.MaxPremium.$error" class="text-danger">
                {{ v$.MaxPremium.$errors[0].$message }}
              </div>
            </div>
          </div>
        </div>
        <div class="d-grid gap-2 d-md-flex justify-content-md-center mt-2">
          <button class="btn btn-success me-2" type="button" @click="SaveData()"><i
              class="bi bi-plus"></i>บันทึก</button>
          <button class="btn btn-danger" type="button" @click="ClearAddOrEdit()"><i
              class="bi bi-arrow-counterclockwise"></i>ล้างค่า</button>
        </div>

      </div>
      <div>
        <h5 class="text-start text-primary mb-4">ค้นหาข้อมูลตามเงื่อนไขที่ต้องการ</h5>
        <div class="row justify-content-center pb-4">
          <div class="col-4 row">
            <label for="SearchPromotion" class="col-4 col-form-label text-end">ชื่อโปรโมชัน</label>
            <div class="col-8">
              <v-select :reduce="(option) => option.id" :options="SearchPromotionOption" 
                                            label="text" placeholder="เลือกชื่อโปรโมชัน" v-model="SearchPromotion"></v-select>
              <!-- <Select2 v-model="SearchPromotion" :options="SearchPromotionOption" key="Id"
                :settings="{ allowClear: true, placeholder: 'เลือกชื่อโปรโมชัน'}" id="SearchPromotion">
              </Select2> -->
            </div>
          </div>
          <div class="col-4 row">
            <label for="SearchProduct" class="col-3 col-form-label text-end">ชื่อสินค้า</label>
            <div class="col-8">
             <v-select :reduce="(option) => option.id" :options="SearchProductOption" 
                                            label="text" placeholder="เลือกชื่อสินค้า" v-model="SearchProduct"></v-select>
              <!-- <Select2 v-model="SearchProduct" :options="SearchProductOption" key="Id"
                :settings="{ allowClear: true, placeholder: 'เลือกชื่อสินค้า'}" id="SearchProduct">
              </Select2> -->
            </div>
          </div>
          <div class="col-3">
            <div class="d-grid gap-2 d-md-block">
              <button class="btn btn-primary me-2" type="button" @click="Search()"><i
                  class="bi bi-search"></i>ค้นหา</button>
              <button class="btn btn-danger" type="button" @click="ClearSearch()"><i
                  class="bi bi-arrow-counterclockwise"></i>ล้างค่า</button>
            </div>
          </div>
        </div>
        <table class="table table-striped">
          <thead>
            <tr class="text-center">
              <th scope="col">#</th>
              <th scope="col">ชื่อ Promotion</th>
              <th scope="col">ชื่อสินค้า</th>
              <th scope="col">Min Premium</th>
              <th scope="col">Max Premium</th>
              <th scope="col"><i class="bi bi-pencil"></i></th>
              <th scope="col"><i class="bi bi-trash"></i></th>
            </tr>
          </thead>
          <tbody class="table-group-divider text-center">
            <tr v-for="(productGain ,index ) in ProductGains" :key="index">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ productGain.PROMOTION_NAME }}</td>
              <td>{{ productGain.PRODUCT_NAME }}</td>
              <td class="text-end">{{  new Intl.NumberFormat('th-TH', {
                  style: 'currency',
                  currency: 'THB',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0
                }).format(productGain.MIN_PREMIUM)}}</td>
              <td class="text-end">{{  new Intl.NumberFormat('th-TH', {
                  style: 'currency',
                  currency: 'THB',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0
                }).format(productGain.MAX_PREMIUM)}}</td>
              <td><button class="btn btn-warning me-2" type="button" @click="Edit(productGain.PRODUCT , productGain.PROMOTION , 'EDIT')">EDIT</button></td>
              <td><button class="btn btn-danger me-2" type="button" @click="Delete(productGain.PRODUCT , productGain.PROMOTION , 'DEL')">DELETE</button></td>
            </tr>
          </tbody>
        </table>
        <!-- <paginate :page-count="10" :page-range="3" :margin-pages="2" :click-handler="clickCallback(Page)"
                    v-model="Page" :prev-text="'Prev'" :next-text="'Next'" :container-class="'pagination'"
                    :page-class="'page-item'">
                </paginate> -->
      </div>
    </div>
    <div v-if="Loading">
      <LoadingBs5></LoadingBs5>
    </div>

  </section>
</template>

<script>
  import Datepicker from '@vuepic/vue-datepicker';
  import '@vuepic/vue-datepicker/dist/main.css';
  import {
    th
  } from 'date-fns/locale';
  import http from '@/services/AuthService'
  import Swal from 'sweetalert2/src/sweetalert2.js'

  import LoadingBs5 from '@/components/frontend/LoadingBs5';

  import useValidate from '@vuelidate/core'
  import {
    required,
    helpers
  } from '@vuelidate/validators'
  import Select2 from 'vue3-select2-component'
  export default {
    components: {
      Datepicker,
      LoadingBs5,
      Select2
    },
    setup() {
      // In case of a range picker, you'll receive [Date, Date]
      const format = (date) => {
        return date.toLocaleDateString('th-TH')
      }

      return {
        format,
        th
      }
    },
    data() {
      return {
        v$: useValidate(),
        Promotion: null,
        Product: null,
        MinPremium: '',
        MaxPremium: '',
        PromotionOption: [],
        ProductOption: [],
        SearchProduct: null,
        SearchProductOption: [],
        SearchPromotion: null,
        SearchPromotionOption: [],
        ProductGains: [],
        Page: 1,
        Loading: false,
        Process: "INSERT"
      };
    },
    created() {
      this.GetProductOption();
      this.GetPromotionOption();
    },
    computed: {

    },
    methods: {
      clickCallback: function (pageNum) {
        // console.log(pageNum);
      },
      GetProductOption() {
        http.post('PremiumGiveSystem/GetProduct', {}).then(respond => {
            respond.data.forEach(e => {
              let ddl = {
                id: '',
                text: ''
              };
              ddl.id = e.PRODUCT;
              ddl.text = e.DESCRIPTION
              this.ProductOption.push(ddl);
              this.SearchProductOption.push(ddl);
            });
          })
          .catch(function (error) {
            console.log(error);
          })
      },
      GetPromotionOption() {
        http.post('PremiumGiveSystem/GetPromotion', {}).then(respond => {
            respond.data.forEach(e => {
              let ddl = {
                id: '',
                text: ''
              };
              ddl.id = e.PROMOTION;
              ddl.text = e.DESCRIPTION
              this.PromotionOption.push(ddl);
              this.SearchPromotionOption.push(ddl);
            });
          })
          .catch(function (error) {
            console.log(error);
          })
      },
      Search() {
        this.Loading = true;
        http.post('PremiumGiveSystem/GetProductGain', {
            "PROMOTION": this.SearchPromotion,
            "PRODUCT": this.SearchProduct
          }).then(respond => {
            if (respond.status == 200) {
              this.ProductGains = respond.data;
            } else {
              Swal.fire({
                title: 'ไม่พบเงื่อนไขการจัดรายการ Promotion ที่ต้องการค้นหา',
                text: '',
                icon: 'error',
              })
            }
          })
          .catch(function (error) {
            console.log('error', error);
          }).finally(() => {
            this.Loading = false;
          });
      },
      ClearSearch() {
        this.SearchPromotion = null;
        this.SearchProduct = null;
        this.ProductGains = [];
      },
      Edit(product , promotion , process) {
        this.Process = process;
        this.ProductGains.forEach(e => {
          if (e.PRODUCT == product && e.PROMOTION == promotion) {
            this.Product = e.PRODUCT;
            this.Promotion = e.PROMOTION;
            this.MinPremium = e.MIN_PREMIUM;
            this.MaxPremium = e.MAX_PREMIUM;
          }
        });
        window.scrollTo(0, 0);
      },
      Delete(product , promotion , process) {
        this.$swal.fire({
            title: 'ต้องการลบเงื่อนไขการจัดรายการโปรโมชัน หรือไม่ ?',
            text: '',
            icon: 'question',
            confirmButtonText: 'ยืนยัน',
            showCancelButton: true,
            cancelButtonText: 'ยกเลิก'
          }).then((result) => {
            if (result.isConfirmed) {
              this.Loading = true;
              http.post('PremiumGiveSystem/ManageProductGain', {
                  "PROMOTION": promotion,
                  "PRODUCT": product,
                  "UPD_ID": this.$store.state.nuser_id,
                  "Process": process
                }).then(respond => {
                  if (respond.status == 200) {
                    Swal.fire({
                      title: 'ลบรายการสำเร็จ',
                      text: '',
                      icon: 'success',
                    }).then((result) => {
                      this.Search();
                    })
                  } else {
                    Swal.fire({
                      title: 'ลบรายการไม่สำเร็จ',
                      text: '',
                      icon: 'error',
                    })
                  }
                })
                .catch(function (error) {
                  console.log('error', error);
                   Swal.fire({
                      title: 'เกิดข้อผิดพลาด',
                      text: error.response.data,
                      icon: 'error',
                    })
                }).finally(() => {
                  this.Loading = false;
                  this.Process = 'INSERT';

                });
            }
          });
      },
      ClearAddOrEdit() {
        this.Promotion = null;
        this.Product = null;
        this.MinPremium = '';
        this.MaxPremium = '';
        this.Process = 'INSERT';
      },
      ConvertToGregorion(days) {
        let sday = days.split('/');
        let dateEN = sday[1].toString().padStart(2, '0') + '/' + sday[0].toString().padStart(2, '0') + '/' + (
          parseInt(sday[2]) - 543).toString();
        return dateEN;
      },
      SaveData() {
        this.v$.$validate() // เช็คฟอร์มทั้งหมด
        if (!this.v$.$error) {
          this.$swal.fire({
            title: 'ต้องการบันทึกรายการสินค้านี้ หรือไม่ ?',
            text: '',
            icon: 'question',
            confirmButtonText: 'ยืนยัน',
            showCancelButton: true,
            cancelButtonText: 'ยกเลิก'
          }).then((result) => {
            if (result.isConfirmed) {
              this.Loading = true;
              http.post('PremiumGiveSystem/ManageProductGain', {
                  "PROMOTION": this.Promotion,
                  "PRODUCT": this.Product,
                  "MIN_PREMIUM": this.MinPremium.toString(),
                  "MAX_PREMIUM": this.MaxPremium.toString(),
                  "UPD_ID": this.$store.state.nuser_id,
                  "Process": this.Process
                }).then(respond => {
                  if (respond.status == 200) {
                    Swal.fire({
                      title: 'บันทึกสำเร็จ',
                      text: '',
                      icon: 'success',
                    }).then((result) => {
                      this.Search();
                    })
                  } else {
                    Swal.fire({
                      title: 'บันทึกไม่สำเร็จ',
                      text: '',
                      icon: 'error',
                    })
                  }
                })
                .catch(function (error) {
                   Swal.fire({
                      title: 'บันทึกไม่สำเร็จ',
                      text: error.response.data,
                      icon: 'error',
                    })
                }).finally(() => {
                  this.Loading = false;
                });
            }
          })

        }
      }
    },
    validations() {
      return {
        Product: {
          required: helpers.withMessage('*กรุณาเลือกสินค้า', required)
        },
        Promotion: {
          required: helpers.withMessage('*กรุณาเลือก Promotion', required)
        },
        MinPremium: {
          required: helpers.withMessage('*กรุณากรอกเบี้ยประกันสูงสุด', required)
        },
        MaxPremium: {
          required: helpers.withMessage('*กรุณากรอกเบี้ยประกันสูงสุด', required)
        }
      }
    },
  }
</script>

<style lang="css" scoped>
  .table-striped>tbody>tr:nth-child(2n+1)>td,
  .table-striped>tbody>tr:nth-child(2n+1)>th {
    background-color: #e8fffe;
  }
</style>