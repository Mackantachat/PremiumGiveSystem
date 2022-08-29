import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.js"
import '@/styles/bootstrap5.css'
// import datepicker
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
// import VueSweetalert2
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import specific icons */
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// import Select2Component
import Select2 from 'vue3-select2-component';
import 'vue-select/dist/vue-select.css';





import vSelect from 'vue-select'


/* add icons to the library */
library.add(faUserSecret)
const options = {
    confirmButtonColor: '#41b882',
    cancelButtonColor: '#ff7674',
  };

createApp(App).use(store).use(router).use(VueSweetalert2, options).component('v-select', vSelect).component('Select2', Select2).component('font-awesome-icon', FontAwesomeIcon).component('Datepicker', Datepicker).mount('#app')
