declare global {
	interface Array<T> {
		empty(): void
	}
}

Array.prototype.empty = function () {
	this.length = 0
}

export default () => {}
