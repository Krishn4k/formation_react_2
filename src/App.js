//Import React and other component
import React, { Component } from 'react'
import marked from 'marked'
//Import CSS
import './App.css'
//Import sampleText
import { sampleText } from './sampleText'

class App extends Component {
  //Déclaration du state du component contenant le sampleText importé 
  state = {
    text: sampleText
  }

  //Action au chargement du composant, est-il correctement "monté" ?
  componentDidMount () {
    const text = localStorage.getItem('text')

    text ? this.setState({ text }) :  this.setState({ text: sampleText })
    
  }

  //Action à la mise à jour du composant
  componentDidUpdate () {
    const { text } = this.state
    localStorage.setItem('text', text)
  }

  //Utilisation de marked dans la fonction pour retourner le texte formaté, on renvoie 
  renderText = text => {
    const __html = marked(text, { sanitize: true })
    return { __html }
  }

  //Action au changement, mise à jour du state pour prendre la nouvelle value de l'input (ici le text area)
  handleChange = event => {
    const text = event.target.value
    this.setState({ text })
  }

   render() {
    return(
      <div className='container'>
        <div className='row'>
          <div className='col-sm-6'>
            <textarea
              onChange={this.handleChange}
              className='form-control'
              value={this.state.text}
              rows='30'
              ></textarea>
          </div>
          <div className='col-sm-6'>
            <div dangerouslySetInnerHTML={this.renderText(this.state.text)} ></div>
          </div>
        </div>
      </div>
    )    
  }
}

export default App;
