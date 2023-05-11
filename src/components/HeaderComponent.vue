<template>
  <header>
    <!-- Navbar -->
    <MDBNavbar expand="lg" light bg="white" container>
      <MDBNavbarToggler
        target="#navbarExample01"
        @click="collapse1 = !collapse1"
      ></MDBNavbarToggler>
      <MDBCollapse id="#navbarExample01" v-model="collapse1">
        <MDBNavbarNav class="mdbnavbarnav-width mb-2 mb-lg-0 justify-content-end">
          <MDBNavbarItem to="#" active class="me-5"> <i class="far fa-bell"></i> </MDBNavbarItem>
          <MDBNavbarItem to="#">
            <span class="circular-name">{{aconyms(firstName)}}</span>
            {{ firstName }}
          </MDBNavbarItem>
        </MDBNavbarNav>
      </MDBCollapse>
    </MDBNavbar>
    <!-- Navbar -->
  </header>
</template>

<script>
  import { MDBNavbar, MDBNavbarToggler, MDBNavbarNav, MDBNavbarItem, MDBCollapse } from 'mdb-vue-ui-kit';
  import { ref } from 'vue';

  export default {
    components: {
      MDBNavbar,
      MDBNavbarToggler,
      MDBNavbarNav,
      MDBNavbarItem,
      MDBCollapse
    },
    props: {
      firstName: {
        type: String,
        required: true
      }
    },
    methods: {
      aconyms: function (str) {
        const matches = str.match(/\b(\w)/g);
        return matches?.join('');
      }
    },
    setup() {
      const collapse1 = ref(false);
      return { collapse1 };
    }
  };
</script>

<style scoped>
  .mdbnavbarnav-width {
    width: 100%;
  }
  .circular-name {
    background: #6C00FF;
    text-transform: uppercase;
    font-family: "Lucida Console";
    align-items:center;
    color: rgba(233, 236, 237, 0.78);
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: inline-flex;
    font-size: 16px;
    padding: 8px;
    vertical-align: middle;
    margin: 0 10px 0 0;
  }
  h1 span i{
    width:max-content;
    font-style: normal;
    margin: 0 auto;
  }
</style>