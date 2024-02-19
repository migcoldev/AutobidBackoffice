<template>
    <base-header type="gradient-success" class="pb-5 pt-5 pt-md-8">
      
    </base-header>

    <div class="container-fluid mt--7">
    <div class="row">
      <div class="col-lg-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Solicitud - Mensaje</h4>
            <div class="form-group">
              <div class="input-group">
                <h6>Nombre :</h6>
              </div>
              <div class="input-group">
                {{first_name}}
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <h6>Apellidos :</h6>
              </div>
              <div class="input-group">
                {{last_name}}
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <h6>Teléfono :</h6>
              </div>
              <div class="input-group">
                {{phone}}
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <h6>Email :</h6>
              </div>
              <div class="input-group">
                {{email}}
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <h6>VIN :</h6>
              </div>
              <div class="input-group">
                {{bid.vin}}
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <h6>Lot Number :</h6>
              </div>
              <div class="input-group">
                {{bid.lot_number}}
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <h6>Mensaje :</h6>
              </div>
              <div class="input-group">
                {{message}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script lang="js">
import axios from 'axios'
import Toggle from "@vueform/toggle";

export default {
  name: 'solicitudes_detalle',
  data () {
    return {
      first_name: '',
      last_name: '',
      phone: '',
      email: '',
      message: '',
      bid: '',
      errors: []
    }
  },
  components: {
    Toggle,
  },
  methods: {
  },
  mounted () {
    let id = this.$route.params.code
    axios
      .post(process.env.VUE_APP_API_URL + 'backoffice/request/detail', {code: id})
      .then((response) => {
        this.first_name = response.data.first_name
        this.last_name = response.data.last_name
        this.phone = response.data.phone
        this.email = response.data.email
        this.message = response.data.message
        this.bid = response.data.bid
      })
  }
}
</script>

<style scoped lang="scss">
  #app-editor{
    width: 100%;
  }
  input[type="file"]{
    padding-top:11px;
  }
  #p-errors{
    color: red;
  }
</style>
