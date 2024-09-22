import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { Form, Button, Table, Alert } from "react-bootstrap";
import styled from "styled-components";
// import JSConfetti from "js-confetti";

const shops = ["Ethos", "Jumbo", "Kruidvat", "Lidl"];
const categories = ["Bakery", "Butcher", "Fruit", "Vegetable"];
const StyledTd = styled.td`
  text-decoration: ${(props) => (props.isBought ? "line-through" : "none")};
`;

function App() {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [productShop, setProductShop] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [filteredName, setFilteredName] = useState("");
  const [filteredShop, setFilteredShop] = useState("");
  const [filteredCategory, setFilteredCategory] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (products.length > 0 && products.every((product) => product.isBought)) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [products]);

  // const jsConfetti = new JSConfetti();

  const handleAddProduct = () => {
    if (!productName || !productShop || !productCategory) {
      alert("Please fill in all fields!");
      return;
    }

    const newProduct = {
      id: nanoid(),
      name: productName,
      shop: productShop,
      category: productCategory,
    };

    setProducts([...products, newProduct]);
    setProductName("");
    setProductShop("");
    setProductCategory("");
    console.log(products);
  };

  const handelBought = (productId) => {
    const updatedProducts = products.map((product) =>
      product.id === productId
        ? { ...product, isBought: !product.isBought }
        : product
    );
    setProducts(updatedProducts);
  };

  const handelDelete = (productId) => {
    const updatedProducts = products.filter(
      (product) => product.id !== productId
    );
    setProducts(updatedProducts);
  };

  const filteredProducts = products.filter((product) => {
    const nameMatch = product.name
      .toLowerCase()
      .includes(filteredName.toLowerCase());
    const shopMatch =
      product.shop === filteredShop ||
      filteredShop === "" ||
      filteredShop === "All Shops";
    const categoryMatch =
      product.category === filteredCategory ||
      filteredCategory === "" ||
      filteredCategory === "All Categories";
    const statusMatch =
      filterStatus === "all" ||
      filterStatus === "" ||
      (filterStatus === "bought" && product.isBought) ||
      (filterStatus === "not-bought" && !product.isBought);
    return nameMatch && shopMatch && categoryMatch && statusMatch;
  });

  const resetFilters = () => {
    setFilteredName("");
    setFilteredShop("");
    setFilteredCategory("");
  };

  return (
    <>
      <h1 className="mb-5">Shopping List</h1>
      <div className="container d-flex gap-5 justify-content-center">
        <Form>
          <Form.Group controlId="productName">
            <Form.Label> Product Name: </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Product Name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="productShop">
            <Form.Label> Shop: </Form.Label>
            <Form.Control
              as="select"
              value={productShop}
              onChange={(e) => setProductShop(e.target.value)}
            >
              <option>Select Shop</option>
              {shops.map((shop, index) => (
                <option key={index} value={shop}>
                  {shop}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="productCategory">
            <Form.Label> Category: </Form.Label>
            <Form.Control
              as="select"
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}
            >
              <option>Select Category</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Button className="mt-3 mb-5" onClick={handleAddProduct}>
            Add Product
          </Button>
          {showAlert && <Alert variant="success">Shopping Completed!</Alert>}
        </Form>

        {/* FilteredForm */}
        <Form>
          <Form.Group controlId="filteredName">
            <Form.Label> Filter by Name: </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Something..."
              value={filteredName}
              onChange={(e) => setFilteredName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="filteredShop">
            <Form.Label> Filter by Shop: </Form.Label>
            <Form.Control
              as="select"
              value={filteredShop}
              onChange={(e) => setFilteredShop(e.target.value)}
            >
              <option>All Shops</option>
              {shops.map((shop, index) => (
                <option key={index} value={shop}>
                  {shop}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="filteredCategory">
            <Form.Label> Filter by Category: </Form.Label>
            <Form.Control
              as="select"
              value={filteredCategory}
              onChange={(e) => setFilteredCategory(e.target.value)}
            >
              <option>All Categories</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group className="mt-2 mb-5" controlId="filterStatus">
            <Form.Check
              type="radio"
              label="All"
              name="statusFilter"
              value="all"
              checked={filterStatus === "all"}
              defaultChecked="true"
              onChange={() => setFilterStatus("all")}
            />
            <Form.Check
              type="radio"
              label="Bought"
              name="statusFilter"
              value="bought"
              checked={filterStatus === "bought"}
              onChange={() => setFilterStatus("bought")}
            />
            <Form.Check
              type="radio"
              label="Not Bought"
              name="statusFilter"
              value="all"
              checked={filterStatus === "not-bought"}
              onChange={() => setFilterStatus("not-bought")}
            />
          </Form.Group>

          <Button className="mt-3 mb-5" onClick={resetFilters}>
            Reset Filters
          </Button>
        </Form>
      </div>
      {/* Table Div */}
      <div className="container">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID:</th>
              <th>Name:</th>
              <th>Shop:</th>
              <th>Category:</th>
              <th>Actions:</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <StyledTd isBought={product.isBought}>{product.id}</StyledTd>
                <StyledTd isBought={product.isBought}>{product.name}</StyledTd>
                <StyledTd isBought={product.isBought}>{product.shop}</StyledTd>
                <StyledTd isBought={product.isBought}>
                  {product.category}
                </StyledTd>
                <td>
                  <Button onClick={() => handelBought(product.id)}>
                    {product.isBought ? "Bought" : "Change status to bought"}
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handelDelete(product.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default App;
