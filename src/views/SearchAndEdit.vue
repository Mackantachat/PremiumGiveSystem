<template>
    <section>
        <div class="container">
            <div>
                <h5 class="text-start text-primary mb-4">แบบประกัน</h5>
                <div class="row justify-content-center">
                    <div class="col-4 ">
                        <v-select :reduce="(option) => option.id" :options="BancGroupOption" label="text"
                            placeholder="เลือกแบบประกัน" v-model="BancGroup"></v-select>
                        <!-- <Select2 v-model="BancGroup" :options="BancGroupOption" key="Id"
                            @select="BancGroupEvent($event)"
                            :settings="{ allowClear: true, placeholder: 'เลือกแบบประกัน'}" id="BancGroup">
                        </Select2> -->
                    </div>
                    <div class="col-3 row">
                        <button class="btn btn-primary me-2" type="button" data-bs-toggle="modal"
                            data-bs-target="#exampleModal" @click="CheckBancGroup()"><i
                                class="bi bi-search"></i>เลือกเงื่อนไขสำหรับค้นหาลูกค้า</button>
                    </div>
                </div>
                <div class="d-grid gap-2 d-md-flex justify-content-md-center mt-2" v-if="PremiumGifts.length > 0">
                    <button class="btn btn-danger" type="button" @click="ClearAddOrEdit()"><i
                            class="bi bi-arrow-counterclockwise"></i>ล้างค่า</button>
                    <button class="btn btn-danger" type="button" @click="DeleteAll()"><i class="bi bi-trash"></i>
                        ลบข้อมูลทั้งหมด</button>
                </div>
                <div class="d-grid gap-2 d-md-flex justify-content-md-center mt-2" v-if="PremiumGifts.length > 0">
                    <button class="btn btn-primary" type="button" @click="PrintDetailOfPremium()"><i
                            class="bi bi-file-earmark-arrow-down"></i>
                        พิมพ์รายละเอียดของ Premium</button>
                    <button class="btn btn-primary" type="button" @click="PrintListOfAward()"><i
                            class="bi bi-file-earmark-arrow-down"></i>
                        พิมพ์รายชื่อผู้ได้รับรางวัล</button>
                    <button class="btn btn-primary" type="button" @click="PrintDataForDelivery()"><i
                            class="bi bi-file-earmark-arrow-down"></i>
                        พิมพ์ข้อมูลสำหรับจัดส่ง</button>
                    <button class="btn btn-primary" type="button" @click="PrintStickerSendBank()"><i
                            class="bi bi-file-earmark-arrow-down"></i>
                        พิมพ์สติ๊กเกอร์ส่งสาขา BANK(NEW)</button>
                </div>
            </div>

        </div>
        <div>
            <table class="table table-striped" id="Table">
                <thead>
                    <tr class="text-center">
                        <th scope="col">ชื่อ Promotion</th>
                        <th scope="col">รหัสสาขา</th>
                        <th scope="col">ชื่อสาขา</th>
                        <th scope="col">เลขที่กรมธรรม์</th>
                        <th scope="col">ชื่อ-สกุลลูกค้า</th>
                        <th scope="col">Install Dt</th>
                        <th scope="col">กธ.ที่ถืออยู่ทั้งหมด</th>
                        <th scope="col">รางวัลที่ได้รับ</th>
                        <th scope="col">รางวัลที่ได้รับเพิ่ม</th>
                        <th scope="col">เบี้ยประกัน</th>
                        <th scope="col">รวมเบี้ยประกัน</th>
                        <th scope="col">เลือกที่อยู่จัดส่ง</th>
                        <th scope="col">ที่อยู่จัดส่ง(ลูกค้า)</th>
                        <th scope="col">ที่อยู่จัดส่ง(ธนาคาร)</th>
                        <th scope="col">ที่อยู่สาขาบริษัท</th>
                        <th scope="col">วันที่จัดส่ง</th>
                        <th scope="col"><i class="bi bi-pencil"></i></th>
                    </tr>
                </thead>
                <tbody class="table-group-divider text-center">
                    <tr v-for="(premiumGift ,index ) in PremiumGifts" :key="index">
                        <td class="text-start">{{ premiumGift.PROMOTION_NAME }}</td>
                        <td>{{ premiumGift.BBL_CODE }}</td>
                        <td class="text-start">{{ premiumGift.BBL_NAME }}</td>
                        <td>{{ premiumGift.CERT_NUMBER == null ?  premiumGift.POLICY_NUMBER : premiumGift.POLICY_NUMBER + '/' + premiumGift.CERT_NUMBER}}
                        </td>
                        <td class="text-start">{{ premiumGift.NAME + '  ' + premiumGift.SURNAME }}</td>
                        <td>{{ premiumGift.INSTALL_DT }}</td>
                        <td>{{ premiumGift.NUMBER_OF_POLICY }}</td>
                        <td>{{ premiumGift.PRODUCT_NAME }}</td>
                        <td>{{ premiumGift.PRODUCT_EXTRA_NAME }}</td>
                        <td class="text-end">{{ new Intl.NumberFormat('th-TH', {
                                        style: 'currency',
                                        currency: 'THB',
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 0
                                    }).format(premiumGift.PREMIUM)}}</td>
                        <td class="text-end">{{   new Intl.NumberFormat('th-TH', {
                                        style: 'currency',
                                        currency: 'THB',
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 0
                                    }).format(premiumGift.TOTAL_PREMIUM )}}</td>
                        <td>
                            <v-select :reduce="(option) => option.id" :options="DeliAdrOption" label="text"
                                class="bg-white" placeholder="เลือกที่อยู่สาขาบนิษัท" v-model="premiumGift.DeliAdr">
                            </v-select>
                        </td>
                        <td>
                            <!-- <div class="tooltip fade bs-tooltip-top show" data-bs-toggle="tooltip"
                                data-bs-placement="top" title="{{premiumGift.CUS_ADDRESS}}">
                               </div> -->
                            <input type="text" class="form-control" id="CUS_ADDRESS" v-model="premiumGift.CUS_ADDRESS">
                        </td>
                        <td>
                            <!-- <div class="tooltip fade bs-tooltip-top show" data-bs-toggle="tooltip"
                                data-bs-placement="top" title="{{premiumGift.BANK_ADDRESS}}"></div> -->
                            <input type="text" class="form-control" id="BANK_ADDRESS"
                                v-model="premiumGift.BANK_ADDRESS">
                        </td>
                        <td>
                            <v-select :reduce="(option) => option.text" :options="BlaAdrOption" label="text"
                                class="bg-white" placeholder="เลือกที่อยู่สาขาบนิษัท" v-model="premiumGift.BlaAdr">
                            </v-select>
                        </td>
                        <td>
                            <Datepicker v-model="premiumGift.DELIVERY_DT" locale="th" :format="format" autoApply
                                v-model:value="premiumGift.DELIVERY_DT">
                            </Datepicker>
                        </td>
                        <td><button class="btn btn-warning me-2" type="button"
                                @click="EditDeliveryDt(premiumGift)">แก้ไข</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="modal fade" id="exampleModal" aria-hidden="false">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">เงื่อนไขในการค้นหาข้อมูล
                            {{ BancGroupSelectedObj.text }}</h5>
                        <!-- <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> -->
                    </div>
                    <div class="modal-body">
                        <div class="container-fluid">
                            <div class="col-12">
                                <div class="row">
                                    <label for="Promotion" class="col-2 col-form-label text-end">ชื่อโปรโมชัน :
                                    </label>
                                    <div class="col-9">
                                        <v-select :reduce="(option) => option.id" :options="PromotionOption"
                                            label="text" placeholder="เลือกชื่อโปรโมชัน" v-model="Promotion"></v-select>
                                        <!-- <Select2 v-model="Promotion" :options="PromotionOption" key="Id"
                                            class="ddl-390-px"  :settings="{ allowClear: true, placeholder: 'เลือกชื่อโปรโมชัน' }"
                                            id="Promotion">
                                        </Select2> -->
                                        <div v-if="v$.Promotion.$error" class="text-danger">
                                            {{ v$.Promotion.$errors[0].$message }}
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <label for="BBL_CODE" class="col-2 col-form-label text-end">รหัสสาขา : </label>
                                    <div class="col-2">
                                        <input type="text" class="form-control" id="BBL_CODE" v-model="BBL_CODE"
                                            disabled>
                                    </div>
                                    <label for="BBL_CODE" class="col-1 col-form-label text-end">ชื่อสาขา : </label>
                                    <div class="col-5">
                                        <v-select :reduce="(option) => option.id" :options="BBL_CODEOption" label="text"
                                            placeholder="เลือกสาขา" v-model="BBL_CODE"></v-select>
                                        <!-- <Select2 v-model="BBL_CODE" :options="BBL_CODEOption" key="Id"
                                            class="ddl-390-px" :settings="{ allowClear: true, placeholder: 'เลือกสาขา'}"
                                            id="PolicyStatus">
                                        </Select2> -->
                                    </div>
                                </div>
                                <div class="row pt-2">
                                    <label for="Product" class="col-2 col-form-label text-end">ชื่อสินค้า</label>
                                    <div class="col-7">
                                        <v-select :reduce="(option) => option.id" :options="ProductOption" label="text"
                                            placeholder="เลือกชื่อสินค้า" v-model="Product"></v-select>
                                        <!-- <Select2 v-model="Product" :options="ProductOption" key="Id" class="ddl-390-px"
                                            :disabled="Process == 'EDIT'"
                                            :settings="{ allowClear: true, placeholder: 'เลือกชื่อสินค้า'}"
                                            id="Product">
                                        </Select2> -->
                                    </div>
                                </div>
                                <div class="row mt-2">
                                    <label for="StInstallDate" class="col-2 col-form-label text-end">Install Date :
                                    </label>
                                    <div class="col-2">
                                        <Datepicker v-model="StInstallDate" locale="th" :format="format" autoApply
                                            v-model:value="StInstallDate">
                                        </Datepicker>
                                    </div>
                                    <label for="EndInstallDate" class="col-1 col-form-label text-center">-</label>
                                    <div class="col-2">
                                        <Datepicker v-model="EndInstallDate" locale="th" :format="format" autoApply
                                            v-model:value="EndInstallDate">
                                        </Datepicker>
                                    </div>
                                </div>
                                <div class="row pt-2">
                                    <label for="PolicyNo" class="col-2 col-form-label text-end">เลขที่กรมธรรม์ :
                                    </label>
                                    <div class="col-2">
                                        <input type="number" class="form-control" id="PolicyNo" v-model="PolicyNo">
                                    </div>
                                    <label for="CertNo" class="col-1 col-form-label text-end"
                                        v-if="BancGroup == 'H'">Cert No. : </label>
                                    <div class="col-2">
                                        <input type="number" class="form-control" id="CertNo" v-if="BancGroup == 'H'"
                                            v-model="CertNo">
                                    </div>
                                </div>
                                <div class="row pt-2">
                                    <label for="MinPremium" class="col-2 col-form-label text-end">ช่วงเบี้ยประกัน :
                                    </label>
                                    <div class="col-2">
                                        <input type="number" class="form-control" id="MinPremium" v-model="MinPremium">
                                    </div>
                                    <label for="MaxPremium" class="col-1 col-form-label text-center">ถึง : </label>
                                    <div class="col-2">
                                        <input type="number" class="form-control" id="MaxPremium" v-model="MaxPremium">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" @click="Search()">ค้นหา</button>
                        <button type="button" class="btn btn-danger" @click="ClearSearch()">ล้างค่า</button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                            id="btnClose">ปิด</button>

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
    import LoadingBs5 from '@/components/frontend/LoadingBs5';
    import Datepicker from '@vuepic/vue-datepicker';
    import '@vuepic/vue-datepicker/dist/main.css';
    import {
        th
    } from 'date-fns/locale';
    import useValidate from '@vuelidate/core';
    import {
        required,
        helpers
    } from '@vuelidate/validators';
    import Select2 from 'vue3-select2-component';
    import http from '@/services/AuthService';
    import httpDownload from '@/services/AuthDownloadService';
    import Swal from 'sweetalert2/src/sweetalert2.js';

    // import {
    //     Tooltip
    // } from "bootstrap";
    export default {
        components: {
            Datepicker,
            LoadingBs5,
            Select2,
        },
        setup() {
            // In case of a range picker, you'll receive [Date, Date]
            const format = (date) => {
                return date.toLocaleDateString('th-TH')
            }
            // new Tooltip(document.body, {
            //     selector: "[data-bs-toggle='tooltip']",
            // });
            // var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
            // var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            //     return new bootstrap.Tooltip(tooltipTriggerEl)
            // })
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
                Product: null,
                ProductOption: [],
                StInstallDate: '',
                EndInstallDate: '',
                BBL_CODE: null,
                BBL_CODEOption: [],
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
                PolicyStatus: '',
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
                PolicyNo: '',
                CertNo: '',
                BlaAdr: null,
                BlaAdrOption: [],
                DeliAdrOption: []
            };
        },
        created() {
            this.GetPromotionOption();
            this.GetBancGroupOption();
            this.GetBranch();
            this.GetProductOption();
        },
        watch: {
            BancGroup(value) {
                let filter = this.BancGroupOption.filter(
                    function (elem) {
                        return elem.id == value;
                    });
                this.BancGroupSelectedObj = {
                    id: filter[0].id,
                    text: filter[0].text
                };
            }
        },
        methods: {
            CheckBancGroup() {
                if (this.BancGroup == '' || this.BancGroup == null) {
                    Swal.fire({
                        title: 'แจ้งเตือน',
                        text: 'กรุณาเลือกแบบประกันก่อน เลือกเงื่อนไขสำหรับค้นหาลูกค้า',
                        icon: 'warning',
                    }).then((result) => {
                        document.getElementById('btnClose').click();
                    })
                }
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
            GetBranch() {
                http.post('PremiumGiveSystem/GetBranch', {}).then(respond => {
                        respond.data.forEach(e => {
                            let ddl = {
                                id: '',
                                text: ''
                            };
                            ddl.id = e.BBL_BRANCH;
                            ddl.text = e.DESCRIPTION
                            this.BBL_CODEOption.push(ddl);
                        });
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            },
            GetBlaAdrress() {
                http.post('PremiumGiveSystem/GetZTB_OFFICE', {}).then(respond => {
                        respond.data.forEach(e => {
                            let ddl = {
                                id: '',
                                text: ''
                            };
                            ddl.id = e.OFFICE;
                            ddl.text = e.DESCRIPTION
                            this.BlaAdrOption.push(ddl);
                        });
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            },
            GetDeleviryAddress() {
                http.post('PremiumGiveSystem/GetDeleviryAddress', {}).then(respond => {
                        respond.data.forEach(e => {
                            let ddl = {
                                id: '',
                                text: ''
                            };
                            ddl.id = e.Id;
                            ddl.text = e.Text
                            this.DeliAdrOption.push(ddl);
                        });
                        this.PremiumGifts.forEach(ele => {
                            ele.DeliAdr = this.DeliAdrOption[0].id
                        });
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            },
            Search() {
                this.v$.$validate() // เช็คฟอร์มทั้งหมด
                if (!this.v$.$error) {
                    if ((this.StInstallDate != '' && this.EndInstallDate == '') || (this.StInstallDate == '' && this
                            .EndInstallDate != '')) {

                        Swal.fire({
                            title: 'แจ้งเตือน',
                            text: 'กรุณากรอก Install Dt เริ่มต้นและสิ้นสุด',
                            icon: 'warning',
                        })
                    } else if ((this.MinPremium != '' && this.MaxPremium == '') || (this.MinPremium == '' && this
                            .MaxPremium != '')) {


                        Swal.fire({
                            title: 'แจ้งเตือน',
                            text: 'กรุณากรอกช่วงเบี้ยเริ่มต้นและสิ้นสุด',
                            icon: 'warning',
                        })
                    } else {
                        this.Loading = true;

                        http.post('PremiumGiveSystem/GetPremiumGiftSearchEdit', {
                                "PROMOTION": this.Promotion,
                                "BBL_CODE": this.BBL_CODE,
                                "Product": this.Product,
                                "START_INSTALL_DT": this.StInstallDate == '' ? '' : this.StInstallDate
                                    .toLocaleDateString('th-TH',
                                        'dd/MM/yyyy'),
                                "END_INSTALL_DT": this.EndInstallDate == '' ? '' : this.EndInstallDate
                                    .toLocaleDateString('th-TH',
                                        'dd/MM/yyyy'),
                                "POLICY_NUMBER": this.PolicyNo,
                                "CERT_NUMBER": this.CertNo,
                                "MIN_PREMIUM": this.MinPremium.toString(),
                                "MAX_PREMIUM": this.MaxPremium.toString(),
                                "BANC_TYPE": this.BancGroup
                            }).then(respond => {
                                if (respond.status == 200) {
                                    respond.data.forEach(e => {
                                        e.INSTALL_DT = e.INSTALL_DT.split(' ')[0]
                                        e.DELIVERY_DT = new Date(this.ConvertToGregorion(e.DELIVERY_DT
                                            .split(' ')[0]));
                                        e.BlaAdr = null;
                                        e.DeliAdr = null;
                                    });
                                    this.PremiumGifts = respond.data;
                                    document.getElementById('btnClose').click();
                                    console.log('this.PremiumGifts', this.PremiumGifts);
                                    this.GetBlaAdrress();
                                    this.GetDeleviryAddress();
                                } else {
                                    Swal.fire({
                                        title: 'ไม่พบเงื่อนไขในการแจกของรางวัลให้กับลูกค้า ' + this
                                            .BancGroupSelectedObj.text,
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
                }
            },
            PrintListOfAward() {
                this.Loading = true;
                httpDownload.post('PremiumGiveSystem/PrintListOfAwardeesReport', this.PremiumGifts).then(respond => {
                        let blob = new Blob([respond.data], {
                                type: 'application/pdf'
                            }),
                            url = window.URL.createObjectURL(blob)

                        window.open(url, '_blank')
                    })
                    .catch(function (error) {
                        console.log('error', error);
                    }).finally(() => {
                        this.Loading = false;
                    });

            },
            PrintDataForDelivery() {
                this.Loading = true;
                httpDownload.post('PremiumGiveSystem/PrintDataForDelivery', this.PremiumGifts).then(respond => {
                        let blob = new Blob([respond.data], {
                                type: 'application/pdf'
                            }),
                            url = window.URL.createObjectURL(blob)

                        window.open(url, '_blank')
                    })
                    .catch(function (error) {
                        console.log('error', error);
                    }).finally(() => {
                        this.Loading = false;
                    });

            },
            PrintStickerSendBank() {
                let canPrint = true;
                this.PremiumGifts.forEach(p => {
                    if (p.DeliAdr == 'BLA' && p.BlaAdr == null) {
                        canPrint = false;
                        Swal.fire({
                            title: 'ไม่สามารถพิมพ์ได้',
                            text: 'กรุณาเลือกที่อยู่สาขาบริษัท ในรายการที่ต้องการจัดส่งไปที่สาขาบริษัท',
                            icon: 'warning',
                        })
                    }
                });
                if(canPrint){
                     Swal.fire({
                    title: 'ต้องการพิมพ์พร้อมที่อยู่หรือไม่?',
                    icon: 'question',
                    input: 'checkbox',
                    inputValue: true,
                    inputPlaceholder: 'พิมพ์พร้อมที่อยู่ลูกค้า',
                    confirmButtonText: 'ยืนยัน',
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.Loading = true;
                        if (result.value) {
                            this.PremiumGifts.forEach(value => {
                                value.NeedAddress = true;
                            });
                        } else {
                            this.PremiumGifts.forEach(value => {
                                value.NeedAddress = false;
                            });
                        }
                        httpDownload.post('PremiumGiveSystem/PrintStickerSendBank', this.PremiumGifts).then(
                                respond => {
                                    let blob = new Blob([respond.data], {
                                            type: 'application/pdf'
                                        }),
                                        url = window.URL.createObjectURL(blob)

                                    window.open(url, '_blank')
                                })
                            .catch(function (error) {
                                console.log('error', error);
                            }).finally(() => {
                                this.Loading = false;
                            });
                    }
                })
                }
               
            },
            PrintDetailOfPremium() {
                this.Loading = true;
                httpDownload.post('PremiumGiveSystem/PrintDetailOfPremium', this.PremiumGifts).then(respond => {
                        let blob = new Blob([respond.data], {
                                type: 'application/pdf'
                            }),
                            url = window.URL.createObjectURL(blob)

                        window.open(url, '_blank')
                    })
                    .catch(function (error) {
                        console.log('error', error);
                    }).finally(() => {
                        this.Loading = false;
                    });
            },
            ClearSearch() {
                this.Promotion = null;
                this.BBL_CODE = null;
                this.Product = null;
                this.StInstallDate = '';
                this.EndInstallDate = '';
                this.PolicyNo = '';
                this.CertNo = '';
                this.MinPremium = '';
                this.MaxPremium = '';
            },
            ClearAddOrEdit() {
                this.BancGroup = null;
                this.PremiumGifts = [];
            },
            ConvertToGregorion(days) {
                let sday = days.split('/');
                let dateEN = sday[1].toString().padStart(2, '0') + '/' + sday[0].toString().padStart(2, '0') + '/' + (
                    parseInt(sday[2]) - 543).toString();
                return dateEN;
            },
            EditDeliveryDt(prmGft) {
                this.$swal.fire({
                    title: 'ต้องการแก้ไขวันที่จัดส่ง หรือไม่ ?',
                    text: '',
                    icon: 'question',
                    confirmButtonText: 'ยืนยัน',
                    showCancelButton: true,
                    cancelButtonText: 'ยกเลิก'
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.Loading = true;
                        http.post('PremiumGiveSystem/EditBancPremiumGiftDeliveryDt', {
                                "PROMOTION": prmGft.PROMOTION,
                                "CREATED_DT": prmGft.CREATED_DT,
                                "DELIVERY_DT": prmGft.DELIVERY_DT.toLocaleDateString('th-TH',
                                    'dd/MM/yyyy'),
                                "UPD_ID": this.$store.state.nuser_id,
                                "POLICY_ID": prmGft.POLICY_ID,
                            }).then(respond => {
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
            },
            DeleteAll() {
                if (this.PremiumGifts.length == 0) {
                    this.$swal.fire({
                        title: 'เกิดข้อผิดพลาด',
                        text: 'ไม่มีข้อมูลที่จะลบ',
                        icon: 'error',
                    })
                } else {
                    this.$swal.fire({
                        title: 'ยืนยันการลบข้อมูลทั้งหมด หรือไม่ ?',
                        text: '',
                        icon: 'question',
                        confirmButtonText: 'ยืนยัน',
                        showCancelButton: true,
                        cancelButtonText: 'ยกเลิก'
                    }).then((result) => {
                        this.Loading = true;
                        http.post('PremiumGiveSystem/DeleteBancPremiumGift', this.PremiumGifts).then(
                                respond => {
                                    Swal.fire({
                                        title: 'ลบข้อมูลทั้งหมดเรียบร้อย',
                                        text: '',
                                        icon: 'success',
                                    }).then(result => {})
                                })
                            .catch(function (error) {
                                console.log(error);
                                Swal.fire({
                                    title: 'ลบข้อมูลทั้งหมด ไม่สำเร็จ',
                                    text: error.response.data,
                                    icon: 'error',
                                })
                            }).finally(() => {
                                this.Loading = false;
                            });
                    })
                }
            },
        },
        validations() {
            return {
                Promotion: {
                    required: helpers.withMessage('*กรุณาเลือกชื่อโปรโมชัน', required)
                },
            }
        },
    }
</script>

<style lang="css" scoped>

</style>