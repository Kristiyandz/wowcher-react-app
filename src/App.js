import React, { Component } from "react";
import { 
  sortAscendingByName,
  extractDuplicates,
  getUniqueProducts,
  calculateProductRevenue,
  calculateTotalRevenue
} from "./util"
import "./App.css";

export const formatNumber = (number) => new Intl.NumberFormat("en", { minimumFractionDigits: 2 }).format(number);
class App extends Component {
  state = {
    isLoading: false,
    prodcts: [],
    total: 0
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

        const duplicates = extractDuplicates(allProducts, "name");
        const unique = getUniqueProducts(allProducts, "name");
        const sortedUnique = sortAscendingByName(unique);
        const productsWithTotalRevenue = calculateProductRevenue(sortedUnique, duplicates);
        const totalrevenue = calculateTotalRevenue(productsWithTotalRevenue);

    
        this.setState({
          isLoading: false,
          prodcts: productsWithTotalRevenue,
          total: totalrevenue
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
                <th>{formatNumber(product.sold * product.unitPrice)}</th>
              </tr>
            ))}

          </tbody>
          <tfoot>
            <tr>
              <td>Total</td>
              <td>{formatNumber(this.state.total)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }
}

export default App;
