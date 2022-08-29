<template>
  <nav class="navbar navbar-expand-lg bg-light sticky-top">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand">
        <img src="@/assets/BLA.png" alt="BLA" class="" width="120" height="50" />
      </router-link>
      <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling"
        aria-controls="offcanvasScrolling">
        <i class="bi bi-card-list"></i> เปิดเมนู</button>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item text-center">
            <!-- <span class="nav-link active" aria-current="page">กันตชาติ อินทรสร 003726</span> -->
            <span class="nav-link active" aria-current="page">{{fullname}}</span>
          </li>
          <li class="nav-item text-center">
            <button class="btn btn-outline-danger" type="submit" @click="LogOut()"><i class="bi bi-power"></i>Log
              out</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>

</template>

<script>
  export default {
    name: "Nav",
    data() {
      return {
        nuser_id: '',
        fullname: '',
        login: '',
        timeStamp: ''
      };
    },
    methods: {
      getCookie: function (cname) {
        let name = cname + "=";
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
      },
      LogOut() {
        this.$store.commit("Logout");
      }
    },
    beforeMount() {
      this.fullname = this.getCookie("fullname")
      this.login = process.env.VUE_APP_URL_LOGIN
    },

    mounted() {
      let object = JSON.parse(localStorage.getItem("TokenId"));
      if (object != null) {
        if (object.N_USERID) {
          this.nuser_id = object.N_USERID;
        }
        if (object.FULLNAME) {
          this.fullname = object.FULLNAME;
        }
        if (object.timestamp) {
          this.timeStamp = object.timestamp;
          this.$store.state.timeStamp = object.timestamp;
        }
        let timenow = parseInt(new Date().getTime());
        console.log('time vue' , timenow)
        console.log('time c#' , this.timeStamp)
        setTimeout(this.LogOut, parseInt(this.timeStamp) - timenow);
      } else {
         this.nuser_id = '003726' 
         this.fullname =  '003726 กันตชาติ อินทรสร'
      }
      this.$store.state.nuser_id = this.nuser_id;
      this.$store.state.fullname =  this.fullname;

    },

  };
</script>

<style lang="scss" scoped>

</style>