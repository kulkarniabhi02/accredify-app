<template>
  <HeaderComponent :firstName="firstName" />
  <!-- Jumbotron -->
  <div class="p-5 bg-light">
    <div class="page-width">
      <p class="loading" v-if="loading"></p>
      <p class="page-error"></p>
      <div class="container">
        <h2>
          Hi, {{ firstName }}
          <i class="fas fa-hand-sparkles"></i>
        </h2>
        <label class="mb-6">{{ description }}</label>
        <div class="root-container">
          <ChartComponent :chartData="chartData" :chartOptions="chartOptions" v-if="!isUserPersonal" :role="role"/>
          <TableComponent />
        </div>
      </div>
    </div>
  </div>
  <!-- Jumbotron -->
</template>

<script>
  import { ref, onMounted } from "vue";

  import moment from 'moment';

  import HeaderComponent from './HeaderComponent.vue'
  import TableComponent from './TableComponent.vue'
  import ChartComponent from './ChartComponent.vue'

  import { fetchAPIResponse } from '../services/DocumentService';

  export default {
    name: 'HomeComponent',
    components: {
      HeaderComponent,
      TableComponent,
      ChartComponent
    },
    methods: {
      moment: function (date) {
        return date ? moment(date).format('DD MMM YYYY') : '';
      }
    },
    setup() {
      const user = ref(null);
      const firstName = ref('');
      const description = ref('');
      const isUserPersonal = ref(false);
      const documents = ref(null);
      const role = ref('');
      const loading = ref(true);
      const error = ref(null);
      const chartData = ref({
        datasets: [{
          backgroundColor: ['#6C00FF', '#D3D3D3'],
          data: [0, 1000]
        }]
      });
      const chartOptions = ref({
        responsive: true,
        maintainAspectRatio: true
      });

      function fetchUserDetails() {
        loading.value = true;
        fetchAPIResponse('user')
          .then(response => {
            user.value = response;
            firstName.value = user.value.data['name'];
            isUserPersonal.value = user.value.data['current_organisation'].is_personal;
          })
          .catch(err => {
            error.value = err;
            // In case a custom JSON error response was provided
            if (err.json) {
            return err.json.then(json => {
                error.value.message = json.message;
            });
            }
          }).then(() => {
            loading.value = false;
          });
      }

      function fetchDocumentDetails() {
        loading.value = true;
        fetchAPIResponse('documents')
          .then(response => {
            documents.value = response;
          })
          .catch(err => {
            error.value = err;
            // In case a custom JSON error response was provided
            if (err.json) {
            return err.json.then(json => {
                error.value.message = json.message;
            });
            }
          }).then(() => {
            loading.value = false;
          });
      }

      function fetchCareerDetails() {
        loading.value = true;
        fetchAPIResponse('career')
          .then(response => {
            description.value = response.data[0].description;
            chartData.value.datasets[0].data[0] = response.data[0].progress*10;
            role.value = response.data[0].name;
          })
          .catch(err => {
            error.value = err;
            // In case a custom JSON error response was provided
            if (err.json) {
            return err.json.then(json => {
                error.value.message = json.message;
            });
            }
          }).then(() => {
            loading.value = false;
          });
      }

      onMounted(() => {
        fetchUserDetails();
        fetchDocumentDetails();
        fetchCareerDetails();
      });

      return {
        user,
        firstName,
        description,
        isUserPersonal,
        documents,
        role,
        loading,
        error,
        chartData,
        chartOptions
      };
    }
  }
</script>

<style>
  body {
    font-family: system-ui;
  }
  .loading {
    position: fixed;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    z-index: 9999;
    background: url('../assets/loading_icon.gif') 50% 50% no-repeat rgb(249,249,249);
  }
  .root-container {
    display: flex;
    flex-direction: row;
  }
  .page-error {
    width: 100%;
    height: 100%;
    color: #ff0000;
  }
  .page-width {
    margin: 5rem 10%;
  }
  table td, .table th {
    border: none;
  }

  table.table.table-condensed {
    border: 1px solid #e0e0e0;
    border-radius: 10px;
  }
  i.fas.fa-book {
    color: #6C00FF;
  }
  h2 .fas.fa-hand-sparkles {
    color: #FFBF00;
  }
</style>
