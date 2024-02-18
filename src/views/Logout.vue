<template>
  <div class="row justify-content-center">
    <div class="col-lg-5 col-md-7">
      <div class="card bg-secondary shadow border-0">
        <div class="card-body px-lg-5 py-lg-5">
          <img src="img/LogoXXX.svg" class="mw-100" />
          <div class="text-center text-muted mb-4">
            <small>Cerrando sesión...</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'logout',
  data () {
    return {
      model: {
        usuario: 'demo@autobidregistry.com',
        password: '123123'
      },
    }
  },
  methods: {
  },
  mounted () {
      var clase = this
      let usuario = this.model.usuario
      let password = this.model.password
      // document.getElementById('error_msg').text = ''
      var router = this.$router
      let loader = this.$loading.show({
                    // Optional parameters
                    canCancel: true,
                    onCancel: this.onCancel,
                });
        axios
            .post(process.env.VUE_APP_API_URL + 'backoffice/signout')
            .then(function (response) {
                localStorage.clear();
                // Add the following line:
                axios.defaults.headers.common['Authorization'] = ''
                loader.hide()
                router.push('/login')
            })
            .catch(function (error) {
              loader.hide()
              if (error.response && error.response.status === 401) {
                localStorage.clear()
                clase.$router.push('/login')
              } else {
                // Handle error however you want
              }
            })
  }
}
</script>

<style scoped lang="scss">
#error_msg {
  color:red;
}
</style>