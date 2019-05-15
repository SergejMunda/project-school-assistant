<template>
  <v-container>
    <v-list two-line>
      <template v-for="(item) in todo">
        <v-list-tile :key="item.title">
          <v-list-tile-content>
            <v-list-tile-title v-html="item.name"></v-list-tile-title>
            <v-list-tile-sub-title v-html="item.vsebina"></v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
    <v-btn absolute dark fab bottom right color="pink">
      <v-icon>add</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    todo: [{ name: "test", vsebina: "TODO" }]
  })
};
</script>

<style>
</style>
