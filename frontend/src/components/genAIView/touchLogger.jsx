import React, { useEffect, useRef, useState } from "react"

const TouchVisualizer = ({ isVisible }) => {
    const canvasRef = useRef(null)
    const pathsRef = useRef([])
    const [confidence, setConfidence] = useState(85)
    const [person, setPerson] = useState("Mikko")

    const personList = ["Mikko", "Anna", "Liisa", "Oscar", "Noora", "Teemu", "Kaisa", "Dennis"]

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

        const randomAdjustConfidence = () => {
            setConfidence(prev => {
                const change = Math.random() < 0.5 ? -1 : 1
                const amount = Math.floor(Math.random() * 2) + 1 // 1–2
                const newValue = Math.max(70, Math.min(92, prev + change * amount))
                return newValue
            })

            // 5 % todennäköisyydellä vaihdetaan henkilö
            if (Math.random() < 0.002) {
                setPerson(prev => {
                    let next
                    do {
                        next = personList[Math.floor(Math.random() * personList.length)]
                    } while (next === prev)
                    return next
                })
            }
        }

        const handleTouchStart = (e) => {
            for (const touch of e.touches) {
                activeTouches[touch.identifier] = [{
                    x: touch.clientX,
                    y: touch.clientY,
                    time: Date.now(),
                    pressure: touch.force ?? 0.5,
                    radius: ((touch.radiusX ?? 10) + (touch.radiusY ?? 10)) / 2
                }]
            }
            randomAdjustConfidence()
        }

        const handleTouchMove = (e) => {
            for (const touch of e.touches) {
                if (activeTouches[touch.identifier]) {
                    activeTouches[touch.identifier].push({
                        x: touch.clientX,
                        y: touch.clientY,
                        time: Date.now(),
                        pressure: touch.force ?? 0.5,
                        radius: ((touch.radiusX ?? 10) + (touch.radiusY ?? 10)) / 2
                    })
                }
            }
            randomAdjustConfidence()
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

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            for (const path of pathsRef.current) {
                if (path.points.length < 2) continue
                ctx.beginPath()

                for (let i = 0; i < path.points.length - 1; i++) {
                    const p1 = path.points[i]
                    const p2 = path.points[i + 1]

                    const avgPressure = (p1.pressure + p2.pressure) / 2
                    const avgRadius = (p1.radius + p2.radius) / 2

                    const baseWidth = 2
                    const pressureFactor = 8
                    const radiusFactor = 0.3
                    const width = baseWidth + pressureFactor * avgPressure + radiusFactor * avgRadius
                    ctx.lineWidth = width

                    const brightness = Math.min(1, 0.2 + avgPressure * 0.8)
                    const hue = 200 + Math.min(avgRadius, 30) * 3.3
                    ctx.strokeStyle = `hsla(${hue}, 100%, 50%, ${brightness * path.opacity})`

                    ctx.moveTo(p1.x, p1.y)
                    ctx.lineTo(p2.x, p2.y)
                }

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
        <>
            <div style={{
                position: "fixed",
                top: "1%",
                left: 0,
                width: "100%",
                textAlign: "center",
                fontSize: "1.5rem",
                color: "#fff",
                textShadow: "0 0 5px #000",
                zIndex: 10000,
                pointerEvents: "none"
            }}>
                <div>Tunnistustaso: {confidence}%</div>
                <div>Henkilö: {person}</div>
            </div>
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
        </>
    )
}

export default TouchVisualizer
