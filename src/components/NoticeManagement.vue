<template>
  <div id="pageDashboard">
    <v-container fluid>
      <section>
        <v-form>
      <v-layout row wrap  >
        <h2>General Notice to All Users</h2>
          <v-flex xs12>
                            <v-text-field
                            id="title"
                            prepend-icon="title"
                            name="title"
                            ref="title"
                            label="Message Title"
                            type="text"
                            v-model="title"
                            auto-grow
                            v-validate="'required'"
                            data-vv-name="title"
                            :error-messages="errors.collect('title')"
                          ></v-text-field>
          </v-flex>
          <v-flex xs12>
                            <v-textarea
                            id="notice"
                            prepend-icon="notification_important"
                            name="notice"
                            ref="notice"
                            label="Notice Message"
                            type="text"
                            counter
                            maxlength="1000"
                            v-model="notice"
                            auto-grow
                            v-validate="'required'"
                            data-vv-name="notice"
                            :error-messages="errors.collect('notice')"
                          ></v-textarea>
          </v-flex>
                          <v-btn color="primary" @click="save"  :disabled="disable_save" :loading="updating">Save</v-btn>

      </v-layout>
      <v-snackbar v-model="updated" :multi-line="false"  :value=show_message :color=message_type :bottom=true>{{ message_text }}<v-btn dark flat @click="updated = false">Close</v-btn>
          </v-snackbar>
      </v-form>
      </section>
    </v-container>
  </div>
</template>

<script>
  export default {
    name:'NoticeManagement',
    data: () => ({
      id:'',
      title:'',
      notice:'',
      loading:false,
      updated:false,
      updating:false,
      show_message: false,
      message_type: "",
      message_icon: "",
      message_text: "",
    }),

    $_veeValidate: {
      validator: 'new'
    },
    computed: {


    },

    mounted() {

    },

    created () {
      this.get_notice()
    },
    watch:{




    },
    methods: {
      get_notice:function(){
        axios.get('/getnotice')
        .then((response, data) => {

            this.notice=response.data.notice,
            this.title=response.data.title,
            this.id=response.data.id

        })
        .catch(error => {
          console.log(error)
        })
      },
      save:function(){
        this.updating=true
        axios.post('/updatenotice',{
              id:this.id,
              title: this.title,
              notice:this.notice
              })
              .then((response, data) => {
                  this.show_message = true
                  this.message_type = 'success'
                  this.message_icon = 'check_circle'
                  this.message_text = response.data
                  this.updated =true
                  this.updating=false

                  })
              .catch(error => {
                console.log(error)
              })
       }

    }
  }
</script>
