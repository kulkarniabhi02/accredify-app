<template>
  <div class="table-container">
    <h4>Recent Documents</h4>
    <MDBTable class="table-condensed" border="#e0e0e0" v-if="!loading && documents">
      <thead>
        <tr>
          <th scope="col">Document Name</th>
          <th scope="col">Received On</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr scope="row" v-for="(document, index) in documents.data" :value="document.id" :key="index">
          <td>
            <div class="d-flex align-items-center">
              <i class="fas fa-book"></i>
              <div class="ms-3">
                <p class="fw-bold mb-1">{{document.document_name}}</p>
              </div>
            </div>
          </td>
          <td>
            <p class="fw-normal mb-1">{{ moment(document.received_on)}}</p>
          </td>
          <td>
            <i class="fas fa-ellipsis-vertical"></i>
          </td>
        </tr>
      </tbody>
    </MDBTable>
  </div>
</template>

<script>
  import { ref, onMounted } from "vue";
  import {
    MDBTable
  } from 'mdb-vue-ui-kit';

  import moment from 'moment';

  import { fetchAPIResponse } from '../services/DocumentService';

  export default {
    name: 'TableComponent',
    components: {
      MDBTable
    },
    props: {
    },
    methods: {
      moment: function (date) {
        return date ? moment(date).format('DD MMM YYYY') : '';
      }
    },
    setup() {
      const user = ref(null);
      const documents = ref(null);
      const loading = ref(true);
      const error = ref(null);

      function fetchUserDetails() {
        loading.value = true;
        fetchAPIResponse('user')
          .then(response => {
            user.value = response;
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

      onMounted(() => {
        fetchUserDetails();
        fetchDocumentDetails();
      });

      return {
        user,
        documents,
        loading,
        error
      };
    }
  }
</script>

<style>
  .page-width {
    margin: 5rem 10%;
  }
  .table-container {
    display: flex;
    flex-direction: column;
    width: 100%;
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
</style>
