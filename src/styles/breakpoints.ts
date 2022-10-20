const size = {
  mobile: '480px',
  smallTablet: '640px',
  tablet: '768px',
  laptop: '1024px',
  bigLaptop: '1500px',
  desktop: '1920px'
}

export const device = {
  mobile: `(max-width: ${size.mobile})`,
  smallTablet: `(max-width: ${size.smallTablet})`,
  tablet: `(max-width: ${size.tablet})`,
  laptop: `(max-width: ${size.laptop})`,
  bigLaptop: `(max-width: ${size.bigLaptop})`,
  desktop: `(max-width: ${size.desktop})`
}

export const carouselResponsivityBreakpoints = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 1
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
}
