<template>
  <v-container fluid grid-list-lg>
    <v-layout row wrap>
      <v-flex xs12 sm12 md6 offset-md3>
        
            <v-fab-transition>
              <v-btn
                v-show="!hidden"
                color="pink"
                absolute
                top
                right
                fab
              >
                <v-icon>add</v-icon>
              </v-btn>
            </v-fab-transition>
      </v-flex>
          
    </v-layout>
  </v-container>
</template>