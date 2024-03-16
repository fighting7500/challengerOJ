<script setup>
import Footer from './home/components/footer.vue';
import Header from './home/components/header.vue';
</script>

<template>
	<div class="container">
		<Header></Header>
		<div class="content">
			<router-view />
		</div>
		<Footer></Footer>
	</div>
</template>

<style lang="scss" scoped>
.container {
	// height: 100vh;
	display: flex;
	flex-direction: column;
	.content {
		flex: 1;
	}
}
</style>