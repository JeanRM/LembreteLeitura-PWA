<template>
  <v-container>
    <v-layout row>
      <v-flex md12 offset-md xs12> 
        <v-btn dark color="green" absolute bottom right fab class="mb-4"  @click="dialog = true">
          <v-icon>add</v-icon>
        </v-btn> 

        <h1 class="green--text Arial--text mt-4 mb-4">Lembretes Para Leitura</h1>
            <v-data-table
    :headers="headers"
    :items="lembrete"
    item-key="livro"
  >
    <template slot="items" slot-scope="props">
      <tr @click="props.expanded = !props.expanded">
        <td class="text-xs-left">{{ props.item.livro }}</td>
        <td class="text-xs-left">{{ props.item.horaLeitura}}</td>
        <td class="text-xs-left">{{ props.item.dataLeitura}}</td>
        <td class="text-xs-left">
          <v-btn icon class="mx-0" @click="remove(props.item)">
              <v-icon color="pink">delete</v-icon>
          </v-btn>
        </td>
      </tr>
    </template>
    <template slot="expand" slot-scope="props">
      <v-card flat>
        <v-layout row wrap>
          <v-flex xs-6>
            <v-card-text class="justify red--text">
              Você Marcou Uma Leitura do livro {{props.item.livro}} Para o dia 
              {{props.item.dataLeitura}} 
              às {{props.item.horaLeitura}}.   
            </v-card-text>
          </v-flex>
          <v-flex xs-6>
            <v-card-text class="justify green--text">Restam xx horas para sua leitura</v-card-text>
          </v-flex>
        </v-layout>
        </v-card>
    </template>
  </v-data-table>
      </v-flex>
    
        
      
      <v-layout row justify-center>
        <v-dialog v-model="dialog" persistent max-width="600px">
          <v-card>
            <v-card-title>
              <span class="headline">Cadastrar Lembrete</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12>
                    <v-text-field v-model="clembrete.livro"  type="text" label="Livro" required></v-text-field>
                  </v-flex>

                  <v-flex xs6>
                    <v-text-field  placeholder="ano-mes-dia" v-model="clembrete.dataLeitura"  label="Data" required></v-text-field>
                  </v-flex>

                  <v-flex xs6>
                    <v-text-field  v-model="clembrete.horaLeitura" type="time" label="Hora" required></v-text-field>
                  </v-flex>                  
                </v-layout>
              </v-container>
            </v-card-text>
            
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="dialog = false">Cancelar</v-btn>
              <v-btn color="blue darken-1" flat @click="dialog = false, save()">Salvar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
  </v-layout>

    <v-snackbar :timeout="3000" :top="true" :right="true" :multi-line="true" :vertical="false" v-model="snackbar.show">
              {{ snackbar.text }}
              <v-btn flat @click.native="snackbar.show = false">fechar</v-btn>
    </v-snackbar>
  </v-container>
  
</template>

<script>
  import axios from 'axios';
 

  export default {
    data: () => ({
      dialog: false,
      snackbar: { show: false, text: "" },
      

    clembrete:{},

    headers: [
      {
          text: 'Livro',
          align: 'left',
          sortable: true,
          value: 'livro'
      },
      { text: 'Hora', value: 'horaLeitura' },
      { text: 'Data', value: 'dataLeitura' },
      { text: 'Ação', sortable: false}
    ],
    lembrete:[],

    }),

  
    methods: {
      showSnackBar(text){
        this.snackbar.text = text;
        this.snackbar.show = true;
      },


      async findAll(){
        try {
          let resp = await axios.get(this.$store.state.apiLink + "/lembrete");
          this.lembrete = resp.data;
          console.log(this.lembrete.horaLeitura);
        } catch (error) {
          alert("Falha ao carregar Lembretes.");
          console.log("Erro ao carregar Lembretes: " + error);
        }
      },

      async save(){
        try {
            let resp = await axios.post(this.$store.state.apiLink + "/lembrete", this.clembrete);
            this.showSnackBar("Salvo com sucesso");
            
        } catch (error) {
            this.showSnackBar("Não Foi Possível Cadastrar");
            console.log("Erro ao salvar cliente: " + error);
        }finally{
          this.findAll();
        }
      },

      async remove(_id){
        try {
            if(confirm("Deseja realmente remover este lembrete?")){
                await axios.delete(this.$store.state.apiLink + "/lembrete", { data: {_id: _id} });
                this.showSnackBar("Excluido");
                this.findAll();
            }
        } catch (error) {
            console.log("Erro ao deletar livro: " + error);
            this.showSnackBar("Não Foi Possível Excluir");
        }
      },
    },
    mounted(){
      this.findAll();
    }
  }

</script>