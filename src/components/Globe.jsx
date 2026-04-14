import { useEffect, useRef } from "react"
import * as THREE from "three"

export default function Globe() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    const width = mount.clientWidth
    const height = mount.clientHeight

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(window.devicePixelRatio)
    mount.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
    camera.position.z = 2.5

    const geometry = new THREE.SphereGeometry(1, 64, 64)
    const material = new THREE.MeshPhongMaterial({
      color: 0x0a1628,
      emissive: 0x0a1628,
      specular: 0x22d3ee,
      shininess: 20,
      wireframe: false,
      transparent: true,
      opacity: 0.9,
    })
    const globe = new THREE.Mesh(geometry, material)
    scene.add(globe)

    const wireGeo = new THREE.SphereGeometry(1.001, 32, 32)
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
      wireframe: true,
      transparent: true,
      opacity: 0.08,
    })
    const wire = new THREE.Mesh(wireGeo, wireMat)
    scene.add(wire)

    const glowGeo = new THREE.SphereGeometry(1.15, 32, 32)
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0x0ea5e9,
      transparent: true,
      opacity: 0.04,
      side: THREE.BackSide,
    })
    const glow = new THREE.Mesh(glowGeo, glowMat)
    scene.add(glow)

    const dotGeo = new THREE.BufferGeometry()
    const dotCount = 800
    const positions = []
    for (let i = 0; i < dotCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / dotCount)
      const theta = Math.sqrt(dotCount * Math.PI) * phi
      positions.push(
        1.02 * Math.cos(theta) * Math.sin(phi),
        1.02 * Math.sin(theta) * Math.sin(phi),
        1.02 * Math.cos(phi)
      )
    }
    dotGeo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3))
    const dotMat = new THREE.PointsMaterial({ color: 0x22d3ee, size: 0.012, transparent: true, opacity: 0.7 })
    scene.add(new THREE.Points(dotGeo, dotMat))

    const ambientLight = new THREE.AmbientLight(0x0a2540, 2)
    scene.add(ambientLight)
    const pointLight = new THREE.PointLight(0x22d3ee, 2, 10)
    pointLight.position.set(3, 3, 3)
    scene.add(pointLight)
    const pointLight2 = new THREE.PointLight(0x3b82f6, 1, 10)
    pointLight2.position.set(-3, -3, -3)
    scene.add(pointLight2)

    const markers = [
      { lat: 7.8731, lng: 80.7718 },
      { lat: 51.5074, lng: -0.1278 },
      { lat: 37.7749, lng: -122.4194 },
      { lat: 35.6762, lng: 139.6503 },
      { lat: 25.2048, lng: 55.2708 },
    ]

    markers.forEach(({ lat, lng }) => {
      const phi = (90 - lat) * (Math.PI / 180)
      const theta = (lng + 180) * (Math.PI / 180)
      const x = -(Math.sin(phi) * Math.cos(theta))
      const z = Math.sin(phi) * Math.sin(theta)
      const y = Math.cos(phi)
      const markerGeo = new THREE.SphereGeometry(0.025, 8, 8)
      const markerMat = new THREE.MeshBasicMaterial({ color: 0x22d3ee })
      const marker = new THREE.Mesh(markerGeo, markerMat)
      marker.position.set(x, y, z)
      scene.add(marker)
      const ringGeo = new THREE.RingGeometry(0.03, 0.05, 16)
      const ringMat = new THREE.MeshBasicMaterial({ color: 0x22d3ee, transparent: true, opacity: 0.4, side: THREE.DoubleSide })
      const ring = new THREE.Mesh(ringGeo, ringMat)
      ring.position.set(x, y, z)
      ring.lookAt(0, 0, 0)
      scene.add(ring)
    })

    let mouseX = 0, mouseY = 0
    const onMouseMove = e => {
      const rect = mount.getBoundingClientRect()
      mouseX = ((e.clientX - rect.left) / width - 0.5) * 2
      mouseY = -((e.clientY - rect.top) / height - 0.5) * 2
    }
    mount.addEventListener("mousemove", onMouseMove)

    let frame
    const animate = () => {
      frame = requestAnimationFrame(animate)
      globe.rotation.y += 0.003
      wire.rotation.y += 0.003
      globe.rotation.x += (mouseY * 0.3 - globe.rotation.x) * 0.05
      globe.rotation.y += (mouseX * 0.3 - globe.rotation.y) * 0.01
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(frame)
      mount.removeEventListener("mousemove", onMouseMove)
      mount.removeChild(renderer.domElement)
      renderer.dispose()
    }
  }, [])

  return <div ref={mountRef} className="w-full h-full" />
}
