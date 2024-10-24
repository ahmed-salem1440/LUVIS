# LUVIS

## Description

**LUVIS** is a fake eCommerce platform built with Angular. It displays product names, images, descriptions, and ratings. The platform allows users to make purchases and stores the user cart in the browser's Local Storage.

### Features:

- **Carousels**: Two `owl-carousel-o` components are used on the homepage:
  - One for displaying marketing offers and discounts.
  - Another for showcasing LUVIS product categories.
- **Real-time Search**: A real-time search for product names using Angular Pipe, which dynamically filters the product list based on input in the search field, displaying only the matching products.
- **Product Categories with Tabs**: Categories are displayed using Bootstrap navs and tabs. It starts with an "All category" tab, followed by tabs for each individual category. Clicking on a tab filters the products based on the selected category.
- **Product Cards**: Each product is displayed on a card showing:
  - Product category, image, name, and the first 25 characters of its description.
  - Price, rating, and the number of customers who rated it.
  - On hover, an icon appears to add the product to the wish list, along with a button to add the product to the shopping cart.
- **Product Page**: The product page includes:
  - The full product description.
  - A star rating effect that dynamically updates based on customer ratings.
  - Buttons to increase or decrease the quantity of the product requested.
  - A button to add the product to the cart.
- **Shopping Cart**: The cart page includes:
  - A table showing a thumbnail image, the product name, the quantity (with buttons to modify it), a button to remove the product, the price per unit, and the total price for the selected quantity.
  - Below the table, the total price of the entire cart is displayed, along with buttons for checkout or returning to shopping.
  - If the cart is empty, a sad emoji is displayed with a button to return to shopping.
- **Checkout Page**: When clicking on the checkout button, users can see details of all their previous orders, including the order number and details of each order.
- **Notifications**: The project uses `ngx-toastr` to notify customers of any changes in the cart, such as adding or removing a product, or modifying the quantity of each product.
- **Loader**: A loader is displayed on all pages before the server response is received.
