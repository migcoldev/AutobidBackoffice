<template>
  <div>
    <base-header type="gradient-success" class="pb-5 pt-5 pt-md-8">
      
    </base-header>

    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <projects-table title="Light Table"></projects-table>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col">
          <div class="card shadow" :class="type === 'dark' ? 'bg-default' : ''">
    <div
      class="card-header border-0"
      :class="type === 'dark' ? 'bg-transparent' : ''"
    >
      <div class="row align-items-center">
        <div class="col">
            <badge v-if="this.$route.query.mensaje == 'registrado'" class="badge-dot mr-4" type="success">
              Vehículo registrado correctamente
            </badge>
            <badge v-if="this.$route.query.mensaje == 'actualizado'" class="badge-dot mr-4" type="success">
              Vehículo actualizado correctamente
            </badge>
            <badge v-if="this.$route.query.mensaje == 'eliminado'" class="badge-dot mr-4" type="success">
              Vehículo eliminado correctamente
            </badge>
            <badge v-if="this.$route.query.mensaje == 'activado'" class="badge-dot mr-4" type="success">
              Vehículo activado correctamente
            </badge>
            <badge v-if="this.$route.query.mensaje == 'desactivado'" class="badge-dot mr-4" type="success">
              Vehículo desactivado correctamente
            </badge>
        </div>
        <div class="col text-right">
          <!--<router-link class="navbar-brand" to="/especialidades/registrar">
            <base-button type="primary" size="sm">Nuevo vehículo</base-button>
          </router-link>-->
        </div>
      </div>
      <div class="row align-items-center">
        <div class="col">
          <div class="form-group">
            <div class="input-group">
              <input type="text" class="form-control" v-model="searchtext" placeholder="Ingrese VIN o Nro Lote">
              
              <button
                type="button"
                data-dismiss="alert"
                aria-label="Buscar"
                class="btn-primary btn"
                @click="filtrar"
              >Buscar
              </button>
            </div>
          </div>
        </div>
        <div class="col text-right">
          <div class="form-group">
            Total de registros: {{count}}
          </div>
        </div>
      </div>
    </div>

    <div class="table-responsive">
      <base-table
        class="table align-items-center table-flush"
        :class="type === 'dark' ? 'table-dark' : ''"
        :thead-classes="type === 'dark' ? 'thead-dark' : 'thead-light'"
        tbody-classes="list"
        :data="items"
      >
        <template v-slot:columns>
          <th>VIN</th>
          <th>Web</th>
          <th>Lote</th>
          <th>Año</th>
          <th>Marca</th>
          <th>Modelo</th>
          <th>Fecha Creación</th>
          <th></th>
        </template>

        <template v-slot:default="row">
          <td><a :href="'https://autobidregistry.com/history/detail/' + row.item.vin + '/' + row.item.alias" target="_blank">{{row.item.vin}}</a></td>
          <td>{{row.item.origin.toUpperCase()}}</td>
          <td>{{row.item.lot_number}}</td>
          <td>{{row.item.year}}</td>
          <td>{{row.item.brand}}</td>
          <td>{{row.item.model}}</td>
          <td>{{row.item.created_at}}</td>

          <td class="text-right">
            <div v-if="row.item.status === 0" class="icon-div cursor-pointer btn btn-danger btn-sm" v-on:click="activarVehiculo(row.item.code)">Activar</div>
            <div v-else class="icon-div cursor-pointer btn btn-danger btn-sm" v-on:click="desactivarVehiculo(row.item.code)">Desactivar</div>
            
            <div v-if="row.item.status === 0" class="icon-div cursor-pointer btn btn-danger btn-sm" v-on:click="eliminarVehiculo(row.item.code)">Eliminar</div>
            <!--<router-link class="navbar-brand" :to="{ name: 'vehiculos_editar', params: { id: row.item.id }}">
              <base-button type="warning" size="sm">Editar</base-button>
            </router-link>
            <div class="icon-div cursor-pointer btn btn-danger btn-sm" v-on:click="eliminarVehiculo(row.item.id)">Eliminar</div>-->
          </td>
        </template>
      </base-table>
    </div>

    <div
      class="card-footer d-flex justify-content-end"
      :class="type === 'dark' ? 'bg-transparent' : ''"
    >
      <base-pagination :total="count" :page-count="lastPage" :perPage="pageSize" :value="page">
      </base-pagination>
    </div>
  </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'vehiculos',
  data () {
    return {
      searchtext: '',
      items: [],
      currentTutorial: null,
      currentIndex: -1,
      searchTitle: '',
      filter: '',
      page: 1,
      count: 0,
      pageSize: 20,
      lastPage: 1,

      pageSizes: [20, 50, 100]
    }
  },
  methods: {
    filtrar () {
      this.page = 1;
      this.obtenerVehiculos();
    },
    obtenerVehiculos () {
      var clase = this
      var params = {
        per_page: this.pageSize,
        filter: this.filter,
        searchtext: this.searchtext
      }
      axios
        .post(process.env.VUE_APP_API_URL + 'backoffice/bid/all?page=' + clase.page, params)
        .then((response) => {
          console.log(response.data.data)
          this.items = response.data.data
          this.count = response.data.total
          this.lastPage = response.data.last_page
        })
        .catch(function (error) {
          if (error.response && error.response.status === 401) {
            localStorage.clear()
            clase.$router.push('/login')
          } else {
            // Handle error however you want
          }
        })
    },
    eliminarVehiculo: function (id) {
      let router = this.$router
      if (window.confirm("¿Está seguro(a) de eliminar el registro?")) {
        axios
          .delete(process.env.VUE_APP_API_URL + 'backoffice/bid/delete', { code: id })
          .then((response) => {
            console.log(response)
            //window.location.reload()
            router.push('/vehiculos?mensaje=eliminado')
          })
          .catch(err => console.log(err))
      }
    },
    activarVehiculo: function (id) {
      let router = this.$router
      if (window.confirm("¿Está seguro(a) de activar el registro?")) {
        axios
          .post(process.env.VUE_APP_API_URL + 'backoffice/bid/activate',  { code: id })
          .then((response) => {
            console.log(response)
            //window.location.reload()
            router.push('/vehiculos?mensaje=activado')
          })
          .catch(err => console.log(err))
      }
    },
    desactivarVehiculo: function (id) {
      let router = this.$router
      if (window.confirm("¿Está seguro(a) de desactivar el registro?")) {
        axios
          .post(process.env.VUE_APP_API_URL + 'backoffice/bid/deactivate', { code: id })
          .then((response) => {
            console.log(response)
            //window.location.reload()
            router.push('/vehiculos?mensaje=desactivado')
          })
          .catch(err => console.log(err))
      }
    },
    handlePageChange (value) {
      this.page = value
      this.obtenerVehiculos()
    },

    handlePageSizeChange (event) {
      this.pageSize = event.target.value
      this.page = 1
      this.obtenerVehiculos()
    },

    handleFilterChange (event) {
      this.filter = event.currentTarget.value
      this.obtenerVehiculos()
    }

  },
  mounted () {
    this.obtenerVehiculos()
  }
}
</script>

<style scoped lang="scss">
.icon-div {
    display: inline-block;
}
.icon-div i {
    display: inline-block;
    font-size: 20px;
    width: 40px;
    text-align: left;
    color: #2196f3;
}
.cursor-pointer{
  cursor: pointer;
}
.badge{
  font-size:17px !important;
  font-weight: normal !important;
}
@media (min-width: 1200px) {
  .filter-textbox {
    max-width: 40%;
  }
}
</style>
