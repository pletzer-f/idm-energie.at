const responsiveSrcSets = {
  '/images/products-lineup-transparent.png': [
    '/images/variants/products-lineup-transparent-640.png 640w',
    '/images/variants/products-lineup-transparent-1024.png 1024w',
    '/images/variants/products-lineup-transparent-1400.png 1400w',
    '/images/products-lineup-transparent.png 1800w',
  ].join(', '),
  '/images/luftwaermepumpe.png': [
    '/images/variants/luftwaermepumpe-640.png 640w',
    '/images/variants/luftwaermepumpe-1024.png 1024w',
    '/images/variants/luftwaermepumpe-1400.png 1400w',
    '/images/luftwaermepumpe.png 1800w',
  ].join(', '),
  '/images/erdwaermepumpe.png': [
    '/images/variants/erdwaermepumpe-420.png 420w',
    '/images/variants/erdwaermepumpe-720.png 720w',
    '/images/variants/erdwaermepumpe-960.png 960w',
    '/images/erdwaermepumpe.png 1047w',
  ].join(', '),
  '/images/navigator.png': [
    '/images/variants/navigator-420.png 420w',
    '/images/variants/navigator-720.png 720w',
    '/images/variants/navigator-960.png 960w',
    '/images/navigator.png 1047w',
  ].join(', '),
  '/images/hygienik.png': [
    '/images/variants/hygienik-420.png 420w',
    '/images/variants/hygienik-720.png 720w',
    '/images/variants/hygienik-960.png 960w',
    '/images/hygienik.png 1047w',
  ].join(', '),
  '/images/ion-system.jpg': [
    '/images/variants/ion-system-640.jpg 640w',
    '/images/variants/ion-system-1000.jpg 1000w',
    '/images/ion-system.jpg 1400w',
  ].join(', '),
}

export function getResponsiveSrcSet(src) {
  return responsiveSrcSets[src]
}
