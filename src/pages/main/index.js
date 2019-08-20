import React, { Component}from 'react';
import api from '../../services/api';
import './styles.css';

export default class main extends Component{
    // armazena os states -- vem da api --
    state = {
        products: [],
        productInfo: {},
        page: 1,
    }
    // metodo que executa assim que o componente for mostrado em tela
    componentDidMount(){
        this.loadProducts();

    }
    // funcao que da load nos produtos
    loadProducts = async (page = 1) =>{
        const response = await api.get(`/products?page=${page}`);
        // grava os valores das paginas
        const {docs, ...productInfo} = response.data;
        this.setState({products: docs, productInfo, page });


    };

    nextPage = () => {
        const{page, productInfo} = this.state;
        // se a pagina for 1 entao nao faz nada
        if(page === productInfo.pages) return;
        // pagina atual recebe mas 1 caso o botao seja clicado
        const pageNumber = page + 1;
        this.loadProducts(pageNumber)
    }
    prevPage = () => {
        const {page, productInfo} = this.state;

        if(page === 1) return;

        const pageNumber = page - 1;

        this.loadProducts(pageNumber)
    }
// funcao que renderiza tudo

    render(){
        const{products} = this.state;

        return(
            // faz a listagem dos produtos da api
            <div className="productList">
            {products.map(product =>(
               <article key={product._id}>
                   <strong>{product.title}</strong>
                   <p>{product.description}</p>

                   <a href="">Acessar</a>

               </article>
            ))}
                <div className="actions">
                    <button onClick={this.prevPage}>Anterior</button>
                    <button onClick={this.nextPage}>Próxima</button>    
                </div>  
            </div>          
        )
    }
}
