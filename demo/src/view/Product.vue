<template>
  <div class="col-md-8 offset-2">
    <div class="text-center">
      <RouterLink to="/add" class="btn btn-outline-primary mb-4 mt-4">
        + add new task
      </RouterLink>
    </div>
    <div v-if="products.length==0">
      <h1 class="d-flex justify-content-center">No Data</h1>
    </div>
    <div v-else>
      <table class="table table-striped table-dark">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Type</th>
          <th scope="col">Address</th>
          <th scope="col">Cost</th>
          <th scope="col">Created Date</th>
          <th scope="col">Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for=" (product, index) in products">
          <td>{{ (index + 1) }}</td>
          <td>{{ product.name_uz }}</td>
          <slot v-for="type in productType">
            <td v-if="type.id === product.product_type_id"> {{type.name_uz}}</td>
          </slot>
          <td>{{ product.address }}</td>
          <td>{{ product.cost }}</td>
          <td>{{ new Date(product.created_date).toLocaleString('en-GB') }}</td>
          <td>
            <RouterLink :to="{ name: 'edit', params: { id: product.id }}" class="btn btn-warning">Edit</RouterLink>
            <button @click="DeleteProduct(product.id)" class="btn btn-danger">Delete</button>
          </td>
        </tr>
        </tbody>
      </table>
      <div class="d-flex justify-content-between">
        <nav aria-label="..." v-if="this.totalPage>1">
          <ul class="pagination">
            <li class="page-item" :class="[this.currentPage===1 ? 'disabled' : '']">
              <button class="page-link" @click="this.currentPage-=1, GetProducts()" tabindex="-1">Previous</button>
            </li>
            <li class="page-item" :class="[this.currentPage===page ? 'active' : '']" v-for="page in totalPage">
              <button class="page-link" @click="this.currentPage=page, GetProducts()">{{ page }}</button>
            </li>
            <li class="page-item" :class="[this.currentPage===totalPage ? 'disabled' : '']">
              <button class="page-link" @click="this.currentPage+=1, GetProducts()">Next</button>
            </li>
          </ul>
        </nav>
        <input-group borderless paddingless inline>
          <select class="form-select" @change="Smth($event)">
            <option value="3">3</option>
            <option value="5" selected>5</option>
            <option value="10">10</option>
          </select>
        </input-group>
      </div>
    </div>
  </div>
</template>
<script>
import {RouterLink} from 'vue-router'
import axios from 'axios'
import AddProduct from "@/view/AddProduct.vue";

export default {
  data() {
    return {
      productType: [],
      products: [],
      currentPage: 1,
      perPage: 5,
      totalPage: '',
      smth: ''
    }
  },
  methods: {
    async DeleteProduct(id) {
      console.log(id)
      const res = await axios.delete("http://94.158.54.194:9092/api/product/" + id)
      this.GetProducts()
    },
    GetProducts() {
      axios.get(`http://94.158.54.194:9092/api/product?page=${this.currentPage}&perPage=${this.perPage}`).then(res => (this.products = res.data)).catch(err => {
        console.log(err)
      })
      axios.get(`http://94.158.54.194:9092/api/product`).then(res => (
          this.totalPage = Math.ceil(res.data.length / this.perPage)
      )).catch(err => {
        console.log(err)
      })
    },
    Smth(e) {
      this.perPage = e.target.value
      this.GetProducts()
    }
  },
  mounted() {
    axios.get(`http://94.158.54.194:9092/api/product?page=${this.currentPage}&perPage=${this.perPage}`).then(res => (
        this.products = res.data
    )).catch(err => {
      console.log(err)
    })
      axios.get("http://94.158.54.194:9092/api/product/get-product-types").then(res => (this.productType = res.data)).catch(err => {
        console.log(err)
      })
    axios.get(`http://94.158.54.194:9092/api/product`).then(res => (
        this.totalPage = Math.ceil(res.data.length / this.perPage)
    )).catch(err => {
      console.log(err)
    })
  }
}

</script>