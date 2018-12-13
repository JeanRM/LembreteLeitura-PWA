<template>
    <v-container>
        <v-layout row>
            <v-btn dark color="green" absolute bottom right fab class="mb-4"  @click="dialog = true">
                <v-icon>add</v-icon>
            </v-btn> 
            
            <v-flex md12 offset-md xs12>
                <h1>Livros Cadastrados</h1>
                <v-data-table :headers="headers" :items="cbook" class="elevation-1">
                    <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
                    
                    <template slot="items" slot-scope="book">
                        <td>{{ book.item.livro }}</td>
                        <td>{{ book.item.paginas }}</td>
                        <td class="justify-center layout px-0">
                            <v-btn icon class="mx-0" @click="remove(book.item)">
                                <v-icon color="pink">delete</v-icon>
                            </v-btn>
                        </td>
                    </template>
                </v-data-table>
            </v-flex>


            <v-layout row justify-center>
                <v-dialog v-model="dialog" persistent max-width="600px">
                    <v-card>
                        <v-card-title>
                            <span class="headline">Cadastrar Livro</span>
                        </v-card-title>
                        
                        <v-card-text>
                            <v-container grid-list-md>
                                <v-layout wrap>
                                    <v-flex xs12>
                                        <v-form>
                                            <v-text-field label="livro" required v-model="cbooks.livro"/>
                                            <v-text-field label="paginas" required v-model="cbooks.paginas"/>
                                        </v-form>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-card-text>
                        
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="red" flat @click="dialog = false">Cancelar</v-btn>
                            <v-btn color="green" flat @click="dialog = false, save()" >Salvar</v-btn>
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

    export default{    
        data(){
            return {
                dialog: false,
                saving: false,
                cbooks: {},
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
            async save(){
                try {
                    let resp = await axios.post(this.$store.state.apiLink + "/livro", this.cbooks);
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