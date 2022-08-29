<template>
  <section>
    <div class="container">
      <div>
        <h5 class="text-start text-primary mb-4">บันทึก/แก้ไข ตารางเงื่อนไขในการแจกของรางวัล</h5>
        <div class="row justify-content-center">
          <div class="col-6 row">
            <label for="Promotion" class="col-5 col-form-label text-end">ชื่อโปรโมชัน</label>
            <div class="col-7">
               <v-select :reduce="(option) => option.id" :options="PromotionOption" :disabled="Process == 'EDIT'"
                                            label="text" placeholder="เลือกชื่อโปรโมชัน" v-model="Promotion"></v-select>
              <!-- <Select2 v-model="Promotion" :options="PromotionOption" key="Id" :disabled="Process == 'EDIT'"
                :settings="{ allowClear: true, placeholder: 'เลือกชื่อโปรโมชัน'}" id="Promotion">
              </Select2> -->
              <div v-if="v$.Promotion.$error" class="text-danger">
                {{ v$.Promotion.$errors[0].$message }}
              </div>
            </div>
          </div>
          <div class="col-6 row">
            <label for="CreateDate" class="col-5 col-form-label text-end">วันที่จัดสร้างข้อมูล</label>
            <div class="col-7">
              <Datepicker v-model="CreateDate" locale="th" :format="format" autoApply v-model:value="CreateDate"
                :disabled="Process == 'EDIT'">
              </Datepicker>
              <div v-if="v$.CreateDate.$error" class="text-danger">
                {{ v$.CreateDate.$errors[0].$message }}
              </div>
            </div>
          </div>
        </div>
        <div class="row justify-content-center mt-2">
          <div class="col-6 row">
            <label for="StInstallDate" class="col-5 col-form-label text-end">Install Dt เริ่มต้น</label>
            <div class="col-7">
              <Datepicker v-model="StInstallDate" locale="th" :format="format" autoApply v-model:value="StInstallDate">
              </Datepicker>
              <div v-if="v$.StInstallDate.$error" class="text-danger">
                {{ v$.StInstallDate.$errors[0].$message }}
              </div>
            </div>
          </div>
          <div class="col-6 row">
            <label for="EndInstallDate" class="col-5 col-form-label text-end">Install Dt สิ้นสุด</label>
            <div class="col-7">
              <Datepicker v-model="EndInstallDate" locale="th" :format="format" autoApply
                v-model:value="EndInstallDate">
              </Datepicker>
              <div v-if="v$.EndInstallDate.$error" class="text-danger">
                {{ v$.EndInstallDate.$errors[0].$message }}
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
            <label for="SearchCreateDate" class="col-5 col-form-label text-end">วันที่จัดสร้างข้อมูล</label>
            <div class="col-7">
              <Datepicker v-model="SearchCreateDate" locale="th" :format="format" autoApply
                v-model:value="SearchCreateDate">
              </Datepicker>
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
        <table class="table table-striped" id="Table">
          <thead>
            <tr class="text-center">
              <th scope="col">ชื่อ Promotion</th>
              <th scope="col">วันที่จัดสร้างข้อมูล</th>
              <th scope="col">Install Dt เริ่มต้น</th>
              <th scope="col">Install Dt สิ้นสุด</th>
              <th scope="col"><i class="bi bi-pencil"></i></th>
              <th scope="col"><i class="bi bi-trash"></i></th>
            </tr>
          </thead>
          <tbody class="table-group-divider text-center">
            <tr v-for="(createTable ,index ) in CreateTables" :key="index">
              <td class="text-start">{{ createTable.PROMOTION_NAME }}</td>
              <td>{{ createTable.CREATE_DT }}</td>
              <td>{{ createTable.ST_INSTALL_DT }}</td>
              <td>{{ createTable.END_INSTALL_DT }}</td>
              <td><button class="btn btn-warning me-2" type="button"
                  @click="Edit(createTable.PROMOTION , createTable.CREATE_DT , 'EDIT')">EDIT</button></td>
              <td><button class="btn btn-danger me-2" type="button"
                  @click="Delete(createTable.PROMOTION , createTable.CREATE_DT , 'DEL')">DELETE</button></td>
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
        PromotionOption: [],
        CreateDate: '',
        StInstallDate: '',
        EndInstallDate: '',
        SearchPromotion: null,
        SearchPromotionOption: [],
        SearchCreateDate: '',
        CreateTables: [],
        Page: 1,
        Loading: false,
        Process: "INSERT"
      };
    },
    created() {
      this.GetPromotionOption();
    },
    mounted: function () {},
    computed: {

    },

    methods: {
      clickCallback: function (pageNum) {
        // console.log(pageNum);
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
        http.post('PremiumGiveSystem/GetCreateTable', {
            "PROMOTION": this.SearchPromotion,
            "CREATE_DT": this.SearchCreateDate == '' ? '' : this.SearchCreateDate.toLocaleDateString('th-TH',
              'dd/MM/yyyy')
          }).then(respond => {
            if (respond.status == 200) {
              respond.data.forEach(v => {
                if (v.CREATE_DT != null) {
                  v.CREATE_DT = v.CREATE_DT.split(' ')[0];
                }
                if (v.ST_INSTALL_DT != null) {
                  v.ST_INSTALL_DT = v.ST_INSTALL_DT.split(' ')[0];
                }
                if (v.END_INSTALL_DT != null) {
                  v.END_INSTALL_DT = v.END_INSTALL_DT.split(' ')[0];
                }
              });
              this.CreateTables = respond.data;
            } else {
              Swal.fire({
                title: 'ไม่พบ ตารางเงื่อนไขการแจกของรางวัล ที่ต้องการค้นหา',
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
        this.CreateTables = [];
        this.SearchCreateDate = '';
      },
      Edit(promotion, createDate, process) {
        this.Process = process;
        this.CreateTables.forEach(e => {
          if (e.CREATE_DT == createDate && e.PROMOTION == promotion) {
            this.CreateDate = new Date(this.ConvertToGregorion(e.CREATE_DT.split(' ')[0]));
            this.Promotion = e.PROMOTION;
            this.StInstallDate = new Date(this.ConvertToGregorion(e.ST_INSTALL_DT.split(' ')[0]));
            this.EndInstallDate = new Date(this.ConvertToGregorion(e.END_INSTALL_DT.split(' ')[0]));
          }
        });
        window.scrollTo(0, 0);
      },
      Delete(promotion, createDate, process) {
        this.$swal.fire({
          title: 'ต้องการลบการสร้างตารางเงื่อนไขในการแจกของรางวัลนี้ หรือไม่ ?',
          text: '',
          icon: 'question',
          confirmButtonText: 'ยืนยัน',
          showCancelButton: true,
          cancelButtonText: 'ยกเลิก'
        }).then((result) => {
          if (result.isConfirmed) {
            this.Loading = true;
            http.post('PremiumGiveSystem/ManageCreateTable', {
                "PROMOTION": promotion,
                "CREATE_DT": new Date(this.ConvertToGregorion(createDate)).toLocaleDateString('th-TH',
                  'dd/MM/yyyy'),
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
        this.CreateDate = '';
        this.StInstallDate = '';
        this.EndInstallDate = '';
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
            title: 'ต้องการบันทึกการสร้างตารางเงื่อนไขในการแจกของรางวัลนี้ หรือไม่ ?',
            text: '',
            icon: 'question',
            confirmButtonText: 'ยืนยัน',
            showCancelButton: true,
            cancelButtonText: 'ยกเลิก'
          }).then((result) => {
            if (result.isConfirmed) {
              this.Loading = true;

              http.post('PremiumGiveSystem/ManageCreateTable', {
                  "PROMOTION": this.Promotion,
                  "CREATE_DT": this.CreateDate.toLocaleDateString('th-TH',
                    'dd/MM/yyyy'),
                  "ST_INSTALL_DT": this.StInstallDate.toLocaleDateString('th-TH',
                    'dd/MM/yyyy'),
                  "END_INSTALL_DT": this.EndInstallDate.toLocaleDateString('th-TH',
                    'dd/MM/yyyy'),
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
                  console.log('error', error);
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
        Promotion: {
          required: helpers.withMessage('*กรุณาเลือก Promotion', required)
        },
        CreateDate: {
          required: helpers.withMessage('*กรุณาเลือกวันที่จัดสร้างข้อมูล', required)
        },
        StInstallDate: {
          required: helpers.withMessage('*กรุณาเลือก Install Dt เริ่มต้น', required)
        },
        EndInstallDate: {
          required: helpers.withMessage('*กรุณาเลือก Install Dt สิ้นสุด', required)
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