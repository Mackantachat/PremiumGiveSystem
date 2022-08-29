<template>
  <section>
    <div class="container">
      <div>
        <h5 class="text-start text-primary mb-4">แบบประกัน</h5>
        <div class="row justify-content-center">
          <div class="col-4 ">
            <v-select :reduce="(option) => option.id" :options="BancGroupOption" label="text"
              placeholder="เลือกแบบประกัน" v-model="BancGroup"></v-select>
            <!-- <Select2 v-model="BancGroup" :options="BancGroupOption" key="Id" @select="BancGroupEvent($event)"
              @click="selectClickedEvent()" :settings="{ allowClear: true, placeholder: 'เลือกแบบประกัน'}"
              id="BancGroup">
            </Select2> -->
          </div>
          <div class="col-3 row">
            <button class="btn btn-primary me-2" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal"
              @click="GetInsurance()" data-bs-whatever="@getbootstrap"><i
                class="bi bi-search"></i>เลือกเงื่อนไขสำหรับค้นหาลูกค้า</button>
          </div>
        </div>
        <div class="d-grid gap-2 d-md-flex justify-content-md-center mt-2" v-if="PremiumGifts.length > 0">
          <button class="btn btn-success me-2" type="button" @click="SaveData()"><i
              class="bi bi-plus"></i>บันทึก</button>
          <button class="btn btn-danger" type="button" @click="ClearAddOrEdit()"><i
              class="bi bi-arrow-counterclockwise"></i>ล้างค่า</button>
        </div>
      </div>
      <div>
        <table class="table table-striped" id="Table">
          <thead>
            <tr class="text-center">
              <th scope="col">ลำดับที่</th>
              <th scope="col">เลขที่กรมธรรม์</th>
              <th scope="col">ชื่อ - นามสกุล</th>
              <th scope="col">Install Dt</th>
              <th scope="col">สาขาธนาคาร</th>
              <th scope="col">เบี้ยประกัน</th>
            </tr>
          </thead>
          <tbody class="table-group-divider text-center">
            <tr v-for="(premiumGift ,index ) in PremiumGifts" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ premiumGift.POLOICY_NO }}</td>
              <td class="text-start">{{ premiumGift.NAME + '  ' + premiumGift.SURNAME }}</td>
              <td>{{ premiumGift.INSTALL_DT }}</td>
              <td class="text-start">{{ premiumGift.BBL_NAME }}</td>
              <td class="text-end">{{  new Intl.NumberFormat('th-TH', {
                  style: 'currency',
                  currency: 'THB',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0
                }).format(premiumGift.T_PREMIUM) }}</td>
            </tr>
          </tbody>
        </table>
        <!-- <paginate :page-count="10" :page-range="3" :margin-pages="2" :click-handler="clickCallback(Page)"
                    v-model="Page" :prev-text="'Prev'" :next-text="'Next'" :container-class="'pagination'"
                    :page-class="'page-item'">
                </paginate> -->
      </div>
    </div>
    <div class="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">เงื่อนไขในการแจกของรางวัลให้กับลูกค้า
              {{ BancGroupSelectedObj.text }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="container-fluid">
              <div class="row">
                <div class="col-6 ">
                  <div class="row">
                    <label for="Promotion" class="col-3 col-form-label">ชื่อโปรโมชัน : </label>
                    <div class="col-9">
                      <!-- <input type="password" class="form-control" id="inputPassword"> -->
                      <v-select :reduce="(option) => option.id" :options="PromotionOption" label="text"
                        placeholder="เลือกชื่อโปรโมชัน" v-model="Promotion"></v-select>
                      <!-- <Select2 v-model="Promotion" :options="PromotionOption" key="Id" class="ddl-390-px"
                        @click="selectClickedEvent()" :settings="{ allowClear: true, placeholder: 'เลือกชื่อโปรโมชัน'}"
                        id="Promotion">
                      </Select2> -->
                      <div v-if="v$.Promotion.$error" class="text-danger">
                        {{ v$.Promotion.$errors[0].$message }}
                      </div>
                    </div>
                  </div>
                  <div class="row mt-2">
                    <label for="StInstallDate" class="col-3 col-form-label">Install Date : </label>
                    <div class="col-4">
                      <Datepicker v-model="StInstallDate" locale="th" :format="format" autoApply
                        v-model:value="StInstallDate">
                      </Datepicker>
                      <div v-if="v$.StInstallDate.$error" class="text-danger">
                        {{ v$.StInstallDate.$errors[0].$message }}
                      </div>
                    </div>
                    <label for="EndInstallDate" class="col-1 col-form-label text-center">-</label>
                    <div class="col-4">
                      <Datepicker v-model="EndInstallDate" locale="th" :format="format" autoApply
                        v-model:value="EndInstallDate">
                      </Datepicker>
                      <div v-if="v$.EndInstallDate.$error" class="text-danger">
                        {{ v$.EndInstallDate.$errors[0].$message }}
                      </div>
                    </div>
                  </div>
                  <div class="row mt-2">
                    <label for="StAppDate" class="col-3 col-form-label pe-0">Application Date : </label>
                    <div class="col-4">
                      <Datepicker v-model="StAppDate" locale="th" :format="format" autoApply v-model:value="StAppDate">
                      </Datepicker>
                      <div v-if="v$.StAppDate.$error" class="text-danger">
                        {{ v$.StAppDate.$errors[0].$message }}
                      </div>
                    </div>
                    <label for="EndAppDate" class="col-1 col-form-label text-center">-</label>
                    <div class="col-4">
                      <Datepicker v-model="EndAppDate" locale="th" :format="format" autoApply
                        v-model:value="EndAppDate">
                      </Datepicker>
                      <div v-if="v$.EndAppDate.$error" class="text-danger">
                        {{ v$.EndAppDate.$errors[0].$message }}
                      </div>
                    </div>
                  </div>
                  <div class="row mt-2">
                    <label for="PolicyStatus" class="col-3 col-form-label">สถานะกรมธรรม์ : </label>
                    <div class="col-9">

                      <v-select :reduce="(option) => option.id" :options="PolicyStatusOption" label="text"
                        placeholder="เลือกสถานะกรมธรรม์" v-model="PolicyStatus"></v-select>
                      <!-- <Select2 v-model="PolicyStatus" :options="PolicyStatusOption" key="Id" class="ddl-390-px"
                        @click="selectClickedEvent()" :settings="{ allowClear: true, placeholder: 'เลือกสถานะกรมธรรม์'}"
                        id="PolicyStatus">
                      </Select2> -->
                      <div v-if="v$.PolicyStatus.$error" class="text-danger">
                        {{ v$.PolicyStatus.$errors[0].$message }}
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <label for="MinPremium" class="col-3 col-form-label">เบี้ยประกัน : </label>
                    <div class="col-4">
                      <input type="number" class="form-control" id="MinPremium" v-model="MinPremium">
                      <div v-if="v$.MinPremium.$error" class="text-danger">
                        {{ v$.MinPremium.$errors[0].$message }}
                      </div>
                    </div>
                    <label for="MaxPremium" class="col-1 col-form-label text-center">-</label>
                    <div class="col-4">
                      <input type="number" class="form-control" id="MaxPremium" v-model="MaxPremium">
                      <div v-if="v$.MaxPremium.$error" class="text-danger">
                        {{ v$.MaxPremium.$errors[0].$message }}
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <label class="col-3 col-form-label">แบบประกัน : </label>
                    <div class="col-6 pt-2">
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1"
                          :value="true" v-model="ChkAll">
                        <label class="form-check-label" for="inlineRadio1">ทุกแบบ</label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2"
                          :value="false" v-model="ChkAll">
                        <label class="form-check-label" for="inlineRadio2">บางแบบ</label>
                      </div>
                    </div>
                  </div>
                  <div class="form-check col-12 justify-content-center">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" v-model="Recapture">
                    <label class="form-check-label" for="flexCheckDefault">
                      เป็นใบคำขอจาก Recapture
                    </label>
                  </div>
                  <div class="row mt-2">
                    <label for="SendDate" class="col-3 col-form-label pe-0">วันที่จัดส่ง : </label>
                    <div class="col-4">
                      <Datepicker v-model="SendDate" locale="th" :format="format" autoApply v-model:value="SendDate">
                      </Datepicker>
                      <div v-if="v$.SendDate.$error" class="text-danger">
                        {{ v$.SendDate.$errors[0].$message }}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-6 table-responsive text-end">
                  <table class="table table-striped" id="Table">
                    <thead>
                      <tr class="text-center">
                        <th scope="col"><input class="form-check-input" type="checkbox" v-model="ChkAll"></th>
                        <th scope="col">ลำดับที่</th>
                        <th scope="col">ชื่อแบบประกัน</th>
                      </tr>
                    </thead>
                    <tbody class="table-group-divider text-center">
                      <tr v-for="(insurance ,index ) in Insurances" :key="index">
                        <td><input class="form-check-input" type="checkbox" v-model="insurance.isChecked"
                            :value="insurance.PL_BLOCK + '/' + insurance.PL_CODE +  '/' +insurance.PL_CODE2 + '/' + insurance.isChecked">
                        </td>
                        <td>{{ index + 1 }}</td>
                        <td>{{ insurance.TITLE }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="Search()">ค้นหา</button>
            <button type="button" class="btn btn-danger">ล้างค่า</button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="btnClose">ปิด</button>

          </div>
        </div>
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
  import http from '@/services/AuthService';
  import Swal from 'sweetalert2/src/sweetalert2.js';

  import LoadingBs5 from '@/components/frontend/LoadingBs5';

  import useValidate from '@vuelidate/core';
  import {
    required,
    helpers
  } from '@vuelidate/validators';
  import Select2 from 'vue3-select2-component';

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
        th,
      }
    },
    data() {
      return {
        v$: useValidate(),
        Promotion: null,
        PromotionOption: [],
        StInstallDate: '',
        EndInstallDate: '',
        PremiumGifts: [],
        Page: 1,
        Loading: false,
        Process: "INSERT",
        BancGroup: null,
        BancGroupSelectedObj: {
          id: '',
          text: ''
        },
        BancGroupOption: [],
        PolicyStatus: null,
        PolicyStatusOption: [],
        StAppDate: '',
        EndAppDate: '',
        MinPremium: '',
        MaxPremium: '',
        SendDate: '',
        InsuranceRadio: '',
        Recapture: false,
        Insurances: [],
        ChkAll: true,
      };
    },
    created() {
      this.GetPromotionOption();
      this.GetBancGroupOption();
      this.GetPolicyStatusOption();
    },
    mounted: function () {

    },
    computed: {

    },

    watch: {
      // whenever object changes, this function will run
      ChkAll(newValue, oldValue) {
        this.Insurances.forEach(element => {
          element.isChecked = newValue;
        });
      },
      BancGroup(value) {
        let filter = this.BancGroupOption.filter(
          function (elem) {
            return elem.id == value;
          });
        this.BancGroupSelectedObj = {
          id: filter[0].id,
          text: filter[0].text
        };
      },
      Promotion(prm) {
        this.GetCreateTable(prm)
        this.GetProductGain(prm)
      }
    },

    methods: {
      // selectClickedEvent() {
      //   this.$nextTick(function () {
      //     if (document.querySelector('.select2-search__field') != null) {
      //       document.querySelector('.select2-search__field').focus();
      //     }
      //   })
      // },
      BancGroupEvent({
        id,
        text
      }) {
        this.BancGroupSelectedObj = {
          id: id,
          text: text
        };
      },
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
            });
          })
          .catch(function (error) {
            console.log(error);
          })
      },
      GetBancGroupOption() {
        http.post('PremiumGiveSystem/GetBancGroup', {}).then(respond => {
            respond.data.forEach(e => {
              let ddl = {
                id: '',
                text: ''
              };
              ddl.id = e.BANC_TYPE;
              ddl.text = e.DESCRIPTION_ENG
              this.BancGroupOption.push(ddl);
            });
          })
          .catch(function (error) {
            console.log(error);
          })
      },
      GetPolicyStatusOption() {
        http.post('PremiumGiveSystem/GetPolicyStatus', {}).then(respond => {
            respond.data.forEach(e => {
              let ddl = {
                id: '',
                text: ''
              };
              ddl.id = e.CODE2;
              ddl.text = e.DESCRIPTION
              this.PolicyStatusOption.push(ddl);
            });
          })
          .catch(function (error) {
            console.log(error);
          })
      },
      GetInsurance() {
        this.Insurances = [];
        if (this.BancGroup == '' || this.BancGroup == null) {
          Swal.fire({
            title: 'แจ้งเตือน',
            text: 'กรุณาเลือกแบบประกันก่อน เลือกเงื่อนไขสำหรับค้นหาลูกค้า',
            icon: 'warning',
          }).then((result) => {
            document.getElementById('btnClose').click();
          })
        } else {
          http.post('PremiumGiveSystem/GetInsurance', {
              "BANC_TYPE": this.BancGroup
            }).then(respond => {
              respond.data.map(element => {
                element.isChecked = true
              });
              this.Insurances = respond.data;
            })
            .catch(function (error) {
              console.log(error);
            })
        }
      },
      GetCreateTable(prm) {
        http.post('PremiumGiveSystem/GetCreateTable', {
            "PROMOTION": prm
          }).then(respond => {
            if(respond.status == 200){
              this.StInstallDate =  new Date(this.ConvertToGregorion(respond.data[0].ST_INSTALL_DT.split(' ')[0]));
              this.EndInstallDate = new Date(this.ConvertToGregorion(respond.data[0].END_INSTALL_DT.split(' ')[0]));
            }else{
              this.StInstallDate = '';
              this.EndInstallDate = '';
            }
          })
          .catch(function (error) {
            console.log('error', error);
          }).finally(() => {
            this.Loading = false;
          });
      },
      GetProductGain(prm){
         http.post('PremiumGiveSystem/GetProductGain', {
            "PROMOTION": prm
          }).then(respond => {
            if (respond.status == 200) {
              console.log(respond.data);
              let maxArr = respond.data.map(object => {
                return parseInt(object.MAX_PREMIUM)
              })
              let minArr = respond.data.map(object => {
                return parseInt(object.MIN_PREMIUM)
              })
              let max = Math.max.apply(null,maxArr)
              let min = Math.min.apply(null,minArr)
              this.MaxPremium = max;
              this.MinPremium = min;
            }
          })
          .catch(function (error) {
            console.log('error', error);
          }).finally(() => {
            this.Loading = false;
          });
      },
      Search() {
        let selectedList = this.Insurances.filter(function (elem) {
          return elem.isChecked == true;
        });
        this.v$.$validate() // เช็คฟอร์มทั้งหมด
        if (!this.v$.$error) {
          this.Loading = true;

          http.post('PremiumGiveSystem/GetPremiumGift', {
              "PROMOTION": this.Promotion,
              "START_INSTALL_DT": this.StInstallDate.toLocaleDateString('th-TH',
                'dd/MM/yyyy'),
              "END_INSTALL_DT": this.EndInstallDate.toLocaleDateString('th-TH',
                'dd/MM/yyyy'),
              "STATUS": this.PolicyStatus,
              "START_APP_DT": this.StAppDate.toLocaleDateString('th-TH',
                'dd/MM/yyyy'),
              "END_APP_DT": this.EndAppDate.toLocaleDateString('th-TH',
                'dd/MM/yyyy'),
              "MIN_PREMIUM": this.MinPremium.toString(),
              "MAX_PREMIUM": this.MaxPremium.toString(),
              "INSURANCE": selectedList,
              "RECAPTURE": this.Recapture

            }).then(respond => {
              console.log(respond.status)
              if (respond.status == 200) {
                respond.data.forEach(e => {
                  e.INSTALL_DT = e.INSTALL_DT.split(' ')[0]
                  e.T_PREMIUM = e.T_PREMIUM
                });
                this.PremiumGifts = respond.data;
                document.getElementById('btnClose').click();
              } else {
                Swal.fire({
                  title: 'ไม่พบเงื่อนไขในการแจกของรางวัลให้กับลูกค้า ' + this.BancGroupSelectedObj.text,
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
      },
      ClearSearch() {
        this.SearchPromotion = '';
        this.PremiumGifts = [];
      },
      ClearAddOrEdit() {
        this.PremiumGifts = [];
      },
      ConvertToGregorion(days) {
        let sday = days.split('/');
        let dateEN = sday[1].toString().padStart(2, '0') + '/' + sday[0].toString().padStart(2, '0') + '/' + (
          parseInt(sday[2]) - 543).toString();
        return dateEN;
      },
      SaveData() {
        this.$swal.fire({
          title: 'ต้องการบันทึกเงื่อนไขในการแจกของรางวัลให้กับลูกค้า หรือไม่ ?',
          text: '',
          icon: 'question',
          confirmButtonText: 'ยืนยัน',
          showCancelButton: true,
          cancelButtonText: 'ยกเลิก'
        }).then((result) => {
          if (result.isConfirmed) {
            this.Loading = true;
            let premiumGiftsArr = this.PremiumGifts;
            premiumGiftsArr.forEach(ele => {
              ele.PROMOTION = this.Promotion,
                ele.PACKAGE_DT = this.SendDate.toLocaleDateString('th-TH',
                  'dd/MM/yyyy'),
                ele.DELIVERY_DT = this.SendDate.toLocaleDateString('th-TH',
                  'dd/MM/yyyy'),
                ele.PREMIUM = ele.T_PREMIUM,
                ele.TOTAL_PREMIUM = ele.T_PREMIUM,
                ele.UPD_ID = this.$store.state.nuser_id,
                ele.BANC_TYPE = this.BancGroup
            });
            http.post('PremiumGiveSystem/SavePremiumGift',
                premiumGiftsArr
              ).then(respond => {
                if (respond.status == 200) {
                  Swal.fire({
                    title: 'บันทึกสำเร็จ',
                    text: '',
                    icon: 'success',
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
    },
    validations() {
      return {
        Promotion: {
          required: helpers.withMessage('*กรุณาเลือก Promotion', required)
        },
        StInstallDate: {
          required: helpers.withMessage('*กรุณาเลือกวันที่เริ่มต้น', required)
        },
        EndInstallDate: {
          required: helpers.withMessage('*กรุณาเลือกวันที่สิ้นสุด', required)
        },
        PolicyStatus: {
          required: helpers.withMessage('*กรุณาเลือกสถานะกรมธรรม์', required)
        },
        StAppDate: {
          required: helpers.withMessage('*กรุณาเลือกวันที่เริ่มต้น', required)
        },
        EndAppDate: {
          required: helpers.withMessage('*กรุณาเลือกวันที่สิ้นสุด', required)
        },
        MinPremium: {
          required: helpers.withMessage('*กรุณาเลือกเบี้ยประกันต่ำสุด', required)
        },
        MaxPremium: {
          required: helpers.withMessage('*กรุณาเลือกเบี้ยประกันสูงสุด', required)
        },
        SendDate: {
          required: helpers.withMessage('*กรุณาเลือกวันที่จัดส่ง', required)
        },
      }
    },
  }
</script>

<style lang="css" scoped>
  .table-striped>tbody>tr:nth-child(2n+1)>td,
  .table-striped>tbody>tr:nth-child(2n+1)>th {
    background-color: #e8fffe;
  }

  .table-responsive {
    max-height: 350px !important;
  }
</style>