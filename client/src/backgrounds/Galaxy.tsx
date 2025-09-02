import React, { useEffect, useRef } from "react"
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Color,
  BufferGeometry,
  BufferAttribute,
  PointsMaterial,
  Points,
  AdditiveBlending,
  Clock,
} from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"

const GalaxyScene: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return
 
    const scene = new Scene()

    const parameters = {
      count: 100000,
      size: 0.01,
      radius: 5,
      branches: 3,
      spin: 1,
      randomness: 0.2,
      randomnessPower: 3,
      insideColor: "#ffffff",
      outsideColor: "#000099",
    }

    let geo: BufferGeometry | null = null
    let material: PointsMaterial | null = null
    let points: Points | null = null

    const generateGalaxy = () => {
      if (points !== null) {
        geo?.dispose()
        material?.dispose()
        scene.remove(points)
      }

      geo = new BufferGeometry()
      const positions = new Float32Array(parameters.count * 3)
      const colors = new Float32Array(parameters.count * 3)

      const colorInside = new Color(parameters.insideColor)
      const colorOutside = new Color(parameters.outsideColor)

      for (let i = 0; i < parameters.count; i++) {
        const i3 = i * 3
        const radius = Math.random() * parameters.radius
        const spinAngle = radius * parameters.spin
        const branchAngle =
          ((i % parameters.branches) / parameters.branches) * Math.PI * 2

        const randomX =
          Math.pow(Math.random(), parameters.randomnessPower) *
          (Math.random() < 0.5 ? 1 : -1)
        const randomY =
          Math.pow(Math.random(), parameters.randomnessPower) *
          (Math.random() < 0.5 ? 1 : -1)
        const randomZ =
          Math.pow(Math.random(), parameters.randomnessPower) *
          (Math.random() < 0.5 ? 1 : -1)

        positions[i3] =
          Math.cos(branchAngle + spinAngle) * radius + randomX
        positions[i3 + 1] = randomY
        positions[i3 + 2] =
          Math.sin(branchAngle + spinAngle) * radius + randomZ

        const mixedColor = colorInside.clone()
        mixedColor.lerp(colorOutside, radius / parameters.radius)

        colors[i3] = mixedColor.r
        colors[i3 + 1] = mixedColor.g
        colors[i3 + 2] = mixedColor.b
      }

      geo.setAttribute("position", new BufferAttribute(positions, 3))
      geo.setAttribute("color", new BufferAttribute(colors, 3))

      material = new PointsMaterial({
        size: parameters.size,
        sizeAttenuation: true,
        depthWrite: false,
        blending: AdditiveBlending,
        vertexColors: true,
      })

      points = new Points(geo, material)
      scene.add(points)
    }

    generateGalaxy()


    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    }
    const camera = new PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      0.1,
      100
    )
    camera.position.set(3, 3, 3)
    scene.add(camera)

    const renderer = new WebGLRenderer({
      canvas: canvasRef.current!,
    })
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true


    const handleResize = () => {
      sizes.width = window.innerWidth
      sizes.height = window.innerHeight
      camera.aspect = sizes.width / sizes.height
      camera.updateProjectionMatrix()
      renderer.setSize(sizes.width, sizes.height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }
    window.addEventListener("resize", handleResize)

    /**
     * Animation
     */
    // const clock = new Clock()

    const tick = () => {
      controls.update()
      renderer.render(scene, camera)
      requestAnimationFrame(tick)
    }
    tick()

    // Cleanup
    return () => {
      // gui.destroy()
      window.removeEventListener("resize", handleResize)
      renderer.dispose()
      geo?.dispose()
      material?.dispose()
    }
  }, [])

  return <canvas ref={canvasRef} className="webgl w-full h-screen" />
}

export default GalaxyScene
