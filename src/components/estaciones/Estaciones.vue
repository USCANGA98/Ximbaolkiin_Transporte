<template>
  <v-container>
    <v-card>
      <v-card-title>
        Estaciones
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Buscar"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-btn
          color="deep-purple accent-4"
          @click="dialog = true"
          dark
          depressed
        >
          Agregar Estacion<v-icon right>mdi-map-marker-plus</v-icon>
        </v-btn>
      </v-card-title>
      <v-data-table :headers="headers" :items="estaciones" :search="search">
        <template v-slot:item.detalles="{ item }">
          <v-btn icon color="red" @click="eliminarEstacion(item.idFirebase)"
            ><v-icon> mdi-delete </v-icon></v-btn
          >
        </template></v-data-table
      >
    </v-card>
    <NuevaEstacion :dialog="dialog" @cancel="dialog = false" />
  </v-container>
</template>

<script>
import { db } from "../../common/Firebase";
import { mapState } from "vuex";
import NuevaEstacion from "../estaciones/NuevaEstacion";

export default {
  name: "EstacionesComponent",
  components: {
    NuevaEstacion,
  },
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Nombre",
          align: "start",
          value: "nombre",
        },
        { text: "Latitud", value: "latitud" },
        { text: "Longitud", value: "longitud" },
        { text: "Detalles", value: "detalles" },
      ],
      dialog: false,
    };
  },
  methods: {
    async eliminarEstacion(idFirebase) {
      try {
        const response = await db
          .collection("estaciones")
          .doc(idFirebase)
          .delete();
        console.log(response);
        console.log("eliminado correctamente");
      } catch (error) {
        console.log(error);
        alert("no se ha podido eliminar");
      }
    },
  },
  computed: {
    ...mapState(["estaciones"]),
  },
};
</script>

<style lang="scss" scoped></style>
