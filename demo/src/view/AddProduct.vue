<template>
  <div class="col-md-6 offset-3 d-flex justify-content-center">
    <form @submit.prevent>
      <div class="form-control mb-3 mt-4">
        <label for="name">Name:</label><br>
        <input  type="text" id="name" :value="nomi" @input="nomi = $event.target.value">
      </div>
      <div class="form-control mb-3">
        <label for="cost">Cost:</label><br>
        <input  type="number" step="any" id="cost" :value="narxi" @input="narxi = $event.target.value">
      </div>
      <div class="form-control mb-3">
        <label for="address">Address: </label><br>
        <input  type="text" id="address" :value="manzili" @input="manzili = $event.target.value">
      </div>
      <div class="form-control mb-3">
        <label for="created_date">Created Date: </label><br>
        <input  type="datetime-local" id="created_date" :value="ishlabChiqarilganSana"
               @input="ishlabChiqarilganSana = $event.target.value">
      </div>
      <div class="form-control mb-3">
        <label for="product_type">Choose product type: </label><br>
        <select id="product_type" required :value="productTypeId" v-model="productTypeId">
          <option value="" selected disabled>Choose:</option>
          <option v-for=" (type) in productType" :value="type.id">{{ type.name_uz }}</option>
        </select>
      </div>
      <div class="d-flex justify-content-between">
        <RouterLink class="btn btn-danger mt-3 " to="/">cancel</RouterLink>
        <button class="btn btn-success mt-3 " @click="SaveProduct">Save</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  created() {
    this.productId = this.$route.params.id;
  },
  data() {
    return {
      productType: [],
      productTypeId: '',
      nomi: '',
      narxi: '',
      manzili: '',
      ishlabChiqarilganSana: '',
      productId : 0
    }
  },
  mounted() {
    try {
      axios.get("http://94.158.54.194:9092/api/product/get-product-types").then(res => (this.productType = res.data))

    } catch (error) {
      alert("something went wrong!")
    }
  },
  methods: {
    async SaveProduct() {
      const date = new Date(this.ishlabChiqarilganSana);

      const newProduct = {
        name_uz: this.nomi,
        cost: this.narxi,
        product_type_id: this.productTypeId,
        address: this.manzili,
        created_date: date.getTime()
      }
      try {
        const response = await axios.post("http://94.158.54.194:9092/api/product",newProduct)
      }catch (error){
        alert("something went wrong!")
      }
      this.$router.push('/')
    }
  }
}
</script>