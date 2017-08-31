export default (classes: {}) => {
	return Object
		.keys(classes)
		.filter(x => Boolean(classes[x]))
		.join(' ');
};