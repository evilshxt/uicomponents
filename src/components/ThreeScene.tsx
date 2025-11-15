import React, { useEffect } from 'react'
import * as THREE from 'three'

interface ThreeSceneProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

const ThreeScene: React.FC<ThreeSceneProps> = ({ containerRef }) => {
  useEffect(() => {
    if (!containerRef.current) return

    const w = window.innerWidth
    const h = window.innerHeight

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })

    renderer.setSize(w, h)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.domElement.style.position = 'absolute'
    renderer.domElement.style.top = '0'
    renderer.domElement.style.left = '0'
    containerRef.current.appendChild(renderer.domElement)

    camera.position.z = 15

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0x00bcd4, 1)
    directionalLight.position.set(10, 10, 5)
    scene.add(directionalLight)

    const pointLight = new THREE.PointLight(0xe91e63, 0.8, 100)
    pointLight.position.set(-10, -10, 10)
    scene.add(pointLight)

    // Create Hologram Materials with Neon Edges
    const gearMaterial = new THREE.MeshStandardMaterial({
      color: 0x00bcd4,
      transparent: true,
      opacity: 0.15,
      emissive: 0x00bcd4,
      emissiveIntensity: 0.3,
      wireframe: false
    })

    const gearEdgeMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 1,
      wireframe: true
    })

    const cogMaterial = new THREE.MeshStandardMaterial({
      color: 0xe91e63,
      transparent: true,
      opacity: 0.15,
      emissive: 0xe91e63,
      emissiveIntensity: 0.3,
      wireframe: false
    })

    const cogEdgeMaterial = new THREE.MeshBasicMaterial({
      color: 0xff0080,
      transparent: true,
      opacity: 1,
      wireframe: true
    })

    // Main Central Gear with Hologram Effect
    const mainGearGeometry = new THREE.CylinderGeometry(3, 3, 0.5, 16)
    const mainGear = new THREE.Mesh(mainGearGeometry, gearMaterial)
    const mainGearEdges = new THREE.Mesh(mainGearGeometry, gearEdgeMaterial)
    mainGear.position.set(0, 0, 0)
    mainGearEdges.position.set(0, 0, 0)
    scene.add(mainGear)
    scene.add(mainGearEdges)

    // Surrounding Gears with Hologram Effect
    const gears: THREE.Mesh[] = []
    const gearEdges: THREE.Mesh[] = []
    for (let i = 0; i < 6; i++) {
      const gearGeometry = new THREE.CylinderGeometry(1.5, 1.5, 0.3, 12)
      const gear = new THREE.Mesh(gearGeometry, cogMaterial)
      const gearEdge = new THREE.Mesh(gearGeometry, cogEdgeMaterial)

      const angle = (i / 6) * Math.PI * 2
      const posX = Math.cos(angle) * 6
      const posY = Math.sin(angle) * 6
      const posZ = Math.sin(i) * 2

      gear.position.set(posX, posY, posZ)
      gearEdge.position.set(posX, posY, posZ)
      gear.rotation.x = Math.PI / 2
      gearEdge.rotation.x = Math.PI / 2

      gears.push(gear)
      gearEdges.push(gearEdge)
      scene.add(gear)
      scene.add(gearEdge)
    }

    // Floating Crystals with Hologram Effect
    const crystals: THREE.Mesh[] = []
    const crystalEdges: THREE.Mesh[] = []
    for (let i = 0; i < 12; i++) {
      const crystalGeometry = new THREE.OctahedronGeometry(0.5)
      const crystal = new THREE.Mesh(
        crystalGeometry,
        new THREE.MeshStandardMaterial({
          color: [0xff9800, 0x4caf50, 0x9c27b0][i % 3],
          transparent: true,
          opacity: 0.2,
          emissive: [0xff9800, 0x4caf50, 0x9c27b0][i % 3],
          emissiveIntensity: 0.4
        })
      )
      const crystalEdge = new THREE.Mesh(
        crystalGeometry,
        new THREE.MeshBasicMaterial({
          color: [0xffaa00, 0x66ff66, 0xdd44dd][i % 3],
          transparent: true,
          opacity: 1,
          wireframe: true
        })
      )

      const posX = (Math.random() - 0.5) * 20
      const posY = (Math.random() - 0.5) * 20
      const posZ = (Math.random() - 0.5) * 20

      crystal.position.set(posX, posY, posZ)
      crystalEdge.position.set(posX, posY, posZ)

      crystals.push(crystal)
      crystalEdges.push(crystalEdge)
      scene.add(crystal)
      scene.add(crystalEdge)
    }

    // Animation Loop
    let animationId: number
    const animate = () => {
      animationId = requestAnimationFrame(animate)

      // Rotate main gear and its edges
      mainGear.rotation.z += 0.01
      mainGearEdges.rotation.z += 0.01

      // Counter-rotate surrounding gears and their edges
      gears.forEach((gear, index) => {
        const gearEdge = gearEdges[index]

        gear.rotation.z -= 0.02
        gear.rotation.y += 0.005
        gearEdge.rotation.z -= 0.02
        gearEdge.rotation.y += 0.005

        // Floating motion
        const newZ = Math.sin(Date.now() * 0.001 + index) * 2
        gear.position.z = newZ
        gearEdge.position.z = newZ
      })

      // Animate crystals and their edges
      crystals.forEach((crystal, index) => {
        const crystalEdge = crystalEdges[index]

        crystal.rotation.x += 0.01
        crystal.rotation.y += 0.02
        crystalEdge.rotation.x += 0.01
        crystalEdge.rotation.y += 0.02

        const newY = crystal.position.y + Math.sin(Date.now() * 0.002 + index) * 0.02
        crystal.position.y = newY
        crystalEdge.position.y = newY
      })

      renderer.render(scene, camera)
    }
    animate()

    // Responsive resize handler
    const handleResize = () => {
      const newW = window.innerWidth
      const newH = window.innerHeight

      camera.aspect = newW / newH
      camera.updateProjectionMatrix()
      renderer.setSize(newW, newH)
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationId)
      renderer.dispose()

      // Dispose of geometries and materials
      mainGearGeometry.dispose()
      if (mainGear.material instanceof THREE.Material) mainGear.material.dispose()
      if (mainGearEdges.material instanceof THREE.Material) mainGearEdges.material.dispose()
      gears.forEach(gear => {
        gear.geometry.dispose()
        if (gear.material instanceof THREE.Material) gear.material.dispose()
      })
      gearEdges.forEach(edge => {
        edge.geometry.dispose()
        if (edge.material instanceof THREE.Material) edge.material.dispose()
      })
      crystals.forEach(crystal => {
        crystal.geometry.dispose()
        if (crystal.material instanceof THREE.Material) crystal.material.dispose()
      })
      crystalEdges.forEach(edge => {
        edge.geometry.dispose()
        if (edge.material instanceof THREE.Material) edge.material.dispose()
      })

      if (containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement)
      }
    }
  }, [])

  return null
}

export default ThreeScene