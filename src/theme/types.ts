declare module '@mui/material/styles' {
  interface Palette {
    customColors: {
      darkBackground: string
      lightBackground: string
      checkbox: string
      inputLabel: string
      inputHelper: string
      searchText: string
      tabText: string
      titleText: string
      infoLabel: string
      bodyInfo: string
    }
    black: string
  }

  interface PaletteOptions {
    customColors?: {
      darkBackground?: string
      lightBackground?: string
      checkbox?: string
      inputLabel?: string
      inputHelper?: string
      infoLabel?: string
      tabText?: string
      titleText?: string
      searchText?: string
      bodyInfo?: string
    }
    black?: string
  }
}

export {}
