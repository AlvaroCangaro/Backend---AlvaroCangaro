const { Router } = require('express');
const router = Router();
const { faker } = require('@faker-js/faker');

router.get('/', (req, res) => {
	res.json(generateFakeData());
});

function generateFakeData() {
	
		return (fakeProducts = [
			{
				title: faker.commerce.productName(),
				price: faker.commerce.price(),
				thumbnail: faker.image.image(),
			},
			{
				title: faker.commerce.productName(),
				price: faker.commerce.price(),
				thumbnail: faker.image.image(),
			},
			{
				title: faker.commerce.productName(),
				price: faker.commerce.price(),
				thumbnail: faker.image.image(),
			},
			{
				title: faker.commerce.productName(),
				price: faker.commerce.price(),
				thumbnail: faker.image.image(),
			},
			{
				title: faker.commerce.productName(),
				price: faker.commerce.price(),
				thumbnail: faker.image.image(),
			},
			{
				title: faker.commerce.productName(),
				price: faker.commerce.price(),
				thumbnail: faker.image.image(),
			},
			{
				title: faker.commerce.productName(),
				price: faker.commerce.price(),
				thumbnail: faker.image.image(),
			},
			{
				title: faker.commerce.productName(),
				price: faker.commerce.price(),
				thumbnail: faker.image.image(),
			},
			{
				title: faker.commerce.productName(),
				price: faker.commerce.price(),
				thumbnail: faker.image.image(),
			},
			{
				title: faker.commerce.productName(),
				price: faker.commerce.price(),
				thumbnail: faker.image.image(),
			},
	]);
}

module.exports = router;
