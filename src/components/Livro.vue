<template>

  <v-container>
      <v-layout row>

         <v-flex md12 offset-md xs12>
            <h1>Livros Cadastrados</h1>

            <v-data-table
                :headers="headers"
                :items="cbook"
                class="elevation-1"
            >
                <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
                <template slot="items" slot-scope="book">
                    <td>{{ book.item.livro }}</td>
                    <td>{{ book.item.paginas }}</td>
                    <td class="justify-center layout px-0">
                        <v-btn icon class="mx-0" @click="remove(cbook.item)">
                            <v-icon color="pink">delete</v-icon>
                        </v-btn>
                    </td>
                </template>
            </v-data-table>

            
         </v-flex>

      </v-layout>
      <v-snackbar
        :timeout="3000"
        :top="true"
        :right="true"
        :multi-line="true"
        :vertical="false"
        v-model="snackbar.show"
        >
        {{ snackbar.text }}
        <v-btn flat @click.native="snackbar.show = false">fechar</v-btn>
    </v-snackbar>
  </v-container>
</template>
<script>
    import axios from 'axios';

    export default{
        data(){
            return {
                saving: false,
                snackbar: { show: false, text: "" },
                headers: [
                    {
                        text: 'Livro',
                        align: 'left',
                        sortable: true,
                        value: 'livro'
                    },
                    { text: 'Paginas', value: 'paginas' },
                    { text: 'Ações', sortable: false}
                ],
                cbook: []
            }
        },
        methods: {
            showSnackBar(text){
                this.snackbar.text = text;
                this.snackbar.show = true;
            },
            async findAll(){
                try {
                    let resp = await axios.get(this.$store.state.apiLink + "/livro");
                    this.cbook = resp.data;
                } catch (error) {
                    alert("Falha ao carregar livros.");
                    console.log("Erro ao carregar livros: " + error);
                }
            },
            async remove(_id){
                try {
                    if(confirm("Deseja realmente remover este livro?")){
                        await axios.delete(this.$store.state.apiLink + "/livro", { data: {_id: _id} });
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
    };
</script>