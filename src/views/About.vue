<template>
  <div class="about">
    <h1>This is an about page</h1>
      <ul>
          <li v-for="item in list">
              {{item.name}}
          </li>
      </ul>
  </div>
</template>

 <script>
     export default {
         created
     }
 </script>