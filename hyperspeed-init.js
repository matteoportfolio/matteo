import React from 'react'
import { createRoot } from 'react-dom/client'
import Hyperspeed from './components/Hyperspeed.tsx'

// Store existing roots to avoid duplicates
const existingRoots = new Map()

// Function to initialize Hyperspeed effect
export function initHyperspeed(containerId = 'lights', options = {}) {
  const container = document.getElementById(containerId)
  
  if (!container) {
    console.warn(`Container with ID '${containerId}' not found`)
    return null
  }

  // Check if root already exists for this container
  let root = existingRoots.get(containerId)
  
  if (!root) {
    // Create new React root only if it doesn't exist
    root = createRoot(container)
    existingRoots.set(containerId, root)
  }
  
  // Render or re-render the component
  root.render(React.createElement(Hyperspeed, options))
  
  return {
    root,
    destroy() {
      root.unmount()
      existingRoots.delete(containerId)
    }
  }
}

export default { initHyperspeed }

export const hyperspeedPresets = {
  one: {
    onSpeedUp: () => { },
    onSlowDown: () => { },
    distortion: 'turbulentDistortion',
    length: 400,
    roadWidth: 10,
    islandWidth: 2,
    lanesPerRoad: 3,
    fov: 90,
    fovSpeedUp: 150,
    speedUp: 2,
    carLightsFade: 0.4,
    totalSideLightSticks: 20,
    lightPairsPerRoadWay: 40,
    shoulderLinesWidthPercentage: 0.05,
    brokenLinesWidthPercentage: 0.1,
    brokenLinesLengthPercentage: 0.5,
    lightStickWidth: [0.12, 0.5],
    lightStickHeight: [1.3, 1.7],
    movingAwaySpeed: [60, 80],
    movingCloserSpeed: [-120, -160],
    carLightsLength: [400 * 0.03, 400 * 0.2],
    carLightsRadius: [0.05, 0.14],
    carWidthPercentage: [0.3, 0.5],
    carShiftX: [-0.8, 0.8],
    carFloorSeparation: [0, 5],
    colors: {
      roadColor: 0xDAA520, // Goldenrod
      islandColor: 0xFFFFFF, // White
      background: 0x000000,
      shoulderLines: 0xB8860B, // Dark goldenrod
      brokenLines: 0xFFFFFF, // White
      leftCars: [0xFFD700, 0xFFA500, 0xDAA520], // Different gold shades
      rightCars: [0xFFFFFF, 0xFFFFFF, 0xFFFFFF], // All white
      sticks: 0xB8860B, // Dark goldenrod
    }
  },
  two: {
    onSpeedUp: () => { },
    onSlowDown: () => { },
    distortion: 'mountainDistortion',
    length: 400,
    roadWidth: 9,
    islandWidth: 2,
    lanesPerRoad: 3,
    fov: 90,
    fovSpeedUp: 150,
    speedUp: 2,
    carLightsFade: 0.4,
    totalSideLightSticks: 50,
    lightPairsPerRoadWay: 50,
    shoulderLinesWidthPercentage: 0.05,
    brokenLinesWidthPercentage: 0.1,
    brokenLinesLengthPercentage: 0.5,
    lightStickWidth: [0.12, 0.5],
    lightStickHeight: [1.3, 1.7],

    movingAwaySpeed: [60, 80],
    movingCloserSpeed: [-120, -160],
    carLightsLength: [400 * 0.05, 400 * 0.15],
    carLightsRadius: [0.05, 0.14],
    carWidthPercentage: [0.3, 0.5],
    carShiftX: [-0.2, 0.2],
    carFloorSeparation: [0.05, 1],
    colors: {
      roadColor: 0xDAA520, // Goldenrod
      islandColor: 0xFFFFFF, // White
      background: 0x000000,
      shoulderLines: 0xB8860B, // Dark goldenrod
      brokenLines: 0xFFFFFF, // White
      leftCars: [0xFFD700, 0xFFA500, 0xDAA520], // Different gold shades
      rightCars: [0xFFFFFF, 0xFFFFFF, 0xFFFFFF], // All white
      sticks: 0xB8860B, // Dark goldenrod
    }
  },
  three: {
    onSpeedUp: () => { },
    onSlowDown: () => { },
    distortion: 'xyDistortion',
    length: 400,
    roadWidth: 9,
    islandWidth: 2,
    lanesPerRoad: 3,
    fov: 90,
    fovSpeedUp: 150,
    speedUp: 3,
    carLightsFade: 0.4,
    totalSideLightSticks: 50,
    lightPairsPerRoadWay: 30,
    shoulderLinesWidthPercentage: 0.05,
    brokenLinesWidthPercentage: 0.1,
    brokenLinesLengthPercentage: 0.5,
    lightStickWidth: [0.02, 0.05],
    lightStickHeight: [0.3, 0.7],
    movingAwaySpeed: [20, 50],
    movingCloserSpeed: [-150, -230],
    carLightsLength: [400 * 0.05, 400 * 0.2],
    carLightsRadius: [0.03, 0.08],
    carWidthPercentage: [0.1, 0.5],
    carShiftX: [-0.5, 0.5],
    carFloorSeparation: [0, 0.1],
    colors: {
      roadColor: 0xDAA520, // Goldenrod
      islandColor: 0xFFFFFF, // White
      background: 0x000000,
      shoulderLines: 0xB8860B, // Dark goldenrod
      brokenLines: 0xFFFFFF, // White
      leftCars: [0xFFD700, 0xFFA500, 0xDAA520], // Different gold shades
      rightCars: [0xFFFFFF, 0xFFFFFF, 0xFFFFFF], // All white
      sticks: 0xB8860B, // Dark goldenrod
    }
  },
  four: {
    onSpeedUp: () => { },
    onSlowDown: () => { },
    distortion: 'LongRaceDistortion',
    length: 400,
    roadWidth: 10,
    islandWidth: 5,
    lanesPerRoad: 2,
    fov: 90,
    fovSpeedUp: 150,
    speedUp: 2,
    carLightsFade: 0.4,
    totalSideLightSticks: 50,
    lightPairsPerRoadWay: 70,
    shoulderLinesWidthPercentage: 0.05,
    brokenLinesWidthPercentage: 0.1,
    brokenLinesLengthPercentage: 0.5,
    lightStickWidth: [0.12, 0.5],
    lightStickHeight: [1.3, 1.7],
    movingAwaySpeed: [60, 80],
    movingCloserSpeed: [-120, -160],
    carLightsLength: [400 * 0.05, 400 * 0.15],
    carLightsRadius: [0.05, 0.14],
    carWidthPercentage: [0.3, 0.5],
    carShiftX: [-0.2, 0.2],
    carFloorSeparation: [0.05, 1],
    colors: {
      roadColor: 0xDAA520, // Goldenrod
      islandColor: 0xFFFFFF, // White
      background: 0x000000,
      shoulderLines: 0xB8860B, // Dark goldenrod
      brokenLines: 0xFFFFFF, // White
      leftCars: [0xFFD700, 0xFFA500, 0xDAA520], // Different gold shades
      rightCars: [0xFFFFFF, 0xFFFFFF, 0xFFFFFF], // All white
      sticks: 0xB8860B, // Dark goldenrod
    }
  },
  five: {
    onSpeedUp: () => { },
    onSlowDown: () => { },
    distortion: 'turbulentDistortion',
    length: 400,
    roadWidth: 9,
    islandWidth: 2,
    lanesPerRoad: 3,
    fov: 90,
    fovSpeedUp: 150,
    speedUp: 2,
    carLightsFade: 0.4,
    totalSideLightSticks: 50,
    lightPairsPerRoadWay: 50,
    shoulderLinesWidthPercentage: 0.05,
    brokenLinesWidthPercentage: 0.1,
    brokenLinesLengthPercentage: 0.5,
    lightStickWidth: [0.12, 0.5],
    lightStickHeight: [1.3, 1.7],
    movingAwaySpeed: [60, 80],
    movingCloserSpeed: [-120, -160],
    carLightsLength: [400 * 0.05, 400 * 0.15],
    carLightsRadius: [0.05, 0.14],
    carWidthPercentage: [0.3, 0.5],
    carShiftX: [-0.2, 0.2],
    carFloorSeparation: [0.05, 1],
    colors: {
      roadColor: 0xDAA520, // Goldenrod
      islandColor: 0xFFFFFF, // White
      background: 0x000000,
      shoulderLines: 0xB8860B, // Dark goldenrod
      brokenLines: 0xFFFFFF, // White
      leftCars: [0xFFD700, 0xFFA500, 0xDAA520], // Different gold shades
      rightCars: [0xFFFFFF, 0xFFFFFF, 0xFFFFFF], // All white
      sticks: 0xB8860B, // Dark goldenrod
    }
  },
  six: {
    onSpeedUp: () => { },
    onSlowDown: () => { },
    distortion: 'deepDistortion',
    length: 400,
    roadWidth: 18,
    islandWidth: 2,
    lanesPerRoad: 3,
    fov: 90,
    fovSpeedUp: 150,
    speedUp: 2,
    carLightsFade: 0.4,
    totalSideLightSticks: 50,
    lightPairsPerRoadWay: 50,
    shoulderLinesWidthPercentage: 0.05,
    brokenLinesWidthPercentage: 0.1,
    brokenLinesLengthPercentage: 0.5,
    lightStickWidth: [0.12, 0.5],
    lightStickHeight: [1.3, 1.7],
    movingAwaySpeed: [60, 80],
    movingCloserSpeed: [-120, -160],
    carLightsLength: [400 * 0.05, 400 * 0.15],
    carLightsRadius: [0.05, 0.14],
    carWidthPercentage: [0.3, 0.5],
    carShiftX: [-0.2, 0.2],
    carFloorSeparation: [0.05, 1],
    colors: {
      roadColor: 0xDAA520, // Goldenrod
      islandColor: 0xFFFFFF, // White
      background: 0x000000,
      shoulderLines: 0xB8860B, // Dark goldenrod
      brokenLines: 0xFFFFFF, // White
      leftCars: [0xFFD700, 0xFFA500, 0xDAA520], // Different gold shades
      rightCars: [0xFFFFFF, 0xFFFFFF, 0xFFFFFF], // All white
      sticks: 0xB8860B, // Dark goldenrod
    }
  }
}