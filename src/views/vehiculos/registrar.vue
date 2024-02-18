<template>
    <base-header type="gradient-success" class="pb-5 pt-5 pt-md-8">
      
    </base-header>

    <div class="container-fluid mt--7">
    <div class="row">
      <div class="col-lg-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Registro de Especialidad</h4>
            <p id="p-errors" v-if="errors.length">
              <b>Por favor, corrija el(los) siguiente(s) error(es):</b>
              <ul>
                <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
              </ul>
            </p>
            <form action @submit.prevent="grabarEspecialidad">
              <div class="form-group">
                <div class="input-group">
                  <input type="text" class="form-control" v-model="nombre" placeholder="Nombre">
                </div>
              </div>
              <div class="form-group">
                <div class="input-group">
                  <input type="number" class="form-control" v-model="cantidadDestinatarios" placeholder="Cantidad Destinatarios">
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

export default {
  name: 'registrarEspecialidad',
  data () {
    return {
      nombre: '',
      cantidadDestinatarios: 0,
      activo: 1,
      errors: []
    }
  },
  components: {
    Toggle,
  },
  methods: {
    grabarEspecialidad () {
      let nombre = this.nombre
      let activo = this.activo
      let cantidadDestinatarios = this.cantidadDestinatarios
      this.errors = []
      let router = this.$router

      if (!this.nombre) {
        this.errors.push('El nombre de especialidad es obligatorio.')
      }

      if (this.errors.length > 0) {
        setTimeout(function () {
          const el = document.getElementById('p-errors')
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' })
          }
        }, 200)
      } else {
        axios
          .post(process.env.VUE_APP_API_URL + 'backoffice/especialidad/create', { nombre: nombre, cantidad_destinatarios: cantidadDestinatarios, estado: activo })
          .then((response) => {
            console.log(response)
            router.push('/especialidades?mensaje=registrado')
          })
          .catch(err => console.log(err))
      }
    }
  },
  mounted () {
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
