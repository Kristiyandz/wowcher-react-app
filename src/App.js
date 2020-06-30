import React, { Component } from "react";

import "./App.css";

const formatNumber = (number) => new Intl.NumberFormat("en", { minimumFractionDigits: 2 }).format(number);
class App extends Component {
  state = {
    isLoading: false,
    prodcts: []
  }
  async singleCall(num) {
    const response = await fetch(`api/branch${num}.json`);
    const data = response.json();
    return data;
  };
  getData() {
    return Promise.all([this.singleCall(1), this.singleCall(2), this.singleCall(3)])
  };
  componentDidMount() {
    this.setState({
      isLoading: true
    })
    this.getData()
      .then(([branchOne, branchTwo, branchThree]) => {
        const allProducts =  [...branchOne.products, ...branchTwo.products, ...branchThree.products];
        allProducts.sort((a, b) => {
          if(a.name < b.name) return -1;
          return a.name > b.name ? 1 : 0
        })

        const getUnique = (arr, comp) => {
          const unique = arr.map(e => e[comp])
          .map((e, i, final) => final.indexOf(e) === i && i)
          .filter(e => arr[e]).map(e => arr[e]) 
          return unique;
        }
        const uniqueArr = getUnique(allProducts, "name");

        this.setState({
          isLoading: false,
          prodcts: uniqueArr
        })
      })
      .catch(error => {
        console.log('Failed to fetch', error)
      })
  };
  render() {
    if(this.state.isLoading) {
      return <div>Loading...</div>
    }
    return (
      <div className="product-list">
        <label>Search Products</label>
        <input type="text" />

        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Revenue</th>
            </tr>
          </thead>
          <tbody>
            {this.state.prodcts.map(product => (
              <tr key={product.name}>
                <th>{product.name}</th>
                <th>{product.unitPrice}</th>
              </tr>
            ))}

          </tbody>
          <tfoot>
            <tr>
              <td>Total</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }
}

export default App;
