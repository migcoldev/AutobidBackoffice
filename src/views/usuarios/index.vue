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
              Usuario registrado correctamente
            </badge>
            <badge v-if="this.$route.query.mensaje == 'actualizado'" class="badge-dot mr-4" type="success">
              Usuario actualizado correctamente
            </badge>
        </div>
        <div class="col text-right">
          <router-link class="navbar-brand" to="/usuarios/registrar">
            <base-button type="primary" size="sm">Nuevo Usuario</base-button>
          </router-link>
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
          <th>ID</th>
          <th>Nombre</th>
          <th>Email</th>
          <th>Rol</th>
          <th>División</th>
          <th></th>
        </template>

        <template v-slot:default="row">
          <td class="text-xs py-3 px-4">{{row.item.id}}</td>
          <td>{{row.item.nombres}} {{row.item.apellidos}}</td>
          <td>{{row.item.email}}</td>
          <td>{{row.item.rol_nombre}}</td>
          <td>{{row.item.division_nombre}}</td>

          <td class="text-right">
            <router-link class="navbar-brand" :to="{ name: 'usuarios_editar', params: { id: row.item.id }}">
              <base-button type="warning" size="sm">Editar</base-button>
            </router-link>
            <div class="icon-div cursor-pointer btn btn-danger btn-sm" v-on:click="eliminarUsuario(row.item.id)">Eliminar</div>
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
  name: 'usuarios',
  data () {
    return {
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
    obtenerUsuarios () {
      var clase = this
      var params = {
        per_page: this.pageSize,
        filter: this.filter
      }
      console.log(params)
      axios
        .post(process.env.VUE_APP_API_URL + 'backoffice/usuarios?page=' + clase.page, params)
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
    eliminarUsuario: function (id) {
      if (window.confirm("¿Está seguro(a) de eliminar el registro?")) {
        axios
          .delete(process.env.VUE_APP_API_URL + 'backoffice/usuario/delete', { data: { id: id }})
          .then((response) => {
            console.log(response)
            window.location.reload()
          })
          .catch(err => console.log(err))
      }
    },
    handlePageChange (value) {
      this.page = value
      this.obtenerUsuarios()
    },

    handlePageSizeChange (event) {
      this.pageSize = event.target.value
      this.page = 1
      this.obtenerUsuarios()
    },

    handleFilterChange (event) {
      this.filter = event.currentTarget.value
      this.obtenerUsuarios()
    }

  },
  mounted () {
    this.obtenerUsuarios()
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
