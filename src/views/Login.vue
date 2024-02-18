<template>
  <div class="row justify-content-center">
    <div class="col-lg-5 col-md-7">
      <div class="card bg-secondary shadow border-0">
        <div class="card-body px-lg-5 py-lg-5">
          <img src="img/LogoXXX.svg" class="mw-100" />
          <div class="text-center text-muted mb-4">
            <small>Ingresar al backoffice</small>
          </div>
          <form role="form" action class="form" @submit.prevent="login">
            <base-input
              formClasses="input-group-alternative mb-3"
              placeholder="Email"
              addon-left-icon="ni ni-email-83"
              v-model="model.usuario"
            >
            </base-input>

            <base-input
              formClasses="input-group-alternative mb-3"
              placeholder="Password"
              type="password"
              addon-left-icon="ni ni-lock-circle-open"
              v-model="model.password"
            >
            </base-input>
            <div class="text-center">
              <button type="submit" class="btn btn-primary my-4">Ingresar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'login',
  data () {
    return {
      model: {
        usuario: '',
        password: ''
      },
    }
  },
  methods: {
    login: function () {
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
            .post(process.env.VUE_APP_API_URL + 'backoffice/signin', { user: usuario, password: password })
            .then(function (response) {
                const token = response.data.access_token
                const user = response.data.user.username
                const userrol = response.data.user.idRol
                const userdivision = response.data.user.idDivision
                localStorage.setItem('token', token)
                localStorage.setItem('username', user)
                localStorage.setItem('userdivision', userdivision)
                localStorage.setItem('userrol', userrol)
                // Add the following line:
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
                loader.hide()
                router.push('/')
            })
            .catch(function (err) {
              // handle error
              loader.hide()
              console.log(err)
            })
    }
  },
  mounted () {
  }
}
</script>

<style scoped lang="scss">
#error_msg {
  color:red;
}
</style>