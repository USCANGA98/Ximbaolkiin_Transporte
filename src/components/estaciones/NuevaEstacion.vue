<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600">
      <v-card>
        <v-card-title class="headline">
          Agregar nueva estacion
        </v-card-title>
        <v-card-text>
          <pre>{{ estacion }}</pre>
          <v-col cols="12" class="mb-0 pb-0">
            <v-text-field
              v-model="estacion.nombre"
              label="Ingresa el nombre de la estacion"
              placeholder="Nombre de estacion"
              outlined
              dense
            ></v-text-field>
          </v-col>
          <v-col cols="12" class="mb-0 mt-0 pb-0 pt-0">
            <v-text-field
              v-model="estacion.latitud"
              label="Ingresa la latitud de la estacion"
              placeholder="Latitud"
              outlined
              dense
            ></v-text-field>
          </v-col>
          <v-col cols="12" class="mb-0 mt-0 pb-0 pt-0">
            <v-text-field
              v-model="estacion.longitud"
              label="Ingresa la longitud de la estacion"
              placeholder="Longitud"
              outlined
              dense
            ></v-text-field>
          </v-col>
          <v-col cols="12" class="mb-0 mt-0 pb-0 pt-0">
            <v-btn
              class="mb-5"
              block
              color="purple darken-4"
              dark
              @click="$refs.boton.click()"
            >
              <v-icon left>mdi-image-outline</v-icon> Adjuntar foto de la
              estacion
            </v-btn>
            <input
              type="file"
              accept="image/*"
              ref="boton"
              @change="processImage($event)"
              class="d-none"
            />
            <v-img v-if="image != '' " :src="image"></v-img>
          </v-col>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" depressed dark @click="$emit('cancel')">
            Cancelar
          </v-btn>
          <v-btn
            color="green darken-1"
            depressed
            dark
            @click="enviarDatosFirebase"
          >
            Guardar estacion
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { db, storage } from "../../common/Firebase";
import { firestore } from "firebase/app";
export default {
  props: {
    dialog: {
      type: Boolean,
      required: true,
    },
  },
  data: () => ({
    estacion: {
      imgUrl: "",
      nombre: "",
      latitud: "",
      longitud: "",
    },
    image: "",
    imageFile: ""
  }),
  methods: {
    async enviarDatosFirebase() {
      await this.subirImagen();
      const coordenadas = new firestore.GeoPoint(
        parseFloat(this.estacion.latitud),
        parseFloat(this.estacion.longitud)
      );
      const data = {
        nombre: this.estacion.nombre,
        coordenadas: coordenadas,
        urlImagen: this.estacion.imgUrl,
      };
      db.collection("estaciones")
        .add(data)
        .then(() => {
          this.$emit("cancel");
        });
    },
    processImage(e) {
      this.imageFile = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(this.imageFile);
      reader.onload = async (e) => {
        this.image = await e.target.result;
      };
    },
    async subirImagen(){
      try {

        const upload  = await storage.child(`estaciones/${this.imageFile.name}`).put(this.imageFile);
        const urlImg = await upload.ref.getDownloadURL();
        console.log(urlImg);
        this.estacion.imgUrl = urlImg;
      } catch(error){
        console.log(error);
      }
    },

  }
  

};
</script>

<style scoped></style>
