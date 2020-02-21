<template>
    <div class="hero-foot">
      <nav class="tabs is-boxed">
        <div class="container">
          <ul>
            <router-link tag="li" to="/home" exact>
                <a>Home</a>
            </router-link>

            <router-link tag="li" to="/about">
                <a>About</a>
            </router-link>
          </ul>
        </div>
      </nav>
    </div>
</template>

<script>
export default {
    
}
</script>