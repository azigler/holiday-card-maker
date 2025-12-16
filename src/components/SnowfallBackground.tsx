import { useEffect, useState } from 'react'

interface Snowflake {
  id: number
  left: number
  animationDuration: number
  animationDelay: number
  fontSize: number
}

/**
 * SnowfallBackground Component
 * Animated falling snowflakes background effect
 */
const SnowfallBackground = () => {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([])

  useEffect(() => {
    // Generate snowflakes
    const flakes: Snowflake[] = []
    for (let i = 0; i < 30; i++) {
      flakes.push({
        id: i,
        left: Math.random() * 100,
        animationDuration: 10 + Math.random() * 20,
        animationDelay: Math.random() * 10,
        fontSize: 0.5 + Math.random() * 1.5,
      })
    }
    setSnowflakes(flakes)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="snowflake absolute"
          style={{
            left: `${flake.left}%`,
            fontSize: `${flake.fontSize}em`,
            animationDuration: `${flake.animationDuration}s`,
            animationDelay: `${flake.animationDelay}s`,
          }}
        >
          ❄
        </div>
      ))}
    </div>
  )
}

export default SnowfallBackground

