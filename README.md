# Project Details
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.5.


🔴🔴	Pharmaceutical Company’s Order Management System🔴🔴

  🛑 Technology Use:   
  •	Angular 17, Angular Material  
  •	ASP.NET Core 6 Web API  
  •	Unit of Work with Repository Pattern  
  •	HTML5, CSS3, Bootstrap 5  
  •	Authentication using Asp.net Core Identity & JWT Token  
  •	CORS Origin, Scoped  
  •	SOLID Principle  
  •	MS SQL Server 2019
   
  
  🛑 IDE Use: 
   
  •	Visual Studio Code
  •	Visual Studio 2022
  •	SSMS 

  ## Installation
### run this command on cmd / vs code powershell / git bash
<ul>
  <li>
    git clone https://github.com/mehedimd/SalesManagementAngular.git
  </li>
  <li>
    cd SalesManagementAngular
  </li>
  <li>
    npm install
  </li>
  <li>
    ng serve -o
  </li>
</ul>
<b>NOTE</b>: Please Start API Server before angular application open for test application  

🔷🔶GitHub API Link: https://github.com/mehedimd/SalesManagementFinalWebApi

   
  🛑 Project Description:

  <ul>
    <li>
      First SR collected the order from Pharmacy. Then the orders go to the pending order list.
    </li>
    <li>
      After the manager approves the order from the pending order, the order is designated for delivery, and the order goes to the delivery list.
    </li>
    <li>
      After delivering the order, the delivery man marks the order as delivery complete. Then the order goes to the complete order list.
    </li>
    <li>
      Only SR can Place Order.
    </li>
    <li>
      Route Based Pharmacy Show
    </li>
    <li>
      Only Manager Can Create Product
    </li>
    <li>
      Only Manager can Approve Pending Order.
    </li>
    <li>
      Only Delivery Man Can Submit Order Successfull after delivery complete.
    </li>
    <li>
      Print Invoice by Manager
    </li>
  </ul>
  
Order Now:

![order-add](https://github.com/mehedimd/SalesManagementAngular/assets/77402616/dd4a535b-7eca-4e3d-a14d-9ab947f0585d)
Order Items:
![order-item 2](https://github.com/mehedimd/SalesManagementAngular/assets/77402616/fb899e18-9565-486c-8714-7ca981bbcf3a)
all order list where
![order item list](https://github.com/mehedimd/SalesManagementAngular/assets/77402616/fcba7ef4-2ead-4141-a4a8-2cd0639d8726)
![all order list](https://github.com/mehedimd/SalesManagementAngular/assets/77402616/3730397b-c023-4866-b272-f071663aa163)
only manager can approve this order and manager's panel show this approve button only. and after manager approve the order approved order not showing in the all order list. because after order approved by manager this order can't edit/update/deletable.
![pending-order](https://github.com/mehedimd/SalesManagementAngular/assets/77402616/cd7b225e-4f50-4090-8ad0-f08572b5ca9d)
only delivery man can approve the delivery complete  and only delivery man's panel show delivery complete button
![pending-delivery](https://github.com/mehedimd/SalesManagementAngular/assets/77402616/9ca9a12a-3f85-4a33-ae39-2a1a0fd0f673)
after delivey man mark as delivery complete . then order goes to here and show all delivery complete order.
![completed order](https://github.com/mehedimd/SalesManagementAngular/assets/77402616/6481f01c-a71b-4d6f-be51-d1c520f28e01)
when we click any order row. all order details shows like this.
![show order item details](https://github.com/mehedimd/SalesManagementAngular/assets/77402616/fa1e0595-253e-4d18-b39b-35363b01f86e)
when goes to order pending section and click any order then popup menu shows print button.
![print button popup](https://github.com/mehedimd/SalesManagementAngular/assets/77402616/07828449-7a9e-4899-b50c-0bcff01ca9fb)

Click Print Button then show print option
![print popup](https://github.com/mehedimd/SalesManagementAngular/assets/77402616/a9b44771-6d97-4de0-8444-c2596cfc0652)


  GitHub Project Link: https://github.com/mehedimd/SalesManagementAngular
  
  GitHub API Link: https://github.com/mehedimd/SalesManagementFinalWebApi


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.


