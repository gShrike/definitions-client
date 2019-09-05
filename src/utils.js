import React from 'react'

export default {

  // convert a string to plain text with `code` support
  fancyText(text) {
    return text
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/`(.*?)`/g, (match) => {
        return `<code>${match.replace(/`/g, '')}</code>`
      })
  },

  codeToText(text) {
    return <span dangerouslySetInnerHTML={{__html:this.fancyText(text)}}></span>
  }

}