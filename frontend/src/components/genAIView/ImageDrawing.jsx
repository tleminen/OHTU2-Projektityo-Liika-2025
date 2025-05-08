import React, { useRef, useState, useEffect } from "react"

const DrawingOverImage = () => {
    const [image, setImage] = useState(null)
    const [path, setPath] = useState([])
    const [isDrawing, setIsDrawing] = useState(false)
    const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 })
    const [blueDots, setBlueDots] = useState([])
    const [hitPercentage, setHitPercentage] = useState(null)

    const canvasRef = useRef(null)
    const imageRef = useRef(null)

    const handleImageUpload = (e) => {
        const file = e.target.files[0]
        if (!file) return

        const img = new Image()
        img.onload = () => {
            const windowW = window.innerWidth * 0.8
            const windowH = window.innerHeight * 0.8
            const scale = Math.min(windowW / img.width, windowH / img.height)
            const width = img.width * scale
            const height = img.height * scale

            setCanvasSize({ width, height })
            setImage(img)
        }
        img.src = URL.createObjectURL(file)
    }

    const startDrawing = (e) => {
        const rect = canvasRef.current.getBoundingClientRect()
        const x = e.touches ? e.touches[0].clientX - rect.left : e.nativeEvent.offsetX
        const y = e.touches ? e.touches[0].clientY - rect.top : e.nativeEvent.offsetY
        setPath([{ x, y }])
        setIsDrawing(true)
        setBlueDots([])
        setHitPercentage(null)
    }

    const draw = (e) => {
        if (!isDrawing) return
        const rect = canvasRef.current.getBoundingClientRect()
        const x = e.touches ? e.touches[0].clientX - rect.left : e.nativeEvent.offsetX
        const y = e.touches ? e.touches[0].clientY - rect.top : e.nativeEvent.offsetY
        setPath(prev => [...prev, { x, y }])
    }

    const endDrawing = () => {
        setIsDrawing(false)
    }

    const drawPath = (ctx, path, color = "rgba(255, 0, 0, 0.5)", width = 12) => {
        if (path.length < 2) return
        ctx.beginPath()
        ctx.moveTo(path[0].x, path[0].y)
        for (let i = 1; i < path.length; i++) {
            ctx.lineTo(path[i].x, path[i].y)
        }
        ctx.strokeStyle = color
        ctx.lineWidth = width
        ctx.lineCap = "round"
        ctx.stroke()
    }

    const handleDone = () => {
        if (path.length < 2) return

        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")

        const dots = Array.from({ length: 4 + Math.floor(Math.random() * 2) }).map(() => {
            const r = 30 + Math.random() * 40
            return {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r
            }
        })
        setBlueDots(dots)

        let hitCount = 0
        path.forEach(p => {
            for (const dot of dots) {
                const dx = p.x - dot.x
                const dy = p.y - dot.y
                const distance = Math.sqrt(dx * dx + dy * dy)
                if (distance <= dot.r) {
                    hitCount++
                    break
                }
            }
        })
        const percent = Math.round((hitCount / path.length) * 100)
        setHitPercentage(percent)
    }

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        if (path.length > 1) {
            drawPath(ctx, path)
        }

        blueDots.forEach(dot => {
            ctx.beginPath()
            ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2)
            ctx.fillStyle = "rgba(0, 0, 255, 0.3)"
            ctx.fill()
        })
    }, [path, blueDots])

    return (
        <div style={{ textAlign: "center", minHeight: "100dvh" }}>
            {/* Yläpalkki: kuvan valinta */}
            <div style={{
            }} className='joined-view'>
                <input type="file" accept="image/*" onChange={handleImageUpload} />
            </div>

            {/* Välitila yläpalkille */}
            <div style={{ height: "3rem" }} />

            {image && (
                <div style={{ position: "relative", display: "inline-block" }}>
                    <img
                        ref={imageRef}
                        src={image.src}
                        alt="Uploaded"
                        width={canvasSize.width}
                        height={canvasSize.height}
                        style={{ display: "block" }}
                    />
                    <canvas
                        ref={canvasRef}
                        width={canvasSize.width}
                        height={canvasSize.height}
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            touchAction: "none"
                        }}
                        onMouseDown={startDrawing}
                        onMouseMove={draw}
                        onMouseUp={endDrawing}
                        onMouseLeave={endDrawing}
                        onTouchStart={startDrawing}
                        onTouchMove={draw}
                        onTouchEnd={endDrawing}
                    />
                </div>
            )}

            {image && (
                <div style={{ marginTop: "1rem" }}>
                    <button className='btn' onClick={handleDone}>Valmis</button>
                </div>
            )}

            {hitPercentage !== null && (
                <div style={{ marginTop: "1rem", fontSize: "1.2rem" }}>
                    Osuma-alueille: {hitPercentage}%
                </div>
            )}
        </div>
    )
}

export default DrawingOverImage
