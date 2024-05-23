import { Gender, HealthStatus } from "@prisma/client"



export type TPet = {
    name: string
    species: string
    breed: string
    age: number
    photos: string[]
    gender:Gender
    healthStatus: HealthStatus
    size: string
    location: string
    description: string
    temperament: string
    medicalHistory: string
    adoptionRequirements: string
  }
  