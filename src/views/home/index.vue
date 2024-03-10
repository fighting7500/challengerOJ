<script setup>
import Footer from './components/footer.vue';
import Header from './components/header.vue';
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
	display: flex;
	flex-direction: column;
	.content {
		width: 1200px;
		margin: 0 auto;
		flex: 1;
	}
}
</style>