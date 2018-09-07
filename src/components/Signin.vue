<template>
    <v-container fluid>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Login form</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form autocomplete="off">
                <v-text-field
                  prepend-icon="person"
                  name="login"
                  label="Username"
                  type="text"
                  v-model="username"
                  v-validate="'required'"
                  data-vv-name="username"
                  :error-messages="errors.collect('username')"
                ></v-text-field>
                <v-text-field
                  id="password"
                  prepend-icon="lock"
                  name="password"
                  label="Password"
                  type="password"
                  v-model="password"
                  v-validate="'required'"
                  data-vv-name="password"
                  :error-messages="errors.collect('password')"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="login" :loading="loading">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
  export default {
    name: 'Signin',
    data(){
      return {
        username: '',
        password: '',
        loading: false
      }
    },

    $_veeValidate: {
      validator: 'new'
    },

    methods: {
      login(){
        this.loading = true
        this.$validator.validate()
        .then(result =>{
          if(result){
            axios.post('/login',{
              username: this.username,
              password: this.password
            })
            .then(response => {
              this.$store.dispatch('storeAccessToken', response.data.access_token)
              this.loading = false
              this.$router.replace("/dashboard")
            })
            .catch(error => {
              this.password = ''
              this.errors.add(
                {
                  field: 'username',
                  msg: 'Invalid Username or Password'
                }
              )
              this.loading = false
            })
          }
        })

      }
    }
  }
</script>
