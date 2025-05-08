import React, { useEffect, useRef } from "react"

const TouchVisualizer = ({ isVisible }) => {
    const canvasRef = useRef(null)
    const pathsRef = useRef([])

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        const resizeCanvas = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        window.addEventListener("resize", resizeCanvas)
        return () => window.removeEventListener("resize", resizeCanvas)
    }, [])

    useEffect(() => {
        if (!isVisible) return

        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")

        const activeTouches = {}

        const handleTouchStart = (e) => {
            for (const touch of e.touches) {
                activeTouches[touch.identifier] = [{
                    x: touch.clientX,
                    y: touch.clientY,
                    time: Date.now(),
                    pressure: touch.force || 0.5
                }]
            }
        }

        const handleTouchMove = (e) => {
            for (const touch of e.touches) {
                if (activeTouches[touch.identifier]) {
                    activeTouches[touch.identifier].push({
                        x: touch.clientX,
                        y: touch.clientY,
                        time: Date.now(),
                        pressure: touch.force || 0.5
                    })
                }
            }
        }

        const handleTouchEnd = (e) => {
            for (const touch of e.changedTouches) {
                const points = activeTouches[touch.identifier]
                delete activeTouches[touch.identifier]
                if (points && points.length > 1) {
                    addPath(points)
                }
            }
        }

        const addPath = (points) => {
            const path = {
                points,
                opacity: 1
            }
            pathsRef.current.push(path)

            // Poistoaikataulu
            const fadeInterval = setInterval(() => {
                path.opacity -= 0.05
                if (path.opacity <= 0) {
                    clearInterval(fadeInterval)
                    pathsRef.current = pathsRef.current.filter(p => p !== path)
                }
            }, 50)
        }

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            for (const path of pathsRef.current) {
                if (path.points.length < 2) continue
                ctx.beginPath()
                for (let i = 0; i < path.points.length - 1; i++) {
                    const p1 = path.points[i]
                    const p2 = path.points[i + 1]
                    ctx.moveTo(p1.x, p1.y)
                    ctx.lineTo(p2.x, p2.y)

                    // Mukautetaan viivan paksuus kosketuksen voimakkuuden mukaan
                    const pressure = p1.pressure || 0.5  // Käytetään edellisen pisteen painallusvoimaa
                    const lineWidth = Math.max(1, pressure * 10)  // Varmistetaan, että viiva ei ole liian ohut
                    ctx.lineWidth = lineWidth
                }
                ctx.strokeStyle = `rgba(0, 150, 255, ${path.opacity})`
                ctx.lineCap = "round"
                ctx.stroke()
            }
            requestAnimationFrame(draw)
        }

        draw()

        window.addEventListener("touchstart", handleTouchStart, { passive: true })
        window.addEventListener("touchmove", handleTouchMove, { passive: true })
        window.addEventListener("touchend", handleTouchEnd, { passive: true })

        return () => {
            window.removeEventListener("touchstart", handleTouchStart)
            window.removeEventListener("touchmove", handleTouchMove)
            window.removeEventListener("touchend", handleTouchEnd)
        }
    }, [isVisible])

    if (!isVisible) return null

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100dvw",
                height: "100dvh",
                pointerEvents: "none",
                zIndex: 9999
            }}
        />
    )
}

export default TouchVisualizer
