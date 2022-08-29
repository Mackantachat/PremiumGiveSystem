<template>
    <section>
        <div class="container">
            <div>
                <h5 class="text-start text-primary mb-4">ค้นหาข้อมูลตามเงื่อนไขที่ต้องการ</h5>
                <div class="col-12 justify-content-center">
                    <div class="row pb-4">
                        <div class="col-6 row">
                            <label for="Promotion" class="col-5 col-form-label text-end">ชื่อโปรโมชัน</label>
                            <div class="col-7">
                                <v-select :reduce="(option) => option.id" :options="PromotionOption"
                                            label="text" placeholder="เลือกชื่อโปรโมชัน" v-model="Promotion"></v-select>
                                <!-- <Select2 v-model="Promotion" :options="PromotionOption" key="Id"
                                    :settings="{ allowClear: true, placeholder: 'เลือกชื่อโปรโมชัน'}" id="Promotion">
                                </Select2> -->
                                <div v-if="v$.Promotion.$error" class="text-danger">
                                    {{ v$.Promotion.$errors[0].$message }}
                                </div>
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
                <div class="d-grid gap-2 d-md-flex justify-content-md-center mt-2" v-if="PremiumGifts.length > 0">
                    <button class="btn btn-primary me-2" type="button" @click="EndProcess()"><i
                            class="bi bi-card-checklist"></i> จบงาน</button>
                    <button class="btn btn-success me-2" type="button" data-bs-toggle="modal"
                        @click="AddPremiumGiftData()" data-bs-target="#AddModal"><i class="bi bi-plus"></i>
                        เพิ่มข้อมูล</button>
                    <button class="btn btn-danger" type="button" @click="DeleteAll()"><i class="bi bi-trash"></i>
                        ลบข้อมูลทั้งหมด</button>
                </div>
                <table class="table table-striped">
                    <thead>
                        <tr class="text-center">
                            <th scope="col">ชื่อสาขา</th>
                            <th scope="col">เลขที่ กธ.</th>
                            <th scope="col">ชื่อ-สกุล</th>
                            <th scope="col">Install Dt</th>
                            <th scope="col">กรมธรรม์ทั้งหมด</th>
                            <th scope="col">รางวัลที่ได้รับ</th>
                            <th scope="col">รางวัลที่ได้รับเพิ่ม</th>
                            <th scope="col">เบี้ยประกัน</th>
                            <th scope="col">รวมเบี้ยประกัน</th>
                            <th scope="col"><i class="bi bi-pencil"></i></th>
                        </tr>
                    </thead>
                    <tbody class="table-group-divider text-center">
                        <tr v-for="(premiumGift ,index ) in PremiumGifts" :key="index">
                            <th scope="row" class="text-start">{{ premiumGift.BBL_NAME }}</th>
                            <td>{{ premiumGift.CERT_NUMBER == null ? premiumGift.POLICY_NUMBER : premiumGift.POLICY_NUMBER + '/' + premiumGift.CERT_NUMBER }}
                            </td>
                            <td class="text-start">{{ premiumGift.NAME + ' ' + premiumGift.SURNAME }}</td>
                            <td>{{ premiumGift.INSTALL_DT  }}</td>
                            <td>{{ premiumGift.NUMBER_OF_POLICY == null ? '-' : premiumGift.NUMBER_OF_POLICY}}</td>
                            <td>{{ premiumGift.PRODUCT_NAME == null ? '-' : premiumGift.PRODUCT_NAME}}</td>
                            <td>{{ premiumGift.PRODUCT_EXTRA_NAME == null ? '-' : premiumGift.PRODUCT_EXTRA_NAME}}</td>
                            <td class="text-end">{{ new Intl.NumberFormat('th-TH', {
                                        style: 'currency',
                                        currency: 'THB',
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 0
                                    }).format(premiumGift.PREMIUM )}}</td>
                            <td class="text-end">{{ new Intl.NumberFormat('th-TH', {
                                        style: 'currency',
                                        currency: 'THB',
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 0
                                    }).format(premiumGift.TOTAL_PREMIUM )}}</td>
                            <td><button class="btn btn-warning me-2" type="button" data-bs-toggle="modal"
                                    data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap"
                                    @click="Change(premiumGift)">Change</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">เปลี่ยนของรางวัล</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-6">
                                    <div class="col-12 row">
                                        <div class="col-9 row">
                                            <label for="SearchPolicyNo" class="col-7 col-form-label">เลขที่
                                                กธ.ที่ต้องการให้สิทธื์ </label>
                                            <div class="col-5">
                                                <input type="text" class="form-control" id="SearchPolicyNo"
                                                    v-model="SearchPolicyNo">
                                            </div>
                                            <div v-if="v$.SearchPolicyNo.$error" class="text-danger">
                                                {{ v$.SearchPolicyNo.$errors[0].$message }}
                                            </div>
                                        </div>
                                        <div class="col-3">
                                            <div class="d-grid gap-2 d-md-block text-end">
                                                <button class="btn btn-primary me-2" type="button"
                                                    @click="SearchPolicyCert()"><i class="bi bi-search"></i></button>
                                                <button class="btn btn-danger" type="button"
                                                    @click="ClearSearchPolicyCert()"><i
                                                        class="bi bi-arrow-counterclockwise"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12 row mt-2" v-if="haveCertNo">
                                        <div class="col-9 row">
                                            <label for="SearchCertNo" class="col-7 col-form-label">เลขที่
                                                ใบรับรองที่ต้องการให้สิทธื์ </label>
                                            <div class="col-5">
                                                <input type="text" class="form-control" id="SearchCertNo"
                                                    v-model="SearchCertNo">
                                            </div>
                                            <div v-if="v$.SearchCertNo.$error" class="text-danger">
                                                {{ v$.SearchCertNo.$errors[0].$message }}
                                            </div>
                                        </div>
                                    </div>

                                    <div class="card mt-2">
                                        <div class="card-header">
                                            <b>กธ. ทั้งหมดของ กธ. ที่ได้รับสิทธิ์</b>
                                        </div>
                                        <div class="card-body">
                                            <div class="col-12 row">
                                                <label for="PolicyNoPrivilege" class="col-3 col-form-label">
                                                    กธ.ที่ได้รับสิทธื์ </label>
                                                <div class="col-5">
                                                    <input type="text" class="form-control" id="PolicyNoPrivilege"
                                                        disabled v-model="PolicyNoPrivilege">
                                                </div>
                                            </div>
                                            <div class="table-responsive">
                                                <table class="table table-striped">
                                                    <thead>
                                                        <tr class="text-center">
                                                            <th scope="col">เลขที่กรมธรรม์</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody class="table-group-divider text-center">
                                                        <tr v-for="(nop ,index ) in NumberOfPolicies" :key="index">
                                                            <td>{{ nop.PolicyNumber  }}
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div class="col-12 row mt-2">
                                                <label for="NumberOfPolicy" class="col-4 col-form-label">
                                                    จำนวน กธ. ทั้งหมด</label>
                                                <div class="col-2">
                                                    <input type="text" class="form-control text-end" id="NumberOfPolicy"
                                                        disabled v-model="NumberOfPolicy">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-6 ">
                                    <div class="card mt-2">
                                        <div class="card-header">
                                            <b>สำหรับบันทึกข้อมูล</b>
                                        </div>
                                        <div class="card-body">
                                            <div class="col-12 row justify-content-center">
                                                <label for="PromotionNo" class="col-4 col-form-label text-end">
                                                    เลขที่ Promotion</label>
                                                <div class="col-6">
                                                    <input type="text" class="form-control" id="PromotionNo" disabled
                                                        v-model="PromotionNo">
                                                </div>
                                            </div>
                                            <div class="col-12 row pt-2 justify-content-center">
                                                <label for="CreatedDate" class="col-4 col-form-label text-end">
                                                    วันที่สร้างข้อมูล</label>
                                                <div class="col-6">
                                                    <input type="text" class="form-control" id="CreatedDate" disabled
                                                        v-model="CreatedDate">
                                                </div>
                                            </div>
                                            <div class="col-12 row pt-2 justify-content-center">
                                                <label for="BBL_NAME" class="col-4 col-form-label text-end">
                                                    ชื่อสาขา</label>
                                                <div class="col-6">
                                                    <input type="text" class="form-control" id="BBL_NAME" disabled
                                                        v-model="BBL_NAME">
                                                </div>
                                            </div>
                                            <div class="col-12 row pt-2 justify-content-center">
                                                <label for="PolicyNoToGrant" class="col-4 col-form-label text-end">
                                                    กธ. ที่ต้องการให้สิทธื์</label>
                                                <div class="col-6">
                                                    <input type="text" class="form-control" id="PolicyNoToGrant"
                                                        disabled v-model="PolicyNoToGrant">
                                                </div>
                                            </div>
                                            <div class="col-12 row pt-2 justify-content-center">
                                                <label for="FullName" class="col-4 col-form-label text-end">
                                                    ชื่อ-นามสกุล</label>
                                                <div class="col-6">
                                                    <input type="text" class="form-control" id="FullName" disabled
                                                        v-model="FullName">
                                                </div>
                                            </div>
                                            <div class="col-12 row pt-2 justify-content-center">
                                                <label for="Premium" class="col-4 col-form-label text-end">
                                                    เบี้ยประกัน</label>
                                                <div class="col-6">
                                                    <input type="text" class="form-control" id="Premium" disabled
                                                        v-model="PremiumDisplay">
                                                </div>
                                            </div>
                                            <div class="col-12 row pt-2 justify-content-center">
                                                <label for="Product" class="col-4 col-form-label text-end">
                                                    สินค้า</label>
                                                <div class="col-6">
                                                    <input type="text" class="form-control" id="Product" disabled
                                                        v-model="Product">
                                                </div>
                                            </div>
                                            <div class="col-12 row pt-2 justify-content-center">
                                                <label for="Remark" class="col-4 col-form-label text-end">
                                                    หมายเหตุ</label>
                                                <div class="col-6">
                                                    <input type="text" class="form-control" id="Remark"
                                                        v-model="Remark">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-success" @click="SaveChangePremiumGift()">บันทึก</button>
                        <button type="button" class="btn btn-danger" @click="ClearDataForSaveChange()">ล้างค่า</button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                            id="btnClose">ปิด</button>

                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="AddModal" aria-labelledby="AddModal" aria-hidden="true">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="AddModal">เพิ่มของรางวัลแบบพิเศษ</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="container-fluid">
                            <div class="row">
                                <div class="row">
                                    <div class="col-8 row">
                                        <label for="SearchAddPolicyNo"
                                            class="col-8 col-form-label text-end">เลขที่กรมธรรม์</label>
                                        <div class="col-4">
                                            <input type="text" class="form-control" id="SearchAddPolicyNo"
                                                v-model="SearchAdd.SearchAddPolicyNo">
                                            <div v-if="v$.SearchAdd.SearchAddPolicyNo.$error" class="text-danger">
                                                {{ v$.SearchAdd.SearchAddPolicyNo.$errors[0].$message }}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-4">
                                        <div class="d-grid gap-2 d-md-block">
                                            <button class="btn btn-primary me-2" type="button"
                                                @click="SearchPolicyToAdd()"><i class="bi bi-search"></i></button>
                                            <button class="btn btn-danger" type="button" @click="ClearSearchAdd()"><i
                                                    class="bi bi-arrow-counterclockwise"></i></button>
                                        </div>
                                    </div>
                                </div>
                                <div class="row mt-2">
                                    <div class="col-8 row">
                                        <label for="SearchAddCertNo"
                                            class="col-8 col-form-label text-end">เลขที่ใบรับรอง</label>
                                        <div class="col-4">
                                            <input type="text" class="form-control" id="SearchAddCertNo"
                                                v-model="SearchAdd.SearchAddCertNo">
                                        </div>
                                    </div>
                                </div>
                                <div class="card mt-2">
                                    <div class="card-body">
                                        <div class="col-12 row justify-content-center">
                                            <label for="AddPromotionNo" class="col-3 col-form-label text-end">
                                                เลขที่ Promotion</label>
                                            <div class="col-4">
                                                <input type="text" class="form-control" id="AddPromotionNo" disabled
                                                    v-model="AddPremiumGift.AddPromotionNo">
                                            </div>
                                        </div>
                                        <div class="col-12 row pt-2 justify-content-center">
                                            <label for="CreatedDate" class="col-3 col-form-label text-end">
                                                วันที่สร้างข้อมูล</label>
                                            <div class="col-4">
                                                <input type="text" class="form-control" id="CreatedDate" disabled
                                                    v-model="AddPremiumGift.AddCreateDate">
                                            </div>
                                        </div>
                                        <div class="col-12 row pt-2 justify-content-center">
                                            <label for="AddBblName" class="col-3 col-form-label text-end">
                                                ชื่อสาขา</label>
                                            <div class="col-4">
                                                <input type="text" class="form-control" id="AddBblName" disabled
                                                    v-model="AddPremiumGift.AddBblName">
                                            </div>
                                        </div>
                                        <div class="col-12 row pt-2 justify-content-center">
                                            <label for="AddProduct"
                                                class="col-3 col-form-label text-end">ชื่อสินค้า</label>
                                            <div class="col-4">
                                                <Select2 v-model="AddPremiumGift.AddProduct"
                                                    :options="AddPremiumGift.AddProductOption" key="Id"
                                                    class="ddl-330-px"
                                                    :settings="{ allowClear: true, placeholder: 'เลือกชื่อสินค้า'}"
                                                    id="AddProduct">
                                                </Select2>
                                                <div v-if="v$.AddPremiumGift.AddProduct.$error" class="text-danger">
                                                    {{ v$.AddPremiumGift.AddProduct.$errors[0].$message }}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12 row pt-2 justify-content-center">
                                            <label for="AddFullName" class="col-3 col-form-label text-end">
                                                ชื่อ-นามสกุล</label>
                                            <div class="col-4">
                                                <input type="text" class="form-control" id="AddFullName" disabled
                                                    v-model="AddPremiumGift.AddFullName">
                                            </div>
                                        </div>
                                        <div class="col-12 row pt-2 justify-content-center">
                                            <label for="AddPolicyNo" class="col-3 col-form-label text-end">
                                                เลขที่กรมธรรม์</label>
                                            <div class="col-4">
                                                <input type="text" class="form-control" id="AddPolicyNo" disabled
                                                    v-model="AddPremiumGift.AddPolicyNo">
                                            </div>
                                        </div>
                                        <div class="col-12 row pt-2 justify-content-center">
                                            <label for="AddPremium" class="col-3 col-form-label text-end">
                                                เบี้ยประกัน</label>
                                            <div class="col-4">
                                                <input type="text" class="form-control" id="AddPremium" disabled
                                                    v-model="AddPremiumGift.AddPremium">
                                            </div>
                                        </div>
                                        <div class="col-12 row pt-2 justify-content-center">
                                            <label for="AddRemark" class="col-3 col-form-label text-end">
                                                หมายเหตุ</label>
                                            <div class="col-4">
                                                <input type="text" class="form-control" id="AddRemark"
                                                    v-model="AddPremiumGift.AddRemark">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-success" @click="SavePremiumGiftExtra()">บันทึก</button>
                        <button type="button" class="btn btn-danger" @click="ClearDataForSaveAdd()">ล้างค่า</button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                            id="btnCloseSave">ปิด</button>

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
    import http from '@/services/AuthService'
    import LoadingBs5 from '@/components/frontend/LoadingBs5';
    import useValidate from '@vuelidate/core'
    import {
        required,
        helpers
    } from '@vuelidate/validators'
    import Select2 from 'vue3-select2-component'
    import Swal from 'sweetalert2/src/sweetalert2.js'
    export default {
        components: {
            LoadingBs5,
            Select2
        },

        data() {
            return {
                v$: useValidate(),
                Loading: false,
                Promotion: null,
                PromotionOption: [],
                PremiumGifts: [],
                PolicyNoPrivilege: '',
                PromotionNo: '',
                CreatedDate: '',
                BBL_NAME: '',
                PolicyNoToGrant: '',
                FullName: '',
                Premium: '',
                PremiumDisplay: '',
                Product: '',
                Remark: '',
                NumberOfPolicy: 0,
                NumberOfPolicies: [],
                ChangePremiumGift: [],
                SearchPolicyNo: '',
                SearchCertNo: '',
                haveCertNo: false,
                MainTotalPremium: 0,
                SubTotalpremium: 0,
                PolicyId: '',
                SubPolicId: '',
                BBL_CODE: '',
                ProductCode: '',
                AddPremiumGift: {
                    AddProduct: '',
                    AddProductOption: [],
                    AddPromotionNo: '',
                    AddCreateDate: '',
                    AddBblName: '',
                    AddBblCode: '',
                    AddFullName: '',
                    AddPolicyNo: '',
                    AddPremium: '',
                    AddRemark: '',
                    AddPolicyId: '',
                    AddAppNo: ''
                },
                SearchAdd: {
                    SearchAddPolicyNo: '',
                    SearchAddCertNo: ''
                }
            };
        },
        created() {
            this.GetPromotionOption()
            this.GetProductOption();
        },

        methods: {
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
            async Search() {
                this.v$.Promotion.$validate() // เช็คฟอร์มทั้งหมด
                if (!this.v$.Promotion.$error) {
                    this.Loading = true;
                    await http.post('PremiumGiveSystem/GetPremiumGiftEndProcess', {
                            "PROMOTION": this.Promotion
                        }).then(respond => {
                            console.log(respond.data)
                            if (respond.data) {
                                respond.data.forEach(e => {
                                    e.CREATED_DT = e.CREATED_DT.split(' ')[0]
                                    e.DELIVERY_DT = e.DELIVERY_DT == null || e.DELIVERY_DT == '' ? '' :
                                        e
                                        .DELIVERY_DT.split(' ')[0]
                                    e.INSTALL_DT = e.INSTALL_DT == null || e.INSTALL_DT == '' ? '' : e
                                        .INSTALL_DT.split(' ')[0]
                                    e.PACKAGE_DT = e.PACKAGE_DT == null || e.PACKAGE_DT == '' ? '' : e
                                        .PACKAGE_DT.split(' ')[0]
                                });
                            } else {
                                Swal.fire({
                                    title: 'ไม่พบข้อมูลที่ค้นหา',
                                    text: '',
                                    icon: 'error',
                                })
                            }
                            this.PremiumGifts = respond.data;
                        })
                        .catch(function (error) {
                            console.log(error);
                        }).finally(() => {
                            this.Loading = false;
                        });
                }
            },
            Change(premiumGift) {
                premiumGift.PROMOTION, premiumGift.CREATED_DT, premiumGift.POLICY_NUMBER, premiumGift.CERT_NUMBER,
                    premiumGift.NUMBER_OF_POLICY, premiumGift.BANC_TYPE, premiumGift.TOTAL_PREMIUM,

                    this.PolicyNoPrivilege = premiumGift.CERT_NUMBER == null ? premiumGift.POLICY_NUMBER : premiumGift
                    .POLICY_NUMBER + '/' + premiumGift.CERT_NUMBER;
                this.PromotionNo = premiumGift.PROMOTION;
                this.CreatedDate = premiumGift.CREATED_DT
                this.GetNumberOfPolicy(premiumGift)
                this.haveCertNo = premiumGift.BANC_TYPE == 'H' ? true : false;
                this.MainTotalPremium = premiumGift.TOTAL_PREMIUM;
                this.PolicyId = premiumGift.POLICY_ID;
            },
            GetNumberOfPolicy(premiumGift) {
                console.log('premiumGift', premiumGift)
                this.NumberOfPolicies = [];
                if (premiumGift.NUMBER_OF_POLICY != null) {
                    let sNumberOfPolicy = premiumGift.NUMBER_OF_POLICY.split(' ,')
                    sNumberOfPolicy.forEach(e => {
                        let polNum = {
                            PolicyNumber: e,
                        };
                        this.NumberOfPolicies.push(polNum);
                    });
                }
                this.NumberOfPolicy = this.NumberOfPolicies.length;
            },
            async SearchPolicyCert() {
                this.v$.SearchPolicyNo.$validate()
                if (this.haveCertNo) {
                    this.v$.SearchCertNo.$validate()
                }
                if (!this.v$.SearchPolicyNo.$error && !this.v$.SearchCertNo.$error) {
                    this.Loading = true;
                    await http.post('PremiumGiveSystem/GetPremiumGiftEndProcess', {
                            "POLICY_NUMBER": this.SearchPolicyNo,
                            "CERT_NUMBER": this.SearchCertNo,
                        }).then(respond => {
                            console.log(respond.data)
                            respond.data.forEach(e => {
                                e.CREATED_DT = e.CREATED_DT.split(' ')[0]
                                e.DELIVERY_DT = e.DELIVERY_DT.split(' ')[0]
                                e.INSTALL_DT = e.INSTALL_DT.split(' ')[0]
                                e.PACKAGE_DT = e.PACKAGE_DT.split(' ')[0]
                                this.FullName = e.NAME + ' ' + e.SURNAME
                                this.BBL_NAME = e.BBL_NAME
                                this.SubTotalpremium = parseInt(this.MainTotalPremium) + parseInt(e
                                    .TOTAL_PREMIUM)
                                this.Premium = parseInt(this.MainTotalPremium) + parseInt(e
                                    .TOTAL_PREMIUM)
                                this.PremiumDisplay = new Intl.NumberFormat('th-TH', {
                                    style: 'currency',
                                    currency: 'THB',
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0
                                }).format(this.Premium)
                                this.SubPolicId = e.POLICY_ID
                                this.BBL_CODE = e.BBL_CODE
                            });
                            this.ChangePremiumGift = respond.data;
                            this.PolicyNoToGrant = this.SearchCertNo == null || this.SearchCertNo == '' ? this
                                .SearchPolicyNo : this.SearchPolicyNo + '/' + this.SearchCertNo
                            this.GetProductNextLevel();
                        })
                        .catch(function (error) {
                            console.log(error);
                        }).finally(() => {
                            this.Loading = false;
                        });
                }
            },
            async GetProductNextLevel() {
                await http.post('PremiumGiveSystem/GetProductNextLevel', {
                        "PROMOTION": this.PromotionNo,
                        "MAX_PREMIUM": this.Premium.toString(),
                    }).then(respond => {
                        this.Product = respond.data.PRODUCT_NAME
                        this.ProductCode = respond.data.PRODUCT
                    })
                    .catch(function (error) {
                        console.log(error);
                    }).finally(() => {
                        this.Loading = false;
                    });
            },
            async SaveChangePremiumGift() {
                if (this.PolicyNoToGrant == null || this.PolicyNoToGrant == '') {
                    this.$swal.fire({
                        title: 'แจ้งเตือน',
                        text: 'กรุณาค้นหา เลขที่กรมธรรม์ เพื่อดึงข้อมูลที่ต้องการเพิ่มสิทธิ์ ก่อนบันทึก',
                        icon: 'warning',
                    })
                } else {
                    this.$swal.fire({
                        title: 'ยืนยันการบันทึกการเปลี่ยนแปลง หรือไม่ ?',
                        text: '',
                        icon: 'question',
                        confirmButtonText: 'ยืนยัน',
                        showCancelButton: true,
                        cancelButtonText: 'ยกเลิก'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            this.Loading = true;
                            this.AddBancPremiumGiftSubPolicy();
                        }
                    })
                }
            },
            async AddBancPremiumGiftSubPolicy() {
                await http.post('PremiumGiveSystem/AddBancPremiumGiftSubPolicy', {
                        "PROMOTION": this.PromotionNo,
                        "CREATED_DT": this.CreatedDate,
                        "POLICY_ID": this.PolicyId,
                        "SUB_POLICY_ID": this.SubPolicId,
                        "BBL_CODE": this.BBL_CODE,
                        "PREMIUM": this.Premium.toString(),
                        "REMARK": this.Remark,
                        "UPD_ID": this.$store.state.nuser_id,
                        "PRODUCT_EXTRA": this.ProductCode,
                    }).then(async respond => {
                        if (respond.status == 200) {
                            await this.Search()
                            Swal.fire({
                                title: 'บันทึกสำเร็จ',
                                text: '',
                                icon: 'success',
                            }).then((result) => {
                                let oldPolicy = this.PolicyNoPrivilege.split('/')
                                console.log('oldPolicy', oldPolicy)
                                let newAddSubPolicy = this.PremiumGifts.filter(
                                    function (elem) {
                                        return elem.POLICY_NUMBER == oldPolicy[0] &&
                                            elem.CERT_NUMBER == oldPolicy[1];
                                    });
                                if (newAddSubPolicy != null) {
                                    this.GetNumberOfPolicy(newAddSubPolicy[0])
                                }
                                console.log('newAddSubPolicy', newAddSubPolicy)
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
            },
            ClearSearch() {
                this.Promotion = '';
                this.PremiumGifts = [];
            },
            ClearSearchPolicyCert() {
                this.SearchPolicyNo = '';
                this.SearchCertNo = '';
            },
            ClearDataForSaveChange() {
                this.ClearSearchPolicyCert();
                this.BBL_NAME = '';
                this.BBL_CODE = '';
                this.PolicyNoToGrant = '';
                this.FullName = '';
                this.Product = '';
                this.Premium = '';
                this.Remark = '';
                this.ProductCode = '';
                this.PolicyId = '';
                this.SubPolicId = '';
                this.MainTotalPremium = 0;
                this.SubTotalpremium = 0;
            },
            ClearDataForSaveAdd() {
                this.AddPremiumGift.AddProduct = '';
                this.AddPremiumGift.AddBblName = '';
                this.AddPremiumGift.AddBblCode = '';
                this.AddPremiumGift.AddFullName = '';
                this.AddPremiumGift.AddPolicyNo = '';
                this.AddPremiumGift.AddPremium = '';
                this.AddPremiumGift.AddRemark = '';
                this.AddPremiumGift.AddPolicyId = '';
                this.AddPremiumGift.AddAppNo = '';
                this.ClearSearchAdd();
            },
            ClearSearchAdd() {
                this.SearchAdd.SearchAddPolicyNo = '';
                this.SearchAdd.SearchAddCertNo = '';
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
                            this.AddPremiumGift.AddProductOption.push(ddl);
                        });
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            },
            AddPremiumGiftData() {
                this.AddPremiumGift.AddPromotionNo = this.Promotion;

            },
            SearchPolicyToAdd() {
                this.v$.SearchAdd.SearchAddPolicyNo.$validate()
                if (!this.v$.SearchAdd.SearchAddPolicyNo.$error) {
                    this.Loading = true;
                    http.post('PremiumGiveSystem/GetExtraPolicy', {
                            "POLICY_NUMBER": this.SearchAdd.SearchAddPolicyNo,
                            "CERT_NUMBER": this.SearchAdd.SearchAddCertNo,
                        }).then(respond => {
                            this.AddPremiumGift.AddBblName = respond.data.BBL_NAME;
                            this.AddPremiumGift.AddBblCode = respond.data.BBL_CODE;
                            this.AddPremiumGift.AddFullName = respond.data.NAME + ' ' + respond.data.SURNAME;
                            this.AddPremiumGift.AddPolicyNo = respond.data.POLICY_NUMBER;
                            this.AddPremiumGift.AddPremium = respond.data.PREMIUM;
                            this.AddPremiumGift.AddPolicyId = respond.data.POLICY_ID;
                            this.AddPremiumGift.AddAppNo = respond.data.APP_NO
                            const current = new Date();
                            this.AddPremiumGift.AddCreateDate =
                                `${current.getDate()}/${current.getMonth()+1}/${ parseInt(current.getFullYear()) + 543}`;
                        })
                        .catch(function (error) {
                            console.log(error);
                        }).finally(() => {
                            this.Loading = false;
                        });
                }
            },
            SavePremiumGiftExtra() {
                if (this.AddPremiumGift.AddPolicyId == null || this.AddPremiumGift.AddPolicyId == '') {
                    this.$swal.fire({
                        title: 'เกิดข้อผิดพลาด',
                        text: 'ไม่มีข้อมูลที่จะนำไปบันทึก',
                        icon: 'error',
                    })
                } else {
                    this.v$.AddPremiumGift.AddProduct.$validate();
                    if (!this.v$.AddPremiumGift.AddProduct.$error) {
                        this.$swal.fire({
                            title: 'ยืนยันการบันทึก หรือไม่ ?',
                            text: '',
                            icon: 'question',
                            confirmButtonText: 'ยืนยัน',
                            showCancelButton: true,
                            cancelButtonText: 'ยกเลิก'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                this.Loading = true;
                                http.post('PremiumGiveSystem/SavePremiumGiftExtra', {
                                        "PROMOTION": this.AddPremiumGift.AddPromotionNo,
                                        "BBL_CODE": this.AddPremiumGift.AddBblCode,
                                        "POLICY_ID": this.AddPremiumGift.AddPolicyId,
                                        "APP_NO": this.AddPremiumGift.AddAppNo,
                                        "PREMIUM": this.AddPremiumGift.AddPremium,
                                        "TOTAL_PREMIUM": this.AddPremiumGift.AddPremium,
                                        "REMARK": this.AddPremiumGift.AddRemark,
                                        "UPD_ID": this.$store.state.nuser_id,
                                        "PRODUCT": this.AddPremiumGift.AddProduct
                                    }).then(respond => {
                                        Swal.fire({
                                            title: 'บันทึกสำเร็จ',
                                            text: '',
                                            icon: 'success',
                                        }).then(result => {
                                            this.Search();
                                            document.getElementById('btnCloseSave').click();
                                        })
                                    })
                                    .catch(function (error) {
                                        console.log(error);
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
            EndProcess() {
                if (this.PremiumGifts.length == 0) {
                    this.$swal.fire({
                        title: 'เกิดข้อผิดพลาด',
                        text: 'ไม่มีข้อมูลที่จะจบงาน',
                        icon: 'error',
                    })
                } else {
                    let prm = '';
                    this.PremiumGifts.forEach(e => {
                        prm = e.PROMOTION
                    });
                    this.$swal.fire({
                        title: 'ยืนยันการจบงานของข้อมูลทั้งหมด หรือไม่ ?',
                        text: '',
                        icon: 'question',
                        confirmButtonText: 'ยืนยัน',
                        showCancelButton: true,
                        cancelButtonText: 'ยกเลิก'
                    }).then((result) => {
                        this.Loading = true;
                        http.post('PremiumGiveSystem/EndProcessBancCreateTable', {
                                "PROMOTION": prm,
                            }).then(
                                respond => {
                                    Swal.fire({
                                        title: 'จบงานข้อมูลทั้งหมดเรียบร้อย',
                                        text: '',
                                        icon: 'success',
                                    }).then(result => {})
                                })
                            .catch(function (error) {
                                console.log(error);
                                Swal.fire({
                                    title: 'จบงานข้อมูลทั้งหมด ไม่สำเร็จ',
                                    text: error.response.data,
                                    icon: 'error',
                                })
                            }).finally(() => {
                                this.Loading = false;
                            });
                    })
                }
            }
        },
        validations() {
            return {
                Promotion: {
                    required: helpers.withMessage('*กรุณาเลือกชื่อโปรโมชัน', required)
                },
                SearchCertNo: {
                    required: helpers.withMessage('*กรุณากรอกเลขที่ ใบรับรองที่ต้องการให้สิทธื์', required)
                },
                SearchPolicyNo: {
                    required: helpers.withMessage('*กรุณากรอกเลขที กธ.ที่ต้องการให้สิทธื์', required)
                },
                SearchAdd: {
                    SearchAddPolicyNo: {
                        required: helpers.withMessage('*กรุณากรอกเลขที่กธ.', required)
                    },
                },
                AddPremiumGift: {
                    AddProduct: {
                        required: helpers.withMessage('*กรุณาเลือกสินค้า', required)
                    }
                }
            }
        },

    }
</script>

<style lang="css" scoped>
    .table-responsive {
        max-height: 220px !important;
    }
</style>