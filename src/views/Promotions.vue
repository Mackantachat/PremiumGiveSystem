<template>
    <section>
        <div class="container">
            <div>
                <h5 class="text-start text-primary mb-4">บันทึก/แก้ไข Promotion</h5>
                <div class="row justify-content-center">
                    <div class="col-6 row">
                        <label for="PromotionNo" class="col-5 col-form-label text-end">เลขที่
                            Promotion</label>
                        <div class="col-7">
                            <input type="text" class="form-control" id="PromotionNo" v-model="PromotionNo" disabled>
                        </div>
                    </div>
                    <div class="col-6 row">
                        <label for="PromotionName" class="col-3 col-form-label">ชื่อ
                            Promotion<label class="text-danger">*</label></label>
                        <div class="col-8">
                            <input type="text" class="form-control" id="PromotionName" v-model="PromotionName">
                            <div v-if="v$.PromotionName.$error" class="text-danger">
                                {{ v$.PromotionName.$errors[0].$message }}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row justify-content-center mt-2">
                    <div class="col-6 row">
                        <label for="StartDatePromotion" class="col-5 col-form-label text-end">วันที่เริ่ม
                            Promotion<label class="text-danger">*</label></label>
                        <div class="col-7">
                            <Datepicker v-model="StartPromotionDate" locale="th" :format="format" autoApply
                                v-model:value="StartPromotionDate">
                            </Datepicker>
                            <div v-if="v$.StartPromotionDate.$error" class="text-danger">
                                {{ v$.StartPromotionDate.$errors[0].$message }}
                            </div>
                        </div>
                    </div>
                    <div class="col-6 row">
                        <label for="EndDatePromotion" class="col-4 col-form-label">วันที่สิ้นสุด
                            Promotion<label class="text-danger">*</label></label>
                        <div class="col-7">
                            <Datepicker v-model="EndDatePromotion" locale="th" :format="format" autoApply
                                v-model:value="EndDatePromotion"></Datepicker>
                            <div v-if="v$.EndDatePromotion.$error" class="text-danger">
                                {{ v$.EndDatePromotion.$errors[0].$message }}
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
                <div class="col-12 justify-content-center">
                    <div class="row pb-4">
                        <div class="col-4 row">
                            <label for="SearchPromotionNo" class="col-5 col-form-label text-end">เลขที่
                                Promotion</label>
                            <div class="col-7">
                                <input type="text" class="form-control" id="SearchPromotionNo"
                                    v-model="SearchPromotionNo">
                            </div>
                        </div>
                        <div class="col-4 row">
                            <label for="SearchPromotionName" class="col-4 col-form-label text-end">ชื่อ
                                Promotion</label>
                            <div class="col-8">
                                <input type="text" class="form-control" id="SearchPromotionName"
                                    v-model="SearchPromotionName">
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="d-grid gap-2 d-md-block">
                                <button class="btn btn-primary me-2" type="button" @click="Search()"><i
                                        class="bi bi-search"></i>ค้นหา</button>
                                <button class="btn btn-danger" type="button" @click="ClearSearch()"><i
                                        class="bi bi-arrow-counterclockwise"></i>ล้างค่า</button>
                            </div>
                        </div>
                    </div>
                </div>
                <table class="table table-striped">
                    <thead>
                        <tr class="text-center">
                            <th scope="col">เลขที่่ Promotion</th>
                            <th scope="col">ชื่อ Promotion</th>
                            <th scope="col">วันที่เริ่ม</th>
                            <th scope="col">วันที่สิ้นสุด</th>
                            <th scope="col"><i class="bi bi-pencil"></i></th>
                        </tr>
                    </thead>
                    <tbody class="table-group-divider text-center">
                        <tr v-for="(promotion ,index ) in Promotions" :key="index">
                            <th scope="row">{{ promotion.PROMOTION }}</th>
                            <td class="text-start">{{ promotion.DESCRIPTION }}</td>
                            <td>{{ promotion.PROM_ST_DT }}</td>
                            <td>{{ promotion.PROM_END_DT }}</td>
                            <td><button class="btn btn-warning me-2" type="button"
                                    @click="Edit(promotion.PROMOTION)">EDIT</button></td>
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

    export default {
        components: {
            Datepicker,
            LoadingBs5
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
                PromotionNo: '',
                PromotionName: '',
                StartPromotionDate: '',
                EndDatePromotion: '',
                SearchPromotionNo: '',
                SearchPromotionName: '',
                Promotions: [],
                Page: 1,
                Loading: false,
                Process: "INSERT"
            };
        },
        created() {

        },
        computed: {

        },
        methods: {
            clickCallback: function (pageNum) {
                // console.log(pageNum);
            },
            Search() {
                this.Loading = true;
                http.post('PremiumGiveSystem/GetPromotion', {
                        "PROMOTION": this.SearchPromotionNo.trim(),
                        "DESCRIPTION": this.SearchPromotionName
                    }).then(respond => {
                        if (respond.status == 200) {
                            respond.data.forEach(v => {
                                if (v.PROM_ST_DT != null) {
                                    v.PROM_ST_DT = v.PROM_ST_DT.split(' ')[0];
                                }
                                if (v.PROM_END_DT != null) {
                                    v.PROM_END_DT = v.PROM_END_DT.split(' ')[0];
                                }
                            });
                            this.Promotions = respond.data;
                        } else {
                            Swal.fire({
                                title: 'ไม่พบ Promotion ที่ต้องการค้นหา',
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
                this.SearchPromotionNo = '';
                this.SearchPromotionName = '';
                this.Promotions = [];
            },
            Edit(prmCode) {
                this.Promotions.forEach(e => {
                    if (e.PROMOTION == prmCode) {
                        this.PromotionNo = e.PROMOTION;
                        this.PromotionName = e.DESCRIPTION;
                        this.StartPromotionDate = new Date(this.ConvertToGregorion(e.PROM_ST_DT.split(' ')[0]));
                        this.EndDatePromotion = new Date(this.ConvertToGregorion(e.PROM_END_DT.split(' ')[0]));
                    }
                });
                window.scrollTo(0, 0);
            },
            ClearAddOrEdit() {
                this.PromotionNo = '';
                this.PromotionName = '';
                this.StartPromotionDate = '';
                this.EndDatePromotion = '';
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
                        title: 'ต้องการบันทึก Promotion หรือไม่ ?',
                        text: '',
                        icon: 'question',
                        confirmButtonText: 'ยืนยัน',
                        showCancelButton: true,
                        cancelButtonText: 'ยกเลิก'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            this.Loading = true;
                            if (this.PromotionNo == null || this.PromotionNo == '') {
                                this.Process = "INSERT"
                            } else {
                                this.Process = "EDIT"
                            }

                            http.post('PremiumGiveSystem/ManagePromotion', {
                                    "PROMOTION": this.PromotionNo,
                                    "DESCRIPTION": this.PromotionName.trim(),
                                    "PROM_ST_DT": this.StartPromotionDate.toLocaleDateString('th-TH',
                                        'dd/MM/yyyy'),
                                    "PROM_END_DT": this.EndDatePromotion.toLocaleDateString('th-TH',
                                        'dd/MM/yyyy'),
                                    "UPD_ID": this.$store.state.nuser_id,
                                    "Process": this.Process
                                }).then(respond => {
                                    if (respond.status == 200) {
                                        this.PromotionNo = respond.data.PROMOTION
                                        console.log(respond.data)
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
                PromotionName: {
                    required: helpers.withMessage('*กรุณากรอกชื่อ Promotion', required)
                },
                StartPromotionDate: {
                    required: helpers.withMessage('*กรุณาเลือกวันที่เริ่ม Promotion', required)
                },
                EndDatePromotion: {
                    required: helpers.withMessage('*กรุณาเลือกวันที่สิ้นสุด Promotion', required)
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