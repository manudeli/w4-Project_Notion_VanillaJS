import { requestGET } from '../../utils/api.js'

export default function Editor({ $target, initialState }) {
  const $editor = document.createElement('div')
  $editor.className = 'Editor'

  $target.appendChild($editor)

  this.state = initialState

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  this.render = () => {
    const { title, content } = this.state
    $editor.innerHTML = `
      <input name="title" type="text" value="${title}"/>
      <textarea name="content">${content} </textarea>
    `
  }

  const init = async () => {
    $editor.addEventListener('keyup', (e) => {})

    const { selectedDocumentId } = this.state
    if (selectedDocumentId) {
      const selectedDocument = await requestGET(
        `documents/${selectedDocumentId}`,
      )

      this.setState({
        ...this.state,
        selectedDocument,
      })
    }
  }

  init()
}
