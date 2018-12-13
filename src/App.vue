<template>
  <v-app>
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
    >
      <v-list color="green">
        <v-list-tile
          v-for="(item, i) in items"
          :key="i"
          :to="item.url"
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="green accent-3" dark
      app
      :clipped-left="clipped"
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <h1><v-toolbar-title color="green" font-family="Open Sans" v-text="title"></v-toolbar-title></h1>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
    
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: true,
      drawer: false,
      fixed: true,
      items: [
        {
          icon: "home",
          title: 'Lembretes',
          url: "/"
        },
        {
          icon: "book",
          title: 'Livros',
          url: "/livro"
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Lembrete de Leitura'
    }
  },
  name: 'App'
}
</script>
