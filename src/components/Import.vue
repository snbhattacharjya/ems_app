<template>
<div id="pageDashboard">
  <section>
  <v-container grid-list-md align-center>
    <v-layout row wrap fill-height>
    <v-flex xs12 sm6 offset-sm3 mb-5>
      <v-card>
        <v-toolbar color="primary" dark>

          <v-toolbar-title>Import</v-toolbar-title>

          <v-spacer></v-spacer>


        </v-toolbar>

        <v-list three-line>
          <template v-for="(item, index) in items">
            <v-subheader
              v-if="item.header"
              :key="item.header"
              class="red--text"
            >
             <h3> {{ item.header }}</h3>
            </v-subheader>

            <v-divider
              v-else-if="item.divider"
              :key="index"

            ></v-divider>

            <v-list-tile
              v-else
              :key="item.title"
              avatar

            >


              <v-list-tile-content>
                <v-list-tile-title v-html="item.title"></v-list-tile-title>
                <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>

          </template>
        </v-list>
        <h2 class="ml-2">Upload file - </h2>
        <v-btn @click='pickFile' :loading="uploading" color="primary" ><v-icon small class="mr-2">attach_file</v-icon>{{this.file_name}}</v-btn>
        <input type="file" id="file" name="file" ref="file" accept=".csv" @change="showfile" style="display:none;"/>
      </v-card>
    </v-flex>
  </v-layout>
  <v-snackbar v-model="snackbar" :multi-line="false" :timeout=0 :value=show_message :color=message_type :bottom=true>{{ message_text }}<v-btn dark flat @click="snackbar = false">Close</v-btn>
          </v-snackbar>
   </v-container>

      </section>
  </div>
</template>
<script>
export default {
  name: 'Import',
  data () {
    return {
      uploading:false,
      file_name:'Select CSV',
      file_url:'',
      file:null,
      snackbar: false,
      row_num:0,
      show_message: false,
        message_type: "",
        message_icon: "",
        message_text: "",
      items: [
          { header: 'Rules For Uploading CSV to update personnel Post Status' },
          {
            title: 'File Type',
            subtitle: "File must be CSV(Comma Separated Value) file with extension [.csv]"
          },
          { divider: true, inset: true },
          {
            title: 'File Format',
            subtitle: '<strong>First column</strong> must be <strong>PERSONNEL ID</strong> and <strong>Second column</strong> must be <strong>POST STATUS</strong>, <strong>but no need to specify column name at header</strong>.<br> Please <a href="/static/docs/file/Personnel_post_status.csv" target="_blank" rel="noopener">download</a> Specimen file for uploading.'
          }

        ]
    }
  },
  beforeUpdate() {

  },
  computed: {

  },
   created () {



    },
  methods:{
    showfile:function(e){
        const files = e.target.files

        if(files[0] !== undefined) {
          this.file_name = files[0].name
          if(this.file_name.lastIndexOf('.') <= 0) {
             alert('Plesae select a valid file')

            this.uploading=false
            this.file_name ='Select CSV'
            return
          }
          this.uploading=true
          const fileReader = new FileReader()
          fileReader.addEventListener('load',()=>{
            this.file_url=fileReader.result
          })
          for (var i = 0; i < files.length; i++) {
          this.parseCSV(files[i], ',', function(result) {
            //console.log(result);

            axios.post('/personnelimport',{data:result})
              .then((response, data) => {

                  })
              .catch(error => {
                console.log(error)
                this.uploading=false
                this.file_name ='Select CSV'
              })

          });
        }
        this.show()

        }
      },
      show:function(){
        this.uploading=false
                this.file_name ='Select CSV'
                this.show_message = true
                this.message_type = 'success'
                this.message_icon = 'check_circle'
                this.message_text = 'Post status Successfully updated'
                this.snackbar =true
      },
      pickFile:function(){
        this.$refs.file.click ()
      },
    parseCSV:function(file, delimiter, callback) {
            var reader = new FileReader();

            // When the FileReader has loaded the file...
            reader.onload = function() {

              // Split the result to an array of lines
              var lines = this.result.split('\n');

              // Split the lines themselves by the specified
              // delimiter, such as a comma
              var result = lines.map(function(line) {
                return line.split(delimiter);
              });

              // As the FileReader reads asynchronously,
              // we can't just return the result; instead,
              // we're passing it to a callback function
              callback(result);
            }

            // Read the file content as a single string
            reader.readAsText(file);
          },
  }



}

</script>

