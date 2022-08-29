<template>
  <section>
    <div class="container">
      <div>
        <h5 class="text-start text-primary mb-4">บันทึก/แก้ไข สินค้า</h5>
        <div class="row justify-content-center">
          <div class="col-4 row">
            <label for="ProductCode" class="col-5 col-form-label text-end">รหัสสินค้า</label>
            <div class="col-7">
              <input type="text" class="form-control" id="ProductCode" v-model="ProductCode" disabled>
            </div>
          </div>
          <div class="col-4 row">
            <label for="ProductName" class="col-5 col-form-label text-end">ชื่อสินค้า<label class="text-danger">*</label></label>
            <div class="col-7">
              <input type="text" class="form-control" id="ProductName" v-model="ProductName">
              <div v-if="v$.ProductName.$error" class="text-danger">
                {{ v$.ProductName.$errors[0].$message }}
              </div>
            </div>
          </div>
          <div class="col-4 row">
            <label for="ProductModel" class="col-5 col-form-label text-end">รุ่นสินค้า</label>
            <div class="col-7">
              <input type="text" class="form-control" id="ProductModel" v-model="ProductModel">
            </div>
          </div>
        </div>
        <div class="row justify-content-center mt-2">
          <div class="col-4 row">
            <label for="ProductPrice" class="col-5 col-form-label text-end">ราคาสินค้า<label class="text-danger">*</label></label>
            <div class="col-7">
              <input type="number" class="form-control" id="ProductPrice" v-model="ProductPrice">
              <div v-if="v$.ProductPrice.$error" class="text-danger">
                {{ v$.ProductPrice.$errors[0].$message }}
              </div>
            </div>
          </div>
          <div class="col-4 row">
            <label for="ProductCompany" class="col-5 col-form-label text-end">ชื่อบริษัทที่ผลิต</label>
            <div class="col-7">
              <input type="text" class="form-control" id="ProductCompany" v-model="ProductCompany">
            </div>
          </div>
          <div class="col-4 row">
            <!-- <label for="ProductExtra" class="col-5 col-form-label text-end">ชื่อสินค้าพิเศษ</label>
            <div class="col-7">
              <Select2 v-model="ProductExtra" :options="ProductExtraOption" key="Id"
                :settings="{ allowClear: true, placeholder: 'เลือกชื่อสินค้าพิเศษ'}" id="ProductExtra">
              </Select2>
            </div> -->
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
          <div class="col-3 row">
            <label for="SearchProductCode" class="col-4 col-form-label">รหัสสินค้า</label>
            <div class="col-8">
              <input type="text" class="form-control" id="SearchProductCode" v-model="SearchProductCode">
            </div>
          </div>
          <div class="col-3 row">
            <label for="SearchProductName" class="col-4 col-form-label">ชื่อสินค้า</label>
            <div class="col-8">
              <input type="text" class="form-control" id="SearchProductName" v-model="SearchProductName">
            </div>
          </div>
          <div class="col-3 row">
            <label for="SearchProductCompany" class="col-5 col-form-label">ชื่อบริษัทผู้ผลิต</label>
            <div class="col-7">
              <input type="text" class="form-control" id="SearchProductCompany" v-model="SearchProductCompany">
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
              <th scope="col">รหัสสินค้า</th>
              <th scope="col">ชื่อสินค้า</th>
              <th scope="col">รุ่นสินค้า</th>
              <th scope="col">ราคาสินค้า</th>
              <th scope="col">ชื่อบริษัทผู้ผลิต</th>
              <!-- <th scope="col">ชื่อสินค้าพิเศษ</th> -->
              <th scope="col"><i class="bi bi-pencil"></i></th>
            </tr>
          </thead>
          <tbody class="table-group-divider text-center">
            <tr v-for="(product ,index ) in Products" :key="index">
              <th scope="row">{{ product.PRODUCT }}</th>
              <td class="text-start">{{ product.DESCRIPTION }}</td>
              <td>{{ product.MODEL }}</td>
              <td class="text-end">{{  new Intl.NumberFormat('th-TH', {
                  style: 'currency',
                  currency: 'THB',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0
                }).format(product.PRICE) }}</td>
              <td class="text-start">{{ product.COMPANY }}</td>
              <!-- <td class="text-start">{{ product.PRODUCT_EXTRA_NAME }}</td> -->
              <td><button class="btn btn-warning me-2" type="button" @click="Edit(product.PRODUCT)">EDIT</button>
              </td>
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
        ProductCode: '',
        ProductName: '',
        ProductModel: '',
        ProductPrice: '',
        ProductCompany: '',
        ProductExtra: '',
        ProductExtraOption: [],
        SearchProductCode: '',
        SearchProductName: '',
        SearchProductCompany: '',
        Products: [],
        Page: 1,
        Loading: false,
        Process: "INSERT"
      };
    },
    created() {
      this.GetProductOption();
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
              this.ProductExtraOption.push(ddl);
            });
          })
          .catch(function (error) {
            console.log(error);
          })
      },
      Search() {
        this.Loading = true;
        http.post('PremiumGiveSystem/GetProduct', {
            "PRODUCT": this.SearchProductCode.trim(),
            "DESCRIPTION": this.SearchProductName,
            "COMPANY": this.SearchProductCompany
          }).then(respond => {
            if (respond.status == 200) {
              respond.data.forEach(row => {
                if (row.PRODUCT_EXTRA != null) {
                  let productExtraName = this.ProductExtraOption.filter(function (elem) {
                    if (elem.id == row.PRODUCT_EXTRA) return elem.text;
                  });
                  row.PRODUCT_EXTRA_NAME = productExtraName[0].text;
                } else {
                  row.PRODUCT_EXTRA_NAME = '-';
                }
              });
              this.Products = respond.data;
            } else {
              Swal.fire({
                title: 'ไม่พบ สินค้า ที่ต้องการค้นหา',
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
        this.SearchProductCode = '';
        this.SearchProductName = '';
        this.SearchProductCompany = '';
        this.Products = [];
      },
      Edit(pdCode) {
        this.Products.forEach(e => {
          if (e.PRODUCT == pdCode) {
            this.ProductCode = e.PRODUCT;
            this.ProductName = e.DESCRIPTION;
            this.ProductModel = e.MODEL;
            this.ProductPrice = e.PRICE;
            this.ProductCompany = e.COMPANY;
            this.ProductExtra = e.PRODUCT_EXTRA;
          }
        });
        window.scrollTo(0, 0);
      },
      ClearAddOrEdit() {
        this.ProductCode = '';
        this.ProductName = '';
        this.ProductModel = '';
        this.ProductPrice = '';
        this.ProductCompany = '';
        this.ProductExtra = '';
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
              if (this.ProductCode == null || this.ProductCode == '') {
                this.Process = "INSERT"
              } else {
                this.Process = "EDIT"
              }

              http.post('PremiumGiveSystem/ManageProduct', {
                  "PRODUCT": this.ProductCode,
                  "MODEL": this.ProductModel,
                  "DESCRIPTION": this.ProductName.trim(),
                  "PRICE": this.ProductPrice.toString(),
                  "COMPANY": this.ProductCompany,
                  "PRODUCT_EXTRA": this.ProductExtra,
                  "UPD_ID": this.$store.state.nuser_id,
                  "Process": this.Process
                }).then(respond => {
                  if (respond.status == 200) {
                    this.ProductCode = respond.data.PRODUCT
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
                  console.log('error', error);
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
        ProductName: {
          required: helpers.withMessage('*กรุณากรอกชื่อสินค้า', required)
        },
        ProductPrice: {
          required: helpers.withMessage('*กรุณากรอกราคาสินค้า', required)
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