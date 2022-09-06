import React from 'react';

class Post extends React.Component {
  state = {
    curtido: false,
    numeroCurtidas: 0,
    comentando: false,
    numeroComentarios: 0,
    comentarios: [],
    inputValue: ""
  };

  onClickCurtida = () => {
    if (this.state.curtido) {
      this.setState({ curtido: !this.state.curtido, numeroCurtidas: this.state.numeroCurtidas - 1 });
    } else {
      this.setState({ curtido: !this.state.curtido, numeroCurtidas: this.state.numeroCurtidas + 1 });
    };
  };

  onClickComentario = () => {
    this.setState({ comentando: !this.state.comentando });
  };

  onChangeComentario = (event) => {
    this.setState({ inputValue: event.target.value });
  };

  enviarComentario = (comentario) => {
    const listaDeComentarios = [...this.state.comentarios, comentario]

    this.setState({
      comentarios: listaDeComentarios,
      comentando: false,
      numeroComentarios: this.state.numeroComentarios + 1,
      inputValue: ""
    });
  };

  render() {
    const caixaDeComentario = this.state.comentando ? (
      <>
        <label htmlFor={"comentario"} >Comente: </label>
        <input
          id={"comentario"}
          value={this.state.inputValue}
          onChange={this.onChangeComentario}
        />
        <button onClick={() => { this.enviarComentario(this.state.inputValue) }}>Enviar</button>
      </>
    ) : (
      this.state.comentarios.map((comentario, index) => {
        return (
          <div key={index}>
            <p>{comentario}</p>
          </div>
        )
      })
    );

    return (
      <main>
        <header>
          <figure>
            <img src={this.props.fotoUsuario} alt={'Imagem do usuario'} />
            <span>{this.props.nomeUsuario}</span>
          </figure>
        </header>
        <hr />
        <main>
          <figure>
            <p>{`"Acordar para quem você é requer desapego de quem você imagina ser" (Alan Watts)`}</p>
            <img src={this.props.fotoPost} alt={'Imagem do post'} />
          </figure>
        </main>
        <hr />
        <footer>
          <section>
            <span>Número de curtidas: {this.state.numeroCurtidas}</span>
            <button onClick={this.onClickCurtida}>
              {this.state.numeroCurtidas === 0 ? "Like" : "Dislike"}
            </button>
          </section>
          <section>
            <span>Número de comentários: {this.state.numeroComentarios}</span>
            <button onClick={this.onClickComentario}>
              {this.state.comentando ? "Fechar comentário" : "Adicionar comentário"}
            </button>
            <h4>Comentários</h4>
            {caixaDeComentario}
          </section>
        </footer>
      </main>
    );
  };
};

export default Post;