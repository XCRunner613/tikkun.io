const ketiv = (text) => text
  .replace('#(פ)', '')
  .split(' ')
  .map((word) => {
    const parts = word.split('#')

    if (parts.length <= 1) {
      return parts[0]
    }

    return parts[1].slice(1, -1)
  })
  .join(' ')

const kri = (text) => text
  .replace(/־/g, ' ')
  .replace('#(פ)', '')
  .split(' ')
  .map((word) => {
    const parts = word.split('#')

    return parts[0]
  })
  .join(' ')
  .replace(/[^א-ת\s]/g, '')

module.exports = ({text, annotated}) => annotated ? ketiv(text) : kri(text)
