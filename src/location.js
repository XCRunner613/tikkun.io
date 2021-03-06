const toc = require('../build/table-of-contents.json')
const estherToc = require('../build/table-of-contents-esther.json')
const holydaysToc = require('../build/table-of-contents-holydays.json')

const tocFromScroll = {
  torah: toc,
  esther: estherToc,
  ...holydaysToc
}

const defaultRef = () => { return { scroll: 'torah', b: 1, c: 1, v: 1 } }

const convertToValidInt = (val, validValues) => {
  return (val && (val in validValues)) ? parseInt(val) : 1
}

module.exports = {
  physicalLocationFromRef: ({ ref: { b: book, c: chapter, v: verse }, scroll }) => {
    const { p: pageNumber, l: lineNumber } = tocFromScroll[scroll][book][chapter][verse]
    return { pageNumber, lineNumber }
  },

  defaultRef,

  resolveToValidRef: ({ scroll = 'torah', book, chapter, verse }) => {
    const ref = defaultRef()
    if (scroll !== 'torah') {
      return ref
    }

    const toc = tocFromScroll.torah

    ref.b = convertToValidInt(book, toc)
    ref.c = convertToValidInt(chapter, toc[ref.b])
    ref.v = convertToValidInt(verse, toc[ref.b][ref.c])

    return {
      scroll,
      ...ref
    }
  }
}
