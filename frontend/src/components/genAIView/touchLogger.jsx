import React, { useEffect, useRef } from "react"

const TouchVisualizer = ({ isVisible }) => {
    const canvasRef = useRef(null)
    const pathsRef = useRef([])
    const touchesRef = useRef({})
    const lastSampleTimeRef = useRef(0)

    // ⏱ Aseta näytteenottoväli (ms)
    const SAMPLING_INTERVAL_MS = 16 // ~60 Hz

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
        const activePaths = {}

        const handleTouchStart = (e) => {
            for (const touch of e.touches) {
                const id = touch.identifier
                const radius = ((touch.radiusX ?? 10) + (touch.radiusY ?? 10)) / 2
                touchesRef.current[id] = touch
                activePaths[id] = [{
                    x: touch.clientX,
                    y: touch.clientY,
                    pressure: touch.force ?? 0.5,
                    radius,
                    time: Date.now()
                }]
            }
        }

        const handleTouchMove = (e) => {
            for (const touch of e.touches) {
                touchesRef.current[touch.identifier] = touch
            }
        }

        const handleTouchEnd = (e) => {
            for (const touch of e.changedTouches) {
                const id = touch.identifier
                if (activePaths[id] && activePaths[id].length > 1) {
                    addPath(activePaths[id])
                }
                delete activePaths[id]
                delete touchesRef.current[id]
            }
        }

        const addPath = (points) => {
            const path = { points, opacity: 1 }
            pathsRef.current.push(path)

            const fadeInterval = setInterval(() => {
                path.opacity -= 0.05
                if (path.opacity <= 0) {
                    clearInterval(fadeInterval)
                    pathsRef.current = pathsRef.current.filter(p => p !== path)
                }
            }, 50)
        }

        const draw = (timestamp) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // Näytteenotto
            if (timestamp - lastSampleTimeRef.current >= SAMPLING_INTERVAL_MS) {
                for (const id in touchesRef.current) {
                    const touch = touchesRef.current[id]
                    const radius = ((touch.radiusX ?? 10) + (touch.radiusY ?? 10)) / 2
                    const point = {
                        x: touch.clientX,
                        y: touch.clientY,
                        pressure: touch.force ?? 0.5,
                        radius,
                        time: Date.now()
                    }
                    if (!activePaths[id]) activePaths[id] = []
                    activePaths[id].push(point)
                }
                lastSampleTimeRef.current = timestamp
            }

            // Piirretään aktiiviset viivat
            for (const id in activePaths) {
                const points = activePaths[id]
                if (points.length < 2) continue

                ctx.beginPath()
                for (let i = 0; i < points.length - 1; i++) {
                    const p1 = points[i]
                    const p2 = points[i + 1]

                    const avgPressure = (p1.pressure + p2.pressure) / 2
                    const avgRadius = (p1.radius + p2.radius) / 2

                    const width = 2 + 8 * avgPressure + 0.3 * avgRadius
                    const hue = 200 + Math.min(avgRadius, 30) * 3.3
                    const brightness = Math.min(1, 0.2 + avgPressure * 0.8)

                    ctx.lineWidth = width
                    ctx.strokeStyle = `hsla(${hue}, 100%, 50%, ${brightness})`
                    ctx.moveTo(p1.x, p1.y)
                    ctx.lineTo(p2.x, p2.y)
                }
                ctx.lineCap = "round"
                ctx.stroke()
            }

            // Piirretään haalistuvat viivat
            for (const path of pathsRef.current) {
                if (path.points.length < 2) continue
                ctx.beginPath()
                for (let i = 0; i < path.points.length - 1; i++) {
                    const p1 = path.points[i]
                    const p2 = path.points[i + 1]

                    const avgPressure = (p1.pressure + p2.pressure) / 2
                    const avgRadius = (p1.radius + p2.radius) / 2

                    const width = 2 + 8 * avgPressure + 0.3 * avgRadius
                    const hue = 200 + Math.min(avgRadius, 30) * 3.3
                    const brightness = Math.min(1, 0.2 + avgPressure * 0.8)

                    ctx.lineWidth = width
                    ctx.strokeStyle = `hsla(${hue}, 100%, 50%, ${brightness * path.opacity})`
                    ctx.moveTo(p1.x, p1.y)
                    ctx.lineTo(p2.x, p2.y)
                }
                ctx.lineCap = "round"
                ctx.stroke()
            }

            requestAnimationFrame(draw)
        }

        requestAnimationFrame(draw)

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
