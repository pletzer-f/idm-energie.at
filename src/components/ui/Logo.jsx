/**
 * iDM Logo mark based on the provided screenshot.
 */
export default function Logo({ className = '', size = 'default' }) {
  const heights = {
    small: 30,
    default: 40,
    large: 54,
  }
  const h = heights[size] || heights.default

  return (
    <img
      src="/images/logo-mark-screenshot.svg"
      alt="iDM Energiesysteme"
      className={`shrink-0 object-contain ${className}`}
      style={{
        height: h,
        width: 'auto',
      }}
    />
  )
}

export function LogoFull({ className = '' }) {
  return (
    <div className={`flex items-center ${className}`}>
      <Logo size="default" />
    </div>
  )
}
