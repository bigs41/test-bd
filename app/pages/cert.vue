<template>
  <div>
    <div class="cont" id="output" ref="bgcert">
      <div
        ref="drag1"
        id="drag-1"
        class="draggable"
        data-x="246"
        data-y="136"
        style="transform: translate(246px, 136px)"
      >
        Draggable
      </div>
      <div
        ref="drag2"
        id="drag-2"
        class="draggable"
        data-x="12"
        data-y="299"
        style="transform: translate(12px, 299px)"
      >
        logo
      </div>
      <div
        ref="drag3"
        id="drag-3"
        class="draggable"
        data-x="662"
        data-y="178"
        style="transform: translate(662px, 178px)"
      >
        qr
      </div>
    </div>
    <v-file-input
      accept="image/*"
      label="File input"
      v-model="datafiles"
      @change="previewFile('#output')"
    ></v-file-input>
    <v-btn @click="save">xxxx</v-btn>
  </div>
</template>

<script>
import interact from "interactjs";
import axios from "axios";
export default {
  data() {
    return {
      datafiles: null,
    };
  },
  mounted: function () {
    this.initInteract(this.$refs.drag1);
    this.initInteract(this.$refs.drag2);
    this.initInteract(this.$refs.drag3);
  },
  methods: {
    readURL(file) {
      return new Promise((resolve, reject) => {
        var reader = new FileReader();

        reader.onload = (e) => {
          resolve(e.target.result);
        };

        reader.readAsDataURL(file); // convert to base64 string
      });
    },
    async save() {
      let formData = new FormData();
      formData.append("image", this.datafiles);
      formData.append("name_x", this.$refs.drag1.getAttribute("data-x"));
      formData.append("name_y", this.$refs.drag1.getAttribute("data-y"));
      formData.append("logo_x", this.$refs.drag2.getAttribute("data-x"));
      formData.append("logo_y", this.$refs.drag2.getAttribute("data-y"));
      formData.append("qr_x", this.$refs.drag3.getAttribute("data-x"));
      formData.append("qr_y", this.$refs.drag3.getAttribute("data-y"));
      let r = await axios.post(`/api/cert`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    async previewFile(sel) {
      const preview = document.querySelector(sel);
      const file = this.datafiles;
      preview.style.backgroundImage = `url(${await this.readURL(file)})`;
    },
    initInteract: function (selector) {
      interact(selector).draggable({
        // enable inertial throwing
        inertia: true,
        // keep the element within the area of it's parent
        restrict: {
          restriction: "parent",
          endOnly: true,
          elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
        },
        // enable autoScroll
        autoScroll: true,

        // call this function on every dragmove event
        onmove: this.dragMoveListener,
        // call this function on every dragend event
        onend: this.onDragEnd,
      });
    },
    dragMoveListener: function (event) {
      var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        // x =
        //   (parseFloat(target.getAttribute("data-x")) || this.screenX) +
        //   event.dx,
        // y =
        //   (parseFloat(target.getAttribute("data-y")) || this.screenY) +
        //   event.dy;
        x = parseFloat(target.getAttribute("data-x")) + event.dx,
        y = parseFloat(target.getAttribute("data-y")) + event.dy;

      // x = x >= 0 ? x : 0;
      // y = y >= 0 ? y : 0;
      // x = x <= 800 ? x : 800;
      // y = y <= 800 ? y : 800;
      // translate the element
      target.style.webkitTransform = target.style.transform =
        "translate(" + x + "px, " + y + "px)";

      // update the posiion attributes
      target.setAttribute("data-x", x);
      target.setAttribute("data-y", y);
    },
    onDragEnd: function (event) {
      var target = event.target;
      // update the state
      this.screenX = target.getBoundingClientRect().left;
      this.screenY = target.getBoundingClientRect().top;
    },
  },
};
</script>
<style scoped>
.draggable {
}
.cont {
  margin-left: 100px;
  width: 800px;
  height: 600px;
  border: #000 solid;
  background-color: white;
}
#drag-1 {
  width: 25%;
  min-height: 3em;
  margin: 1rem 0 0 1rem;
  background-color: #29e;
  color: white;
  border-radius: 0.75em;
  padding: 4%;
  touch-action: none;
  user-select: none;
  transform: translate(0px, 0px);
}

#drag-2 {
  width: 100px;
  height: 50px;
  padding: 0.5%;
  background-color: #29e;
}

#drag-3 {
  width: 100px;
  height: 100px;
  padding: 0.5%;
  background-color: #29e;
}
</style>
