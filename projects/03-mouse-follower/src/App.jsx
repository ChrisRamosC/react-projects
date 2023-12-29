import { useEffect, useState } from "react"

const FollowMouse = () => {
  const [enabled, setEnabled] = useState(false)
  // es buena práctica inicializar el estado con el mismo tipo de dato que va a tener
  const [position, setPosition] = useState({ x: 0, y: 0 })

  // Nunca meter un useEffect dentro de un if o cualquier hook

  // pointer move
  useEffect(() => {
    console.log("effect", enabled)
    const handleMove = (event) => {
      const { clientX, clientY } = event
      console.log("move", { clientX, clientY })
      setPosition({ x: clientX, y: clientY })
    }
    if (enabled) {
      window.addEventListener('pointermove', handleMove)
    }
    // CLEAN USE EFFECT
    // cleanup
    // -> cuando el componente se desmonta
    // -> cuando cambian las dependencias, antes de ejecutar el efecto de nuevo
    // return es una función que se ejecuta cuando el componente se desmonta
    return () => { // cleanup method
      window.removeEventListener('pointermove', handleMove)
    }
  }, [enabled])

  // change body classname
  useEffect(() => {
    document.body.classList.toggle('no-cursor', enabled)

    return () => {
      document.body.classList.remove('no-cursor')
    }
  }, [enabled])

  return (
    <>
      <div style={{
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.5',
        border: '1px solid #fff',
        borderRadius: '50%',
        opacity: 0.8,
        pointerEvents: 'none',
        left: -20,
        top: -20,
        width: 40,
        height: 40,
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}>

      </div>
      <button onClick={() => setEnabled(!enabled)}>
        {enabled ? 'Disable' : 'Enable'} follow mouse
      </button>
    </>
  )
}
function App() {

  return (
    <main>
      <FollowMouse />
    </main>
  )
}

export default App
