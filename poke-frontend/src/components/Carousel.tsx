import { useEffect, useRef, useState } from "react"
// css
import "./css/Carousel.css"

const Carousel = ({
	images,
	index,
	previousIndex,
	nextIndex,
}: {
	images: string[]
	index: number
	previousIndex: () => void
	nextIndex: () => void
}) => {
	const imagesRef = useRef<(HTMLImageElement | null)[]>([])
	const [imageSize, setImageSize] = useState({ width: 0, height: 0 })

	useEffect(() => {
		if (!imagesRef.current[index]) return

		const observer = new ResizeObserver((entries) => {
			setImageSize({
				width: entries[0].contentRect.width,
				height: entries[0].contentRect.height,
			})
		})
		observer.observe(imagesRef.current[index]!)

		return () => observer.disconnect()
	}, [index, images])

	console.log(
		`translateX(calc(${imageSize.width * 0.8 * (2 - index)}px-50%))`
	)
	return (
		<div className="carousel" style={{ height: imageSize.height }}>
			{images.map((image) => {
				const imgIndex = images.findIndex((a) => a === image)
				return (
					<img
						key={image}
						src={image}
						alt="pokemon"
						onClick={
							imgIndex === index
								? () => {}
								: imgIndex < index
								? previousIndex
								: nextIndex
						}
						ref={(el) => {
							imagesRef.current[index] = el
						}}
						style={{
							transform: `translateX(calc(${
								imageSize.width * 0.8 * (imgIndex - index)
							}px - 50%))`,
							scale: imgIndex === index ? 1 : 0.8,
							opacity: imgIndex === index ? 1 : 0.7,
						}}
					/>
				)
			})}
		</div>
	)
}

export default Carousel
