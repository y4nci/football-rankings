import React from "react"

type Stat = {
  name: string,
  displayName: string,
  shortDisplayName: string,
  description: string,
  abbreviation: string,
  type: string,
  value: number,
  displayValue: string
}


type Team = {
  team: {
    id: string,
    uid: string,
    location: string,
    name: string,
    abbreviation: string,
    displayName: string,
    shortDisplayName: string,
    isActive: boolean,
    logos: [{
      href: string,
      width: number,
      height: number,
      alt: string,
      rel: string[],
      lastUpdated: string
    }],
  },
  note?: {
    color: string,
    description: string,
    rank: number
  },
  stats: [
    Stat,
    Stat,
    Stat,
    Stat,
    Stat,
    Stat,
    Stat,
    Stat,
    Stat,
    Stat,
    Stat,
    Stat,
    {
      id: string,
      name: string,
      abbreviation: string,
      displayName: string,
      shortDisplayName: string,
      description: string,
      type: string,
      summary: string,
      displayValue: string,
    }
  ]
}



export type {Team};
