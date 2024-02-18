<template>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
      
    </base-header>

    <div class="container-fluid mt--7">
    <div class="row">
      <div class="col-lg-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Registro de Usuario</h4>
            <p id="p-errors" v-if="errors.length">
              <b>Por favor, corrija el(los) siguiente(s) error(es):</b>
              <ul>
                <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
              </ul>
            </p>
            <form action @submit.prevent="grabarUsuario">
              <div class="form-group">
                <div class="input-group">
                  <input type="text" class="form-control" v-model="nombres" placeholder="Nombre">
                </div>
              </div>
              <div class="form-group">
                <div class="input-group">
                  <input type="text" class="form-control" v-model="apellidos" placeholder="Apellido">
                </div>
              </div>
              <div class="form-group">
                <div class="input-group">
                  <input type="text" class="form-control" v-model="email" placeholder="Email">
                </div>
              </div>
              <div class="form-group">
                <div class="input-group">
                  <input type="text" class="form-control" v-model="contrasena" placeholder="Contraseña">
                </div>
              </div>
              <div class="form-group">
                <div class="input-group">
                  <VueMultiselect
                   :multiple="false" :options="divisiones" :searchable="false" :close-on-select="true" :show-labels="false" placeholder="Seleccione una División"
                   :custom-label="customLabelDivision"
                    v-model="division_seleccionado">
                  </VueMultiselect>
                </div>
              </div>
              <div class="form-group">
                <div class="input-group">
                  <VueMultiselect
                   :multiple="false" :options="roles" :searchable="false" :close-on-select="true" :show-labels="false" placeholder="Seleccione un Rol"
                   :custom-label="customLabelRol"
                    v-model="rol_seleccionado">
                  </VueMultiselect>
                </div>
              </div>
              <div class="form-group">
                <div class="input-group">
                  <h6>Activo</h6>
                </div>
                <div class="input-group">
                  <Toggle v-model="activo" color="primary" />
                </div>
              </div>
              <div class="form-group">
                <button class="btn btn-primary submit-btn">Enviar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script lang="js">
import axios from 'axios'
import Toggle from "@vueform/toggle";
import VueMultiselect from 'vue-multiselect'

export default {
  name: 'registrarUsuario',
  data () {
    return {
      nombres: '',
      apellidos: '',
      contrasena: '',
      email: '',
      divisiones: [],
      roles: [],
      division_seleccionado: null,
      rol_seleccionado: null,
      activo: true,
      errors: []
    }
  },
  components: {
    Toggle,
    VueMultiselect
  },
  methods: {
    grabarUsuario () {
      let nombres = this.nombres
      let apellidos = this.apellidos
      let email = this.email
      let contrasena = this.contrasena
      let activo = this.activo
      this.errors = []
      let router = this.$router

      if (!this.nombres) {
        this.errors.push('El nombre de usuario es obligatorio.')
      }
      if (!this.email && !this.contrasena) {
        this.errors.push('Debe ingresar un email o usuario.')
      }
      if (!this.division_seleccionado) {
        this.errors.push('La división es obligatoria.')
      }
      if (!this.rol_seleccionado) {
        this.errors.push('El rol es obligatorio.')
      }

      let divisionseleccionado = this.division_seleccionado.id
      let rolseleccionado = this.rol_seleccionado.id

      if (this.errors.length > 0) {
        setTimeout(function () {
          const el = document.getElementById('p-errors')
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' })
          }
        }, 200)
      } else {
        axios
          .post(process.env.VUE_APP_API_URL + 'backoffice/usuario/create', { nombres: nombres, apellidos: apellidos, password: contrasena, email: email, id_rol: rolseleccionado, id_division: divisionseleccionado, estado: activo })
          .then((response) => router.push('/usuarios?mensaje=registrado'))
          .catch(err => console.log(err))
      }
    },
    customLabelRol ({ nombre }) {
      return `${nombre}`
    },
    customLabelDivision ({ nombre }) {
      return `${nombre}`
    }
  },
  mounted () {
    axios
      .get(process.env.VUE_APP_API_URL + 'division/all')
      .then((response) => {
        this.divisiones = response.data
      })
    axios
      .get(process.env.VUE_APP_API_URL + 'backoffice/roles')
      .then((response) => {
        this.roles = response.data
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
