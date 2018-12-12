<template>
  <v-container>
      <v-layout row>
         <v-flex md12 offset-md0 xs12>
              <v-form>
                <v-text-field
                    label="livro"
                    required
                    v-model="cbook.livro"
                ></v-text-field>

                <v-text-field
                    label="paginas"
                    required
                    v-model="cbook.paginas"
                ></v-text-field>

                <v-flex xs12 class="text-xs-center">
                    <v-btn
                        color="info"
                        :loading="saving"
                        :disabled="saving"
                        @click="save()"
                        >
                        Salvar
                    </v-btn>
                    <v-btn
                        color="red"
                        >
                        Cancelar
                    </v-btn>
                </v-flex>

            </v-form>
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
                cbook: {},
                snackbar: { show: false, text: "" },
            }
        },

        methods: {
            showSnackBar(text){
                this.snackbar.text = text;
                this.snackbar.show = true;
            },

            async save(){
                this.saving = true;
                try {
                    let resp = await axios.post("http://localhost:3000/livro", this.cbook);
                    this.showSnackBar("Salvo com sucesso");
                } catch (error) {
                    this.showSnackBar("Não Foi Possível Cadastrar");
                    console.log("Erro ao salvar cliente: " + error);
                } finally{
                    this.saving = false;
                }
            },
        },
    };
</script>